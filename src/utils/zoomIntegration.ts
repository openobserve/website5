// Utility functions for Zoom webinar integration

export interface ZoomWebinar {
  id: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  slug: string;
  type: string;
  registrationUrl?: string;
  joinUrl?: string;
  zoomWebinarId: string;
  hostId: string;
  authors: Array<{
    name: string;
    role: string;
    bio: string;
    image: { url: string };
  }>;
  tags: Array<{ name: string; slug: string }>;
  image: { url: string };
}

export interface ZoomRegistrationResult {
  success: boolean;
  registrant_id?: string;
  join_url?: string;
  start_time?: string;
  topic?: string;
  error?: string;
}

/**
 * Get Zoom access token using Server-to-Server OAuth
 */
export async function getZoomToken() {
  const clientId = import.meta.env.ZOOM_CLIENT_ID;
  const clientSecret = import.meta.env.ZOOM_CLIENT_SECRET;
  const accountId = import.meta.env.ZOOM_ACCOUNT_ID;

  if (!clientId || !clientSecret || !accountId) {
    throw new Error("Missing required Zoom environment variables");
  }

  const response = await fetch("https://zoom.us/oauth/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=account_credentials&account_id=${accountId}`,
  });

  if (!response.ok) {
    throw new Error("Failed to get Zoom access token");
  }

  const data = await response.json();
  return data.access_token;
}

// Helper function to generate slugs
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Fetch webinars from Zoom via our secure API route
 */
export async function fetchZoomWebinars(
  type: "upcoming" | "scheduled" | "live" = "upcoming"
): Promise<ZoomWebinar[]> {
  try {
    const response = await fetch(`/api/webinars-sync?type=${type}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch webinars");
    }

    return result.webinars || [];
  } catch (error) {
    console.error("Error fetching Zoom webinars:", error);
    return [];
  }
}

/**
 * Register a user for a webinar via our secure API route
 */
export async function registerForZoomWebinar(params: {
  webinarId: string;
  firstName: string;
  lastName: string;
  email: string;
}): Promise<ZoomRegistrationResult> {
  try {
    const response = await fetch("/api/webinar-register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Registration failed",
      };
    }

    return {
      success: true,
      ...result,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Registration failed",
    };
  }
}

/**
 * Merge Zoom webinars with existing Strapi webinars
 * This allows you to have both manual and Zoom-synced webinars
 */
export function mergeWebinarSources(
  zoomWebinars: ZoomWebinar[],
  strapiWebinars: any[]
): any[] {
  // Filter out any Strapi webinars that have the same zoomWebinarId
  const filteredStrapiWebinars = strapiWebinars.filter(
    (webinar) =>
      !webinar.zoomWebinarId ||
      !zoomWebinars.find((zoom) => zoom.zoomWebinarId === webinar.zoomWebinarId)
  );

  // Combine and sort by date
  const combined = [...zoomWebinars, ...filteredStrapiWebinars];
  return combined.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

/**
 * Extract webinar ID from various sources
 */
export function extractWebinarId(webinar: any): string | null {
  return webinar.zoomWebinarId || webinar.webinarId || webinar.id || null;
}

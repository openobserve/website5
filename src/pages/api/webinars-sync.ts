import type { APIRoute } from "astro";

interface ZoomWebinar {
  id: string;
  topic: string;
  agenda: string;
  start_time: string;
  duration: number;
  registration_url: string;
  join_url: string;
  host_id: string;
  host_email: string;
}

interface ZoomWebinarResponse {
  webinars: ZoomWebinar[];
  page_count: number;
  page_number: number;
  page_size: number;
  total_records: number;
}

/**
 * Get Zoom access token using Server-to-Server OAuth
 */
async function getZoomToken(): Promise<string> {
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
    const errorText = await response.text();
    throw new Error(
      `Failed to get Zoom access token: ${response.status} ${errorText}`
    );
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Generate slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Transform Zoom webinar data to match website format
 */
function transformWebinarData(webinar: ZoomWebinar) {
  return {
    id: webinar.id,
    title: webinar.topic,
    description: webinar.agenda || webinar.topic,
    date: webinar.start_time,
    duration: `${webinar.duration || 60} minutes`,
    slug: generateSlug(webinar.topic),
    type: "webinar",
    registrationUrl: webinar.registration_url,
    joinUrl: webinar.join_url,
    zoomWebinarId: webinar.id,
    hostId: webinar.host_id,
    authors: [
      {
        name: webinar.host_email?.split("@")[0] || "Host",
        role: "Host",
        bio: "Webinar Host",
        image: { url: "" },
      },
    ],
    tags: [{ name: "Live Webinar", slug: "live-webinar" }],
    image: { url: "/img/video-thumbnail.png" },
  };
}

export const GET: APIRoute = async ({ request }) => {
  try {
    // Parse query parameters
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || "upcoming";
    const pageSize = url.searchParams.get("page_size") || "30";

    // Validate type parameter
    const validTypes = ["upcoming", "scheduled", "live"];
    if (!validTypes.includes(type)) {
      return new Response(
        JSON.stringify({
          error: `Invalid type parameter. Must be one of: ${validTypes.join(
            ", "
          )}`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get Zoom access token
    const accessToken = await getZoomToken();
    const userId = import.meta.env.ZOOM_USER_ID || "me";

    // Fetch webinars from Zoom API
    const zoomResponse = await fetch(
      `https://api.zoom.us/v2/users/${userId}/webinars?type=${type}&page_size=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": "OpenObserve-Website/1.0",
        },
      }
    );

    if (!zoomResponse.ok) {
      const errorText = await zoomResponse.text();
      throw new Error(`Zoom API error: ${zoomResponse.status} ${errorText}`);
    }

    const zoomData: ZoomWebinarResponse = await zoomResponse.json();

    // Transform webinar data to match website format
    const transformedWebinars =
      zoomData.webinars?.map(transformWebinarData) || [];

    return new Response(
      JSON.stringify({
        success: true,
        webinars: transformedWebinars,
        meta: {
          total_records: zoomData.total_records,
          page_count: zoomData.page_count,
          page_number: zoomData.page_number,
          page_size: zoomData.page_size,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          // Add CORS headers if needed for frontend calls
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching webinars from Zoom:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to fetch webinars",
        webinars: [],
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// Enable server-side rendering for this endpoint
export const prerender = false;

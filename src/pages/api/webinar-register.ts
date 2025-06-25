import type { APIRoute } from "astro";

interface ZoomRegistrationResponse {
  id: string;
  join_url: string;
  registrant_id: string;
  start_time: string;
  topic: string;
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
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize input to prevent injection attacks
 */
function sanitizeString(input: string): string {
  return input.replace(/[<>\"'&]/g, "").trim();
}

export const POST: APIRoute = async ({ request }) => {
  const startTime = Date.now();
  console.log(
    "🚀 [WEBINAR-REGISTER] API endpoint called at",
    new Date().toISOString()
  );

  try {
    // Parse request body
    console.log("📥 [WEBINAR-REGISTER] Parsing request body...");
    const body = await request.json();
    const { webinarId, firstName, lastName, email, ...additionalFields } = body;

    console.log("📋 [WEBINAR-REGISTER] Request data:", {
      webinarId: webinarId || "MISSING",
      firstName: firstName || "MISSING",
      lastName: lastName || "MISSING",
      email: email
        ? `${email.substring(0, 3)}***@${email.split("@")[1]}`
        : "MISSING",
      hasAdditionalFields: Object.keys(additionalFields).length > 0,
      additionalFieldKeys: Object.keys(additionalFields),
    });

    // Validate required fields
    if (!webinarId || !firstName || !lastName || !email) {
      console.log(
        "❌ [WEBINAR-REGISTER] Validation failed - missing required fields"
      );
      return new Response(
        JSON.stringify({
          error:
            "Missing required fields: webinarId, firstName, lastName, email",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate email format
    console.log("📧 [WEBINAR-REGISTER] Validating email format...");
    if (!isValidEmail(email)) {
      console.log("❌ [WEBINAR-REGISTER] Invalid email format:", email);
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Sanitize inputs
    console.log("🧹 [WEBINAR-REGISTER] Sanitizing input data...");
    const sanitizedData = {
      email: sanitizeString(email.toLowerCase()),
      first_name: sanitizeString(firstName),
      last_name: sanitizeString(lastName),
      // Add optional fields if provided
      ...(additionalFields.phone && {
        phone: sanitizeString(additionalFields.phone),
      }),
      ...(additionalFields.organization && {
        org: sanitizeString(additionalFields.organization),
      }),
      ...(additionalFields.jobTitle && {
        job_title: sanitizeString(additionalFields.jobTitle),
      }),
      ...(additionalFields.industry && {
        industry: sanitizeString(additionalFields.industry),
      }),
      ...(additionalFields.comments && {
        comments: sanitizeString(additionalFields.comments),
      }),
    };

    console.log("🧹 [WEBINAR-REGISTER] Sanitized data ready:", {
      email: sanitizedData.email
        ? `${sanitizedData.email.substring(0, 3)}***@${
            sanitizedData.email.split("@")[1]
          }`
        : "MISSING",
      first_name: sanitizedData.first_name || "MISSING",
      last_name: sanitizedData.last_name || "MISSING",
      optionalFields: Object.keys(sanitizedData).filter(
        (key) => !["email", "first_name", "last_name"].includes(key)
      ),
    });

    // Get Zoom access token
    console.log("🔑 [WEBINAR-REGISTER] Getting Zoom access token...");
    const tokenStartTime = Date.now();
    const accessToken = await getZoomToken();
    const tokenEndTime = Date.now();
    console.log(
      `✅ [WEBINAR-REGISTER] Zoom token obtained in ${
        tokenEndTime - tokenStartTime
      }ms`
    );

    // Register user with Zoom webinar
    console.log(
      `🎯 [WEBINAR-REGISTER] Calling Zoom API for webinar ID: ${webinarId}`
    );
    const zoomApiStartTime = Date.now();

    const registrationResponse = await fetch(
      `https://api.zoom.us/v2/webinars/${webinarId}/registrants`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "User-Agent": "OpenObserve-Website/1.0",
        },
        body: JSON.stringify(sanitizedData),
      }
    );

    const zoomApiEndTime = Date.now();
    console.log(
      `📡 [WEBINAR-REGISTER] Zoom API call completed in ${
        zoomApiEndTime - zoomApiStartTime
      }ms`
    );
    console.log(
      `📊 [WEBINAR-REGISTER] Zoom API response status: ${registrationResponse.status} ${registrationResponse.statusText}`
    );

    if (!registrationResponse.ok) {
      const errorData = await registrationResponse.text();
      console.error("❌ [WEBINAR-REGISTER] Zoom registration error:", {
        status: registrationResponse.status,
        statusText: registrationResponse.statusText,
        errorData: errorData,
        webinarId: webinarId,
      });

      // Handle specific Zoom API errors
      if (registrationResponse.status === 404) {
        return new Response(
          JSON.stringify({
            error: "Webinar not found or registration is closed",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else if (registrationResponse.status === 400) {
        return new Response(
          JSON.stringify({
            error: "Invalid registration data or user already registered",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        throw new Error(
          `Zoom API error: ${registrationResponse.status} ${errorData}`
        );
      }
    }

    console.log("📄 [WEBINAR-REGISTER] Parsing Zoom API response...");
    const registrationData: ZoomRegistrationResponse =
      await registrationResponse.json();

    console.log("✅ [WEBINAR-REGISTER] Registration successful!", {
      registrant_id: registrationData.registrant_id,
      topic: registrationData.topic,
      start_time: registrationData.start_time,
      webinar_id: registrationData.id,
      join_url_provided: !!registrationData.join_url,
    });

    const totalTime = Date.now() - startTime;
    console.log(
      `🎉 [WEBINAR-REGISTER] Total API execution time: ${totalTime}ms`
    );

    // Return success response with registration details
    return new Response(
      JSON.stringify({
        success: true,
        registrant_id: registrationData.registrant_id,
        join_url: registrationData.join_url,
        start_time: registrationData.start_time,
        topic: registrationData.topic,
        webinar_id: registrationData.id,
        message: "Successfully registered for webinar",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          // Add CORS headers if needed for frontend calls
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    const totalTime = Date.now() - startTime;
    console.error("💥 [WEBINAR-REGISTER] Unexpected error occurred:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      executionTime: `${totalTime}ms`,
    });

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Registration failed",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

// Handle preflight CORS requests
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};

// Enable server-side rendering for this endpoint
export const prerender = false;

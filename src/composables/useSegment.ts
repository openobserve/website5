import { ref, computed } from "vue";

// Types for better development experience
interface SegmentConfig {
  proxyUrl: string;
}

interface TrackEventData {
  [key: string]: any;
}

interface IdentifyTraits {
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  company?:
    | {
        name?: string;
        id?: string;
        industry?: string;
        employee_count?: number;
        plan?: string;
      }
    | string;
  [key: string]: any;
}

interface SegmentTrackMessage {
  user: {
    anonymousId?: string;
    userId?: string;
  };
  event: string;
  properties: Record<string, any>;
  timestamp: string;
  type: "track";
}

interface SegmentIdentifyMessage {
  user: {
    anonymousId?: string;
    userId?: string;
  };
  traits: Record<string, any>;
  timestamp: string;
  type: "identify";
}

interface SegmentPageMessage {
  user: {
    anonymousId?: string;
    userId?: string;
  };
  name?: string;
  properties: Record<string, any>;
  timestamp: string;
  type: "page";
}

// Reactive state
const isInitialized = ref(false);
const isLoading = ref(false);
let anonymousId: string | null = null;

// Generate or retrieve anonymous ID
const getAnonymousId = (): string => {
  if (anonymousId) return anonymousId;

  // Check if we're in a browser environment
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    // Generate a temporary ID for SSR
    anonymousId =
      "anon_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
    return anonymousId;
  }

  // Try to get from localStorage first
  const stored = localStorage.getItem("segment_anonymous_id");
  if (stored) {
    anonymousId = stored;
    return anonymousId;
  }

  // Generate new anonymous ID
  anonymousId =
    "anon_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
  localStorage.setItem("segment_anonymous_id", anonymousId);
  return anonymousId;
};

// Get configuration from environment variables
const getSegmentConfig = (): SegmentConfig => {
  const proxyUrl = import.meta.env.PUBLIC_SEGMENT_PROXY_URL;

  if (!proxyUrl) {
    console.warn(
      "PUBLIC_SEGMENT_PROXY_URL is not defined in environment variables"
    );
  }

  return {
    proxyUrl: proxyUrl || "",
  };
};

// Send message to Segment proxy
const sendToProxy = async (
  proxyUrl: string,
  message: SegmentTrackMessage | SegmentIdentifyMessage | SegmentPageMessage
): Promise<void> => {
  try {
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    console.log("Segment: Event sent successfully", message);
  } catch (error) {
    console.error("Segment: Failed to send event to proxy:", error);
    throw error;
  }
};

// Initialize (just set flag, no SDK to load)
const initializeSegment = async (): Promise<void> => {
  if (isInitialized.value || isLoading.value) {
    return;
  }

  // Skip initialization during SSR
  if (typeof window === "undefined") {
    console.log("Segment: Skipping initialization during SSR");
    return;
  }

  const config = getSegmentConfig();

  if (!config.proxyUrl) {
    console.warn("Segment: Proxy URL not provided, skipping initialization");
    return;
  }

  try {
    isLoading.value = true;

    // Ensure we have an anonymous ID
    getAnonymousId();

    isInitialized.value = true;
    console.log(
      "Segment: Initialized successfully with proxy:",
      config.proxyUrl
    );
  } catch (error) {
    console.error("Failed to initialize Segment:", error);
  } finally {
    isLoading.value = false;
  }
};

// Composable function
export const useSegment = () => {
  // Initialize on first use if not already done (only in browser)
  if (
    typeof window !== "undefined" &&
    !isInitialized.value &&
    !isLoading.value
  ) {
    initializeSegment();
  }

  // Track custom events
  const track = async (
    eventName: string,
    data?: TrackEventData,
    userId?: string
  ): Promise<void> => {
    // Skip if not in browser environment
    if (typeof window === "undefined") {
      console.log("Segment: Skipping track during SSR");
      return;
    }

    try {
      const message: SegmentTrackMessage = {
        user: userId ? { userId } : { anonymousId: getAnonymousId() },
        event: eventName,
        properties: data || {},
        timestamp: new Date().toISOString(),
        type: "track",
      };

      const config = getSegmentConfig();
      if (!config.proxyUrl) {
        console.warn("Segment: Proxy URL not configured, skipping event");
        return;
      }
      const proxyUrl = config.proxyUrl + "/v1/track";

      await sendToProxy(proxyUrl, message);
      console.log("Segment: Tracked event:", eventName, data);
    } catch (error) {
      console.error("Segment: Failed to track event:", eventName, error);
    }
  };

  // Identify users
  const identify = async (
    userId: string,
    traits?: IdentifyTraits
  ): Promise<void> => {
    // Skip if not in browser environment
    if (typeof window === "undefined") {
      console.log("Segment: Skipping identify during SSR");
      return;
    }

    try {
      // Transform traits to match expected format
      const transformedTraits: any = {};

      if (traits) {
        Object.keys(traits).forEach((key) => {
          if (key === "company" && typeof traits.company === "string") {
            transformedTraits.company = { name: traits.company };
          } else {
            transformedTraits[key] = traits[key as keyof IdentifyTraits];
          }
        });
      }

      const message: SegmentIdentifyMessage = {
        user: { userId },
        traits: transformedTraits,
        timestamp: new Date().toISOString(),
        type: "identify",
      };

      const config = getSegmentConfig();
      if (!config.proxyUrl) {
        console.warn("Segment: Proxy URL not configured, skipping event");
        return;
      }
      const proxyUrl = config.proxyUrl + "/v1/identify";

      await sendToProxy(proxyUrl, message);
      console.log("Segment: Identified user:", userId, transformedTraits);
    } catch (error) {
      console.error("Segment: Failed to identify user:", userId, error);
    }
  };

  // Form-specific tracking helpers
  const trackFormSubmission = async (
    formType: string,
    formData: TrackEventData,
    userId?: string
  ): Promise<void> => {
    const eventName = `O2 Website Form Submitted - ${formType}`;
    await track(
      eventName,
      {
        formType,
        ...formData,
      },
      userId
    );
  };

  const trackNewsletterSignup = async (
    email: string,
    userId?: string
  ): Promise<void> => {
    await track(
      "O2 Website - Newsletter Signup",
      {
        email,
        source: "website",
      },
      userId
    );
  };

  const trackContactFormSubmission = async (
    contactData: TrackEventData,
    userId?: string
  ): Promise<void> => {
    await trackFormSubmission("Contact", contactData, userId);
  };

  const trackDemoRequest = async (
    demoData: TrackEventData,
    userId?: string
  ): Promise<void> => {
    await trackFormSubmission("Demo Request", demoData, userId);
  };

  const trackSalesInquiry = async (
    salesData: TrackEventData,
    userId?: string
  ): Promise<void> => {
    await trackFormSubmission("Sales Inquiry", salesData, userId);
  };

  return {
    // State
    isInitialized: computed(() => isInitialized.value),
    isLoading: computed(() => isLoading.value),

    // Core methods
    track,
    identify,

    // Form-specific helpers
    trackFormSubmission,
    trackNewsletterSignup,
    trackContactFormSubmission,
    trackDemoRequest,
    trackSalesInquiry,

    // Manual initialization if needed
    initializeSegment,

    // Utility
    getAnonymousId,
  };
};

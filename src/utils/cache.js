import fetchApi from "./strapi";
import qs from "qs";

let cache = {
  categories: null,
  blogs: null,
  authors: null,
  resourceBlogs: null,
  resourceCategories: null,
  resourceAuthors: null,
  caseStudies: null,
  len: {
    authorsCount: 0,
    blogsCount: 0,
    categoriesCount: 0,
    resourceBlogsCount: 0,
    resourceCategoriesCount: 0,
    resourceAuthorsCount: 0,
    caseStudiesCount: 0,
    superiorCategoriesCount: 0,
    subTagsForSuperiorCategoriesCount: 0,
  },
  superiorCategories: null,
  subTagsForSuperiorCategories: null,
};

export function getCachedData() {
  return cache;
}

export async function getTotalCounts() {
  await fetchAuthors();
  await fetchBlogs();
  await fetchCategories();
  await fetchResourceBlogs();
  await fetchResourceCategories();
  await fetchResourceAuthors();
  await fetchSuperiorCategories();
  await fetchSubTagsForSuperiorCategories();
  return cache.len;
}
async function fetchAllPages({ endpoint, query = {} }) {
  let page = 1;
  let totalPages = 1;
  let allData = [];

  while (page <= totalPages) {
    const response = await fetchApi({
      endpoint,
      query: {
        "pagination[pageSize]": 100,
        "pagination[page]": page,
        ...query,
      },
    });

    if (response?.data) {
      response.data.sort((a, b) => {
        const dateA = new Date(a.publishDate).getTime();
        const dateB = new Date(b.publishDate).getTime();
        return dateB - dateA;
      });
      allData = [...allData, ...response.data];
      totalPages = response.meta.pagination.pageCount;
    }
    page += 1;
  }
  return allData;
}

export async function fetchAuthors() {
  if (cache.authors) {
    return cache.authors;
  }
  const data = (
    await fetchApi({
      endpoint: "api/authors",
      query: { "pagination[pageSize]": 100, populate: "image" },
    })
  ).data;

  cache.authors = data;
  cache.len.authorsCount = data.length;

  return data;
}

export async function fetchCategories() {
  if (cache.categories) {
    return cache.categories;
  }
  const data = await fetchAllPages({ endpoint: "api/categories" });

  cache.categories = data;
  cache.len.categoriesCount = data.length;

  return data;
}

export async function fetchBlogs() {
  if (cache.blogs) {
    return cache.blogs;
  }
  const queryString = qs.stringify(
    {
      populate: {
        authors: {
          populate: ["image"],
        },
        keyOutcomes: true,
        category: true,
        image: true,
        tags: true,
      },
    },
    { encodeValuesOnly: true }
  );

  const data = await fetchAllPages({
    endpoint: `api/blog-pages?${queryString}`,
  });

  cache.blogs = data;
  cache.len.blogsCount = data.length;

  return data;
}
export async function fetchWebinar() {
  try {
    // Get Strapi webinar data
    const queryString = qs.stringify(
      {
        populate: {
          authors: { populate: ["image"] },
          image: true,
          tags: true,
          objectives: true,
          resources: true,
        },
        status: "draft",
      },
      { encodeValuesOnly: true }
    );

    const strapiData = await fetchAllPages({
      endpoint: `api/webinar-posts?${queryString}`,
    });

    // Get Zoom webinar data via secure API function
    let zoomData = [];
    try {
      // Only fetch Zoom data on server-side
      if (typeof window === "undefined") {
        // Import and call the API function directly (server-side only)
        const { GET } = await import("../pages/api/webinars-sync.ts");

        // Create a mock request object for the API function
        const mockRequest = new Request(
          "http://localhost:4321/api/webinars-sync?type=upcoming"
        );

        // Call the API function directly
        const response = await GET({ request: mockRequest });

        if (response.ok) {
          const result = await response.json();
          zoomData = result.webinars || [];
        } else {
          console.warn(
            `❌ Zoom API function returned ${response.status}: ${response.statusText}`
          );
        }
      }
    } catch (zoomError) {
      console.warn(
        "Failed to fetch Zoom webinars via API function:",
        zoomError
      );
      // Continue with just Strapi data
    }

    // Merge and prioritize data
    const mergedData = [...strapiData];

    // Add Zoom webinars that don't exist in Strapi
    for (const zoomWebinar of zoomData) {
      // Skip if webinar data is incomplete
      if (!zoomWebinar || !zoomWebinar.id || !zoomWebinar.title) {
        console.warn("Skipping incomplete webinar data:", zoomWebinar);
        continue;
      }

      const existsInStrapi = strapiData.some(
        (strapiWebinar) =>
          strapiWebinar.zoomWebinarId === zoomWebinar.zoomWebinarId
      );

      if (!existsInStrapi) {
        // Convert Zoom format to Strapi format
        const convertedWebinar = {
          id: `zoom_${zoomWebinar.id}`,
          title: zoomWebinar.title,
          description:
            zoomWebinar.description || "Join us for this informative webinar.",
          date: zoomWebinar.date,
          duration: zoomWebinar.duration,
          slug:
            zoomWebinar.slug ||
            (zoomWebinar.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          type: "webinar",
          zoomWebinarId: zoomWebinar.zoomWebinarId,
          zoomJoinUrl: zoomWebinar.joinUrl,
          zoomRegistrationUrl: zoomWebinar.registrationUrl,
          authors: [
            {
              name: "OpenObserve Team",
              role: "Product Team",
              bio: "OpenObserve product and engineering team",
              image: { url: "/img/logo.svg" },
            },
          ],
          objectives: [],
          tags: [],
          resources: [],
          image: { url: "/img/video-thumbnail.webp" },
        };

        mergedData.push(convertedWebinar);
      }
    }

    return mergedData;
  } catch (error) {
    console.error("❌ Error fetching webinar data:", error);
    return [];
  }
}

export async function fetchResourceCategories() {
  if (cache.resourceCategories) {
    return cache.resourceCategories;
  }
  const data = await fetchAllPages({ endpoint: "api/resource-categories" });

  cache.resourceCategories = data;
  cache.len.resourceCategoriesCount = data.length;

  return data;
}

export async function fetchResourceBlogs() {
  if (cache.resourceBlogs) {
    return cache.resourceBlogs;
  }
  const data = await fetchAllPages({
    endpoint: "api/resource-pages",
    query: { populate: "*" },
  });

  cache.resourceBlogs = data;
  cache.len.resourceBlogsCount = data.length;
  return data;
}

export async function fetchResourceAuthors() {
  if (cache.resourceAuthors) {
    return cache.resourceAuthors;
  }
  const data = (
    await fetchApi({
      endpoint: "api/resource-authors",
      query: { "pagination[pageSize]": 100, populate: "image" },
    })
  ).data;

  cache.resourceAuthors = data;
  cache.len.resourceAuthorsCount = data.length;

  return data;
}

export async function fetchSuperiorCategories() {
  if (cache.superiorCategories) {
    return cache.superiorCategories;
  }
  const data = await fetchAllPages({
    endpoint: "api/categories",
    query: { pLevel: 4, populate: "*" },
  });

  cache.superiorCategories = data;
  cache.len.superiorCategoriesCount = data.length;

  return data;
}

export async function fetchSubTagsForSuperiorCategories() {
  if (cache.subTagsForSuperiorCategories) {
    return cache.subTagsForSuperiorCategories;
  }
  const data = await fetchAllPages({
    endpoint: "api/tags",
    query: { pLevel: 4, populate: "*" },
  });

  cache.subTagsForSuperiorCategories = data;
  cache.len.subTagsForSuperiorCategoriesCount = data.length;

  return data;
}

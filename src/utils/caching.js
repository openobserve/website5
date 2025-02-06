import { getCachedData, setCachedData } from "./cache";
import fetchApi from "./strapi";

export async function getAllBlogsAndCategories() {
  // Check if the data is already cached
  const cachedData = getCachedData();
  if (cachedData.categories && cachedData.blogs) {
    return cachedData; // If cached data exists, return it
  }
  // Fetch data from API (only if not cached)
  const categoriesResponse = await fetchApi({
    endpoint: "api/categories",
    query: { "pagination[pageSize]": 100 },
  });

  const blogsResponse = await fetchApi({
    endpoint: "api/blog-pages",
    query: { "pagination[pageSize]": 100, "populate": "categories" },
  });

  const categories = categoriesResponse?.data || [];
  const blogs = blogsResponse?.data || [];

  // Store fetched data in cache
  setCachedData(categories, blogs);
  console.log("API Called")
  return { categories, blogs };
}

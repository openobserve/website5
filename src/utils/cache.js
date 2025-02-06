import fetchApi from "./strapi";

let cache = {
  categories: null,
  blogs: null,
  authors: null
};

export function getCachedData() {
  return cache;
}

export function getAuthors() {
  return cache.authors;
}

export function getCategories() {
  return cache.categories;
}

export function getBlogs() {
  return cache.blogs;
}

export function getCaseStudies() {
  const caseStudies = cache.blogs.filter(blog => blog.caseStudies == true);
  return caseStudies;
}

export function setCachedData(categories, blogs) {
  cache.categories = categories;
  cache.blogs = blogs;
}

export function clearCache() {
  cache = { categories: null, blogs: null };
}

export async function getAllBlogsCategoriesAndAuthors() {
  const cachedData = getCachedData();
  if (cachedData.categories && cachedData.blogs && cachedData.authors) {
    return cachedData;
  }

  let categories = [];
  let blogs = [];
  let authors = [];
  if (!cachedData.categories) {
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const categoriesResponse = await fetchApi({
        endpoint: "api/categories",
        query: {
          "pagination[pageSize]": 100,
          "pagination[page]": page
        },
      });
      if (categoriesResponse?.data) {
        categories = [...categories, ...categoriesResponse.data];
        totalPages = categoriesResponse.meta.pagination.pageCount;
      }
      page += 1;
    }
  }

  if (!cachedData.blogs) {
    const blogsResponse = await fetchApi({
      endpoint: "api/blog-pages",
      query: { "pagination[pageSize]": 100, "populate": "*" },
    });

    blogs = blogsResponse?.data || [];
  }

  if (!cachedData.authors) {
    const authorsResponse = await fetchApi({
      endpoint: "api/authors",
      query: { "pagination[pageSize]": 100 },
    });
    authors = authorsResponse?.data || [];
  }
  setCachedData(categories, blogs, authors);
  return { categories, blogs };
}

import fetchApi from "./strapi";

export const itemsPerPage = 50;

let cache = {
  categories: null,
  blogs: null,
  authors: null,
  len: {
    authorsCount: 0,
    blogsCount: 0,
    categoriesCount: 0
  }
};

export function getCachedData() {
  return cache;
}

export function getTotalCounts() {
  return cache.len;
}

export function getAllAuthors() {
  return cache.authors;
}

export function getAllCategories() {
  return cache.categories;
}

export function getAllBlogs() {
  return cache.blogs;
}

export function getBlogsByPagination(page, pageSize){
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return cache.blogs.slice(start, end);
}

export function getBlogsByCategory(category) {
  return cache.blogs.filter(blog => blog.categories.map(cat => cat.slug).includes(category));
}

export function getBlogsByAuthor(author) {
  return cache.blogs.filter(blog => blog.authors.map(auth => auth.slug).includes(author));
}

export function getCaseStudies() {
  const caseStudies = cache.blogs.filter(blog => blog.caseStudies == true);
  return caseStudies.slice(0,3);
}

export function setCachedData(categories, blogs, authors, len) {
  cache.categories = categories;
  cache.blogs = blogs;
  cache.authors = authors;
  cache.len = len;
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
    blogs.sort((a, b) => a.id - b.id);
  }

  if (!cachedData.authors) {
    const authorsResponse = await fetchApi({
      endpoint: "api/authors",
      query: { "pagination[pageSize]": 100 },
    });
    authors = authorsResponse?.data || [];
  }
  setCachedData(categories, blogs, authors, {authorsCount: authors.length, blogsCount: blogs.length, categoriesCount: categories.length});
  return { categories, blogs };
}

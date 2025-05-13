import fetchApi from "./strapi";

let cache = {
  categories: null,
  blogs: null,
  authors: null,
  resourceBlogs: null,
  resourceCategories: null,
  resourceAuthors: null,
  len: {
    authorsCount: 0,
    blogsCount: 0,
    categoriesCount: 0,
    resourceBlogsCount: 0,
    resourceCategoriesCount: 0,
    resourceAuthorsCount: 0,
  },
};

export function getCachedData() {
  return cache;
}

export async function getTotalCounts() {
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
  const data = await fetchAllPages({
    endpoint: "api/blog-pages",
    // query: { populate: "*" },
    query: {
      "populate[authors][populate]": "image",
      "populate[categories]": true,
      "populate[image]": true,
    },
  });

  cache.blogs = data;
  cache.len.blogsCount = data.length;

  return data;
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

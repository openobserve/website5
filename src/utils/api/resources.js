import {
  fetchResourceCategories,
  fetchResourceBlogs,
  fetchResourceAuthors,
} from "../cache";
import { ITEMS_PER_PAGE } from "./constant";

export async function getAllResourceCategories() {
  const categories = await fetchResourceCategories();
  return categories;
}

export async function getAllResourceBlogs() {
  const blogs = await fetchResourceBlogs();
  return blogs;
}

export async function getResourceAuthors() {
  const authors = await fetchResourceAuthors();
  return authors;
}

export async function getResourceBlogsByAuthor(author) {
  const resourceBlogs = await getAllResourceBlogs();
  return resourceBlogs.filter((blog) => blog.authors[0]?.slug === author);
}

export async function getResourceBlogsByPagination(page, pageSize) {
  const resourceBlogs = await getAllResourceBlogs();
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedBlogs = resourceBlogs.slice(start, end);

  // Return only selected fields
  return paginatedBlogs.map((blog) => ({
    title: blog.title,
    description: blog.description,
    image: blog.image,
    authors: blog.authors,
    publishDate: blog.publishDate,
    categories: blog.categories,
    slug: blog.slug,
  }));
}

export async function getResBlogsBySlug(slug) {
  const resourceBlogs = await getAllResourceBlogs();
  return resourceBlogs.filter((blog) => blog.slug === slug)[0];
}

export async function getAuthorDetails(author) {
  const authors = await fetchResourceAuthors();
  return authors.filter((auth) => auth.slug === author)[0];
}

export async function getCategoryDetails(tag) {
  const categories = await fetchResourceCategories();
  return categories.filter((it) => it.slug === tag)[0];
}

export async function getResourceBlogsByCategory(category) {
  const resourceBlogs = await getAllResourceBlogs();
  return resourceBlogs.filter((blog) =>
    blog.categories.some((cat) => cat.slug === category)
  );
}

const filterResourceByCategory = (blogs, categorySlug) => {
  return blogs.filter((blog) =>
    blog.categories.some((cat) => cat.slug === categorySlug)
  );
};

const filterResourceByAuthor = (blogs, categorySlug) => {
  return blogs.filter((blog) =>
    blog.authors.some((cat) => cat.slug === categorySlug)
  );
};
const paginate = (filteredBlogs, page, pageSize) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return filteredBlogs.slice(start, end);
};

export async function getResourcesByPaginationAndCategory(
  page,
  categorySlug = null
) {
  const blogs = await getAllResourceBlogs();
  let filteredBlogs;
  if (categorySlug) {
    filteredBlogs = filterResourceByCategory(blogs, categorySlug);
  }

  let paginatedBlogs = paginate(filteredBlogs, page, ITEMS_PER_PAGE);
  paginatedBlogs = paginatedBlogs.map((blog) => ({
    title: blog.title,
    description: blog.description,
    image: blog.image,
    authors: blog.authors,
    publishDate: blog.publishDate,
    categories: blog.categories,
    slug: blog.slug,
  }));

  return {
    blogs: paginatedBlogs,
    totalBlogs: filteredBlogs.length,
    totalPages: Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE),
  };
}

export async function getResourcesByPaginationAndAuthor(
  page,
  authorSlug = null
) {
  const blogs = await getAllResourceBlogs();

  let filteredBlogs;
  if (authorSlug) {
    filteredBlogs = filterResourceByAuthor(blogs, authorSlug);
  }

  let paginatedBlogs = paginate(filteredBlogs, page, ITEMS_PER_PAGE);

  paginatedBlogs = paginatedBlogs.map((blog) => ({
    title: blog.title,
    description: blog.description,
    image: blog.image,
    authors: blog.authors,
    publishDate: blog.publishDate,
    categories: blog.categories,
    slug: blog.slug,
  }));

  return {
    blogs: paginatedBlogs,
    totalBlogs: filteredBlogs.length,
    totalPages: Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE),
  };
}

export const getAllResourcesLists = async () => {
  const allResources = await getAllResourceBlogs();
  const resourcesData = allResources.map((resource) => ({
    title: resource.title,
    description: resource.description,
    image: resource.image,
    slug: resource.slug,
    publishDate: resource.publishDate,
    categories: resource.categories,
    authors: resource.authors
  }))  

  return resourcesData
} 
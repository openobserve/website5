import {
  fetchAuthors,
  fetchCategories,
  fetchBlogs,
  fetchSuperiorCategories,
  fetchSubTagsForSuperiorCategories,
} from "../cache";
import { ITEMS_PER_PAGE } from "./constant";

export async function getAuthorDetails(author) {
  const authors = await getAllAuthors();
  return authors.filter((auth) => auth.slug === author)[0];
}

export async function getBlogsCategoryDetails(tag) {
  const tags = await fetchCategories();
  return tags.filter((it) => it.slug === tag)[0];
}

export async function getBlogsByCategory(category) {
  const blogs = await getAllBlogs();

  if (!category) {
    // Return the latest three blogs from all blogs if no category is provided
    return blogs
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, Math.min(3, blogs.length));
  }

  // Return blogs that match the given category
  return blogs.filter((blog) =>
    blog.categories.some((cat) => cat.slug === category)
  );
}

export async function getCaseStudies2() {
  const blogs = await getAllBlogs();
  return blogs
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, 3);
}

export async function getCaseStudies(params) {
  const blogs = await getAllBlogs();
  // Filter blogs where customerStories is true
  const customerStories = blogs
    .filter((blog) => blog.customerStories === true)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  return customerStories.slice(0, Math.min(3, customerStories.length));
}

export async function getAllCaseStudies() {
  const blogs = await getAllBlogs();
  // Filter blogs where customerStories is true
  const customerStories = blogs.filter((blog) => blog.customerStories === true);
  return customerStories;
}

export async function getBlogs(params) {
  const blogs = await getAllBlogs();
  // Filter out case studies from blogs
  const filteredBlogs = blogs.filter((blog) => !blog.customerStories);

  // Sort blogs by publishDate in descending order
  const sortedBlogs = filteredBlogs.sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
  );

  return sortedBlogs.slice(0, Math.min(3, sortedBlogs.length));
}

export async function getAllAuthors() {
  const auth = await fetchAuthors();
  return auth;
}

export async function getAllCategories() {
  let categories = await fetchCategories();
  categories = categories.map((cat) => {
    return {
      name: cat.name,
      slug: cat.slug,
    };
  }).sort((a, b) => a.order - b.order);
  return categories;
}

export async function getAllBlogs() {
  const blogs = await fetchBlogs();
  return blogs;
}
export async function getBlogsBySlug(slug) {
  const blogs = await getAllBlogs();
  return blogs.filter((blog) => blog.slug === slug)[0];
}

export async function getBlogsByAuthor(author) {
  const blogs = await getAllBlogs();
  const newBlogs = blogs.filter((blog) => !blog.customerStories);
  return newBlogs.filter((blog) =>
    blog.authors.some((auth) => auth.slug === author)
  );
}

export async function getBlogsByPagination(page, pageSize) {
  const blogs = await getAllBlogs();

  // Filter out case studies
  const filteredBlogs = blogs.filter((blog) => !blog.customerStories);

  // Sort by publishDate descending
  const sortedBlogs = filteredBlogs.sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
  );

  // Paginate
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedBlogs = sortedBlogs.slice(start, end);

  // Return only selected fields
  return paginatedBlogs.map((blog) => ({
    title: blog.title,
    description: blog.description,
    image: blog.image,
    authors: blog.authors,
    publishDate: blog.publishDate,
    category: blog.category,
    slug: blog.slug,
    tags: blog.tags,
  }));
}

const filterBlogsWithoutCaseStudies = (blogs) => {
  return blogs.filter((blog) => !blog.customerStories);
};

const filterBlogsByCategory = (blogs, categorySlug) => {
  return blogs.filter((blog) =>
    blog.tags.some((cat) => cat.slug === categorySlug)
  );
};

const filterBlogsByAuthor = (blogs, categorySlug) => {
  return blogs.filter((blog) =>
    blog.authors.some((cat) => cat.slug === categorySlug)
  );
};
const paginate = (filteredBlogs, page, pageSize) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return filteredBlogs.slice(start, end);
};

export async function getBlogsByPaginationAndCategory(
  page,
  categorySlug = null
) {
  const blogs = await getAllBlogs();

  let filteredBlogs = filterBlogsWithoutCaseStudies(blogs);

  if (categorySlug) {
    filteredBlogs = filterBlogsByCategory(filteredBlogs, categorySlug);
  }

  let paginatedBlogs = paginate(filteredBlogs, page, ITEMS_PER_PAGE);
  paginatedBlogs = paginatedBlogs.map((blog) => ({
    title: blog.title,
    description: blog.description,
    image: blog.image,
    authors: blog.authors,
    publishDate: blog.publishDate,
    category: blog.category,
    slug: blog.slug,
    tags: blog.tags,
  }));

  filteredBlogs = filteredBlogs.map((blog) => ({
    title: blog.title,
    description: blog.description,
    image: blog.image,
    authors: blog.authors,
    publishDate: blog.publishDate,
    category: blog.category,
    slug: blog.slug,
    tags: blog.tags,
  }));

  return {
    blogs: paginatedBlogs,
    allBlogs: filteredBlogs,
    totalBlogs: filteredBlogs.length,
    totalPages: Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE),
  };
}

export async function getBlogsByPaginationAndAuthor(page, authorSlug = null) {
  const blogs = await getAllBlogs();

  let filteredBlogs = filterBlogsWithoutCaseStudies(blogs);
  if (authorSlug) {
    filteredBlogs = filterBlogsByAuthor(filteredBlogs, authorSlug);
  }

  let paginatedBlogs = paginate(filteredBlogs, page, ITEMS_PER_PAGE);

  paginatedBlogs = paginatedBlogs.map((blog) => ({
    title: blog.title,
    description: blog.description,
    image: blog.image,
    authors: blog.authors,
    publishDate: blog.publishDate,
    category: blog.category,
    slug: blog.slug,
    tags: blog.tags,
  }));

  filteredBlogs = filteredBlogs.map((blog) => ({
    title: blog.title,
    description: blog.description,
    image: blog.image,
    authors: blog.authors,
    publishDate: blog.publishDate,
    category: blog.category,
    slug: blog.slug,
    tags: blog.tags,
  }));

  return {
    blogs: paginatedBlogs,
    allBlogs: filteredBlogs,
    totalBlogs: filteredBlogs.length,
    totalPages: Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE),
  };
}

export async function getallBlogsWithoutCaseStudies() {
  const blogs = await getAllBlogs();
  let filteredBlogs = await filterBlogsWithoutCaseStudies(blogs);
  filteredBlogs = filteredBlogs.map((blog) => ({
    title: blog.title,
    description: blog.description,
    image: blog.image,
    authors: blog.authors,
    publishDate: blog.publishDate,
    category: blog.category,
    slug: blog.slug,
    tags: blog.tags,
  }));
  return filteredBlogs;
}

export async function getCaseStudiesByPagination(page, pageSize) {
  const customerStories = await getAllCaseStudies();

  // Sort by publishDate descending
  const sortedcaseStudies = customerStories.sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
  );

  // Paginate
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedCaseStudies = sortedcaseStudies.slice(start, end);

  // Return only selected fields
  return paginatedCaseStudies.map((blog) => ({
    title: blog.title,
    description: blog.description,
    image: blog.image,
    authors: blog.authors,
    publishDate: blog.publishDate,
    category: blog.category,
    slug: blog.slug,
    tags: blog.tags,
  }));
}

export const getAllSuperiorCategories = async () => {
  const categories = await fetchSuperiorCategories();
  return categories?.map((cat) => ({
    name: cat.name,
    tags: cat.tags.map((tag) => {
      return {
        name: tag.name,
        slug: tag.slug,
      };
    }),
  }));
};

export const getAllsubTags = async () => {
  const tags = await fetchSubTagsForSuperiorCategories();
  return tags?.map((tag) => ({
    name: tag.name,
    slug: tag.slug,
  }));
};

export const fetchTagsDetailsForBlog = async (tag) => {
  const tags = await fetchSubTagsForSuperiorCategories();
  return tags.filter((it) => it.slug === tag)[0];
};

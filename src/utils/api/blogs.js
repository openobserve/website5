import { fetchAuthors, fetchCategories, fetchBlogs } from "../cache";

export const itemsPerPage = 50;

export async function getAuthorDetails(author) {
  const authors = await getAllAuthors();
  return authors.filter((auth) => auth.slug === author)[0];
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
  // Filter blogs where caseStudies is true
  const caseStudies = blogs
    .filter((blog) => blog.caseStudies === true)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  return caseStudies.slice(0, Math.min(3, caseStudies.length));
}

export async function getAllCaseStudies() {
  const blogs = await getAllBlogs();
  // Filter blogs where caseStudies is true
  const caseStudies = blogs
    .filter((blog) => blog.caseStudies === true)

  return caseStudies;
}

export async function getBlogs(params) {
  const blogs = await getAllBlogs();
  // Filter blogs where caseStudies is true
  const caseStudies = blogs.sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
  );

  return caseStudies.slice(0, Math.min(3, caseStudies.length));
}

export async function getAllAuthors() {
  const auth = await fetchAuthors();
  return auth;
}

export async function getAllCategories() {
  const categories = await fetchCategories();
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
  return blogs.filter((blog) =>
    blog.authors.some((auth) => auth.slug === author)
  );
}

export async function getBlogsByPagination(page, pageSize) {
  const blogs = await getAllBlogs();
   // Filter out case studies
   const filteredBlogs = blogs.filter((blog) => blog.caseStudies !== true);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return filteredBlogs.slice(start, end);
}

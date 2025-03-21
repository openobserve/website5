import { getBlogsByCategory } from "./api/blogs";

async function fetchBlogsByCategories(pageData) {
  const categories =
    pageData?.data?.[0]?.body
      ?.filter((it) => it?.__component === "section-cards.blog")
      ?.flatMap((it) => it.categories) ?? [];

  const blogs = [];

  for (const category of categories) {
    const categoryBlogs = (await getBlogsByCategory(category.slug))?.filter(blog => !blog.caseStudies);
    if (categoryBlogs.length > 0) {
      blogs.push(...categoryBlogs);
    }
  }

  // If no category blogs were found, fetch the latest blogs
  if (blogs.length === 0) {
    return await getBlogsByCategory(null);
  }

  // Ensure we return at most 3 blogs but handle cases with less than 3
  return blogs.slice(0, Math.min(3, blogs.length));
}

export default fetchBlogsByCategories;

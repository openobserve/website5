import { getBlogsByCategory } from "./api/blogs";

async function fetchBlogsByCategories(pageData) {
  const categories =
    pageData?.data?.[0]?.body
      ?.filter((it) => it?.__component === "section-cards.case-studies")
      ?.flatMap((it) => it.categories) ?? [];

  const blogs = [];

  for (const category of categories) {
    const categoryBlogs = await getBlogsByCategory(category.slug);
    if (categoryBlogs.length > 0) {
      blogs.push(...categoryBlogs);
    }
  }

  return blogs ? blogs.slice(0,3) : [];
}

export default fetchBlogsByCategories;
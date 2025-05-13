import { getAuthorDetails } from "@/utils/api/blog";
import type { Blog } from "@/types/blog";

// Fetch authors map from a list of blogs
export async function fetchAuthorsMapFromBlogs(blogs: Blog[]) {
  const slugsSet = new Set<string>();

  blogs.forEach((blog) => {
    blog.authors?.forEach((author) => {
      if (author.slug) slugsSet.add(author.slug);
    });
  });

  const uniqueSlugs = Array.from(slugsSet);

  const authorDetailsArray = await Promise.all(
    uniqueSlugs.map((slug) => getAuthorDetails(slug))
  );

  return Object.fromEntries(
    authorDetailsArray.map((author) => [author.slug, author])
  );
}


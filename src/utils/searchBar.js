export const handleBlogSearch = async (
  searchText,
  allBlogs,
  blogsWithPagination
) => {

  if (!searchText?.trim()) {
    return blogsWithPagination; // Return paginated blogs if no search text
  }

  const filteredBlogs =
    allBlogs?.filter((blog) =>
      blog.title.toLowerCase().includes(searchText.toLowerCase())
    ) ?? [];

  console.log(filteredBlogs, "Filtered Blogs");

  return filteredBlogs;
};

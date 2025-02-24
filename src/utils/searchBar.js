import { itemsPerPage } from "./api/blogs";

const handleBlogSearch = async (searchText, allBlogs, page = 1) => {
  // If no search text, return all blogs with pagination
  if (!searchText?.trim()) {
    return {
      data: allBlogs.slice(0, itemsPerPage),
      totalPages: Math.ceil(allBlogs.length / itemsPerPage),
      message: 'Success'
    };
  }

  // Filter blogs based on search text
  const filteredBlogs = allBlogs.filter(blog => 
    blog.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // Return early if no matches
  if (!filteredBlogs.length) {
    return {
      data: [],
      totalPages: 0,
      message: 'No blogs found matching your search'
    };
  }

  // Get paginated subset of filtered results
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedResults = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  return {
    data: paginatedResults,
    totalPages: Math.ceil(filteredBlogs.length / itemsPerPage),
    message: 'Success'
  };
};

export { handleBlogSearch };

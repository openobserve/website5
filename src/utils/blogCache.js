const blogCache = {};

export async function getBlogsFromCache(fetchApi, categorySlug) {
  if (blogCache[categorySlug]) {
    // console.log(`🟢 Using Cached Blogs for category: ${categorySlug}`);
    return blogCache[categorySlug];
  }

  // console.log(`🔴 Cache Empty for category: ${categorySlug} - Fetching Blogs...`);
  
  const blogs = await fetchApi({
    endpoint: "api/blog-pages",
    query: {
      "filters[categories][slug][$eq]": categorySlug,
      "pagination[page]": 1,
      "pagination[pageSize]": 50,
    },
  });

  if (blogs && blogs.data) {
    blogCache[categorySlug] = blogs.data;
    // console.log(`🚚 Caching Blogs for category: ${categorySlug}`);
  } else {
    console.log("❌ No blogs found or error fetching blogs");
  }
  
  // console.log("blogs", blogs.data.length);
  
  return blogs.data;
}

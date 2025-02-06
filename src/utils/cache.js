let cache = {
    categories: null,
    blogs: null,
  };
  
  export function getCachedData() {
    return cache;
  }
  
  export function setCachedData(categories, blogs) {
    cache.categories = categories;
    cache.blogs = blogs;
  }
  
  export function clearCache() {
    cache = { categories: null, blogs: null };
  }
  
import {
    fetchResourceCategories,
    fetchResourceBlogs,
    fetchResourceAuthors
} from "../cache";

export const itemsPerPage = 50;

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
    return resourceBlogs.filter(blog => blog.authors[0]?.slug === author);
}

export async function getResourceBlogsByPagination(page, pageSize) {
    const resourceBlogs = await getAllResourceBlogs();
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return resourceBlogs.slice(start, end);
}

export async function getResBlogsBySlug(slug) {
    const resourceBlogs = await getAllResourceBlogs();
    return resourceBlogs.filter(blog => blog.slug === slug)[0];
}

export async function getAuthorDetails(author) {
    const authors = await fetchResourceAuthors();
    return authors.filter(auth => auth.slug === author)[0];
}

export async function getResourceBlogsByCategory(category) {
    const resourceBlogs = await getAllResourceBlogs();
    return resourceBlogs.filter(blog => blog.categories.some(cat => cat.slug === category));
}
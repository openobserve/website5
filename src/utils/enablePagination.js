import { ITEMS_PER_PAGE } from "./api/blogs";

export const enablePagination = (items) => {
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  return totalPages > 1;
};

/**
 * Returns a slice of tags for the given page.
 * @param tags Array of tags
 * @param currentPage Current page number (1-based)
 * @param tagsPerPage Number of tags per page (default: 15)
 */
export function getPaginatedTags<T>(
  tags: T[],
  currentPage: number,
  tagsPerPage: number = 15
): T[] {
  const start = (currentPage - 1) * tagsPerPage;
  return tags.slice(start, start + tagsPerPage);
}

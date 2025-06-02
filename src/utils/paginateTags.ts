/**
 * Returns a slice of tags for the given page, or the tag if found.
 * @param tags Array of tags
 * @param currentPage Current page number (1-based)
 * @param tag Tag to search for
 * @param tagsPerPage Number of tags per page (default: 15)
 */
export function getPaginatedTags<T>(
  tags: T[],
  currentPage: number,
  tag: string,
  tagsPerPage: number = 15
): T[] {
  // If tag is found, return it as a single-element array
  const start = (currentPage - 1) * tagsPerPage;
  const foundTag = tags.find((t) =>
    typeof t.slug === "string" ? t.slug === tag : (t as any).toString() === tag
  );
  if (foundTag) {
    return [foundTag, ...tags.slice(start, start + tagsPerPage + 1)];
  }
  // Otherwise, return paginated tags
  return tags.slice(start, start + tagsPerPage);
}

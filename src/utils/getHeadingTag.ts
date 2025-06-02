export function getValidHeadingTag(tag?: string): string {
  if (!tag) return 'h3'; // default

  const normalized = tag.toLowerCase();
  const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

  return validTags.includes(normalized) ? normalized : 'h3';
}

export function getImageUrl(image) {
  if (!image || !image.formats) return image?.url || "";

  return (
    image.formats.medium?.url ||
    image.formats.large?.url ||
    image.formats.small?.url ||
    image.url ||
    ""
  );
}

export function slugify(title) {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace from both ends
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ""); // Remove non-alphanumeric characters except hyphens
}

// const slugify = (str) => {
//   return str
//     .toString()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "") // Remove accents
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9 ]/g, "") // Remove special characters
//     .replace(/\s+/g, "-"); // Replace spaces with "-"
// };
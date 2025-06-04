import { slugify } from "./slugify";

export const generateNavLink = (type, name) => {
  return `/${type}/${name}`;
};
export const generateTagLink = (type, name) => {
  return `/${type}/tag/${slugify(name)}`;
};
export const generateAuthorLink = (type, name) => {
  return `/${type}/author/${name}`;
};
// export const generatePageNavLink = (type, currentPage) => {
//   const basePath = type === "blog" ? "blog" : "articles";
//   return `/${basePath}/page/${currentPage}`;
// };

export const generatePageNavLink = (type, subType, identifier, currentPage) => {
  const pageSegment = currentPage > 1 ? `/page/${currentPage}` : "";
  const pageType = type === "blog" ? "blog" : "articles";

  if (subType === "author" && identifier) {
    return `/${pageType}/author/${identifier}${pageSegment}/`;
  } else if (subType === "tag" && identifier) {
    return `/${pageType}/tag/${identifier}${pageSegment}/`;
  } else if (type === "blog") {
    return `/blog${pageSegment}/`;
  } else if (type === "articles") {
    return `/articles${pageSegment}/`;
  }
};

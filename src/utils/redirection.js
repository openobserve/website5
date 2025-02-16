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
  export const generatePageNavLink = (type, currentPage) => {
    const basePath = type === "blog" ? "blog" : "articles";
    return `/${basePath}/page/${currentPage}`;
  };  
import { slugify } from "./slugify";

export const generateNavLink = (type, name) => {
    return `/${type}/${slugify(name)}`;
  };
  export const generatePageNavLink = (type, currentPage) => {
    const basePath = type === "blog" ? "blog" : "articles";
    return `/${basePath}/page/${currentPage}`;
  };  
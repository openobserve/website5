import { slugify } from "./slugify";

export const generateNavLink = (type, name) => {
    return `/${type}/${slugify(name)}`;
  };
  export const generateTagLink = (type, name) => {
    return `/${type}/tag/${slugify(name)}`;
  };
  export const generateAuthorLink = (type, name) => {
    console.log(type, name);
    return `/${type}/author/${slugify(name)}`;
  };
  export const generatePageNavLink = (type, currentPage) => {
    const basePath = type === "blog" ? "blog" : "articles";
    return `/${basePath}/page/${currentPage}`;
  };  
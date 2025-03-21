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

  export const generatePageNavLink = (
    type,
    subType,
    identifier,
    currentPage
  ) => {
    console.log("type", type);
    console.log("subType", subType);
    console.log("identifier", identifier);
    console.log("currentPage", currentPage);

    if (subType === "author" && identifier) {
      return `/blog/author/${identifier}/page/${currentPage}`;
    } else if (subType === "tag" && identifier) {
      return `/blog/tag/${identifier}/page/${currentPage}`;
    } else if (type === "blog") {
      return `/blog/page/${currentPage}`;
    } else if (type === "articles") {
      return `/articles/page/${currentPage}`;
    }
  };

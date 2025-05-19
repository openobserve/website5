type RESOURCES = {
    title: string;
    description: string;
    button: {
        text: string;
        link: string;
    };
}

export const BlogResources: RESOURCES = {
    title: "Latest From Our Blogs",
    description: "",
    button: {
        text: "View all posts",
        link: "/blog",
    },
};

export const ArticlesResources: RESOURCES = {
    title: "Articles",
    description: "",
    button: {
        text: "View all articles",
        link: "/articles",
    },
};

export const CaseStudiesResources: RESOURCES = {
    title: "Related Customer Stories",
    description: "",
    button: {
        text: "View all customer stories",
        link: "/customer-stories",
    },
};
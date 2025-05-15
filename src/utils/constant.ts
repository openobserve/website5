type RESOURCES = {
    title: string;
    description: string;
    button: {
        text: string;
        link: string;
    };
}

export const BlogResources: RESOURCES = {
    title: "Latest From Our BlogS",
    description: "",
    button: {
        text: "View all posts",
        link: "/blog",
    },
};

export const ArticlesResources: RESOURCES = {
    title: "Latest From Our Articles",
    description: "",
    button: {
        text: "View all articles",
        link: "/articles",
    },
};
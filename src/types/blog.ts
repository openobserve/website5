export interface Blog {
  slug: string;
  image?: {
    formats?: {
      medium?: { url: string };
      large?: { url: string };
      small?: { url: string };
    };
    url?: string;
  };
  title: string;
  description: string;
  categories: {
    name: string;
    slug: string;
  }[];
  tags: string[];
  date: string;
  authors: {
    name: string;
    slug: string;
  }[];
  publishDate: string;
}

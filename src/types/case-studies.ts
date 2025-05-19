export type CaseStudies = {
  title: string;
  description: string;
  slug: string;
  quote: string;
  image?: {
    formats?: {
      medium?: { url: string };
      large?: { url: string };
      small?: { url: string };
    };
    url?: string;
  };
  // tags: { name: string; slug: string }[];
  metrics: string[];
  authors: {
    name: string;
    slug: string;
    image: {
      url: string;
    };
    role: string;
  }[];
  company: string;
  industry: string;
  publishDate: string;
};


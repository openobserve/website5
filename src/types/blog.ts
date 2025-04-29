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

export type Author = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  bio: string;
  image: {
    url: string;
  };
  slug: string;
  youtubeUrl?: string | null;
  linkedInUrl?: string | null;
  twitterUrl?: string | null;
  instagramUrl?: string | null;
};
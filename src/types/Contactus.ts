// Define the base block interface that all content blocks will extend
export interface ContentBlock {
  id: string;
  type: string;
  title?: string;
  subtitle?: string;
}

// Hero section interface
export interface HeroBlock extends ContentBlock {
  type: "hero";
  title: string;
  subtitle: string;
  backgroundGradient?: {
    from: string;
    to: string;
  };
}

// Contact form interface
export interface ContactFormBlock extends ContentBlock {
  type: "contactForm";
  title: string;
  subtitle: string;
  fields: {
    name: string;
    email: string;
    phone: string;
    website: string;
    message: string;
  };
  submitButton: {
    text: string;
  };
  privacyText: string;
  privacyLink: {
    text: string;
    url: string;
  };
}

// Community support interface
export interface CommunitySupportBlock extends ContentBlock {
  type: "communitySupport";
  title: string;
  options: {
    id: string;
    title: string;
    description: string;
    icon: string;
    linkText: string;
    linkUrl: string;
  }[];
}

// Blog section interface
export interface BlogSectionBlock extends ContentBlock {
  type: "blogSection";
  title: string;
  viewAllLink: {
    text: string;
    url: string;
  };
  posts: {
    id: string;
    title: string;
    date: string;
    author: string;
    excerpt?: string;
    image: string;
    readMoreLink: string;
  }[];
}

// Homepage content interface
export interface HomepageContent {
  body: (
    | HeroBlock
    | ContactFormBlock
    | CommunitySupportBlock
    | BlogSectionBlock
  )[];
}

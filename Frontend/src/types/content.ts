export interface Testimonial {
  id: string;
  author: string;
  role: string;
  organization: string;
  content: string;
  rating: number;
  avatar: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  tags: string[];
  coverImage: {
    src: string;
    alt: string;
    title: string;
    width: number;
    height: number;
  };
}

export interface CompanyStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  description: string;
  image: {
    src: string;
    alt: string;
    title: string;
    width: number;
    height: number;
  };
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

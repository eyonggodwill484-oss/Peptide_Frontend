export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: {
    src: string;
    alt: string;
    title: string;
    width: number;
    height: number;
  };
  productCount: number;
  featured: boolean;
}

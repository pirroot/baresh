export interface IPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  image: string;
  readTime: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  date?: string;
  updatedAt?: string;
}

/**
 * @interface IProduct
 */
export interface IProduct {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string;
  catalogPdf?: string | null;
  description: string;
  product_description?: string | null;

  features: string[];

  size?: string | null;
  weight?: string | null;
  brand?: string | null;
  model?: string | null;
  color?: string | null;
  material?: string | null;

  faq?: ProductFaq[] | null;

  searchTags?: string[] | null;

  seoTitle?: string | null;
  seoDescription?: string | null;
  semanticKeywords?: string[] | null;
  canonicalUrl?: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export type CreateProductInput = Omit<
  IProduct,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateProductInput = Partial<CreateProductInput>;

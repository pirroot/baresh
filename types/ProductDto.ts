/**
 * @interface IProduct
 */
export interface IProduct {
  id: number;
  title: string;
  slug: string;
  category: string;
  image: string;
  catalogPdf: string;
  description: string;
  product_description: string;
  features: string[];

  seoTitle?: string | null;
  seoDescription?: string | null;
  keywords: string[];

  createdAt: Date;
  updatedAt: Date;
}

export type CreateProductInput = Omit<
  IProduct,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateProductInput = Partial<CreateProductInput>;

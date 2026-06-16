export type ProductFormValues = {
  title: string;
  slug?: string;
  category: string;
  description: string;
  product_description?: string;

  brand?: string;
  model?: string;
  color?: string;
  material?: string;
  size?: string;
  weight?: string;

  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;

  searchTags?: string;
  semanticKeywords?: string;
};

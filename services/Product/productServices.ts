const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const getProductsApi = async () => {
  const data = await fetch(`${baseUrl}/api/products`);
  return await data.json();
};

export const getProductBySlug = async (slug: string) => {
  const data = await fetch(`${baseUrl}/api/products/${slug}`);
  return await data.json();
};

export const getBlogBySlug = async (slug: string) => {
  const data = await fetch(`${baseUrl}/api/blog/${slug}`);
  return await data.json();
};

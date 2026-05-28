const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const getProductAdminApi = async () => {
  const data = await fetch(`${baseUrl}/api/admin/products`);
  return await data.json();
};

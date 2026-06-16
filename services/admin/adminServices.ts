import { prisma } from '@/lib/prisma';
import { IProduct } from '@/types/ProductDto';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const getProductAdminApi = async () => {
  const data = await fetch(`${baseUrl}/api/admin/products`);
  return await data.json();
};
export type CreateProductInput = Omit<
  IProduct,
  'id' | 'createdAt' | 'updatedAt' | 'category'
>;

export const createProductAdminApi = async (product: CreateProductInput) => {
  const result = await fetch(`${baseUrl}/api/admin/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!result.ok) {
    throw new Error('Failed to create product');
  }

  return result.json() as Promise<IProduct>;
};

export const deleteProductAdminApi = async (id: string) => {
  const result = await fetch(`${baseUrl}/api/admin/products`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  return await result.json();
};

export const uploadProductImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch('/api/upload/product-image', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');
  return res.json() as Promise<{ image: string }>;
};

export const uploadProductPdf = async (file: File) => {
  const formData = new FormData();
  formData.append('catalogPdf', file);

  const res = await fetch('/api/upload/product-catalogPdf', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Upload pdf failed');
  return res.json() as Promise<{ pdf: string }>;
};

export const updateProductAdminApi = async (
  id: string,
  product: Partial<IProduct>
) => {
  const result = await fetch(`${baseUrl}/api/admin/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...product }),
  });
  return await result.json();
};

export async function getProductCommentsAdmin() {
  return await prisma.productComment.findMany({
    include: {
      product: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

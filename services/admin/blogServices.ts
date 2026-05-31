import { IPost } from '@/types/PostDto';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const getBlogAdminApi = async () => {
  const res = await fetch(`${baseUrl}/api/admin/blog`, { cache: 'no-store' });
  return res.json();
};

export const createBlogAdminApi = async (
  post: Omit<IPost, 'id' | 'date' | 'updatedAt'>
) => {
  const res = await fetch(`${baseUrl}/api/admin/blog`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  return res.json();
};

export const updateBlogAdminApi = async (id: string, post: Partial<IPost>) => {
  const res = await fetch(`${baseUrl}/api/admin/blog`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...post }),
  });
  return res.json();
};

export const deleteBlogAdminApi = async (id: string) => {
  const res = await fetch(`${baseUrl}/api/admin/blog`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return res.json();
};

export const uploadBlogImage = async (
  file: File
): Promise<{ image: string }> => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch('/api/upload/blog-image', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
};

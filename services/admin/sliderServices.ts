import { ISlider } from '@/types/SliderDto';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const getSliderAdminApi = async () => {
  const res = await fetch(`${baseUrl}/api/admin/slider`, { cache: 'no-store' });
  return res.json();
};

export const createSliderAdminApi = async (
  slider: Omit<ISlider, 'id' | 'createdAt'>
) => {
  const res = await fetch(`${baseUrl}/api/admin/slider`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(slider),
  });
  return res.json();
};

export const updateSliderAdminApi = async (
  id: string,
  slider: Partial<ISlider>
) => {
  const res = await fetch(`${baseUrl}/api/admin/slider`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...slider }),
  });
  return res.json();
};

export const deleteSliderAdminApi = async (id: string) => {
  const res = await fetch(`${baseUrl}/api/admin/slider`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return res.json();
};

export const uploadSliderImage = async (
  file: File
): Promise<{ image: string }> => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch('/api/upload/slider-image', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
};

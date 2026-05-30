import { ISiteInfo } from '@/types/SiteInfoDto';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const getSiteInfoAdminApi = async () => {
  const data = await fetch(`${baseUrl}/api/admin/info`);
  return await data.json();
};

export const uploadAboutImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch('/api/upload/about-image', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Upload failed');
  return res.json() as Promise<{ image: string }>;
};

export const updateSiteInfoAdminApi = async (
  id: string,
  info: Partial<ISiteInfo>
) => {
  const result = await fetch(`${baseUrl}/api/admin/info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, ...info }),
  });
  return await result.json();
};

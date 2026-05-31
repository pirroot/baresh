import { ISiteInfo } from '@/types/SiteInfoDto';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const getSiteInfoAdminApi = async (): Promise<ISiteInfo> => {
  const res = await fetch(`${baseUrl}/api/admin/info`, { cache: 'no-store' });
  return res.json();
};

export const updateSiteInfoAdminApi = async (info: Partial<ISiteInfo>) => {
  const res = await fetch(`${baseUrl}/api/admin/info`, {
    // ← بدون id
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(info),
  });
  return res.json();
};

export const uploadAboutImage = async (
  file: File
): Promise<{ image: string }> => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch('/api/upload/about-image', {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
};

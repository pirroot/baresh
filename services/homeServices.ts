const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const getHomeDataApi = async () => {
  const res = await fetch(`${baseUrl}/api/home`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch home data');
  }

  return res.json();
};

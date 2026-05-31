const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export interface IDashboardData {
  productCount: number;
  postCount: number;
  faqCount: number;
  recentPosts: {
    id: string;
    title: string;
    date: string;
    category: string;
  }[];
}

export const getDashboardAdminApi = async (): Promise<IDashboardData> => {
  const res = await fetch(`${baseUrl}/api/admin/dashboard`, {
    cache: 'no-store',
  });
  return res.json();
};

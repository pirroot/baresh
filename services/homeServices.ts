import { prisma } from '@/lib/prisma';

export const getHomeDataApi = async () => {
  const [sliders, products, posts, siteInfo] = await Promise.all([
    prisma.slider.findMany(),
    prisma.product.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
        category: true,
        description: true,
      },
    }),
    prisma.post.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        category: true,
        image: true,
        readTime: true,
        seoTitle: true,
        seoDescription: true,
        keywords: true,
        date: true,
        updatedAt: true,
      },
      orderBy: { date: 'desc' },
    }),
    prisma.siteInfo.findFirst(),
  ]);

  return { sliders, products, posts, siteInfo };
};

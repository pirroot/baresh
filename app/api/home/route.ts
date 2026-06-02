import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
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
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.siteInfo.findFirst(),
  ]);

  return NextResponse.json({
    sliders,
    products,
    posts,
    siteInfo,
  });
}

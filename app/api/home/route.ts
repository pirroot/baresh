import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const [sliders, products, posts, siteInfo] = await Promise.all([
      prisma.slider.findMany({
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        take: 4,
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
        orderBy: { date: 'desc' },
        take: 4,
        select: {
          id: true,
          title: true,
          slug: true,
          image: true,
          category: true,
          date: true,
          readTime: true,
        },
      }),
      prisma.siteInfo.findFirst({ where: { id: 1 } }),
    ]);

    return NextResponse.json({ sliders, products, posts, siteInfo });
  } catch {
    return NextResponse.json(
      { error: 'خطا در دریافت داده‌ها' },
      { status: 500 }
    );
  }
}

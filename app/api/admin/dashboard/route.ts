import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const [productCount, postCount, faqCount, recentPosts] = await Promise.all([
      prisma.product.count(),
      prisma.post.count(),
      prisma.fAQ.count(),
      prisma.post.findMany({
        orderBy: { date: 'desc' },
        take: 5,
        select: { id: true, title: true, date: true, category: true },
      }),
    ]);

    return NextResponse.json({
      productCount,
      postCount,
      faqCount,
      recentPosts,
    });
  } catch {
    return NextResponse.json(
      { error: 'خطا در دریافت داده‌ها' },
      { status: 500 }
    );
  }
}

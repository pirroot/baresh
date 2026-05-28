// app/api/admin/blog/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/blog — لیست همه پست‌ها
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') ?? '1');
    const limit = parseInt(searchParams.get('limit') ?? '10');
    const search = searchParams.get('search') ?? '';

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        // تغییر از blog به post
        where: search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {},
        orderBy: { date: 'desc' }, // فیلد تاریخ در مدل ما date است
        skip,
        take: limit,
      }),
      prisma.post.count(),
    ]);

    return NextResponse.json({
      posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('[BLOG_GET]', error);
    return NextResponse.json(
      { error: 'خطا در دریافت پست‌ها' },
      { status: 500 }
    );
  }
}

// POST /api/admin/blog — افزودن پست جدید
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      content,
      image,
      category,
      readTime,
      seoTitle,
      seoDescription,
      keywords,
    } = body;

    // ولیدیشن فیلدهای اجباری
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'عنوان، اسلاگ و محتوا الزامی هستند' },
        { status: 400 }
      );
    }

    // چک کردن تکراری نبودن اسلاگ
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: 'این slug قبلاً استفاده شده است' },
        { status: 409 }
      );
    }

    // ایجاد پست با رعایت ساختار Schema
    const post = await prisma.post.create({
      data: {
        title,
        slug: slug.trim().replace(/\s+/g, '-').toLowerCase(), // استانداردسازی اسلاگ
        content,
        image: image ?? null,
        category: category ?? 'دسته بندی نشده',
        readTime: readTime ?? '5 دقیقه',
        seoTitle: seoTitle ?? title,
        seoDescription: seoDescription ?? null,
        keywords: keywords ?? [],
        date: new Date(), // تاریخ انتشار
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('[BLOG_POST]', error);
    return NextResponse.json({ error: 'خطا در ایجاد پست' }, { status: 500 });
  }
}

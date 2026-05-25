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

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where: search
          ? {
              OR: [
                { title: { contains: search, mode: 'insensitive' } },
                { excerpt: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {},
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          published: true,
          coverImage: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.blog.count(),
    ]);

    return NextResponse.json({
      blogs,
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
    const { title, slug, excerpt, content, coverImage, published } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'عنوان، slug و محتوا الزامی هستند' },
        { status: 400 }
      );
    }

    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: 'این slug قبلاً استفاده شده' },
        { status: 409 }
      );
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt: excerpt ?? null,
        content,
        coverImage: coverImage ?? null,
        published: published ?? false,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error('[BLOG_POST]', error);
    return NextResponse.json({ error: 'خطا در ایجاد پست' }, { status: 500 });
  }
}

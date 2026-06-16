import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ result });
  } catch {
    return NextResponse.json(
      { error: 'خطایی در دریافت اطلاعات رخ داد.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'داده‌های ورودی معتبر نیست.' },
        { status: 400 }
      );
    }

    const { id, ...data } = body;

    if (!id) {
      if (!data.title || !data.slug) {
        return NextResponse.json(
          { error: 'فیلدهای اجباری وارد نشده‌اند.' },
          { status: 400 }
        );
      }

      const slugExists = await prisma.post.findUnique({
        where: { slug: data.slug },
      });
      if (slugExists) {
        return NextResponse.json(
          { error: 'این slug قبلاً استفاده شده است.' },
          { status: 409 }
        );
      }

      const created = await prisma.post.create({ data });
      return NextResponse.json(created, { status: 201 });
    }

    const exist = await prisma.post.findUnique({ where: { id } });
    if (!exist) {
      return NextResponse.json(
        { error: 'پست مورد نظر یافت نشد.' },
        { status: 404 }
      );
    }

    const updated = await prisma.post.update({ where: { id }, data });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('[POST /api/post]', error);
    return NextResponse.json(
      { error: 'خطایی در سرور رخ داد.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body ?? {};

    if (!id) {
      return NextResponse.json(
        { error: 'شناسه پست ارسال نشده است.' },
        { status: 400 }
      );
    }

    const exist = await prisma.post.findUnique({ where: { id } });
    if (!exist) {
      return NextResponse.json(
        { error: 'پست مورد نظر یافت نشد.' },
        { status: 404 }
      );
    }

    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: 'پست با موفقیت حذف شد.' });
  } catch (error) {
    console.error('[DELETE /api/post]', error);
    return NextResponse.json(
      { error: 'خطایی در حذف پست رخ داد.' },
      { status: 500 }
    );
  }
}

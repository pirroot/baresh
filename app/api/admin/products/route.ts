import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ result });
  } catch (error) {
    console.error('[GET /api/product]', error);
    return NextResponse.json(
      { error: 'خطایی در دریافت محصولات رخ داد.' },
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

      const slugExists = await prisma.product.findUnique({
        where: { slug: data.slug },
      });
      if (slugExists) {
        return NextResponse.json(
          { error: 'این slug قبلاً استفاده شده است.' },
          { status: 409 }
        );
      }

      const created = await prisma.product.create({ data });
      return NextResponse.json(created, { status: 201 });
    }

    const exist = await prisma.product.findUnique({ where: { id } });
    if (!exist) {
      return NextResponse.json(
        { error: 'محصول مورد نظر یافت نشد.' },
        { status: 404 }
      );
    }

    const updated = await prisma.product.update({ where: { id }, data });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('[POST /api/product]', error);
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
        { error: 'شناسه محصول ارسال نشده است.' },
        { status: 400 }
      );
    }

    const exist = await prisma.product.findUnique({ where: { id } });
    if (!exist) {
      return NextResponse.json(
        { error: 'محصول مورد نظر یافت نشد.' },
        { status: 404 }
      );
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: 'محصول با موفقیت حذف شد.' });
  } catch (error) {
    console.error('[DELETE /api/product]', error);
    return NextResponse.json(
      { error: 'خطایی در حذف محصول رخ داد.' },
      { status: 500 }
    );
  }
}

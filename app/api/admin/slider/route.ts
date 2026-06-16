import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await prisma.slider.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ result });
  } catch (error) {
    console.error('[GET /api/slider]', error);
    return NextResponse.json(
      { error: 'خطایی در دریافت اسلایدرها رخ داد.' },
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
      if (!data.title || !data.image) {
        return NextResponse.json(
          { error: 'فیلدهای اجباری وارد نشده‌اند.' },
          { status: 400 }
        );
      }

      const created = await prisma.slider.create({ data });
      return NextResponse.json(created, { status: 201 });
    }

    const exist = await prisma.slider.findUnique({ where: { id } });
    if (!exist) {
      return NextResponse.json(
        { error: 'اسلایدر مورد نظر یافت نشد.' },
        { status: 404 }
      );
    }

    const updated = await prisma.slider.update({ where: { id }, data });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('[POST /api/slider]', error);
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
        { error: 'شناسه اسلایدر ارسال نشده است.' },
        { status: 400 }
      );
    }

    const exist = await prisma.slider.findUnique({ where: { id } });
    if (!exist) {
      return NextResponse.json(
        { error: 'اسلایدر مورد نظر یافت نشد.' },
        { status: 404 }
      );
    }

    await prisma.slider.delete({ where: { id } });
    return NextResponse.json({ message: 'اسلاید با موفقیت حذف شد.' });
  } catch (error) {
    console.error('[DELETE /api/slider]', error);
    return NextResponse.json(
      { error: 'خطایی در حذف اسلایدر رخ داد.' },
      { status: 500 }
    );
  }
}

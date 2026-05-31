import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const result = await prisma.slider.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ result });
  } catch {
    return NextResponse.json(
      { error: 'خطا در دریافت اسلایدر' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, createdAt, ...data } = body ?? {};

    if (!id) {
      const created = await prisma.slider.create({ data });
      return NextResponse.json(created, { status: 201 });
    }

    const exist = await prisma.slider.findUnique({ where: { id } });
    if (!exist) {
      return NextResponse.json(
        { message: 'Slider not found' },
        { status: 404 }
      );
    }

    const updated = await prisma.slider.update({ where: { id }, data });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'خطا از طرف سرور' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id)
      return NextResponse.json({ error: 'id وجود ندارد' }, { status: 400 });
    await prisma.slider.delete({ where: { id } });
    return NextResponse.json({ msg: 'اسلاید با موفقیت حذف شد.' });
  } catch {
    return NextResponse.json({ error: 'خطایی به وجود آمد.' }, { status: 500 });
  }
}

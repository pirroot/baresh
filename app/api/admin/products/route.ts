import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const result = await prisma.product.findMany();
    return NextResponse.json({ result });
  } catch {
    return NextResponse.json({ error: 'خطایی به وجود آمد.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, createdAt, updatedAt, ...data } = body ?? {}; // ← این خط

    // CREATE
    if (!id) {
      const created = await prisma.product.create({ data });
      return NextResponse.json(created, { status: 201 });
    }

    // UPDATE
    const exist = await prisma.product.findUnique({ where: { id } });
    if (!exist) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    const updated = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'خطا از طرف سرور' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { id } = body ?? {};
  try {
    if (!id) {
      return NextResponse.json({ error: 'اسلاگ وجود ندارد.' }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ msg: 'محصول با موفقیت حذف شد.' });
  } catch {
    return NextResponse.json({ error: 'خطایی به وجود آمد.' }, { status: 500 });
  }
}

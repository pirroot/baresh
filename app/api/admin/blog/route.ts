import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const result = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ result });
  } catch {
    return NextResponse.json({ error: 'خطایی به وجود آمد.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, date, updatedAt, ...data } = body ?? {};

    if (!id) {
      const created = await prisma.post.create({ data });
      return NextResponse.json(created, { status: 201 });
    }

    const exist = await prisma.post.findUnique({ where: { id } });
    if (!exist) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    const updated = await prisma.post.update({ where: { id }, data });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'خطا از طرف سرور' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'id وجود ندارد.' }, { status: 400 });
    }
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ msg: 'پست با موفقیت حذف شد.' });
  } catch {
    return NextResponse.json({ error: 'خطایی به وجود آمد.' }, { status: 500 });
  }
}

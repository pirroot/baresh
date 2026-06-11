import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await prisma.fAQ.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[GET /api/faq]', error);
    return NextResponse.json(
      { error: 'خطایی در دریافت سوالات رخ داد.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, answer } = body ?? {};

    if (!question || !answer) {
      return NextResponse.json(
        { error: 'سوال و جواب الزامی هستند.' },
        { status: 400 }
      );
    }

    const newFAQ = await prisma.fAQ.create({ data: { question, answer } });
    return NextResponse.json(newFAQ, { status: 201 });
  } catch (error) {
    console.error('[POST /api/faq]', error);
    return NextResponse.json(
      { error: 'خطایی در ایجاد سوال رخ داد.' },
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
        { error: 'شناسه سوال ارسال نشده است.' },
        { status: 400 }
      );
    }

    const exist = await prisma.fAQ.findUnique({ where: { id } });
    if (!exist) {
      return NextResponse.json(
        { error: 'سوال مورد نظر یافت نشد.' },
        { status: 404 }
      );
    }

    await prisma.fAQ.delete({ where: { id } });
    return NextResponse.json({ message: 'سوال با موفقیت حذف شد.' });
  } catch (error) {
    console.error('[DELETE /api/faq]', error);
    return NextResponse.json(
      { error: 'خطایی در حذف سوال رخ داد.' },
      { status: 500 }
    );
  }
}

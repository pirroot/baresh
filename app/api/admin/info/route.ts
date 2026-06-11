import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await prisma.siteInfo.findFirst({ where: { id: 1 } });

    if (!data) {
      return NextResponse.json(
        { error: 'اطلاعات سایت یافت نشد.' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[GET /api/site-info]', error);
    return NextResponse.json(
      { error: 'خطایی در دریافت اطلاعات سایت رخ داد.' },
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

    const { id, createdAt, updatedAt, ...data } = body;

    const updatedInfo = await prisma.siteInfo.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data },
    });

    return NextResponse.json(updatedInfo);
  } catch (error) {
    console.error('[POST /api/site-info]', error);
    return NextResponse.json(
      { error: 'خطایی در بروزرسانی اطلاعات سایت رخ داد.' },
      { status: 500 }
    );
  }
}

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await prisma.siteInfo.findFirst({ where: { id: 1 } });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch site info' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, createdAt, updatedAt, ...data } = body;

    const updatedInfo = await prisma.siteInfo.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data },
    });

    return NextResponse.json(updatedInfo);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update site info' },
      { status: 500 }
    );
  }
}

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const data = await prisma.siteInfo.findFirst({ where: { id: 1 } });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch site info' },
      { status: 500 }
    );
  }
}

// Edit Site-Info
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const updatedInfo = await prisma.siteInfo.update({
      where: { id: 1 },
      data: { body },
    });
    return NextResponse.json(updatedInfo);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update site info' },
      { status: 500 }
    );
  }
}

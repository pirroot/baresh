import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const result = await prisma.product.findMany();
    return NextResponse.json({ data: result });
  } catch {
    return NextResponse.json({ error: 'خطایی به وجود آمد.' }, { status: 500 });
  }
}

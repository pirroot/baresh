import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  try {
    if (!slug) {
      return NextResponse.json({ error: 'اسلاگ وجود ندارد.' }, { status: 400 });
    }

    const result = await prisma.product.findFirst({
      where: { slug },
    });

    return NextResponse.json({ data: result });
  } catch {
    return NextResponse.json({ error: 'خطایی به وجود آمد.' }, { status: 500 });
  }
}

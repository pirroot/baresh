import { NextResponse } from 'next/server';
import { getProductComments } from '@/services/commentService';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const comments = await getProductComments(productId);
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: 'خطا در دریافت نظرات' }, { status: 500 });
  }
}

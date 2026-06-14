import { NextResponse } from 'next/server';
import { getProductComments } from '@/services/commentService';

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  const comments = await getProductComments(params.productId);

  return NextResponse.json(comments);
}

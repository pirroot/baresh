import { NextResponse } from 'next/server';
import { createProductComment } from '@/services/commentService';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const comment = await createProductComment({
      name: body.name,
      phone: body.phone,
      text: body.text,
      rating: body.rating,
      productId: body.productId,
    });

    return NextResponse.json(comment);
  } catch {
    return NextResponse.json({ message: 'خطا در ثبت نظر' }, { status: 500 });
  }
}

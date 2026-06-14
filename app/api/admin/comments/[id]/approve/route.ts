import { NextResponse } from 'next/server';
import { approveProductComment } from '@/services/admin/adminCommentService';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await approveProductComment(params.id);

  return NextResponse.json({
    success: true,
  });
}

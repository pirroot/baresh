import { NextResponse } from 'next/server';
import { deleteProductComment } from '@/services/admin/adminCommentService';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await deleteProductComment(params.id);

  return NextResponse.json({
    success: true,
  });
}

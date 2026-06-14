import { NextResponse, NextRequest } from 'next/server';
import { deleteProductComment } from '@/services/admin/adminCommentService';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteProductComment(id);
  return NextResponse.json({
    success: true,
  });
}

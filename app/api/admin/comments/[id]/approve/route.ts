import { NextRequest, NextResponse } from 'next/server';
import { approveProductComment } from '@/services/admin/adminCommentService';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await approveProductComment(id);
  return NextResponse.json({
    success: true,
  });
}

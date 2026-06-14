import { NextResponse } from 'next/server';
import { rejectProductComment } from '@/services/admin/adminCommentService';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await rejectProductComment(params.id);

  return NextResponse.json({
    success: true,
  });
}

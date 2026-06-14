'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function approveComment(id: string) {
  await prisma.productComment.update({
    where: { id },
    data: { status: 'APPROVED' },
  });

  revalidatePath('/admin/products/comments');
}

export async function rejectComment(id: string) {
  await prisma.productComment.update({
    where: { id },
    data: { status: 'REJECTED' },
  });

  revalidatePath('/admin/products/comments');
}

export async function deleteComment(id: string) {
  await prisma.productComment.delete({
    where: { id },
  });

  revalidatePath('/admin/products/comments');
}

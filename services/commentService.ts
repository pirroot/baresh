import { prisma } from '@/lib/prisma';

type CreateProductCommentInput = {
  name: string;
  phone: string;
  text: string;
  rating: number;
  productId: string;
};

export async function createProductComment(data: CreateProductCommentInput) {
  // ✅ validation ساده
  if (!data.name || !data.phone || !data.text) {
    throw new Error('اطلاعات ناقص است');
  }

  if (data.rating < 1 || data.rating > 5) {
    throw new Error('امتیاز نامعتبر است');
  }

  const comment = await prisma.productComment.create({
    data: {
      name: data.name,
      phone: data.phone,
      text: data.text,
      rating: data.rating,
      productId: data.productId,
      status: 'PENDING', // همیشه اول در انتظار تایید
    },
  });

  return comment;
}

export async function getProductComments(productId: string) {
  return prisma.productComment.findMany({
    where: {
      productId,
      status: 'APPROVED',
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getProductRatingStats(productId: string) {
  const result = await prisma.productComment.aggregate({
    where: {
      productId,
      status: 'APPROVED',
    },
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
  });

  return {
    averageRating: result._avg.rating ?? 0,
    totalReviews: result._count.rating ?? 0,
  };
}

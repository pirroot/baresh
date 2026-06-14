import { prisma } from "@/lib/prisma";

export async function getAllProductComments() {
  return await prisma.productComment.findMany({
    include: {
      product: {
        select: {
          title: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}


export async function approveProductComment(id: string) {
  return prisma.productComment.update({
    where: { id },
    data: {
      status: "APPROVED",
    },
  })
}

export async function rejectProductComment(id: string) {
  return prisma.productComment.update({
    where: { id },
    data: {
      status: "REJECTED",
    },
  })
}

export async function deleteProductComment(id: string) {
  return prisma.productComment.delete({
    where: { id },
  })
}

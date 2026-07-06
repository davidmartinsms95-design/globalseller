import prisma from '@/lib/prisma'

export async function getAnalytics(userId: string) {
  const products = await prisma.product.count({
    where: {
      userId,
    },
  })

  const orders = await prisma.order.count({
    where: {
      sellerId: userId,
    },
  })

  const sales = await prisma.order.aggregate({
    where: {
      sellerId: userId,
    },
    _sum: {
      amount: true,
    },
  })

  return {
    products,
    orders,
    sales: sales._sum.amount ?? 0,
  }
}
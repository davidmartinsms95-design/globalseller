import prisma from '@/lib/prisma'

export async function getDashboardData(userId: string) {
  const productCount = await prisma.product.count({
    where: {
      userId,
    },
  })

  const orderCount = await prisma.order.count({
    where: {
      sellerId: userId,
    },
  })

  const integrations = await prisma.integration.findMany({
    where: {
      userId,
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

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      plan: true,
      maxProducts: true,
    },
  })

  return {
    products: productCount,
    orders: orderCount,
    sales: sales._sum.amount ?? 0,
    plan: user?.plan ?? 'free',
    maxProducts: user?.maxProducts ?? 5,

    integrations: {
      mercadoLivre: integrations.some(
        (i) => i.provider === 'mercadolivre'
      ),

      shopee: integrations.some(
        (i) => i.provider === 'shopee'
      ),
    },
  }
}
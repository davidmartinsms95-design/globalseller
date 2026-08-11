import prisma from '@/lib/prisma'

import {
  calculateProfitSimulation,
} from './calculators/profitCalculator'

export async function getMarketInsights(
  userId: string,
) {
  const products =
  await prisma.product.findMany({
    where: {
      userId,
    },

    select: {
      status: true,
      stock: true,
      price: true,

      resellerProduct: {
        select: {
          marketplaceProduct: {
            select: {
              costPrice: true,
              suggestedPrice: true,
            },
          },
        },
      },
    },
  })

  const orders =
    await prisma.order.findMany({
      where: {
        sellerId: userId,
      },
    })

  const totalRevenue =
    orders.reduce(
      (total, order) =>
        total + Number(order.amount),
      0,
    )

  const averageTicket =
    orders.length > 0
      ? totalRevenue / orders.length
      : 0

  const activeProducts =
    products.filter(
      (product) =>
        product.status === 'active',
    ).length

  const inactiveProducts =
    products.length -
    activeProducts

  const lowStockProducts =
    products.filter(
      (product) =>
        Number(product.stock) < 5,
    ).length
      const averagePrice =
    products.length > 0
      ? products.reduce(
          (total, product) =>
            total +
            Number(product.price ?? 0),
          0,
        ) / products.length
      : 0

  const profits = products.map(product => {
  const simulation =
    calculateProfitSimulation({
      currentPrice:
        Number(product.price ?? 0),

      costPrice:
        Number(
          product.resellerProduct
            ?.marketplaceProduct
            ?.costPrice ?? 0,
        ),

      suggestedPrice:
        Number(
          product.resellerProduct
            ?.marketplaceProduct
            ?.suggestedPrice ??
            product.price,
        ),
    })

  return simulation.estimatedProfit
})

const averageProfit =
  profits.length > 0
    ? Number(
        (
          profits.reduce(
            (total, profit) =>
              total + profit,
            0,
          ) / profits.length
        ).toFixed(2),
      )
    : 0

  const estimatedGrowth =
    Math.min(
      100,
      Math.round(
        activeProducts /
          Math.max(products.length, 1) *
          100,
      ),
    )

  const marketOpportunity =
    Math.max(
      0,
      100 -
        Math.round(
          (lowStockProducts /
            Math.max(
              products.length,
              1,
            )) *
            100,
        ),
    )
      const insights = [
    {
      id: 'growth',

      title: 'Crescimento do Catálogo',

      description:
        'Seus produtos ativos apresentam bom potencial de crescimento.',

      growth: estimatedGrowth,

      opportunity: marketOpportunity,

      estimatedProfit:
        averageProfit * activeProducts,
    },

    {
      id: 'ticket',

      title: 'Ticket Médio',

      description:
        'O ticket médio das vendas influencia diretamente na lucratividade.',

      growth: Math.round(
        averageTicket > averagePrice
          ? 85
          : 60,
      ),

      opportunity: 75,

      estimatedProfit:
        averageProfit * orders.length,
    },

    {
      id: 'stock',

      title: 'Estoque',

      description:
        'Produtos com estoque adequado tendem a manter melhor posicionamento nos marketplaces.',

      growth: Math.max(
        0,
        100 -
          Math.round(
            (lowStockProducts /
              Math.max(
                products.length,
                1,
              )) *
              100,
          ),
      ),

      opportunity: 80,

      estimatedProfit:
        averageProfit *
        (products.length -
          lowStockProducts),
    },
  ]
    return {
    totalProducts: products.length,

    activeProducts,

    inactiveProducts,

    lowStockProducts,

    totalOrders: orders.length,

    totalRevenue,

    averageTicket,

    averagePrice,

    averageProfit,

    estimatedGrowth,

    marketOpportunity,

    insights,

    generatedAt: new Date(),
  }
}
export async function getMarketInsightById(
  userId: string,
  insightId: string,
) {
  const intelligence =
    await getMarketInsights(userId)

  const insight =
    intelligence.insights.find(
      (item) => item.id === insightId,
    )

  return {
    insight,

    summary: {
      totalProducts:
        intelligence.totalProducts,

      activeProducts:
        intelligence.activeProducts,

      inactiveProducts:
        intelligence.inactiveProducts,

      lowStockProducts:
        intelligence.lowStockProducts,

      totalOrders:
        intelligence.totalOrders,

      totalRevenue:
        intelligence.totalRevenue,

      averageTicket:
        intelligence.averageTicket,

      averagePrice:
        intelligence.averagePrice,

      averageProfit:
        intelligence.averageProfit,

      estimatedGrowth:
        intelligence.estimatedGrowth,

      marketOpportunity:
        intelligence.marketOpportunity,
    },

    generatedAt:
      intelligence.generatedAt,
  }
}
import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/getCurrentUser'
import { calculateHealthScore } from '@/lib/intelligence/health'
import { calculateSeoScore } from '@/lib/intelligence/seo'

export async function GET() {
  console.time('[API] Dashboard')

  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const [
      orders,
      approvedOrders,
      integrations,
      publishedProducts,
    ] = await Promise.all([
      prisma.order.findMany({
        where: {
          sellerId: user.id,
        },
        select: {
          id: true,
          amount: true,
          status: true,
          createdAt: true,
        },
      }),

      prisma.order.count({
        where: {
          sellerId: user.id,
          status: {
            in: ['approved', 'paid'],
          },
        },
      }),

      prisma.integration.findMany({
        where: {
          userId: user.id,
        },
        select: {
          provider: true,
        },
      }),

      prisma.product.count({
        where: {
          userId: user.id,
          status: 'active',
        },
      }),
    ])

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    let sales = 0
    let pendingOrders = 0
    let monthlyRevenue = 0

    const recentOrders = orders.slice(0, 5)

    const chartData = new Array(orders.length)

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i]
      const amount = Number(order.amount)

      sales += amount

      if (
        order.status !== 'approved' &&
        order.status !== 'paid'
      ) {
        pendingOrders++
      }

      const date = new Date(order.createdAt)

      if (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      ) {
        monthlyRevenue += amount
      }

      chartData[i] = {
        day: date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
        }),
        sales: amount,
      }
    }

    const averageTicket =
      orders.length > 0
        ? sales / orders.length
        : 0

    const estimatedProfit = sales * 0.25

    const productsList =
      await prisma.product.findMany({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
          title: true,
          price: true,
          stock: true,
          description: true,
          image: true,
          mlCategoryId: true,
          status: true,
        },
      })

    const products = productsList.length

    let totalHealth = 0
    let totalSeo = 0

    const productsWithProblems: {
      id: string
      title: string
      score: number
    }[] = []

    for (const product of productsList) {
      const health = calculateHealthScore({
        title: product.title,
        description: product.description,
        image: product.image,
        stock: product.stock,
        category: product.mlCategoryId,
        status: product.status,
      })

      const seo = calculateSeoScore({
        title: product.title,
        description: product.description,
        image: product.image,
        category: product.mlCategoryId,
      })

      totalHealth += health.score
      totalSeo += seo.score

      if (health.score < 70) {
        productsWithProblems.push({
          id: product.id,
          title: product.title,
          score: health.score,
        })
      }
    }

    const intelligence = {
      healthScore:
        productsList.length > 0
          ? Math.round(
              totalHealth / productsList.length
            )
          : 0,

      seoScore:
        productsList.length > 0
          ? Math.round(
              totalSeo / productsList.length
            )
          : 0,

      productsWithProblems,
    }

    return NextResponse.json({
      products,
      orders: orders.length,

      sales,

      monthlyRevenue,

      estimatedProfit,

      averageTicket,

      approvedOrders,

      pendingOrders,

      publishedProducts,

      connectedIntegrations:
        integrations.length,

      plan: user.plan,

      maxProducts: user.maxProducts,

      integrations: {
        mercadoLivre: integrations.some(
          (i) => i.provider === 'mercadolivre'
        ),

        shopee: integrations.some(
          (i) => i.provider === 'shopee'
        ),
      },

      dashboardProducts:
        productsList.map((product) => ({
          id: product.id,
          title: product.title,
          price: Number(product.price),
          stock: product.stock,
        })),

      recentOrders:
        recentOrders.map((order) => ({
          id: order.id,
          amount: Number(order.amount),
          status: order.status,
          createdAt: order.createdAt,
        })),

      chartData,

      intelligence,
    })
  } catch (error) {
    console.error('[Dashboard]', error)

    return NextResponse.json(
      {
        error: 'Erro interno.',
      },
      {
        status: 500,
      }
    )
  } finally {
    console.timeEnd('[API] Dashboard')
  }
}
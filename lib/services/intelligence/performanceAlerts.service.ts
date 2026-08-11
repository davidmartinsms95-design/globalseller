import { prisma } from '@/lib/prisma'

import {
  ALERT_PENALTIES,
  CRITICAL_STOCK_THRESHOLD,
  LOW_STOCK_THRESHOLD,
  MIN_DESCRIPTION_LENGTH,
  MIN_PROFIT_MARGIN,
  MIN_TITLE_LENGTH,
  PRODUCT_STATUS,
  RECENT_SALES_DAYS,
} from '@/lib/services/intelligence/shared/intelligence.constants'

import {
  IntelligenceAlert,
  AlertCategory,
  AlertSeverity,
  OrderForPerformanceAlerts,
  ProductForPerformanceAlerts,
} from '@/lib/services/intelligence/shared/intelligence.types'

export interface PerformanceAlertsInput {
  userId: string
}

export interface PerformanceAlertsResult {
  alerts: IntelligenceAlert[]
  totalAlerts: number
  criticalAlerts: number
  highAlerts: number
  mediumAlerts: number
  lowAlerts: number
  healthScore: number
}

export class PerformanceAlertsService {
  public async execute({
    userId,
  }: PerformanceAlertsInput): Promise<PerformanceAlertsResult> {
    const [products, orders] = await Promise.all([
      prisma.product.findMany({
        where: {
          userId,
        },
        select: {
  id: true,
  title: true,
  stock: true,
  status: true,
  description: true,
  price: true,

  resellerProduct: {
    select: {
      marketplaceProduct: {
        select: {
          costPrice: true,
        },
      },
    },
  },
},
      }),

      prisma.order.findMany({
        where: {
          sellerId: userId,
        },
        select: {
  createdAt: true,
}
      }),
    ])

    const alerts: IntelligenceAlert[] = [
      ...this.inventoryAlerts(products),
      ...this.salesAlerts(orders),
      ...this.seoAlerts(products),
      ...this.marginAlerts(products),
      ...this.publicationAlerts(products),
    ]

    alerts.sort((a, b) => b.score - a.score)

    return {
      alerts,
      totalAlerts: alerts.length,
      criticalAlerts: alerts.filter(
        alert => alert.severity === 'critical',
      ).length,
      highAlerts: alerts.filter(
        alert => alert.severity === 'high',
      ).length,
      mediumAlerts: alerts.filter(
        alert => alert.severity === 'medium',
      ).length,
      lowAlerts: alerts.filter(
        alert => alert.severity === 'low',
      ).length,
      healthScore:
        this.calculateHealthScore(alerts),
    }
  }
    private inventoryAlerts(
    products: ProductForPerformanceAlerts[],
  ): IntelligenceAlert[] {
    const alerts: IntelligenceAlert[] = []

    const criticalProducts = products.filter(
      product =>
        product.stock <=
        CRITICAL_STOCK_THRESHOLD,
    )

    if (criticalProducts.length > 0) {
      alerts.push({
        id: 'inventory-critical',

        title: 'Estoque esgotado',

        description:
          `${criticalProducts.length} produto(s) estão sem estoque.`,

        severity: 'critical',

        category: 'inventory',

        score: 100,

        recommendation:
          'Reabasteça imediatamente ou pause os anúncios.',

        createdAt: new Date().toISOString(),

        metadata: {
          products: criticalProducts.map(product => ({
            id: product.id,
            title: product.title,
            stock: product.stock,
          })),
        },
      })
    }

    const lowStockProducts = products.filter(
      product =>
        product.stock >
          CRITICAL_STOCK_THRESHOLD &&
        product.stock <= LOW_STOCK_THRESHOLD,
    )

    if (lowStockProducts.length > 0) {
      alerts.push({
        id: 'inventory-low',

        title: 'Estoque baixo',

        description:
          `${lowStockProducts.length} produto(s) estão próximos da ruptura.`,

        severity: 'high',

        category: 'inventory',

        score: 85,

        recommendation:
          'Planeje a reposição antes que os produtos fiquem indisponíveis.',

        createdAt: new Date().toISOString(),

        metadata: {
          products: lowStockProducts.map(product => ({
            id: product.id,
            title: product.title,
            stock: product.stock,
          })),
        },
      })
    }

    return alerts
  }

  private salesAlerts(
    orders: OrderForPerformanceAlerts[],
  ): IntelligenceAlert[] {
    const alerts: IntelligenceAlert[] = []

    const startDate = new Date()

    startDate.setDate(
      startDate.getDate() -
        RECENT_SALES_DAYS,
    )

    const recentOrders = orders.filter(
      order => order.createdAt >= startDate,
    )

    if (recentOrders.length === 0) {
      alerts.push({
        id: 'sales-none',

        title: 'Nenhuma venda recente',

        description:
          'Nenhum pedido foi registrado nos últimos dias.',

        severity: 'critical',

        category: 'sales',

        score: 95,

        recommendation:
          'Revise preços, SEO, campanhas e competitividade dos anúncios.',

        createdAt: new Date().toISOString(),
      })
    }

    return alerts
  }

  private publicationAlerts(
    products: ProductForPerformanceAlerts[],
  ): IntelligenceAlert[] {
    const alerts: IntelligenceAlert[] = []

    const inactiveProducts = products.filter(
      product =>
        product.status ===
          PRODUCT_STATUS.PAUSED ||
        product.status ===
          PRODUCT_STATUS.INACTIVE ||
        product.status ===
          PRODUCT_STATUS.CLOSED,
    )

    if (inactiveProducts.length === 0) {
      return alerts
    }

    alerts.push({
      id: 'publication-inactive',

      title: 'Produtos inativos',

      description:
        `${inactiveProducts.length} produto(s) não estão ativos.`,

      severity: 'medium',

      category: 'publication',

      score: 70,

      recommendation:
        'Reative os anúncios ou verifique possíveis bloqueios.',

      createdAt: new Date().toISOString(),

      metadata: {
        products: inactiveProducts.map(product => ({
          id: product.id,
          title: product.title,
          status: product.status,
        })),
      },
    })

    return alerts
  }
    private seoAlerts(
    products: ProductForPerformanceAlerts[],
  ): IntelligenceAlert[] {
    const alerts: IntelligenceAlert[] = []

    const seoProblems = products.filter(product => {
      const title = product.title.trim()

      const description =
        product.description?.trim() ?? ''

      return (
        title.length < MIN_TITLE_LENGTH ||
        description.length <
          MIN_DESCRIPTION_LENGTH
      )
    })

    if (seoProblems.length === 0) {
      return alerts
    }

    alerts.push({
      id: 'seo-low',

      title: 'SEO abaixo do recomendado',

      description:
        `${seoProblems.length} anúncio(s) possuem título ou descrição curtos.`,

      severity: 'medium',

      category: 'seo',

      score: 65,

      recommendation:
        'Melhore títulos, descrições e palavras-chave.',

      createdAt: new Date().toISOString(),

      metadata: {
        products: seoProblems.map(product => ({
          id: product.id,
          title: product.title,
        })),
      },
    })

    return alerts
  }

  private marginAlerts(
    products: ProductForPerformanceAlerts[],
  ): IntelligenceAlert[] {
    const alerts: IntelligenceAlert[] = []

    const lowMarginProducts = products.filter(
      product => {
        const marketplaceProduct =
          product.resellerProduct
            ?.marketplaceProduct

        if (!marketplaceProduct) {
          return false
        }

        const cost =
          marketplaceProduct.costPrice

        const price = product.price

        if (cost <= 0 || price <= 0) {
          return false
        }

        const margin =
          ((price - cost) / price) * 100

        return (
          margin < MIN_PROFIT_MARGIN
        )
      },
    )

    if (lowMarginProducts.length === 0) {
      return alerts
    }

    alerts.push({
      id: 'margin-low',

      title: 'Margem de lucro baixa',

      description:
        `${lowMarginProducts.length} produto(s) possuem margem inferior ao mínimo recomendado.`,

      severity: 'high',

      category: 'pricing',

      score: 82,

      recommendation:
        'Revise preços ou negocie melhores custos com os fornecedores.',

      createdAt: new Date().toISOString(),

      metadata: {
        products: lowMarginProducts.map(product => ({
          id: product.id,

          title: product.title,

          price: product.price,

          costPrice:
            product
              .resellerProduct
              ?.marketplaceProduct
              .costPrice,
        })),
      },
    })

    return alerts
  }

  private calculateHealthScore(
    alerts: IntelligenceAlert[],
  ): number {
    let score = 100

    for (const alert of alerts) {
      switch (alert.severity) {
        case 'critical':
          score -= ALERT_PENALTIES.critical
          break

        case 'high':
          score -= ALERT_PENALTIES.high
          break

        case 'medium':
          score -= ALERT_PENALTIES.medium
          break

        case 'low':
          score -= ALERT_PENALTIES.low
          break
      }
    }

    return Math.max(0, score)
  }
  }
  
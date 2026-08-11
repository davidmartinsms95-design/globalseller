import { prisma } from '@/lib/prisma'

import {
  IDEAL_PROFIT_MARGIN,
  LOW_STOCK_THRESHOLD,
  MIN_DESCRIPTION_LENGTH,
  MIN_EXPECTED_ORDERS,
  MIN_TITLE_LENGTH,
} from '@/lib/services/intelligence/shared/intelligence.constants'

import type {
  AIRecommendation,
  OrderForAIRecommendations,
  ProductForAIRecommendations,
  RecommendationCategory,
} from '@/lib/services/intelligence/shared/intelligence.types'

export interface AIRecommendationsInput {
  userId: string
}

export interface AIRecommendationsResult {
  recommendations: AIRecommendation[]
  totalRecommendations: number
  averageImpact: number
  averageConfidence: number
}

export class AIRecommendationsService {
  public async execute({
    userId,
  }: AIRecommendationsInput): Promise<AIRecommendationsResult> {
    const [products, orders] = await Promise.all([
      prisma.product.findMany({
  where: {
    userId,
  },
  select: {
    id: true,
    title: true,
    price: true,
    stock: true,
    description: true,

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
    id: true,
  },
}),
    ])

    const recommendations: AIRecommendation[] = [
      ...this.pricingRecommendations(products),
      ...this.seoRecommendations(products),
      ...this.inventoryRecommendations(products),
      ...this.salesRecommendations(orders),
    ]

    const enrichedRecommendations =
  this.enrichRecommendations(
    recommendations,
  )

return {
  recommendations:
    enrichedRecommendations,
      totalRecommendations:
        recommendations.length,
      averageImpact:
        this.calculateAverageImpact(
          recommendations,
        ),
      averageConfidence:
        this.calculateAverageConfidence(
          recommendations,
        ),
    }
  }
    private pricingRecommendations(
  products: ProductForAIRecommendations[],
): AIRecommendation[] {
    const recommendations: AIRecommendation[] = []

    const productsToReview = products.filter(product => {
      const marketplaceProduct =
        product.resellerProduct?.marketplaceProduct

      if (!marketplaceProduct) {
        return false
      }

      const cost = marketplaceProduct.costPrice
      const price = product.price

      if (cost <= 0 || price <= 0) {
        return false
      }

      const margin =
        ((price - cost) / price) * 100

      return margin < IDEAL_PROFIT_MARGIN
    })

    if (productsToReview.length === 0) {
      return recommendations
    }

    recommendations.push({
      id: 'pricing-margin',

      title: 'Aumente sua margem de lucro',

      description:
        `${productsToReview.length} produto(s) possuem margem inferior à recomendada.`,

      priority: 'high',

      category: 'pricing',

      impact: 92,

      confidence: 95,

      estimatedGain:
        productsToReview.length * 40,

      recommendation:
        'Revise preços de venda ou negocie melhores condições com seus fornecedores.',

      createdAt: new Date().toISOString(),

      metadata: {
        products: productsToReview.map(product => ({
          id: product.id,
          title: product.title,
          price: product.price,
          costPrice:
            product.resellerProduct
              ?.marketplaceProduct.costPrice,
        })),
      },
    })

    return recommendations
  }

  private seoRecommendations(
  products: ProductForAIRecommendations[],
): AIRecommendation[] {
    const recommendations: AIRecommendation[] = []

    const productsToImprove = products.filter(product => {
      const title = product.title.trim()

      const description =
        product.description?.trim() ?? ''

      return (
        title.length < MIN_TITLE_LENGTH ||
        description.length <
          MIN_DESCRIPTION_LENGTH
      )
    })

    if (productsToImprove.length === 0) {
      return recommendations
    }

    recommendations.push({
      id: 'seo-improvement',

      title: 'Melhore o SEO dos anúncios',

      description:
        `${productsToImprove.length} anúncio(s) podem ganhar mais visibilidade.`,

      priority: 'medium',

      category: 'seo',

      impact: 82,

      confidence: 91,

      recommendation:
        'Utilize títulos mais completos, descrições detalhadas e palavras-chave relevantes.',

      createdAt: new Date().toISOString(),

      metadata: {
        products: productsToImprove.map(product => ({
          id: product.id,
          title: product.title,
        })),
      },
    })

    return recommendations
  }

  private inventoryRecommendations(
  products: ProductForAIRecommendations[],
): AIRecommendation[] {
    const recommendations: AIRecommendation[] = []

    const lowStockProducts = products.filter(
      product =>
        product.stock <= LOW_STOCK_THRESHOLD,
    )

    if (lowStockProducts.length === 0) {
      return recommendations
    }

    recommendations.push({
      id: 'inventory-restock',

      title: 'Reposição de estoque',

      description:
        `${lowStockProducts.length} produto(s) precisam ser reabastecidos.`,

      priority: 'high',

      category: 'inventory',

      impact: 89,

      confidence: 94,

      recommendation:
        'Reponha o estoque antes que os anúncios parem de vender.',

      createdAt: new Date().toISOString(),

      metadata: {
        products: lowStockProducts.map(product => ({
          id: product.id,
          title: product.title,
          stock: product.stock,
        })),
      },
    })

    return recommendations
  }

  private salesRecommendations(
  orders: OrderForAIRecommendations[],
): AIRecommendation[] {
    const recommendations: AIRecommendation[] = []

    if (orders.length >= MIN_EXPECTED_ORDERS) {
      return recommendations
    }

    recommendations.push({
      id: 'sales-growth',

      title: 'Aumente o volume de vendas',

      description:
        'Seu volume de pedidos ainda está abaixo da meta inicial.',

      priority: 'high',

      category: 'sales',

      impact: 90,

      confidence: 88,

      recommendation:
        'Publique mais produtos, fortaleça SEO e invista em anúncios patrocinados.',

      createdAt: new Date().toISOString(),

      metadata: {
        orders: orders.length,
      },
    })

    return recommendations
  }
    private calculateAverageImpact(
    recommendations: AIRecommendation[],
  ): number {
    if (recommendations.length === 0) {
      return 0
    }

    const total = recommendations.reduce(
      (sum, recommendation) => sum + recommendation.impact,
      0,
    )

    return Number(
      (total / recommendations.length).toFixed(1),
    )
  }

  private calculateAverageConfidence(
    recommendations: AIRecommendation[],
  ): number {
    if (recommendations.length === 0) {
      return 0
    }

    const total = recommendations.reduce(
      (sum, recommendation) => sum + recommendation.confidence,
      0,
    )

    return Number(
      (total / recommendations.length).toFixed(1),
    )
  }

  private sortRecommendations(
    recommendations: AIRecommendation[],
  ): AIRecommendation[] {
    return [...recommendations].sort((a, b) => {
      if (b.impact !== a.impact) {
        return b.impact - a.impact
      }

      if (b.confidence !== a.confidence) {
        return b.confidence - a.confidence
      }

      const priorityWeight = {
        critical: 4,
        high: 3,
        medium: 2,
        low: 1,
      }

      return (
        priorityWeight[b.priority] -
        priorityWeight[a.priority]
      )
    })
  }

  private calculateRecommendationScore(
    recommendation: AIRecommendation,
  ): number {
    const priorityWeight = {
      critical: 1,
      high: 0.9,
      medium: 0.75,
      low: 0.6,
    }

    const estimatedGain =
      recommendation.estimatedGain ?? 0

    const normalizedGain = Math.min(
      estimatedGain / 100,
      1,
    )

    const score =
      recommendation.impact * 0.45 +
      recommendation.confidence * 0.35 +
      normalizedGain * 100 * 0.2

    return Number(
      (
        score *
        priorityWeight[recommendation.priority]
      ).toFixed(1),
    )
  }

  private enrichRecommendations(
    recommendations: AIRecommendation[],
  ): AIRecommendation[] {
    return this.sortRecommendations(
      recommendations.map(recommendation => ({
        ...recommendation,

        metadata: {
          ...recommendation.metadata,

          score:
            this.calculateRecommendationScore(
              recommendation,
            ),
        },
      })),
    )
  }
    public async getRecommendations(
    input: AIRecommendationsInput,
  ): Promise<AIRecommendation[]> {
    const result = await this.execute(input)

    return result.recommendations
  }

  public async getTopRecommendations(
    input: AIRecommendationsInput,
    limit = 5,
  ): Promise<AIRecommendation[]> {
    const recommendations =
      await this.getRecommendations(input)

    return recommendations.slice(0, limit)
  }

  public async getRecommendationsByCategory(
    input: AIRecommendationsInput,
    category: RecommendationCategory,
  ): Promise<AIRecommendation[]> {
    const recommendations =
      await this.getRecommendations(input)

    return recommendations.filter(
      recommendation =>
        recommendation.category === category,
    )
  }

  public async getSummary(
    input: AIRecommendationsInput,
  ): Promise<AIRecommendationsResult> {
    return this.execute(input)
  }
}

export const aiRecommendationsService =
  new AIRecommendationsService()
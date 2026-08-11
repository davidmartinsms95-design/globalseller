import { prisma } from '@/lib/prisma'

import {
  IDEAL_PROFIT_MARGIN,
} from '@/lib/services/intelligence/shared/intelligence.constants'

import type {
  ProductWithRelations,
} from '@/lib/services/intelligence/shared/intelligence.types'

export interface CompetitorAnalysisInput {
  userId: string

  productId?: string
}

export interface CompetitorPriceAnalysis {
  productId: string

  title: string

  marketplace: string

  currentPrice: number

  suggestedPrice: number

  costPrice: number

  estimatedMargin: number

  competitiveness: number

  recommendation: string
}

export interface CompetitorAnalysisResult {
  analyses: CompetitorPriceAnalysis[]

  averageCompetitiveness: number
}

export class CompetitorAnalysisService {
  public async execute({
    userId,
    productId,
  }: CompetitorAnalysisInput): Promise<CompetitorAnalysisResult> {
    const products =
      await prisma.product.findMany({
        where: {
          userId,

          ...(productId
            ? {
                id: productId,
              }
            : {}),
        },

        include: {
          resellerProduct: {
            include: {
              marketplaceProduct: {
                include: {
                  supplier: true,
                },
              },
            },
          },
        },

        orderBy: {
          createdAt: 'desc',
        },
      })

    const analyses = products.map(product =>
      this.analyzeProduct(product),
    )

    return {
      analyses,

      averageCompetitiveness:
        this.calculateAverageCompetitiveness(
          analyses,
        ),
    }
  }
    private analyzeProduct(
    product: ProductWithRelations,
  ): CompetitorPriceAnalysis {
    const marketplaceProduct =
      product.resellerProduct?.marketplaceProduct

    const costPrice =
      marketplaceProduct?.costPrice ?? 0

    const suggestedPrice =
      marketplaceProduct?.suggestedPrice ??
      product.price

    const estimatedMargin =
      this.calculateMargin(
        product.price,
        costPrice,
      )

    const competitiveness =
      this.calculateCompetitiveness(
        product.price,
        suggestedPrice,
        estimatedMargin,
      )

    return {
      productId: product.id,

      title: product.title,

      marketplace: product.marketplace,

      currentPrice: product.price,

      suggestedPrice,

      costPrice,

      estimatedMargin,

      competitiveness,

      recommendation:
        this.generateRecommendation(
          product.price,
          suggestedPrice,
          estimatedMargin,
        ),
    }
  }

  private calculateMargin(
    price: number,
    cost: number,
  ): number {
    if (price <= 0 || cost <= 0) {
      return 0
    }

    return Number(
      (
        ((price - cost) / price) *
        100
      ).toFixed(2),
    )
  }

  private calculateCompetitiveness(
    currentPrice: number,
    suggestedPrice: number,
    margin: number,
  ): number {
    let score = 100

    const priceDifference =
      Math.abs(
        currentPrice - suggestedPrice,
      )

    if (suggestedPrice > 0) {
      score -=
        (priceDifference /
          suggestedPrice) *
        40
    }

    if (margin < IDEAL_PROFIT_MARGIN) {
      score -=
        IDEAL_PROFIT_MARGIN - margin
    }

    return Math.max(
      0,
      Math.min(100, Number(score.toFixed(1))),
    )
  }

  private generateRecommendation(
    currentPrice: number,
    suggestedPrice: number,
    margin: number,
  ): string {
    if (margin < IDEAL_PROFIT_MARGIN) {
      return 'Aumente o preço ou reduza o custo para melhorar a margem.'
    }

    if (currentPrice < suggestedPrice) {
      return 'Existe espaço para aumentar o preço mantendo competitividade.'
    }

    if (currentPrice > suggestedPrice) {
      return 'Avalie reduzir o preço para ganhar competitividade.'
    }

    return 'Preço alinhado com a estratégia atual.'
  }
    private calculateAverageCompetitiveness(
    analyses: CompetitorPriceAnalysis[],
  ): number {
    if (analyses.length === 0) {
      return 0
    }

    const total = analyses.reduce(
      (sum, analysis) =>
        sum + analysis.competitiveness,
      0,
    )

    return Number(
      (total / analyses.length).toFixed(1),
    )
  }

  private sortAnalyses(
    analyses: CompetitorPriceAnalysis[],
  ): CompetitorPriceAnalysis[] {
    return [...analyses].sort(
      (a, b) =>
        b.competitiveness -
        a.competitiveness,
    )
  }

  private getImprovementOpportunities(
    analyses: CompetitorPriceAnalysis[],
  ): CompetitorPriceAnalysis[] {
    return analyses.filter(
      analysis =>
        analysis.competitiveness < 70,
    )
  }

  private getTopCompetitorAnalyses(
    analyses: CompetitorPriceAnalysis[],
    limit = 10,
  ): CompetitorPriceAnalysis[] {
    return this.sortAnalyses(
      analyses,
    ).slice(0, limit)
  }

  private getLowestCompetitiveness(
    analyses: CompetitorPriceAnalysis[],
    limit = 10,
  ): CompetitorPriceAnalysis[] {
    return [...analyses]
      .sort(
        (a, b) =>
          a.competitiveness -
          b.competitiveness,
      )
      .slice(0, limit)
  }
    public async getAnalyses(
    input: CompetitorAnalysisInput,
  ): Promise<CompetitorPriceAnalysis[]> {
    const result = await this.execute(input)

    return result.analyses
  }

  public async getTopCompetitors(
    input: CompetitorAnalysisInput,
    limit = 10,
  ): Promise<CompetitorPriceAnalysis[]> {
    const analyses =
      await this.getAnalyses(input)

    return analyses.slice(0, limit)
  }

  public async getImprovementSuggestions(
    input: CompetitorAnalysisInput,
  ): Promise<CompetitorPriceAnalysis[]> {
    const analyses =
      await this.getAnalyses(input)

    return analyses.filter(
      analysis =>
        analysis.competitiveness < 70,
    )
  }

  public async getSummary(
    input: CompetitorAnalysisInput,
  ): Promise<CompetitorAnalysisResult> {
    return this.execute(input)
  }
}

export const competitorAnalysisService =
  new CompetitorAnalysisService()
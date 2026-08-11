import { buildIntelligence } from './engine/intelligenceEngine'

import prisma from '@/lib/prisma'

import type {
  ProductWithRelations,
  ForecastResult,
  PublicationTimelineEvent,
} from './shared/intelligence.types'

import {
  buildProductHealth,
} from './builders/productHealth.builder'

import {
  buildProfitSimulator,
} from './builders/profitSimulator.builder'

import {
  buildPriceSuggestion,
} from './builders/priceSuggestion.builder'

import {
  buildCatalogExecutiveSummary,
} from './engine/catalogExecutiveEngine'

import {
  buildDashboardIntelligence,
} from './dashboard/dashboardIntelligenceFacade'

import {
  bestPublicationTimeService,
} from '@/lib/services/bestPublicationTime.service'

import {
  averageScore,
} from './shared/intelligence.utils'

import {
  buildCatalogMetrics,
} from './builders/catalogMetrics.builder'

import {
  buildCompetitorAnalysis,
} from './builders/competitorAnalysis.builder'

import {
  buildTopProducts,
} from './builders/topProducts.builder'

export async function getDashboardIntelligence(
  userId: string,
) {
  const products =
  await prisma.product.findMany({
    where: {
      userId,
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
  })

  const product = products[0]

  const allIntelligences =
  await Promise.all(
    products.map((product) =>
      buildIntelligence({
        product,
        userId,
      }),
    ),
  )

const {
  intelligence,
  salesForecast,
  competitorAnalysis: competitorResult,
  publicationTimeline,
  marketInsights,
} =
  await buildDashboardIntelligence({
    product,
    userId,
  })

  const healthScore =
  averageScore(
    allIntelligences.map(
      item => item.scores.healthScore,
    ),
  )

  const catalogMetrics =
  buildCatalogMetrics(
    allIntelligences.map(
      item => item.scores.finalScore,
    ),
  )

const seoScore =
  averageScore(
    allIntelligences.map(
      item => item.scores.seoScore,
    ),
  )

const productHealth =
  buildProductHealth(
    intelligence.explanation.positivePoints,
    intelligence.explanation.negativePoints,
    intelligence.recommendations.map(
      (item) => item.action,
    ),
  )

const marketplaceProduct =
  product.resellerProduct?.marketplaceProduct

const currentPrice =
  Number(product.price ?? 0)

const costPrice =
  Number(
    marketplaceProduct?.costPrice ?? 0,
  )

const suggestedPrice =
  Number(
    marketplaceProduct?.suggestedPrice ??
      product.price,
  )

const profitSimulator =
  buildProfitSimulator(
    currentPrice,
    costPrice,
    suggestedPrice,
  )

const priceSuggestion =
  buildPriceSuggestion(
    costPrice,
    currentPrice,
    suggestedPrice,
  )

const publicationSummary =
  await bestPublicationTimeService.getSummary({
    userId,
  })

const publicationTime = {
  bestHour:
    `${publicationSummary.recommendedHour}:00`,

  bestDay:
    publicationSummary.bestWeekdays[0]
      ?.label ?? 'Segunda-feira',

  averageConversion: 0,

  averageSales: 0,

  hours:
    publicationSummary.bestHours,
}

const analyses =
  competitorResult.analyses ?? []

const competitorAnalysis =
  buildCompetitorAnalysis({
    productId: product.id,
    analyses,
  })

const opportunities =
  allIntelligences
    .flatMap(
      (item) => item.opportunities ?? [],
    )
    .map((item) => ({
      ...item,

      estimatedProfit:
        item.estimatedRevenue ?? 0,
    }))
    .sort(
      (a, b) =>
        b.estimatedRevenue -
        a.estimatedRevenue,
    )

    const topProducts =
  buildTopProducts(
    allIntelligences,
  )

    const catalogExecutiveSummary =
  buildCatalogExecutiveSummary({
    averageScore: healthScore,

    totalProducts:
      catalogMetrics.totalProducts,

    healthyProducts:
      catalogMetrics.healthyProducts,

    attentionProducts:
      catalogMetrics.attentionProducts,

    criticalProducts:
      catalogMetrics.criticalProducts,

    totalAlerts:
      allIntelligences.flatMap(
        (item) => item.alerts,
      ).length,

    totalEstimatedImpact:
      opportunities.reduce(
        (total, item) =>
          total +
          item.estimatedRevenue,
        0,
      ),
  })

return {
  ...intelligence,

  healthScore,

  seoScore,

  catalogMetrics,

  executiveSummary:
  catalogExecutiveSummary,

  productHealth,

  profitSimulator,

  priceSuggestion,

  publicationTime,

  publicationTimeline,

  competitorAnalysis,

  marketInsights,

  topProducts,
  
  opportunities,

  salesForecast,

  generatedAt: new Date(),
}
}

export async function getProductIntelligence(
  userId: string,
  productId: string,
) {
  const intelligence =
    await getDashboardIntelligence(userId)

  const product =
  await prisma.product.findFirst({
    where: {
      id: productId,
      userId,
    },
  })

  return {
    product,

    healthScore:
      intelligence.healthScore,

    seoScore:
      intelligence.seoScore,

    recommendations:
  intelligence.recommendations,

    alerts:
  intelligence.alerts,

    summary:
      intelligence.executiveSummary,

    generatedAt:
      intelligence.generatedAt,
  }
}
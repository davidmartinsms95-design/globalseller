import { calculateScores } from './scoringEngine'
import { buildSeoAnalysis } from './seoEngine'
import { buildRecommendations } from './recommendationEngine'
import { buildAlerts } from './alertEngine'
import { buildOpportunities } from './opportunityEngine'
import { buildForecast } from './forecastEngine'
import { buildExecutiveSummary } from './executiveEngine'
import { buildExplanation } from './explanationEngine'

import type {
  ProductWithRelations,
} from '../shared/intelligence.types'

export interface IntelligenceEngineInput {
  product: ProductWithRelations

  userId?: string
}

export async function buildIntelligence({
  product,
  userId,
}: IntelligenceEngineInput) {
  const scores = calculateScores(product)

  const seo = buildSeoAnalysis(product, scores)

  const recommendations = buildRecommendations(
    product,
    scores,
    seo,
  )

  const alerts = buildAlerts(
    product,
    scores,
  )

  const opportunities = buildOpportunities(
    product,
    scores,
  )

  const forecast = await buildForecast({
    product,
    userId,
    scores,
  })

  const executiveSummary =
    buildExecutiveSummary({
      product,
      scores,
      seo,
      recommendations,
      alerts,
      opportunities,
      forecast,
    })

  const explanation =
    buildExplanation({
      product,
      scores,
      seo,
      recommendations,
    })

  return {
    product,

    scores,

    seo,

    recommendations,

    alerts,

    opportunities,

    forecast,

    executiveSummary,

    explanation,
  }
}

export default buildIntelligence
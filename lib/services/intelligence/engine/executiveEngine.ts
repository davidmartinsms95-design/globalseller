import { ScoreResult } from './scoringEngine'
import { SeoAnalysis } from './seoEngine'
import { Recommendation } from './recommendationEngine'
import { IntelligenceAlert } from './alertEngine'
import { Opportunity } from './opportunityEngine'
import { calculateProfitSimulation } from '../calculators/profitCalculator'

import type {
  ProductWithRelations,
  ForecastResult,
} from '../shared/intelligence.types'

export interface ExecutiveEngineInput {
  product: ProductWithRelations

  scores: ScoreResult

  seo: SeoAnalysis

  recommendations: Recommendation[]

  alerts: IntelligenceAlert[]

  opportunities: Opportunity[]

  forecast: ForecastResult
}

export interface ExecutiveSummary {
  overallStatus:
    | 'excellent'
    | 'good'
    | 'attention'
    | 'critical'

  score: number

  confidence: number

  headline: string

  summary: string

  strengths: string[]

  weaknesses: string[]

  nextActions: string[]

  estimatedImpact: number
}

export function buildExecutiveSummary({
  product,
  scores,
  seo,
  recommendations,
  alerts,
  opportunities,
}: ExecutiveEngineInput): ExecutiveSummary {
  let overallStatus: ExecutiveSummary['overallStatus']

  if (scores.finalScore >= 90) {
    overallStatus = 'excellent'
  } else if (scores.finalScore >= 75) {
    overallStatus = 'good'
  } else if (scores.finalScore >= 60) {
    overallStatus = 'attention'
  } else {
    overallStatus = 'critical'
  }

  const strengths: string[] = [
    ...seo.strengths,
  ]

  const weaknesses: string[] = [
    ...seo.warnings,
  ]

  const nextActions =
    recommendations
      .slice(0, 5)
      .map(
        (item) => item.action,
      )

  const estimatedImpact =
    opportunities.reduce(
      (total, item) =>
        total +
        item.estimatedRevenue,
      0,
    )

    const confidence = Math.round(
  Math.max(
    0,
    Math.min(
      100,
      (
        scores.healthScore * 0.30 +
        scores.seoScore * 0.25 +
        scores.financialScore * 0.20 +
        scores.competitionScore * 0.15 +
        Math.max(
          0,
          100 - recommendations.length * 5,
        ) *
          0.05 +
        Math.max(
          0,
          100 - alerts.length * 10,
        ) *
          0.05
      ),
    ),
  ),
)

    const marketplaceProduct =
  product.resellerProduct?.marketplaceProduct

const financial =
  marketplaceProduct
    ? calculateProfitSimulation({
        currentPrice: Number(product.price),
        costPrice: Number(
          marketplaceProduct.costPrice ?? 0,
        ),
        suggestedPrice: Number(
          marketplaceProduct.suggestedPrice ??
            product.price,
        ),
      })
    : null

  let headline =
    'Análise concluída.'

  let summary =
    'O produto apresenta desempenho estável.'

  switch (overallStatus) {
    case 'excellent':
      headline =
        'Produto em excelente estado.'

      summary =
        'O anúncio apresenta alta qualidade e boas oportunidades de crescimento.'

      break

    case 'good':
      headline =
        'Produto saudável.'

      summary =
        'Existem pequenos ajustes que podem aumentar a performance.'

      break

    case 'attention':
      headline =
        'Produto precisa de atenção.'

      summary =
        'Alguns indicadores estão abaixo do ideal.'

      break

    case 'critical':
      headline =
        'Produto crítico.'

      summary =
        'A IA identificou problemas importantes que devem ser corrigidos imediatamente.'

      break
  }

  if (
    alerts.some(
      (a) =>
        a.severity ===
        'critical',
    )
  ) {
    summary +=
      ' Existem alertas críticos ativos.'
  }

  if (financial) {
  summary += ` Margem de ${financial.margin}%`

  summary += `, ROI de ${financial.roi}%`

  summary += ` e lucro estimado de R$ ${financial.estimatedProfit.toFixed(2)}.`

  if (financial.estimatedProfit < 0) {
    summary +=
      ' O produto está operando com prejuízo.'
  } else if (financial.margin >= 35) {
    summary +=
      ' O produto apresenta excelente rentabilidade.'
  }
}

  return {
  overallStatus,

  score: scores.finalScore,

  confidence,

  headline,

  summary,

  strengths,

  weaknesses,

  nextActions,

  estimatedImpact,
}
}
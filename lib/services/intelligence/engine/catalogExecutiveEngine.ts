import { ExecutiveSummary } from './executiveEngine'

export interface CatalogExecutiveSummaryInput {
  averageScore: number

  totalProducts: number

  healthyProducts: number

  attentionProducts: number

  criticalProducts: number

  totalAlerts: number

  totalEstimatedImpact: number
}

export function buildCatalogExecutiveSummary({
  averageScore,
  totalProducts,
  healthyProducts,
  attentionProducts,
  criticalProducts,
  totalAlerts,
  totalEstimatedImpact,
}: CatalogExecutiveSummaryInput): ExecutiveSummary {
  let overallStatus: ExecutiveSummary['overallStatus']

  if (averageScore >= 90) {
    overallStatus = 'excellent'
  } else if (averageScore >= 75) {
    overallStatus = 'good'
  } else if (averageScore >= 60) {
    overallStatus = 'attention'
  } else {
    overallStatus = 'critical'
  }

  return {
    overallStatus,

    score: averageScore,

    confidence: Math.min(
      100,
      Math.round(
        averageScore -
          totalAlerts * 2,
      ),
    ),

    headline:
      'Resumo executivo do catálogo',

    summary:
      `${healthyProducts} produtos saudáveis, ` +
      `${attentionProducts} precisam de atenção e ` +
      `${criticalProducts} são críticos.`,

    strengths: [
      `${healthyProducts} produtos com bom desempenho.`,
    ],

    weaknesses: [
      `${criticalProducts} produtos precisam de ação imediata.`,
    ],

    nextActions: [
      'Priorizar produtos críticos.',
      'Corrigir alertas de maior impacto.',
      'Otimizar anúncios com menor score.',
    ],

    estimatedImpact:
      totalEstimatedImpact,
  }
}
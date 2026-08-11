import { ScoreResult } from './scoringEngine'

import type {
  ProductWithRelations,
} from '../shared/intelligence.types'

export type OpportunityPriority =
  | 'high'
  | 'medium'
  | 'low'

export interface Opportunity {
  id: string

  title: string

  description: string

  priority: OpportunityPriority

  estimatedRevenue: number

  estimatedGrowth: number

  action: string
}

const priorityWeight: Record<
  OpportunityPriority,
  number
> = {
  high: 3,
  medium: 2,
  low: 1,
}

export function buildOpportunities(
  product: ProductWithRelations,
  scores: ScoreResult,
): Opportunity[] {
  const opportunities: Opportunity[] = []

  if (
    product.stock > 10 &&
    scores.seoScore >= 80
  ) {
    opportunities.push({
      id: `increase-ads-${product.id}`,

      title: 'Investir em anúncios',

      description:
        'O produto possui bom SEO e estoque suficiente para suportar aumento de vendas.',

      priority: 'high',

      estimatedRevenue: 2500,

      estimatedGrowth: 35,

      action:
        'Considere aumentar o investimento em campanhas patrocinadas.',
    })
  }

  if (scores.priceScore >= 90) {
    opportunities.push({
      id: `premium-price-${product.id}`,

      title: 'Preço competitivo',

      description:
        'Existe espaço para aumentar a margem mantendo competitividade.',

      priority: 'medium',

      estimatedRevenue: 900,

      estimatedGrowth: 12,

      action:
        'Avalie um pequeno reajuste de preço.',
    })
  }

  if (
    product.description &&
    product.description.length > 400
  ) {
    opportunities.push({
      id: `seo-advantage-${product.id}`,

      title: 'SEO acima da média',

      description:
        'Seu anúncio já possui boa otimização para os marketplaces.',

      priority: 'medium',

      estimatedRevenue: 700,

      estimatedGrowth: 8,

      action:
        'Mantenha a estratégia atual e monitore a concorrência.',
    })
  }

  if (
    product.image &&
    product.mlCategoryId &&
    scores.finalScore >= 90
  ) {
    opportunities.push({
      id: `featured-product-${product.id}`,

      title: 'Produto pronto para destaque',

      description:
        'Este anúncio apresenta excelente qualidade geral.',

      priority: 'high',

      estimatedRevenue: 3500,

      estimatedGrowth: 45,

      action:
        'Utilize campanhas premium e destaque o anúncio.',
    })
  }

  if (opportunities.length === 0) {
    opportunities.push({
      id: `general-improvement-${product.id}`,

      title: 'Melhorar qualidade geral',

      description:
        'Após elevar o Health Score surgirão novas oportunidades de crescimento.',

      priority: 'low',

      estimatedRevenue: 300,

      estimatedGrowth: 5,

      action:
        'Priorize primeiro as recomendações da IA.',
    })
  }

  return opportunities.sort((a, b) => {
    const priorityDifference =
      priorityWeight[b.priority] -
      priorityWeight[a.priority]

    if (priorityDifference !== 0) {
      return priorityDifference
    }

    return (
      b.estimatedRevenue -
      a.estimatedRevenue
    )
  })
}
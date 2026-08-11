import { ScoreResult } from './scoringEngine'
import { SeoAnalysis } from './seoEngine'
import { Recommendation } from './recommendationEngine'

import type {
  ProductWithRelations,
} from '../shared/intelligence.types'

export interface ExplanationInput {
  product: ProductWithRelations

  scores: ScoreResult

  seo: SeoAnalysis

  recommendations: Recommendation[]
}

export interface IntelligenceExplanation {
  title: string

  summary: string

  analyzedItems: string[]

  positivePoints: string[]

  negativePoints: string[]

  conclusion: string
}

export function buildExplanation({
  product,
  scores,
  seo,
  recommendations,
}: ExplanationInput): IntelligenceExplanation {
  const analyzedItems = [
    'Título',
    'Descrição',
    'Imagem',
    'Categoria',
    'Preço',
    'Estoque',
    'SEO',
    'Health Score',
  ]

  const positivePoints: string[] = []

  const negativePoints: string[] = []

  if (scores.healthScore >= 80) {
    positivePoints.push(
      'O anúncio apresenta boa qualidade geral.',
    )
  } else {
    negativePoints.push(
      'Health Score abaixo do recomendado.',
    )
  }

  if (scores.seoScore >= 80) {
    positivePoints.push(
      'SEO acima da média.',
    )
  } else {
    negativePoints.push(
      'SEO pode ser melhorado.',
    )
  }

  if (product.image) {
    positivePoints.push(
      'Produto possui imagem.',
    )
  } else {
    negativePoints.push(
      'Produto não possui imagem.',
    )
  }

  if (
    product.description &&
    product.description.length >= 200
  ) {
    positivePoints.push(
      'Descrição completa.',
    )
  } else {
    negativePoints.push(
      'Descrição insuficiente.',
    )
  }

  if (
    Number(product.stock ?? 0) <= 0
  ) {
    negativePoints.push(
      'Estoque zerado.',
    )
  }

  const summary =
    recommendations.length === 0
      ? 'Nenhum problema relevante foi identificado durante a análise.'
      : `A IA identificou ${recommendations.length} oportunidade(s) de melhoria.`

  let conclusion =
    'O produto apresenta bom potencial de desempenho.'

  if (scores.finalScore >= 90) {
    conclusion =
      'Produto altamente otimizado e preparado para competir nos marketplaces.'
  } else if (scores.finalScore >= 75) {
    conclusion =
      'O produto possui boa qualidade, mas ainda existem melhorias que podem aumentar a conversão.'
  } else if (scores.finalScore >= 60) {
    conclusion =
      'Alguns fatores estão reduzindo o desempenho do anúncio.'
  } else {
    conclusion =
      'O anúncio necessita de melhorias antes de alcançar boa performance.'
  }

  return {
    title: 'Explicação da Inteligência Artificial',

    summary,

    analyzedItems,

    positivePoints,

    negativePoints,

    conclusion,
  }
}
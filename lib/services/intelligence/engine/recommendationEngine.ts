import { ScoreResult } from './scoringEngine'
import { SeoAnalysis } from './seoEngine'
import { calculateProfitSimulation } from '../calculators/profitCalculator'

import type {
  ProductWithRelations,
} from '../shared/intelligence.types'
export type RecommendationPriority =
  | 'critical'
  | 'high'
  | 'medium'
  | 'low'

export interface Recommendation {
  id: string

  title: string

  description: string

  priority: RecommendationPriority

  impact: number

  estimatedGain: number

  estimatedTime: string

  category: string

  action: string
}

export function buildRecommendations(
  product: ProductWithRelations,
  scores: ScoreResult,
  seo: SeoAnalysis,
): Recommendation[] {
  const recommendations: Recommendation[] = []

  if (scores.stockScore === 0) {
    recommendations.push({
  id: 'stock-zero',

  title: 'Produto sem estoque',

  description:
    'O anúncio está indisponível para novas vendas.',

  priority: 'critical',

  impact: 100,

  estimatedGain: 1500,

  estimatedTime: '15 minutos',

  category: 'Estoque',

  action:
    'Repor o estoque imediatamente.',
})
  }

  if (scores.seoScore < 70) {
    recommendations.push({
  id: 'seo',

  title: 'Melhorar SEO',

  description:
    'O anúncio possui baixa otimização para buscas.',

  priority: 'high',

  impact: 85,

  estimatedGain: 900,

  estimatedTime: '20 minutos',

  category: 'SEO',

  action:
    'Aumente o título, descrição e utilize palavras-chave.',
})
}

  if (!product.image) {
    recommendations.push({
  id: 'image',

  title: 'Adicionar imagens',

  description:
    'Produtos com imagens possuem maior conversão.',

  priority: 'high',

  impact: 80,

  estimatedGain: 700,

  estimatedTime: '10 minutos',

  category: 'Imagens',

  action:
    'Envie imagens em alta resolução.',
})
}

  if (!product.description) {
    recommendations.push({
  id: 'description',

  title: 'Adicionar descrição',

  description:
    'A descrição ajuda na conversão e indexação.',

  priority: 'medium',

  impact: 60,

  estimatedGain: 500,

  estimatedTime: '15 minutos',

  category: 'Conteúdo',

  action:
    'Escreva uma descrição completa.',
})
  }

  if (!product.mlCategoryId) {
  recommendations.push({
    id: 'category',

    title: 'Definir categoria',

    description:
      'Produtos categorizados aparecem em mais pesquisas.',

    priority: 'medium',

    impact: 50,

    estimatedGain: 350,

    estimatedTime: '5 minutos',

    category: 'Marketplace',

    action:
      'Selecione a categoria correta.',
  })
}

  if (
    product.title &&
    product.title.length < 45
  ) {
    recommendations.push({
  id: 'title',

  title: 'Melhorar título',

  description:
    'Seu título está menor do que o recomendado.',

  priority: 'medium',

  impact: 55,

  estimatedGain: 420,

  estimatedTime: '10 minutos',

  category: 'SEO',

  action:
    'Utilize entre 50 e 70 caracteres.',
})
  }

  if (seo.keywords.length < 3) {
    recommendations.push({
  id: 'keywords',

  title: 'Adicionar palavras-chave',

  description:
    'Poucas palavras relevantes foram identificadas.',

  priority: 'low',

  impact: 30,

  estimatedGain: 180,

  estimatedTime: '15 minutos',

  category: 'SEO',

  action:
    'Utilize termos pesquisados pelos compradores.',
})
  }

  if (!product.brand) {
  recommendations.push({
  id: 'brand',

  title: 'Informar marca',

  description:
    'Produtos com marca definida possuem melhor indexação nos marketplaces.',

  priority: 'medium',

  impact: 55,

  estimatedGain: 250,

  estimatedTime: '3 minutos',

  category: 'Cadastro',

  action:
    'Informe a marca oficial do produto.',
})
}

if (!product.model) {
  recommendations.push({
  id: 'model',

  title: 'Informar modelo',

  description:
    'O modelo facilita as buscas e melhora a conversão.',

  priority: 'medium',

  impact: 50,

  estimatedGain: 220,

  estimatedTime: '3 minutos',

  category: 'Cadastro',

  action:
    'Preencha o modelo do produto.',
})
}

if (!product.shortDescription) {
  recommendations.push({
  id: 'short-description',

  title: 'Adicionar descrição curta',

  description:
    'Uma descrição curta melhora a apresentação do anúncio.',

  priority: 'low',

  impact: 35,

  estimatedGain: 150,

  estimatedTime: '10 minutos',

  category: 'Conteúdo',

  action:
    'Cadastre um resumo objetivo do produto.',
})
}

if (!product.sku) {
  recommendations.push({
  id: 'sku',

  title: 'Cadastrar SKU',

  description:
    'O SKU facilita a gestão de estoque e integrações.',

  priority: 'low',

  impact: 20,

  estimatedGain: 80,

  estimatedTime: '2 minutos',

  category: 'Cadastro',

  action:
    'Defina um SKU interno.',
})
}

if (!product.ean) {
  recommendations.push({
  id: 'ean',

  title: 'Cadastrar EAN',

  description:
    'O código EAN melhora a identificação do produto em diversos marketplaces.',

  priority: 'low',

  impact: 30,

  estimatedGain: 120,

  estimatedTime: '2 minutos',

  category: 'Cadastro',

  action:
    'Informe o código de barras (EAN), quando disponível.',
})
}

if (
  !product.weight ||
  !product.height ||
  !product.width ||
  !product.length
) {
  recommendations.push({
  id: 'dimensions',

  title: 'Completar dimensões',

  description:
    'Peso e dimensões são utilizados para cálculo de frete.',

  priority: 'medium',

  impact: 65,

  estimatedGain: 320,

  estimatedTime: '8 minutos',

  category: 'Logística',

  action:
    'Informe peso, altura, largura e comprimento.',
})
}

  const marketplaceProduct =
  product.resellerProduct?.marketplaceProduct

if (marketplaceProduct) {
  const simulation =
    calculateProfitSimulation({
      currentPrice: Number(product.price),
      costPrice: Number(
        marketplaceProduct.costPrice ?? 0,
      ),
      suggestedPrice: Number(
        marketplaceProduct.suggestedPrice ??
          product.price,
      ),
    })

  if (simulation.estimatedProfit < 0) {
    recommendations.push({
  id: 'negative-profit',

  title: 'Produto operando no prejuízo',

  description:
    'O lucro estimado é negativo.',

  priority: 'critical',

  impact: 100,

  estimatedGain:
    Math.abs(simulation.estimatedProfit),

  estimatedTime: '20 minutos',

  category: 'Preço',

  action:
    'Reavalie imediatamente preço de venda ou custo de aquisição.',
})
  }

  if (simulation.roi < 30) {
    recommendations.push({
  id: 'low-roi',

  title: 'ROI abaixo do ideal',

  description:
    `ROI atual de ${simulation.roi}%.`,

  priority: 'medium',

  impact: 70,

  estimatedGain: 600,

  estimatedTime: '15 minutos',

  category: 'Financeiro',

  action:
    'Busque aumentar a margem líquida para melhorar o retorno.',
})
  }

  if (
    simulation.margin >= 35 &&
    simulation.roi >= 80
  ) {
    recommendations.push({
  id: 'high-profit',

  title: 'Produto altamente lucrativo',

  description:
    'Este produto possui excelente margem e retorno.',

  priority: 'low',

  impact: 40,

  estimatedGain:
    simulation.estimatedProfit,

  estimatedTime: '5 minutos',

  category: 'Marketing',

  action:
    'Considere investir mais em divulgação e campanhas patrocinadas.',
})
  }
}

  const priorityWeight = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
}

return recommendations.sort((a, b) => {
  const priorityDifference =
    priorityWeight[b.priority] -
    priorityWeight[a.priority]

  if (priorityDifference !== 0) {
    return priorityDifference
  }

  return b.impact - a.impact
})
}
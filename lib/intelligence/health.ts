import {
  ProductAnalysis,
  ProductHealthResult,
} from './types'

export interface ProductHealthInput {
  title: string
  description?: string | null
  image?: string | null
  stock: number
  category?: string | null
  status?: string | null
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, value))
}

function getLevel(score: number): ProductHealthResult['level'] {
  if (score >= 90) return 'excellent'
  if (score >= 75) return 'good'
  if (score >= 50) return 'warning'
  return 'critical'
}

export function calculateHealthScore(
  product: ProductHealthInput,
): ProductHealthResult {
  let score = 0

  const strengths: string[] = []
  const warnings: string[] = []
  const recommendations: string[] = []

  let title = 0
  let description = 0
  let image = 0
  let stock = 0
  let category = 0
  let status = 0

  // -----------------------
  // Título
  // -----------------------

  const titleLength = product.title.trim().length

  if (titleLength >= 60) {
    title = 20
    strengths.push('Título completo.')
  } else if (titleLength >= 35) {
    title = 15
    recommendations.push(
      'Aumente o título para melhorar a relevância.',
    )
  } else if (titleLength > 0) {
    title = 8
    warnings.push('Título muito curto.')
    recommendations.push(
      'Utilize mais palavras-chave no título.',
    )
  } else {
    warnings.push('Produto sem título.')
  }

  score += title

  // -----------------------
  // Descrição
  // -----------------------

  const descriptionLength =
    product.description?.trim().length ?? 0

  if (descriptionLength >= 500) {
    description = 20
    strengths.push('Descrição detalhada.')
  } else if (descriptionLength >= 200) {
    description = 15
    recommendations.push(
      'Amplie a descrição com mais informações.',
    )
  } else if (descriptionLength > 0) {
    description = 8
    warnings.push('Descrição muito pequena.')
  } else {
    warnings.push('Produto sem descrição.')
  }

  score += description

  // -----------------------
  // Imagem
  // -----------------------

  if (product.image) {
    image = 15
    strengths.push('Imagem cadastrada.')
  } else {
    warnings.push('Produto sem imagem.')
    recommendations.push(
      'Adicione uma imagem de alta qualidade.',
    )
  }

  score += image

  // -----------------------
  // Estoque
  // -----------------------

  if (product.stock >= 20) {
    stock = 15
    strengths.push('Bom nível de estoque.')
  } else if (product.stock > 0) {
    stock = 10
    recommendations.push(
      'Considere aumentar o estoque.',
    )
  } else {
    warnings.push('Produto sem estoque.')
  }

  score += stock

  // -----------------------
  // Categoria
  // -----------------------

  if (
    product.category &&
    product.category.trim() !== ''
  ) {
    category = 15
  } else {
    warnings.push('Categoria não informada.')
  }

  score += category

  // -----------------------
  // Status
  // -----------------------

  if (
    product.status &&
    product.status.toLowerCase() === 'active'
  ) {
    status = 15
    strengths.push('Produto ativo.')
  } else if (
    product.status &&
    product.status.toLowerCase() === 'paused'
  ) {
    status = 5
    warnings.push('Produto pausado.')
  } else {
    status = 8
  }

  score += status

  score = clamp(score)

  return {
    score,

    level: getLevel(score),

    title,

    description,

    image,

    stock,

    category,

    status,

    strengths,

    warnings,

    recommendations,
  }
}

export function buildProductAnalysis(
  product: ProductHealthInput,
): Pick<ProductAnalysis, 'health'> {
  return {
    health: calculateHealthScore(product),
  }
}
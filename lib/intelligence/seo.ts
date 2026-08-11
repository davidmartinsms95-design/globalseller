import { SeoScoreResult } from './types'

export interface SeoInput {
  title: string
  description?: string | null
  category?: string | null
  image?: string | null
}

const STOP_WORDS = [
  'de',
  'da',
  'do',
  'das',
  'dos',
  'para',
  'por',
  'com',
  'sem',
  'em',
  'no',
  'na',
  'e',
  'ou',
  'a',
  'o',
  'os',
  'as',
]

function normalize(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function extractKeywords(title: string): string[] {
  const words = normalize(title)
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean)

  const unique = new Set<string>()

  words.forEach((word) => {
    if (word.length < 3) return
    if (STOP_WORDS.includes(word)) return

    unique.add(word)
  })

  return [...unique]
}

export function calculateSeoScore(
  product: SeoInput,
): SeoScoreResult {
  let score = 0

  const strengths: string[] = []
  const improvements: string[] = []

  const titleLength = product.title.trim().length
  const descriptionLength =
    product.description?.trim().length ?? 0

  const hasCategory = Boolean(
    product.category?.trim(),
  )

  const hasImage = Boolean(product.image)

  // --------------------
  // Título
  // --------------------

  if (titleLength >= 60) {
    score += 30
    strengths.push('Título otimizado.')
  } else if (titleLength >= 40) {
    score += 22
    improvements.push(
      'Aumente o título para aproveitar melhor o SEO.',
    )
  } else if (titleLength >= 20) {
    score += 14
    improvements.push(
      'Utilize mais palavras-chave no título.',
    )
  } else {
    score += 5
    improvements.push('Título muito curto.')
  }

  // --------------------
  // Descrição
  // --------------------

  if (descriptionLength >= 1000) {
    score += 30
    strengths.push('Descrição completa.')
  } else if (descriptionLength >= 500) {
    score += 22
    improvements.push(
      'Amplie a descrição para melhorar indexação.',
    )
  } else if (descriptionLength >= 150) {
    score += 15
  } else {
    score += 5
    improvements.push(
      'Descrição muito pequena para SEO.',
    )
  }

  // --------------------
  // Categoria
  // --------------------

  if (hasCategory) {
    score += 20
  } else {
    improvements.push(
      'Informe corretamente a categoria.',
    )
  }

  // --------------------
  // Imagem
  // --------------------

  if (hasImage) {
    score += 20
  } else {
    improvements.push(
      'Adicione uma imagem principal de alta qualidade.',
    )
  }

  if (score > 100) {
    score = 100
  }

  return {
    score,

    titleLength,

    descriptionLength,

    hasCategory,

    hasImage,

    keywords: extractKeywords(product.title),

    strengths,

    improvements,
  }
}

export function getSeoLevel(score: number) {
  if (score >= 90) {
    return 'Excelente'
  }

  if (score >= 75) {
    return 'Muito Bom'
  }

  if (score >= 60) {
    return 'Bom'
  }

  if (score >= 40) {
    return 'Regular'
  }

  return 'Ruim'
}

export function getSeoColor(score: number) {
  if (score >= 90) {
    return 'emerald'
  }

  if (score >= 75) {
    return 'green'
  }

  if (score >= 60) {
    return 'yellow'
  }

  if (score >= 40) {
    return 'orange'
  }

  return 'red'
}
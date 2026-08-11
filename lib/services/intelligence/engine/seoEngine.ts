import { ScoreResult } from './scoringEngine'

export interface SeoAnalysis {
  score: number

  level: 'excellent' | 'good' | 'regular' | 'poor'

  strengths: string[]

  warnings: string[]

  suggestions: string[]

  keywords: string[]
}

function extractKeywords(
  title?: string,
): string[] {
  if (!title) return []

  return title
    .toLowerCase()
    .replace(/[^\wÀ-ÿ\s]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .filter(
      (word, index, array) =>
        array.indexOf(word) === index,
    )
}

export function buildSeoAnalysis(
  product: any,
  scores: ScoreResult,
): SeoAnalysis {
  const strengths: string[] = []

  const warnings: string[] = []

  const suggestions: string[] = []

  if (
    product.title &&
    product.title.length >= 50
  ) {
    strengths.push(
      'Título com tamanho adequado.',
    )
  } else {
    warnings.push(
      'Título muito curto.',
    )

    suggestions.push(
      'Utilize títulos entre 50 e 70 caracteres.',
    )
  }

  if (
    product.description &&
    product.description.length >= 300
  ) {
    strengths.push(
      'Descrição bem detalhada.',
    )
  } else {
    warnings.push(
      'Descrição muito pequena.',
    )

    suggestions.push(
      'Crie uma descrição mais completa com benefícios e características.',
    )
  }

  if (product.image) {
    strengths.push(
      'Produto possui imagem.',
    )
  } else {
    warnings.push(
      'Produto sem imagem.',
    )

    suggestions.push(
      'Adicione imagens em alta resolução.',
    )
  }

  if (product.brand) {
  strengths.push(
    'Marca informada.',
  )
} else {
  warnings.push(
    'Marca não informada.',
  )

  suggestions.push(
    'Informe a marca do produto.',
  )
}

if (product.model) {
  strengths.push(
    'Modelo informado.',
  )
} else {
  warnings.push(
    'Modelo não informado.',
  )

  suggestions.push(
    'Informe o modelo do produto.',
  )
}

if (
  product.shortDescription &&
  product.shortDescription.length >= 80
) {
  strengths.push(
    'Descrição curta bem elaborada.',
  )
} else {
  warnings.push(
    'Descrição curta muito pequena.',
  )

  suggestions.push(
    'Escreva uma descrição curta mais completa.',
  )
}

if (product.ean) {
  strengths.push(
    'EAN cadastrado.',
  )
}

if (product.sku) {
  strengths.push(
    'SKU definido.',
  )
}

  if (product.mlCategoryId) {
    strengths.push(
      'Categoria configurada.',
    )
  } else {
    warnings.push(
      'Categoria não definida.',
    )

    suggestions.push(
      'Defina corretamente a categoria do marketplace.',
    )
  }

  let level: SeoAnalysis['level']

  if (scores.seoScore >= 90) {
    level = 'excellent'
  } else if (scores.seoScore >= 75) {
    level = 'good'
  } else if (scores.seoScore >= 60) {
    level = 'regular'
  } else {
    level = 'poor'
  }

  return {
    score: scores.seoScore,

    level,

    strengths,

    warnings,

    suggestions,

    keywords: extractKeywords(
      product.title,
    ),
  }
}
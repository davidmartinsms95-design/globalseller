import { calculateHealthScore } from '@/lib/intelligence/health'
import { calculateSeoScore } from '@/lib/intelligence/seo'
import { generateRecommendations } from '@/lib/intelligence/recommendations'

interface ProductInput {
  title?: string
  description?: string | null
  image?: string | null
  price?: number
  stock?: number
  mlCategoryId?: string | null
  status?: string | null
}

export interface ProductDiagnosisResult {
  healthScore: number
  seoScore: number
  suggestions: string[]
  strengths: string[]
  warnings: string[]
}

export function getProductDiagnosis(
  product: ProductInput,
): ProductDiagnosisResult {
  const health = calculateHealthScore({
    title: product.title ?? '',
    description: product.description,
    image: product.image,
    stock: product.stock ?? 0,
    category: product.mlCategoryId,
    status: product.status ?? 'active',
  })

  const seo = calculateSeoScore({
    title: product.title ?? '',
    description: product.description,
    category: product.mlCategoryId,
    image: product.image,
  })

  const recommendations =
    generateRecommendations({
      health,
      seo,
    })

  return {
    healthScore: health.score,
    seoScore: seo.score,
    strengths: health.strengths,
    warnings: health.warnings,
    suggestions: recommendations.map(
      (item) => item.description,
    ),
  }
}
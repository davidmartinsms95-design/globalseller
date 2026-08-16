import { calculateHealthScore } from '@/lib/intelligence/health'
import { calculateSeoScore } from '@/lib/intelligence/seo'
import { generateRecommendations } from '@/lib/intelligence/recommendations'

export interface ProductScoreResult {
  score: number
  healthScore: number
  seoScore: number
  suggestions: string[]
}

interface ProductInput {
  title?: string
  description?: string | null
  image?: string | null
  price?: number
  stock?: number
  mlCategoryId?: string | null
  marketplaceId?: string | null
  status?: string | null
}

export function calculateProductScore(
  product: ProductInput,
): ProductScoreResult {
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

  const score = Math.round(
    health.score * 0.6 +
      seo.score * 0.4,
  )

  return {
    score,
    healthScore: health.score,
    seoScore: seo.score,
    suggestions: recommendations.map(
      (item) => item.description,
    ),
  }
}
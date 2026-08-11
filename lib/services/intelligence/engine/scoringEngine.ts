import { calculateProfitSimulation } from '../calculators/profitCalculator'
import type {
  ProductWithRelations,
} from '../shared/intelligence.types'

export interface ScoreResult {
  healthScore: number
  seoScore: number
  stockScore: number
  priceScore: number
  financialScore: number
  competitionScore: number
  finalScore: number
}

import { clamp } from '../shared/intelligence.utils'

export function calculateScores(
  product: ProductWithRelations,
): ScoreResult {
  let healthScore = 100
  let seoScore = 100
  let stockScore = 100
  let priceScore = 100
  let financialScore = 100
  let competitionScore = 100

  // ---------- HEALTH ----------

if (!product.title || product.title.length < 20) {
  healthScore -= 20
}

if (
  !product.description ||
  product.description.length < 120
) {
  healthScore -= 20
}

if (!product.image) {
  healthScore -= 20
}

if (!product.mlCategoryId) {
  healthScore -= 10
}

if (!product.marketplaceId) {
  healthScore -= 10
}

if (!product.permalink) {
  healthScore -= 5
}

if (product.status === 'paused') {
  healthScore -= 15
}

if (!product.brand) {
  healthScore -= 5
}

if (!product.model) {
  healthScore -= 5
}

if (!product.shortDescription) {
  healthScore -= 5
}

if (!product.sku) {
  healthScore -= 3
}

if (!product.ean) {
  healthScore -= 3
}

if (!product.weight || product.weight <= 0) {
  healthScore -= 2
}

if (!product.height || product.height <= 0) {
  healthScore -= 2
}

if (!product.width || product.width <= 0) {
  healthScore -= 2
}

if (!product.length || product.length <= 0) {
  healthScore -= 2
}

if (!product.costPrice || product.costPrice <= 0) {
  healthScore -= 6
}

healthScore = clamp(healthScore)

  // ---------- SEO ----------

  if (!product.title) {
    seoScore -= 40
  } else {
    if (product.title.length < 40) seoScore -= 20

    if (product.title.length > 80) seoScore -= 10
  }

  if (
    !product.description ||
    product.description.length < 200
  ) {
    seoScore -= 20
  }

  // ---------- ESTOQUE ----------

  const stock = Number(product.stock ?? 0)

  if (stock <= 0) {
  stockScore = 0
} else if (stock < 5) {
  stockScore = 30
} else if (stock < 10) {
  stockScore = 60
} else if (stock < 20) {
  stockScore = 80
} else {
  stockScore = 100
}

  // ---------- PREÇO ----------

  if (!product.price || product.price <= 0) {
    priceScore = 30
  }

  // ---------- FINANCEIRO ----------

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

  if (simulation.margin >= 35) {
    financialScore = 100
  } else if (simulation.margin >= 25) {
    financialScore = 85
  } else if (simulation.margin >= 15) {
    financialScore = 70
  } else if (simulation.margin >= 5) {
    financialScore = 50
  } else {
    financialScore = 20
  }

  if (simulation.roi >= 100) {
    financialScore += 5
  }

  financialScore = clamp(financialScore)
}

  // ---------- CONCORRÊNCIA ----------

competitionScore = 100

const suggestedPrice =
  product.resellerProduct
    ?.marketplaceProduct
    ?.suggestedPrice

if (
  suggestedPrice &&
  suggestedPrice > 0
) {
  const difference =
    Math.abs(
      product.price - suggestedPrice,
    )

  const percentage =
    (difference / suggestedPrice) * 100

  competitionScore -= Math.min(
    40,
    percentage,
  )
}

competitionScore = clamp(
  competitionScore,
)

  const finalScore = Math.round(
    (
      healthScore +
      seoScore +
      stockScore +
      priceScore +
      financialScore +
      competitionScore
    ) / 6,
  )

  return {
    healthScore,

    seoScore,

    stockScore,

    priceScore,

    financialScore,

    competitionScore,

    finalScore,
  }
}
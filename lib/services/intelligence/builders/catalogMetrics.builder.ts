export interface CatalogMetrics {
  totalProducts: number
  healthyProducts: number
  attentionProducts: number
  criticalProducts: number
}

export function buildCatalogMetrics(
  scores: number[],
): CatalogMetrics {
  return {
    totalProducts: scores.length,

    healthyProducts:
      scores.filter(
        score => score >= 80,
      ).length,

    attentionProducts:
      scores.filter(
        score =>
          score >= 60 &&
          score < 80,
      ).length,

    criticalProducts:
      scores.filter(
        score => score < 60,
      ).length,
  }
}
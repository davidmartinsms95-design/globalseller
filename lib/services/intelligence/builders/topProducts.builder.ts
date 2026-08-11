export interface TopProductInput {
  product: {
    id: string
    title: string
  }

  scores: {
    finalScore: number
    healthScore: number
    seoScore: number
    financialScore: number
    competitionScore: number
  }
}

export function buildTopProducts(
  intelligences: TopProductInput[],
) {
  return [...intelligences]
    .sort(
      (a, b) =>
        b.scores.finalScore -
        a.scores.finalScore,
    )
    .slice(0, 10)
    .map(item => ({
      id: item.product.id,

      name: item.product.title,

      score: item.scores.finalScore,

      healthScore:
        item.scores.healthScore,

      seoScore:
        item.scores.seoScore,

      financialScore:
        item.scores.financialScore,

      competitionScore:
        item.scores.competitionScore,
    }))
}
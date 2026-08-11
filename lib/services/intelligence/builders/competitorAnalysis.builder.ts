export interface CompetitorAnalysisInput {
  productId: string

  analyses: {
    productId: string
    currentPrice: number
    competitiveness: number
  }[]
}

export function buildCompetitorAnalysis({
  productId,
  analyses,
}: CompetitorAnalysisInput) {
  const currentAnalysis =
    analyses.find(
      analysis =>
        analysis.productId === productId,
    ) ?? analyses[0]

  const prices = analyses.map(
    analysis => analysis.currentPrice,
  )

  const averagePrice =
    prices.length > 0
      ? Number(
          (
            prices.reduce(
              (sum, price) => sum + price,
              0,
            ) / prices.length
          ).toFixed(2),
        )
      : 0

  return {
    currentPrice:
      currentAnalysis?.currentPrice ?? 0,

    lowestPrice:
      prices.length > 0
        ? Math.min(...prices)
        : 0,

    averagePrice,

    highestPrice:
      prices.length > 0
        ? Math.max(...prices)
        : 0,

    ranking:
      analyses
        .slice()
        .sort(
          (a, b) =>
            b.competitiveness -
            a.competitiveness,
        )
        .findIndex(
          item =>
            item.productId === productId,
        ) + 1,

    competitors:
      analyses.length,
  }
}
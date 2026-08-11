interface PriceSuggestionInput {
  costPrice: number
  currentPrice: number
  supplierSuggestedPrice: number
}

export interface PriceSuggestionResult {
  costPrice: number
  currentPrice: number
  suggestedPrice: number
  minimumPrice: number
  premiumPrice: number
}

export function calculatePriceSuggestion({
  costPrice,
  currentPrice,
  supplierSuggestedPrice,
}: PriceSuggestionInput): PriceSuggestionResult {
  const minimumPrice =
    Number((costPrice * 1.1).toFixed(2))

  const suggestedPrice =
    Math.max(
      supplierSuggestedPrice,
      Number((costPrice * 1.25).toFixed(2)),
    )

  const premiumPrice =
    Number((suggestedPrice * 1.15).toFixed(2))

  return {
    costPrice,

    currentPrice,

    suggestedPrice,

    minimumPrice,

    premiumPrice,
  }
}
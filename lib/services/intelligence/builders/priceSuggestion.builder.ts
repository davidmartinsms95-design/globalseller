import {
  calculatePriceSuggestion,
} from '../pricing/priceSuggestion'

export function buildPriceSuggestion(
  costPrice: number,
  currentPrice: number,
  supplierSuggestedPrice: number,
) {
  return calculatePriceSuggestion({
    costPrice,
    currentPrice,
    supplierSuggestedPrice,
  })
}
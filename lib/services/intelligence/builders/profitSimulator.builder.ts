import {
  calculateProfitSimulation,
} from '../calculators/profitCalculator'

export function buildProfitSimulator(
  currentPrice: number,
  costPrice: number,
  suggestedPrice: number,
) {
  return calculateProfitSimulation({
    currentPrice,
    costPrice,
    suggestedPrice,
  })
}
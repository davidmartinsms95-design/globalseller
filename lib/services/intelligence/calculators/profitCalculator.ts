interface ProfitCalculatorInput {
  currentPrice: number
  costPrice: number
  suggestedPrice?: number
  marketplaceFee?: number
  shippingCost?: number
}

export interface ProfitSimulationResult {
  costPrice: number
  currentPrice: number
  suggestedPrice: number

  marketplaceFee: number
  shippingCost: number

  totalCosts: number

  grossProfit: number

  estimatedProfit: number

  margin: number

  roi: number

  markup: number

  costPercentage: number

  profitPercentage: number
}

export function calculateProfitSimulation({
  currentPrice,
  costPrice,
  suggestedPrice,
  marketplaceFee = 0,
  shippingCost = 0,
}: ProfitCalculatorInput): ProfitSimulationResult {
  const totalCosts =
    costPrice +
    marketplaceFee +
    shippingCost

  const grossProfit =
    currentPrice - costPrice

  const estimatedProfit =
    currentPrice - totalCosts

  const margin =
    currentPrice > 0
      ? Number(
          (
            (estimatedProfit / currentPrice) *
            100
          ).toFixed(2),
        )
      : 0

  const roi =
    costPrice > 0
      ? Number(
          (
            (estimatedProfit / costPrice) *
            100
          ).toFixed(2),
        )
      : 0

  const markup =
    costPrice > 0
      ? Number(
          (
            (currentPrice / costPrice - 1) *
            100
          ).toFixed(2),
        )
      : 0

  const costPercentage =
    currentPrice > 0
      ? Number(
          (
            (totalCosts / currentPrice) *
            100
          ).toFixed(2),
        )
      : 0

  const profitPercentage =
    currentPrice > 0
      ? Number(
          (
            (estimatedProfit / currentPrice) *
            100
          ).toFixed(2),
        )
      : 0

  return {
    costPrice,

    currentPrice,

    suggestedPrice:
      suggestedPrice ?? currentPrice,

    marketplaceFee,

    shippingCost,

    totalCosts,

    grossProfit,

    estimatedProfit:
      Number(estimatedProfit.toFixed(2)),

    margin,

    roi,

    markup,

    costPercentage,

    profitPercentage,
  }
}
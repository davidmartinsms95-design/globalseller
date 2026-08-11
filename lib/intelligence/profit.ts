import {
  ProfitSimulationInput,
  ProfitSimulationResult,
} from './types'

const DEFAULT_MARKETPLACE_FEE = 16
const DEFAULT_TAX_PERCENT = 0
const DEFAULT_SHIPPING = 0
const DEFAULT_EXTRA_COSTS = 0

function round(value: number): number {
  return Math.round(value * 100) / 100
}

function percentage(value: number, percent: number): number {
  return (value * percent) / 100
}

export function simulateProfit(
  input: ProfitSimulationInput,
): ProfitSimulationResult {
  const salePrice = Math.max(0, input.salePrice)
  const costPrice = Math.max(0, input.costPrice)

  const marketplaceFeePercent =
    input.marketplaceFee ?? DEFAULT_MARKETPLACE_FEE

  const shippingCost =
    input.shippingCost ?? DEFAULT_SHIPPING

  const taxesPercent =
    input.taxes ?? DEFAULT_TAX_PERCENT

  const extraCosts =
    input.extraCosts ?? DEFAULT_EXTRA_COSTS

  const marketplaceFee = percentage(
    salePrice,
    marketplaceFeePercent,
  )

  const taxes = percentage(
    salePrice,
    taxesPercent,
  )

  const totalCosts =
    costPrice +
    marketplaceFee +
    shippingCost +
    taxes +
    extraCosts

  const netProfit = salePrice - totalCosts

  const margin =
    salePrice === 0
      ? 0
      : (netProfit / salePrice) * 100

  const roi =
    costPrice === 0
      ? 0
      : (netProfit / costPrice) * 100

  return {
    grossRevenue: round(salePrice),

    marketplaceFee: round(marketplaceFee),

    shippingCost: round(shippingCost),

    taxes: round(taxes),

    extraCosts: round(extraCosts),

    totalCosts: round(totalCosts),

    netProfit: round(netProfit),

    margin: round(margin),

    roi: round(roi),
  }
}

export function calculateBreakEvenPrice(
  costPrice: number,
  marketplaceFee = DEFAULT_MARKETPLACE_FEE,
  taxes = DEFAULT_TAX_PERCENT,
  shipping = DEFAULT_SHIPPING,
  extraCosts = DEFAULT_EXTRA_COSTS,
): number {
  const totalPercent =
    (marketplaceFee + taxes) / 100

  const fixedCosts =
    costPrice +
    shipping +
    extraCosts

  if (totalPercent >= 1) {
    return 0
  }

  return round(
    fixedCosts / (1 - totalPercent),
  )
}

export function calculateSuggestedPrice(
  costPrice: number,
  desiredMargin = 30,
  marketplaceFee = DEFAULT_MARKETPLACE_FEE,
  taxes = DEFAULT_TAX_PERCENT,
  shipping = DEFAULT_SHIPPING,
  extraCosts = DEFAULT_EXTRA_COSTS,
): number {
  const targetMargin = desiredMargin / 100

  const totalPercent =
    (marketplaceFee + taxes) / 100

  const fixedCosts =
    costPrice +
    shipping +
    extraCosts

  const divisor =
    1 - totalPercent - targetMargin

  if (divisor <= 0) {
    return 0
  }

  return round(
    fixedCosts / divisor,
  )
}

export function getMarginColor(
  margin: number,
): string {
  if (margin >= 40) return 'emerald'

  if (margin >= 25) return 'green'

  if (margin >= 15) return 'yellow'

  if (margin >= 5) return 'orange'

  return 'red'
}

export function getMarginLevel(
  margin: number,
): string {
  if (margin >= 40) return 'Excelente'

  if (margin >= 25) return 'Muito Boa'

  if (margin >= 15) return 'Boa'

  if (margin >= 5) return 'Baixa'

  return 'Prejuízo'
}
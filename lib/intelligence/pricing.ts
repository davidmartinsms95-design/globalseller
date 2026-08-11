import {
  PriceSuggestionResult,
  ProfitSimulationResult,
} from './types'

import {
  calculateSuggestedPrice,
  calculateBreakEvenPrice,
  simulateProfit,
} from './profit'

export interface PricingInput {
  costPrice: number

  marketplaceFee?: number

  shippingCost?: number

  taxes?: number

  extraCosts?: number

  desiredMargin?: number
}

export interface PricingScenario {
  minimum: ProfitSimulationResult
  ideal: ProfitSimulationResult
  premium: ProfitSimulationResult
}

function round(value: number): number {
  return Math.round(value * 100) / 100
}

export function calculatePriceSuggestion(
  input: PricingInput,
): PriceSuggestionResult {
  const desiredMargin = input.desiredMargin ?? 30

  const minimumPrice = calculateBreakEvenPrice(
    input.costPrice,
    input.marketplaceFee,
    input.taxes,
    input.shippingCost,
    input.extraCosts,
  )

  const idealPrice = calculateSuggestedPrice(
    input.costPrice,
    desiredMargin,
    input.marketplaceFee,
    input.taxes,
    input.shippingCost,
    input.extraCosts,
  )

  const premiumPrice = round(idealPrice * 1.15)

  return {
    minimumPrice,

    idealPrice,

    premiumPrice,

    expectedMargin: desiredMargin,

    recommendation: buildRecommendation(
      minimumPrice,
      idealPrice,
      premiumPrice,
    ),
  }
}

export function calculatePricingScenarios(
  input: PricingInput,
): PricingScenario {
  const suggestion = calculatePriceSuggestion(input)

  return {
    minimum: simulateProfit({
      salePrice: suggestion.minimumPrice,
      costPrice: input.costPrice,

      marketplaceFee: input.marketplaceFee,

      shippingCost: input.shippingCost,

      taxes: input.taxes,

      extraCosts: input.extraCosts,
    }),

    ideal: simulateProfit({
      salePrice: suggestion.idealPrice,
      costPrice: input.costPrice,

      marketplaceFee: input.marketplaceFee,

      shippingCost: input.shippingCost,

      taxes: input.taxes,

      extraCosts: input.extraCosts,
    }),

    premium: simulateProfit({
      salePrice: suggestion.premiumPrice,
      costPrice: input.costPrice,

      marketplaceFee: input.marketplaceFee,

      shippingCost: input.shippingCost,

      taxes: input.taxes,

      extraCosts: input.extraCosts,
    }),
  }
}

function buildRecommendation(
  minimum: number,
  ideal: number,
  premium: number,
): string {
  return `
Preço mínimo: R$ ${minimum.toFixed(2)}

Preço recomendado: R$ ${ideal.toFixed(2)}

Preço premium: R$ ${premium.toFixed(2)}

Utilize o preço recomendado como padrão.
Caso o produto possua excelente reputação, boa demanda ou diferencial competitivo,
o preço premium tende a oferecer maior margem sem comprometer a competitividade.
`.trim()
}

export function getPricePosition(
  currentPrice: number,
  suggestion: PriceSuggestionResult,
) {
  if (currentPrice < suggestion.minimumPrice) {
    return {
      level: 'danger',
      label: 'Abaixo do custo recomendado',
    }
  }

  if (currentPrice < suggestion.idealPrice) {
    return {
      level: 'warning',
      label: 'Preço competitivo',
    }
  }

  if (currentPrice <= suggestion.premiumPrice) {
    return {
      level: 'success',
      label: 'Preço ideal',
    }
  }

  return {
    level: 'info',
    label: 'Preço premium',
  }
}

export function calculateDiscountPercentage(
  originalPrice: number,
  salePrice: number,
): number {
  if (originalPrice <= 0) return 0

  return round(
    ((originalPrice - salePrice) / originalPrice) * 100,
  )
}

export function calculateMarkup(
  costPrice: number,
  salePrice: number,
): number {
  if (costPrice <= 0) return 0

  return round(
    ((salePrice - costPrice) / costPrice) * 100,
  )
}
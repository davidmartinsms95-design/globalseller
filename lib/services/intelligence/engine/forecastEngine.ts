import { salesForecastService } from '../salesForecast.service'

import { ScoreResult } from './scoringEngine'

import type {
  ForecastResult,
  ProductWithRelations,
} from '../shared/intelligence.types'

export interface ForecastEngineInput {
  product: ProductWithRelations

  userId?: string

  scores: ScoreResult
}

export async function buildForecast({
  userId,
}: ForecastEngineInput): Promise<ForecastResult> {
  if (!userId) {
    return {
      summary: {
        averageSales: 0,

        averageRevenue: 0,

        expectedSales: 0,

        expectedRevenue: 0,

        growthTrend: 0,

        confidence: 0,
      },

      forecast: [],
    }
  }

  try {
    const result =
      await salesForecastService.execute({
        userId,
      })

    return result
  } catch (error) {
    console.error(
      '[ForecastEngine]',
      error,
    )

    return {
      summary: {
        averageSales: 0,

        averageRevenue: 0,

        expectedSales: 0,

        expectedRevenue: 0,

        growthTrend: 0,

        confidence: 0,
      },

      forecast: [],
    }
  }
}
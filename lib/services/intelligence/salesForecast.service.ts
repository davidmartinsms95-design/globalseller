import { prisma } from '@/lib/prisma'

import {
  average,
  calculateTrend,
  confidenceScore,
  movingAverage,
  round,
  roundCurrency,
} from '@/lib/services/intelligence/shared/statistics'

import {
  DEFAULT_FORECAST_DAYS,
  DEFAULT_CONFIDENCE,
} from '@/lib/services/intelligence/shared/intelligence.constants'

import type {
  DashboardData,
  ForecastPoint,
  ForecastResult,
  ForecastSummary,
  OrderWithRelations,
} from '@/lib/services/intelligence/shared/intelligence.types'
interface DailyMetric {
  date: string

  sales: number

  revenue: number
}

export interface SalesForecastInput {
  userId: string

  period?: number
}

export class SalesForecastService {
  private buildDailyMetrics(
    orders: OrderWithRelations[],
    startDate: Date,
    endDate: Date,
  ): DailyMetric[] {
    const metrics = new Map<string, DailyMetric>()

    const cursor = new Date(startDate)

    while (cursor <= endDate) {
      const key = cursor.toISOString().split('T')[0]

      metrics.set(key, {
        date: key,
        sales: 0,
        revenue: 0,
      })

      cursor.setDate(cursor.getDate() + 1)
    }

    for (const order of orders) {
      const key = order.createdAt
        .toISOString()
        .split('T')[0]

      const metric = metrics.get(key)

      if (!metric) {
        continue
      }

      metric.sales += order.quantity

      metric.revenue += order.amount
    }

    return [...metrics.values()]
  }

  private calculateSummary(
    metrics: DailyMetric[],
  ): ForecastSummary {
    const sales = metrics.map(metric => metric.sales)

    const revenue = metrics.map(
      metric => metric.revenue,
    )

    const averageSales = round(
      average(sales),
    )

    const averageRevenue = roundCurrency(
      average(revenue),
    )

    const growthTrend = round(
      calculateTrend(revenue),
    )

    const confidence =
      confidenceScore(revenue)

    return {
      averageSales,
      averageRevenue,
      expectedSales: 0,
      expectedRevenue: 0,
      growthTrend,
      confidence,
    }
  }

  private calculateGrowthFactor(
    growthTrend: number,
  ): number {
    return 1 + growthTrend / 100
  }

  private calculateSeasonality(
    date: Date,
  ): number {
    switch (date.getDay()) {
      case 0:
        return 0.95

      case 5:
        return 1.08

      case 6:
        return 1.12

      default:
        return 1
    }
  }
    private generateForecast(
    summary: ForecastSummary,
    metrics: DailyMetric[],
  ): ForecastPoint[] {
    const forecast: ForecastPoint[] = []

    const growthFactor = this.calculateGrowthFactor(
      summary.growthTrend,
    )

    const baselineSales = movingAverage(
      metrics.map(metric => metric.sales),
    )

    const baselineRevenue = movingAverage(
      metrics.map(metric => metric.revenue),
    )

    const lastMetric =
      metrics[metrics.length - 1]

    const lastDate = lastMetric
      ? new Date(lastMetric.date)
      : new Date()

    for (
      let day = 1;
      day <= DEFAULT_FORECAST_DAYS;
      day++
    ) {
      const currentDate = new Date(lastDate)

      currentDate.setDate(
        currentDate.getDate() + day,
      )

      const seasonality =
        this.calculateSeasonality(
          currentDate,
        )

      const evolution = Math.pow(
        growthFactor,
        day / DEFAULT_FORECAST_DAYS,
      )

      const predictedSales = round(
        baselineSales *
          evolution *
          seasonality,
      )

      const predictedRevenue =
        roundCurrency(
          baselineRevenue *
            evolution *
            seasonality,
        )

      forecast.push({
        date: currentDate
          .toISOString()
          .split('T')[0],

        predictedSales,

        predictedRevenue,

        confidence: Math.max(
          DEFAULT_CONFIDENCE - day * 0.4,
          35,
        ),
      })
    }

    return forecast
  }

  private completeSummary(
    summary: ForecastSummary,
    forecast: ForecastPoint[],
  ): ForecastSummary {
    const expectedSales = round(
      forecast.reduce(
        (total, item) =>
          total + item.predictedSales,
        0,
      ),
    )

    const expectedRevenue =
      roundCurrency(
        forecast.reduce(
          (total, item) =>
            total +
            item.predictedRevenue,
          0,
        ),
      )

    return {
      ...summary,
      expectedSales,
      expectedRevenue,
    }
  }
    public async execute({
    userId,
    period = DEFAULT_FORECAST_DAYS,
  }: SalesForecastInput): Promise<ForecastResult> {
    const endDate = new Date()

    const startDate = new Date()

    startDate.setDate(
      startDate.getDate() - period,
    )

    const orders = await prisma.order.findMany({
      where: {
        sellerId: userId,
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        product: {
          include: {
            resellerProduct: {
              include: {
                marketplaceProduct: {
                  include: {
                    supplier: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    const metrics = this.buildDailyMetrics(
      orders,
      startDate,
      endDate,
    )

    const summary =
      this.calculateSummary(metrics)

    const forecast =
      this.generateForecast(
        summary,
        metrics,
      )

    return {
      summary: this.completeSummary(
        summary,
        forecast,
      ),
      forecast,
    }
  }

  public async getSummary(
  input: SalesForecastInput,
): Promise<ForecastSummary> {
  const result = await this.execute(input)

  return result.summary
}

  public async getForecast(
    input: SalesForecastInput,
  ): Promise<ForecastPoint[]> {
    const result = await this.execute(input)

    return result.forecast
  }
}

export const salesForecastService =
  new SalesForecastService()
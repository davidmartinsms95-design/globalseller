import { prisma } from '@/lib/prisma'

import type {
  OrderWithRelations,
} from '@/lib/services/intelligence/shared/intelligence.types'

export interface BestPublicationTimeInput {
  userId: string
}

export interface PublicationHour {
  hour: number

  orders: number

  revenue: number

  score: number
}

export interface PublicationWeekday {
  day: number

  label: string

  orders: number

  revenue: number

  score: number
}

export interface BestPublicationTimeResult {
  bestHours: PublicationHour[]

  bestWeekdays: PublicationWeekday[]

  recommendedHour: number

  recommendedWeekday: number
}

export class BestPublicationTimeService {
  public async execute({
    userId,
  }: BestPublicationTimeInput): Promise<BestPublicationTimeResult> {
    const orders =
      await prisma.order.findMany({
        where: {
          sellerId: userId,
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

        orderBy: {
          createdAt: 'asc',
        },
      })

    const bestHours =
      this.calculateBestHours(orders)

    const bestWeekdays =
      this.calculateBestWeekdays(orders)

    return {
      bestHours,

      bestWeekdays,

      recommendedHour:
        bestHours[0]?.hour ?? 9,

      recommendedWeekday:
        bestWeekdays[0]?.day ?? 1,
    }
  }
    private calculateBestHours(
    orders: OrderWithRelations[],
  ): PublicationHour[] {
    const hours = new Map<number, PublicationHour>()

    for (let hour = 0; hour < 24; hour++) {
      hours.set(hour, {
        hour,
        orders: 0,
        revenue: 0,
        score: 0,
      })
    }

    for (const order of orders) {
      const hour = order.createdAt.getHours()

      const current = hours.get(hour)

      if (!current) {
        continue
      }

      current.orders += order.quantity

      current.revenue += order.amount
    }

    return this.normalizeScores(
  [...hours.values()]
    .map(item => ({
      ...item,
      score: this.calculateScore(
        item.orders,
        item.revenue,
      ),
    }))
    .sort(
      (a, b) =>
        b.score - a.score,
    ),
)
  }

  private calculateBestWeekdays(
    orders: OrderWithRelations[],
  ): PublicationWeekday[] {
    const labels = [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ]

    const weekdays = new Map<
      number,
      PublicationWeekday
    >()

    for (let day = 0; day < 7; day++) {
      weekdays.set(day, {
        day,
        label: labels[day],
        orders: 0,
        revenue: 0,
        score: 0,
      })
    }

    for (const order of orders) {
      const day = order.createdAt.getDay()

      const current = weekdays.get(day)

      if (!current) {
        continue
      }

      current.orders += order.quantity

      current.revenue += order.amount
    }

    return this.normalizeWeekdayScores(
  [...weekdays.values()]
    .map(item => ({
      ...item,
      score: this.calculateScore(
        item.orders,
        item.revenue,
      ),
    }))
    .sort(
      (a, b) =>
        b.score - a.score,
    ),
)
  }
    private calculateScore(
    orders: number,
    revenue: number,
  ): number {
    if (orders === 0 && revenue === 0) {
      return 0
    }

    const orderWeight = 0.6

    const revenueWeight = 0.4

    const score =
      orders * orderWeight +
      revenue * revenueWeight

    return Number(score.toFixed(2))
  }

  private normalizeScores(
    hours: PublicationHour[],
  ): PublicationHour[] {
    const highestScore = Math.max(
      ...hours.map(hour => hour.score),
      1,
    )

    return hours.map(hour => ({
      ...hour,
      score: Number(
        ((hour.score / highestScore) * 100).toFixed(1),
      ),
    }))
  }

  private normalizeWeekdayScores(
    weekdays: PublicationWeekday[],
  ): PublicationWeekday[] {
    const highestScore = Math.max(
      ...weekdays.map(day => day.score),
      1,
    )

    return weekdays.map(day => ({
      ...day,
      score: Number(
        ((day.score / highestScore) * 100).toFixed(1),
      ),
    }))
  }
    public async getBestHours(
    input: BestPublicationTimeInput,
  ): Promise<PublicationHour[]> {
    const result = await this.execute(input)

    return result.bestHours
  }

  public async getBestWeekdays(
    input: BestPublicationTimeInput,
  ): Promise<PublicationWeekday[]> {
    const result = await this.execute(input)

    return result.bestWeekdays
  }

  public async getRecommendedPublicationTime(
    input: BestPublicationTimeInput,
  ): Promise<{
    hour: number
    weekday: number
  }> {
    const result = await this.execute(input)

    return {
      hour: result.recommendedHour,
      weekday: result.recommendedWeekday,
    }
  }

  public async getSummary(
    input: BestPublicationTimeInput,
  ): Promise<BestPublicationTimeResult> {
    return this.execute(input)
  }
}

export const bestPublicationTimeService =
  new BestPublicationTimeService()
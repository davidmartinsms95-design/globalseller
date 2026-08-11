import { buildIntelligence } from '../engine/intelligenceEngine'

import {
  salesForecastService,
} from '../salesForecast.service'

import {
  competitorAnalysisService,
} from '@/lib/services/competitorAnalysis.service'

import {
  publicationTimelineService,
} from '../publicationTimeline.service'

import {
  getMarketInsights,
} from '../marketInsights.service'

export interface DashboardIntelligenceFacadeInput {
  product: any

  userId: string
}

export async function buildDashboardIntelligence({
  product,
  userId,
}: DashboardIntelligenceFacadeInput) {
  const intelligencePromise =
    buildIntelligence({
      product,
      userId,
    })

  const salesForecastPromise =
    salesForecastService.execute({
      userId,
    })

  const competitorAnalysisPromise =
    competitorAnalysisService.execute({
      userId,
    })

  const publicationTimelinePromise =
    publicationTimelineService.execute({
      userId,
    })

  const marketInsightsPromise =
    getMarketInsights(userId)

  const [
    intelligence,
    salesForecast,
    competitorAnalysis,
    publicationTimeline,
    marketInsights,
  ] = await Promise.all([
    intelligencePromise,
    salesForecastPromise,
    competitorAnalysisPromise,
    publicationTimelinePromise,
    marketInsightsPromise,
  ])
    return {
    intelligence,

    salesForecast,

    competitorAnalysis,

    publicationTimeline,

    marketInsights,
  }
}
'use client'

import { Brain, Sparkles } from 'lucide-react'

import AIRecommendations from './intelligence/AiRecommendations'
import BestPublicationTime from './intelligence/BestPublicationTime'
import CompetitorAnalysis from './intelligence/CompetitorAnalysis'
import MarketInsights from './intelligence/MarketInsights'
import MarketOpportunityCard from './intelligence/MarketOpportunityCard'
import PerformanceAlerts from './intelligence/PerformanceAlerts'
import PriceSuggestion from './intelligence/PriceSuggestion'
import ProductHealthCard from './intelligence/ProductHealthCard'
import ProfitSimulator from './intelligence/ProfitSimulator'
import PublicationTimeline from './intelligence/PublicationTimeline'
import SalesForecast from './intelligence/SalesForecast'
import SeoScoreCard from './intelligence/SeoScoreCard'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import TopProductsRanking from '@/components/dashboard/intelligence/TopProductsRanking'
import ExecutiveSummarySection from '@/components/dashboard/intelligence/ExecutiveSummarySection'
import HeroSection from '@/components/dashboard/intelligence/HeroSection'
import ExecutiveDiagnosisSection from '@/components/dashboard/intelligence/ExecutiveDiagnosisSection'

interface ExecutiveIntelligencePanelProps {
  healthScore: number

  seoScore: number

  catalogMetrics: {
  totalProducts: number
  healthyProducts: number
  attentionProducts: number
  criticalProducts: number
}

  productHealth: {
    strengths: string[]
    warnings: string[]
    suggestions: string[]
  }

  seo: {
    keywords: string[]
    strengths: string[]
    warnings: string[]
    suggestions: string[]
  }

  profitSimulator: {
    costPrice: number
    currentPrice: number
    suggestedPrice: number
    marketplaceFee: number
    shippingCost: number
  }

  priceSuggestion: {
    costPrice: number
    currentPrice: number
    suggestedPrice: number
    minimumPrice: number
    premiumPrice: number
  }

  competitorAnalysis: any

  publicationTimeline: any[]

  recommendations: any[]

  opportunities: any[]

  publicationTime: any

  marketInsights: any[]

  topProducts: {
  id: string
  name: string
  score: number
  healthScore: number
  seoScore: number
  financialScore: number
  competitionScore: number
}[]

  salesForecast: any

  alerts: any[]
}

export default function ExecutiveIntelligencePanel({
  healthScore,
  seoScore,
  catalogMetrics,
  productHealth,
  seo,
  profitSimulator,
  priceSuggestion,
  competitorAnalysis,
  publicationTimeline,
  recommendations,
  opportunities,
  publicationTime,
  marketInsights,
  topProducts,
  salesForecast,
  alerts,
}: ExecutiveIntelligencePanelProps) {
  return (
    <div className="space-y-8">

      <HeroSection />

<ExecutiveSummarySection
  healthScore={healthScore}
  seoScore={seoScore}
  productHealth={productHealth}
  seo={seo}
  catalogMetrics={catalogMetrics}
/>

    <div className="grid gap-6">

      <ProfitSimulator
        costPrice={profitSimulator.costPrice}
        currentPrice={profitSimulator.currentPrice}
        suggestedPrice={
          profitSimulator.suggestedPrice
        }
        marketplaceFee={
          profitSimulator.marketplaceFee
        }
        shippingCost={
          profitSimulator.shippingCost
        }
      />

      <PriceSuggestion
        costPrice={priceSuggestion.costPrice}
        currentPrice={priceSuggestion.currentPrice}
        suggestedPrice={
          priceSuggestion.suggestedPrice
        }
        minimumPrice={
          priceSuggestion.minimumPrice
        }
        premiumPrice={
          priceSuggestion.premiumPrice
        }
      />

    </div>

    <CompetitorAnalysis
      {...competitorAnalysis}
    />

    <PublicationTimeline
      events={publicationTimeline}
    />

    <AIRecommendations
      recommendations={recommendations}
    />

    <MarketOpportunityCard
      opportunities={opportunities}
    />

<TopProductsRanking
  products={topProducts}
/>

    <BestPublicationTime
      bestHour={
        publicationTime.bestHour
      }
      bestDay={
        publicationTime.bestDay
      }
      averageConversion={
        publicationTime.averageConversion
      }
      averageSales={
        publicationTime.averageSales
      }
      hours={publicationTime.hours}
    />

    <MarketInsights
  insights={marketInsights ?? []}
/>

    <SalesForecast
  next7Days={
    salesForecast?.forecast
      ?.slice(0, 7)
      .reduce(
        (total: number, item: any) =>
          total + item.predictedSales,
        0,
      ) ?? 0
  }
  next30Days={
    salesForecast?.forecast
      ?.slice(0, 30)
      .reduce(
        (total: number, item: any) =>
          total + item.predictedSales,
        0,
      ) ?? 0
  }
  estimatedRevenue={
    salesForecast?.summary
      ?.expectedRevenue ?? 0
  }
  estimatedOrders={
    salesForecast?.summary
      ?.expectedSales ?? 0
  }
  confidence={
    salesForecast?.summary
      ?.confidence ?? 0
  }
/>

      <PerformanceAlerts
        alerts={alerts}
      />

      <ExecutiveDiagnosisSection
        healthScore={healthScore}
        seoScore={seoScore}
        recommendationsCount={recommendations.length}
        alertsCount={alerts.length}
      />

      <Card>

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Status da Inteligência
            </h2>

            <p className="mt-2 text-zinc-400">
              Todos os módulos de Inteligência Artificial
              estão ativos e prontos para fornecer
              análises em tempo real.
            </p>

          </div>

          <Badge variant="premium">
            IA Online
          </Badge>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-4">

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Módulos
            </p>

            <h2 className="mt-2 text-4xl font-bold text-emerald-400">
              12
            </h2>

          </div>

          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Atualização
            </p>

            <h2 className="mt-2 text-2xl font-bold text-sky-400">
              Tempo Real
            </h2>

          </div>

          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Monitoramento
            </p>

            <h2 className="mt-2 text-2xl font-bold text-orange-400">
              24/7
            </h2>

          </div>

          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Status
            </p>

            <h2 className="mt-2 text-2xl font-bold text-purple-400">
              Ativo
            </h2>

          </div>

        </div>

      </Card>
          </div>
  )
}
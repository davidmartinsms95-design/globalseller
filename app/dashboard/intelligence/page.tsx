'use client'

import { useEffect, useState } from 'react'

import ExecutiveIntelligencePanel from '@/components/dashboard/ExecutiveIntelligencePanel'
import PageHeader from '@/components/ui/PageHeader'

interface IntelligenceData {
  healthScore: number
  seoScore: number

  catalogMetrics: {
  totalProducts: number
  healthyProducts: number
  attentionProducts: number
  criticalProducts: number
}

  productHealth: any

  seo: any

  profitSimulator: any

  priceSuggestion: any

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

export default function IntelligencePage() {
  const [data, setData] =
    useState<IntelligenceData | null>(null)

  const [loading, setLoading] =
    useState(true)

  async function loadDashboard() {
    try {
      const response = await fetch(
        '/api/intelligence/dashboard',
      )

      const json = await response.json()

      setData(json)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  if (loading) {
    return (
      <div className="p-10 text-zinc-400">
        Carregando Central de Inteligência...
      </div>
    )
  }

  if (!data) {
    return (
      <div className="p-10 text-red-500">
        Não foi possível carregar a Central de Inteligência.
      </div>
    )
  }

  return (
    <div className="space-y-8">

      <PageHeader
        badge="Inteligência Artificial"
        title="Central de Inteligência"
        description="Painel executivo alimentado por Inteligência Artificial para análise completa dos seus anúncios."
      />

      <ExecutiveIntelligencePanel
  healthScore={data.healthScore}
  seoScore={data.seoScore}

  catalogMetrics={
    data.catalogMetrics
  }

  productHealth={data.productHealth}

        seo={data.seo}

        profitSimulator={data.profitSimulator}

        priceSuggestion={data.priceSuggestion}

        competitorAnalysis={
          data.competitorAnalysis
        }

        publicationTimeline={
          data.publicationTimeline
        }

        recommendations={
  data.recommendations
}

opportunities={
  data.opportunities
}

publicationTime={
  data.publicationTime
}
        marketInsights={
          data.marketInsights
        }

        topProducts={data.topProducts}
        
        salesForecast={
          data.salesForecast
        }

        alerts={data.alerts}
      />

    </div>
  )
}
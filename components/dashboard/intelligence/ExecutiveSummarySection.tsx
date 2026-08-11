'use client'

import ProductHealthCard from './ProductHealthCard'
import SeoScoreCard from './SeoScoreCard'
import Card from '@/components/ui/Card'

interface ExecutiveSummarySectionProps {
  healthScore: number

  seoScore: number

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

  catalogMetrics: {
    totalProducts: number
    healthyProducts: number
    attentionProducts: number
    criticalProducts: number
  }
}

export default function ExecutiveSummarySection({
  healthScore,
  seoScore,
  productHealth,
  seo,
  catalogMetrics,
}: ExecutiveSummarySectionProps) {
  return (
    <>
      <div className="grid gap-6 xl:grid-cols-2">

        <ProductHealthCard
          score={healthScore}
          strengths={productHealth.strengths}
          warnings={productHealth.warnings}
          suggestions={productHealth.suggestions}
        />

        <SeoScoreCard
          score={seoScore}
          keywords={seo.keywords}
          strengths={seo.strengths}
          warnings={seo.warnings}
          suggestions={seo.suggestions}
        />

      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <Card>
          <div className="space-y-2">
            <p className="text-sm text-zinc-400">
              Produtos analisados
            </p>

            <p className="text-3xl font-bold text-white">
              {catalogMetrics.totalProducts}
            </p>
          </div>
        </Card>

        <Card>
          <div className="space-y-2">
            <p className="text-sm text-zinc-400">
              Produtos saudáveis
            </p>

            <p className="text-3xl font-bold text-emerald-400">
              {catalogMetrics.healthyProducts}
            </p>
          </div>
        </Card>

        <Card>
          <div className="space-y-2">
            <p className="text-sm text-zinc-400">
              Precisam de atenção
            </p>

            <p className="text-3xl font-bold text-yellow-400">
              {catalogMetrics.attentionProducts}
            </p>
          </div>
        </Card>

        <Card>
          <div className="space-y-2">
            <p className="text-sm text-zinc-400">
              Produtos críticos
            </p>

            <p className="text-3xl font-bold text-red-400">
              {catalogMetrics.criticalProducts}
            </p>
          </div>
        </Card>

      </div>
    </>
  )
}
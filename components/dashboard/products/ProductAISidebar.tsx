'use client'

import { useMemo } from 'react'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

import { buildDraftProduct } from '@/lib/services/intelligence/adapters/productDraft.adapter'
import { buildProductHealth } from '@/lib/services/intelligence/builders/productHealth.builder'
import { calculateScores } from '@/lib/services/intelligence/engine/scoringEngine'
import { buildSeoAnalysis } from '@/lib/services/intelligence/engine/seoEngine'
import { buildRecommendations } from '@/lib/services/intelligence/engine/recommendationEngine'

interface ProductAISidebarProps {
  title: string
  description: string
  category: string
  image: string

  price: string
  stock: string

  brand: string
  model: string

  onSave: () => void
}

export default function ProductAISidebar({
  title,
  description,
  category,
  image,
  price,
  stock,
  brand,
  model,
  onSave,
}: ProductAISidebarProps) {
  const intelligence = useMemo(() => {
    const product = buildDraftProduct({
      title,
      description,
      category,
      image,
      brand,
      model,
      price: Number(price ?? 0),
      stock: Number(stock ?? 0),
    })

    const scores = calculateScores(product)

    const seo = buildSeoAnalysis(
      product,
      scores,
    )

    const recommendations =
      buildRecommendations(
        product,
        scores,
        seo,
      )

    const health =
      buildProductHealth(
        seo.strengths,
        seo.warnings,
        seo.suggestions,
      )

    return {
      scores,
      seo,
      recommendations,
      health,
    }
  }, [
    title,
    description,
    category,
    image,
    brand,
    model,
    price,
    stock,
  ])

  return (
    <Card>
      <h2 className="mb-6 text-2xl font-bold text-white">
        Assistente IA
      </h2>

      <div className="space-y-3 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
        <div className="flex justify-between">
          <span>Health Score</span>

          <span className="font-semibold text-orange-300">
            {intelligence.scores.healthScore}
          </span>
        </div>

        <div className="flex justify-between">
          <span>SEO Score</span>

          <span className="font-semibold text-orange-300">
            {intelligence.scores.seoScore}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Score Final</span>

          <span className="font-semibold text-green-400">
            {intelligence.scores.finalScore}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-lg font-semibold text-white">
          Pontos Fortes
        </h3>

        <div className="space-y-2">
          {intelligence.health.strengths.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Nenhum ponto forte identificado.
            </p>
          ) : (
            intelligence.health.strengths.map(
              (item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-sm text-emerald-300"
                >
                  ✓ {item}
                </div>
              ),
            )
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-lg font-semibold text-white">
          Pontos de Atenção
        </h3>

        <div className="space-y-2">
          {intelligence.health.warnings.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Nenhum alerta encontrado.
            </p>
          ) : (
            intelligence.health.warnings.map(
              (item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3 text-sm text-yellow-300"
                >
                  ⚠ {item}
                </div>
              ),
            )
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-lg font-semibold text-white">
          Sugestões da IA
        </h3>

        <div className="space-y-2">
          {intelligence.health.suggestions.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Nenhuma sugestão encontrada.
            </p>
          ) : (
            intelligence.health.suggestions.map(
              (item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 text-sm text-blue-300"
                >
                  💡 {item}
                </div>
              ),
            )
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-lg font-semibold text-white">
          Palavras-chave
        </h3>

        <div className="flex flex-wrap gap-2">
          {intelligence.seo.keywords.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Nenhuma palavra-chave identificada.
            </p>
          ) : (
            intelligence.seo.keywords.map(
              (keyword) => (
                <span
                  key={keyword}
                  className="rounded-full bg-orange-500/20 px-3 py-1 text-xs text-orange-300"
                >
                  {keyword}
                </span>
              ),
            )
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-lg font-semibold text-white">
          Recomendações
        </h3>

        <div className="space-y-3">
          {intelligence.recommendations.length === 0 ? (
            <p className="text-sm text-zinc-400">
              Nenhuma recomendação encontrada.
            </p>
          ) : (
            intelligence.recommendations
              .slice(0, 5)
              .map((recommendation) => (
                <div
                  key={recommendation.id}
                  className="rounded-xl border border-zinc-700 p-3"
                >
                  <p className="font-semibold text-white">
                    {recommendation.title}
                  </p>

                  <p className="mt-1 text-sm text-zinc-400">
                    {recommendation.action}
                  </p>
                </div>
              ))
          )}
        </div>
      </div>

      <Button
        className="mt-8 w-full"
        onClick={onSave}
      >
        Salvar Produto
      </Button>
    </Card>
  )
}
'use client'

import { useEffect, useState } from 'react'

interface Insight {
  title: string
  description: string
  type:
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
  priority?: string
}

interface InsightsSummary {
  healthScore: number
  seoScore: number
  totalProducts: number
  healthyProducts: number
  attentionProducts: number
  criticalProducts: number
  recommendations: number
  alerts: number
  generatedAt: string
}

export default function InsightsPage() {
  const [insights, setInsights] =
    useState<Insight[]>([])

  const [summary, setSummary] =
    useState<InsightsSummary | null>(
      null
    )

  const [loading, setLoading] =
    useState(true)

  async function loadInsights() {
    try {
      setLoading(true)

      const response = await fetch(
        '/api/insights'
      )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ??
            'Erro ao carregar insights.'
        )
      }

      setInsights(
        Array.isArray(data.insights)
          ? data.insights
          : []
      )

      setSummary(
        data.summary ?? null
      )
    } catch (error) {
      console.error(error)

      setInsights([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInsights()
  }, [])

  const getScoreStatus = (
    score: number
  ) => {
    if (score >= 90) {
      return {
        label: 'Excelente',
        color: 'text-emerald-400',
      }
    }

    if (score >= 75) {
      return {
        label: 'Bom',
        color: 'text-sky-400',
      }
    }

    if (score >= 60) {
      return {
        label: 'Atenção',
        color: 'text-yellow-400',
      }
    }

    return {
      label: 'Crítico',
      color: 'text-red-400',
    }
  }

  return (
    <div>
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-6xl font-bold text-white">
            AI Insights
          </h1>

          <p className="mt-4 text-xl text-zinc-400">
            Inteligência analítica da
            operação multi-marketplace.
          </p>
        </div>

        <div className="rounded-2xl bg-violet-600 px-6 py-4 font-bold text-white">
          ERP AI ANALYTICS
        </div>
      </div>

      {summary && (
        <div className="mb-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6">
            <p className="text-sm text-zinc-400">
              Health Score
            </p>

            <h2 className="mt-2 text-4xl font-bold text-emerald-400">
              {summary.healthScore}
            </h2>

            <p
              className={`mt-2 text-sm font-semibold ${
                getScoreStatus(
                  summary.healthScore
                ).color
              }`}
            >
              {
                getScoreStatus(
                  summary.healthScore
                ).label
              }
            </p>
          </div>

          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 p-6">
            <p className="text-sm text-zinc-400">
              SEO Score
            </p>

            <h2 className="mt-2 text-4xl font-bold text-sky-400">
              {summary.seoScore}
            </h2>

            <p
              className={`mt-2 text-sm font-semibold ${
                getScoreStatus(
                  summary.seoScore
                ).color
              }`}
            >
              {
                getScoreStatus(
                  summary.seoScore
                ).label
              }
            </p>
          </div>

          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-6">
            <h3 className="text-xl font-bold text-white">
              Catálogo
            </h3>

            <div className="mt-6 space-y-3 text-zinc-300">
              <div className="flex justify-between">
                <span>Total</span>

                <span>
                  {summary.totalProducts}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Saudáveis</span>

                <span className="text-emerald-400">
                  {summary.healthyProducts}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Atenção</span>

                <span className="text-yellow-400">
                  {summary.attentionProducts}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Críticos</span>

                <span className="text-red-400">
                  {summary.criticalProducts}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-6">
            <p className="text-sm text-zinc-400">
              Alertas Ativos
            </p>

            <h2 className="mt-2 text-4xl font-bold text-purple-400">
              {
                insights.filter(
                  (item) =>
                    item.type === 'warning'
                ).length
              }
            </h2>

            <p className="mt-2 text-sm text-zinc-400">
              Insights que exigem atenção
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-10">
          <p className="text-xl text-zinc-400">
            IA analisando operação...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          {insights.length === 0 && (
            <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8 xl:col-span-2">
              <h2 className="text-2xl font-bold text-white">
                Nenhum insight disponível
              </h2>

              <p className="mt-4 text-zinc-400">
                Ainda não há dados suficientes
                para gerar insights inteligentes.
                À medida que houver produtos,
                pedidos e movimentações, esta
                central exibirá análises
                automaticamente.
              </p>
            </div>
          )}

          {insights.map(
            (insight, index) => (
              <div
                key={index}
                className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-3xl font-bold text-white">
                    {insight.title}
                  </h2>

                  <div
                    className={`
                      rounded-2xl px-4 py-2 font-bold
                      ${
                        insight.type ===
                        'success'
                          ? 'bg-green-500/20 text-green-400'
                          : insight.type ===
                              'warning'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : insight.type ===
                                'danger'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-blue-500/20 text-blue-400'
                      }
                    `}
                  >
                    {insight.type}
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-zinc-300">
                  {insight.description}
                </p>

                {insight.priority && (
                  <div className="mt-4">
                    <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs font-semibold text-violet-300">
                      Prioridade:{' '}
                      {insight.priority}
                    </span>
                  </div>
                )}

                <div className="mt-8 rounded-2xl bg-black p-5">
                  <p className="text-sm text-zinc-500">
                    Insight gerado por IA
                    operacional do GlobalSeller.
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}

      <div className="mt-10 rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">
            Recursos IA Analytics
          </h2>

          <p className="mt-2 text-zinc-400">
            Inteligência operacional
            enterprise.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-black p-6">
            <h3 className="text-xl font-bold text-violet-400">
              IA Vendas
            </h3>

            <p className="mt-3 text-zinc-400">
              Insights automáticos de
              performance comercial.
            </p>
          </div>

          <div className="rounded-2xl bg-black p-6">
            <h3 className="text-xl font-bold text-violet-400">
              IA Estoque
            </h3>

            <p className="mt-3 text-zinc-400">
              Alertas inteligentes para
              reposição e giro.
            </p>
          </div>

          <div className="rounded-2xl bg-black p-6">
            <h3 className="text-xl font-bold text-violet-400">
              IA Financeiro
            </h3>

            <p className="mt-3 text-zinc-400">
              Análise automática de lucro e
              margem operacional.
            </p>
          </div>

          <div className="rounded-2xl bg-black p-6">
            <h3 className="text-xl font-bold text-violet-400">
              IA CRM
            </h3>

            <p className="mt-3 text-zinc-400">
              Inteligência sobre clientes e
              comportamento de compra.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
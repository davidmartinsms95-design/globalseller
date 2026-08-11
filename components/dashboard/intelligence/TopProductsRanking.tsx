'use client'

import {
  Award,
  Crown,
  Medal,
  ShieldCheck,
} from 'lucide-react'

import Card from '@/components/ui/Card'

interface TopProduct {
  id: string

  name: string

  score: number

  healthScore: number

  seoScore: number

  financialScore: number

  competitionScore: number
}

interface TopProductsRankingProps {
  products: TopProduct[]
}

function getScoreColor(score: number) {
  if (score >= 90) {
    return 'text-emerald-400'
  }

  if (score >= 75) {
    return 'text-sky-400'
  }

  if (score >= 60) {
    return 'text-yellow-400'
  }

  return 'text-red-400'
}

function getRankingMedal(position: number) {
  switch (position) {
    case 0:
      return {
        icon: Crown,
        label: 'Ouro',
        iconColor: 'text-yellow-400',
        badge:
          'bg-yellow-500/15 border-yellow-500/30 text-yellow-300',
      }

    case 1:
      return {
        icon: Medal,
        label: 'Prata',
        iconColor: 'text-zinc-300',
        badge:
          'bg-zinc-500/15 border-zinc-500/30 text-zinc-200',
      }

    case 2:
      return {
        icon: Award,
        label: 'Bronze',
        iconColor: 'text-orange-400',
        badge:
          'bg-orange-500/15 border-orange-500/30 text-orange-300',
      }

    default:
      return {
        icon: ShieldCheck,
        label: 'Ranking',
        iconColor: 'text-sky-400',
        badge:
          'bg-sky-500/15 border-sky-500/30 text-sky-300',
      }
  }
}

function getPerformanceBadge(score: number) {
  if (score >= 95) {
    return {
      label: 'Elite',
      className:
        'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    }
  }

  if (score >= 90) {
    return {
      label: 'Excelente',
      className:
        'bg-sky-500/15 border-sky-500/30 text-sky-300',
    }
  }

  if (score >= 80) {
    return {
      label: 'Muito Bom',
      className:
        'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
    }
  }

  if (score >= 70) {
    return {
      label: 'Bom',
      className:
        'bg-yellow-500/15 border-yellow-500/30 text-yellow-300',
    }
  }

  return {
    label: 'Atenção',
    className:
      'bg-red-500/15 border-red-500/30 text-red-300',
  }
}

export default function TopProductsRanking({
  products,
}: TopProductsRankingProps) {
  return (
    <Card>

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Ranking dos Melhores Produtos
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Classificação inteligente baseada na
            análise da IA do GlobalSeller.
          </p>

        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3">

          <p className="text-sm text-zinc-500">
            Produtos
          </p>

          <h2 className="text-2xl font-bold text-white">
            {products.length}
          </h2>

        </div>

      </div>

      <div className="mt-8 space-y-6">

        {products.length === 0 && (

          <div className="rounded-2xl border border-dashed border-zinc-800 py-10 text-center">

            <p className="text-zinc-500">
              Nenhum produto encontrado.
            </p>

          </div>

        )}

        {products.map((product, index) => {

          const medal = getRankingMedal(index)

          const badge = getPerformanceBadge(
            product.score,
          )

          const MedalIcon = medal.icon

          return (
                      <div
              key={product.id}
              className={`rounded-2xl border p-6 transition-all duration-300 ${
                index === 0
                  ? 'border-orange-500/40 bg-gradient-to-br from-orange-500/10 via-zinc-950 to-zinc-950 shadow-lg shadow-orange-500/10'
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
              }`}
            >

              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                <div className="flex items-start gap-4">

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${medal.badge}`}
                  >

                    <MedalIcon
                      size={26}
                      className={medal.iconColor}
                    />

                  </div>

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-xl font-semibold text-white">
                        {product.name}
                      </h3>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${badge.className}`}
                      >
                        {badge.label}
                      </span>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${medal.badge}`}
                      >
                        {medal.label}
                      </span>

                    </div>

                    <p className="mt-2 text-sm text-zinc-500">

                      {index === 0
                        ? 'Produto com melhor desempenho geral da Inteligência Artificial.'
                        : `Posição #${index + 1} no ranking executivo.`}

                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-sm text-zinc-500">
                    Score Geral
                  </p>

                  <h2
                    className={`mt-2 text-4xl font-bold ${getScoreColor(
                      product.score,
                    )}`}
                  >
                    {product.score}
                  </h2>

                </div>

              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">

                  <p className="text-sm text-zinc-500">
                    Saúde
                  </p>

                  <p
                    className={`mt-2 text-2xl font-bold ${getScoreColor(
                      product.healthScore,
                    )}`}
                  >
                    {product.healthScore}
                  </p>

                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">

                  <p className="text-sm text-zinc-500">
                    SEO
                  </p>

                  <p
                    className={`mt-2 text-2xl font-bold ${getScoreColor(
                      product.seoScore,
                    )}`}
                  >
                    {product.seoScore}
                  </p>

                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">

                  <p className="text-sm text-zinc-500">
                    Financeiro
                  </p>

                  <p
                    className={`mt-2 text-2xl font-bold ${getScoreColor(
                      product.financialScore,
                    )}`}
                  >
                    {product.financialScore}
                  </p>

                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">

                  <p className="text-sm text-zinc-500">
                    Concorrência
                  </p>

                  <p
                    className={`mt-2 text-2xl font-bold ${getScoreColor(
                      product.competitionScore,
                    )}`}
                  >
                    {product.competitionScore}
                  </p>

                </div>

              </div>

              <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-5">

                <h4 className="font-semibold text-white">
                  Resumo Executivo
                </h4>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                                    {product.score >= 95
                    ? 'Produto de excelência com desempenho acima da média em SEO, saúde do anúncio, competitividade e rentabilidade. Recomendado manter a estratégia atual e ampliar investimentos para potencializar as vendas.'
                    : product.score >= 85
                    ? 'Produto com excelente potencial de crescimento. Pequenos ajustes em preço, SEO e exposição podem elevar seu desempenho para o nível máximo.'
                    : product.score >= 70
                    ? 'Produto com bom desempenho geral. Existem oportunidades de otimização em alguns indicadores para aumentar a competitividade.'
                    : 'Produto que requer atenção. Recomenda-se revisar título, descrição, imagens, precificação e estratégia comercial para melhorar o desempenho geral.'}
                </p>

              </div>

            </div>

          )
        })}

      </div>

    </Card>
  )
}
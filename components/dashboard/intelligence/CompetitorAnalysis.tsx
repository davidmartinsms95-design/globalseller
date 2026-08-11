'use client'

import {
  BarChart3,
  TrendingUp,
  Trophy,
} from 'lucide-react'

import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export interface CompetitorAnalysisProps {
  currentPrice: number

  lowestPrice: number

  averagePrice: number

  highestPrice: number

  ranking: number

  competitors: number
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL',
    },
  ).format(value)
}

function getCompetitiveness(
  current: number,
  average: number,
) {
  const difference =
    ((current - average) / average) * 100

  if (difference <= -5) {
    return {
      label: 'Muito Competitivo',
      variant: 'success' as const,
    }
  }

  if (difference <= 5) {
    return {
      label: 'Competitivo',
      variant: 'info' as const,
    }
  }

  return {
    label: 'Acima da Média',
    variant: 'warning' as const,
  }
}

export default function CompetitorAnalysis({
  currentPrice,
  lowestPrice,
  averagePrice,
  highestPrice,
  ranking,
  competitors,
}: CompetitorAnalysisProps) {
  const competitiveness =
    getCompetitiveness(
      currentPrice,
      averagePrice,
    )

  return (
    <Card>

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-3">

            <BarChart3
              size={22}
              className="text-orange-400"
            />

            <h2 className="text-2xl font-bold text-white">
              Análise de Concorrentes
            </h2>

          </div>

          <p className="mt-3 max-w-2xl text-zinc-400">

            Compare seu anúncio com os
            principais concorrentes do
            marketplace.

          </p>

        </div>

        <Badge
          variant={
            competitiveness.variant
          }
        >
          {competitiveness.label}
        </Badge>

      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <p className="text-sm text-zinc-500">
            Seu Preço
          </p>

          <h3 className="mt-3 text-3xl font-bold text-white">
            {formatCurrency(currentPrice)}
          </h3>

        </div>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Menor Preço
          </p>

          <h3 className="mt-3 text-3xl font-bold text-red-400">
            {formatCurrency(lowestPrice)}
          </h3>

        </div>

        <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Preço Médio
          </p>

          <h3 className="mt-3 text-3xl font-bold text-sky-400">
            {formatCurrency(averagePrice)}
          </h3>

        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Maior Preço
          </p>

          <h3 className="mt-3 text-3xl font-bold text-emerald-400">
            {formatCurrency(highestPrice)}
          </h3>

        </div>

      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">

          <div className="mb-5 flex items-center gap-3">

            <Trophy
              size={22}
              className="text-yellow-400"
            />

            <h3 className="text-xl font-semibold text-white">
              Ranking
            </h3>

          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <span className="text-zinc-400">
                Sua posição
              </span>

              <strong className="text-4xl font-bold text-yellow-400">
                #{ranking}
              </strong>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-zinc-400">
                Concorrentes analisados
              </span>

              <strong className="text-white">
                {competitors}
              </strong>

            </div>

          </div>

        </div>

        <div className="rounded-3xl border border-orange-500/20 bg-orange-500/5 p-6">

          <div className="mb-5 flex items-center gap-3">

            <TrendingUp
              size={22}
              className="text-orange-400"
            />

            <h3 className="text-xl font-semibold text-white">
              Competitividade
            </h3>

          </div>

          <h2 className="text-4xl font-bold text-orange-400">
            {competitiveness.label}
          </h2>

          <p className="mt-4 leading-7 text-zinc-300">

            A comparação considera o preço atual
            em relação ao preço médio dos anúncios
            concorrentes.

          </p>

        </div>

      </div>
            <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">

        <div className="mb-6 flex items-center gap-3">

          <BarChart3
            size={22}
            className="text-sky-400"
          />

          <h3 className="text-xl font-semibold text-white">
            Recomendações da Inteligência Artificial
          </h3>

        </div>

        <div className="space-y-4">

          {currentPrice > averagePrice && (

            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">

              <p className="font-semibold text-yellow-400">
                Preço acima da média
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Seu produto está acima do preço médio
                dos concorrentes. Avalie se seus
                diferenciais justificam esse valor.
              </p>

            </div>

          )}

          {currentPrice < averagePrice && (

            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">

              <p className="font-semibold text-emerald-400">
                Preço competitivo
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Seu preço está abaixo da média do
                mercado, aumentando as chances de
                conversão e destaque.
              </p>

            </div>

          )}

          {currentPrice === averagePrice && (

            <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4">

              <p className="font-semibold text-sky-400">
                Alinhado ao mercado
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Seu anúncio está alinhado com a média
                dos concorrentes. Pequenos ajustes
                podem melhorar seu posicionamento.
              </p>

            </div>

          )}

          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4">

            <p className="font-semibold text-orange-400">
              Sugestão da IA
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-300">

              Considere acompanhar a evolução dos
              preços diariamente para manter seu
              anúncio competitivo sem comprometer
              a margem de lucro.

            </p>

          </div>

        </div>

      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-4">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <p className="text-sm text-zinc-500">
            Diferença para a média
          </p>

          <p
            className={`mt-2 text-2xl font-bold ${
              currentPrice <= averagePrice
                ? 'text-emerald-400'
                : 'text-red-400'
            }`}
          >
            {(
              ((currentPrice - averagePrice) /
                averagePrice) *
              100
            ).toFixed(1)}
            %
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <p className="text-sm text-zinc-500">
            Faixa de Mercado
          </p>

          <p className="mt-2 text-2xl font-bold text-white">

            {formatCurrency(lowestPrice)} -{' '}
            {formatCurrency(highestPrice)}

          </p>

        </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <p className="text-sm text-zinc-500">
            Ranking
          </p>

          <p className="mt-2 text-2xl font-bold text-yellow-400">
            #{ranking}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <p className="text-sm text-zinc-500">
            Concorrentes
          </p>

          <p className="mt-2 text-2xl font-bold text-sky-400">
            {competitors}
          </p>

        </div>

      </div>

      <div className="mt-10 border-t border-zinc-800 pt-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="text-lg font-semibold text-white">
              Diagnóstico Competitivo
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">

              Esta análise é baseada nos preços
              encontrados nos principais anúncios do
              marketplace. A Inteligência Artificial do
              GlobalSeller utiliza essas informações para
              sugerir ajustes que aumentam as chances de
              venda sem comprometer a lucratividade.

            </p>

          </div>

          <Badge variant={competitiveness.variant}>
            {competitiveness.label}
          </Badge>

        </div>

      </div>

    </Card>
  )
}
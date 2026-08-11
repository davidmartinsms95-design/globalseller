'use client'

import {
  TrendingUp,
  Flame,
  Brain,
  BarChart3,
} from 'lucide-react'

import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export interface MarketInsight {
  id: string

  title: string

  description: string

  growth: number

  opportunity: number

  estimatedProfit: number
}

interface MarketInsightsProps {
  insights: MarketInsight[]
}

export default function MarketInsights({
  insights,
}: MarketInsightsProps) {
  const totalGrowth =
    insights.length > 0
      ? insights.reduce(
          (total, item) =>
            total + item.growth,
          0,
        ) / insights.length
      : 0

  const averageOpportunity =
    insights.length > 0
      ? insights.reduce(
          (total, item) =>
            total + item.opportunity,
          0,
        ) / insights.length
      : 0

  const estimatedProfit =
    insights.reduce(
      (total, item) =>
        total + item.estimatedProfit,
      0,
    )

  return (
    <Card>

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <Brain
              size={22}
              className="text-purple-400"
            />

            <h2 className="text-2xl font-bold text-white">
              Insights de Mercado
            </h2>

          </div>

          <p className="mt-3 max-w-2xl text-zinc-400">

            A Inteligência Artificial monitora o
            mercado continuamente para encontrar
            tendências e oportunidades para seus
            produtos.

          </p>

        </div>

        <Badge variant="premium">
          IA Analytics
        </Badge>

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Crescimento Médio
          </p>

          <h2 className="mt-2 text-3xl font-bold text-emerald-400">
            {totalGrowth.toFixed(1)}%
          </h2>

        </div>

        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Oportunidade
          </p>

          <h2 className="mt-2 text-3xl font-bold text-orange-400">
            {averageOpportunity.toFixed(1)}%
          </h2>

        </div>

        <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Lucro Potencial
          </p>

          <h2 className="mt-2 text-3xl font-bold text-sky-400">
            R$ {estimatedProfit.toFixed(2)}
          </h2>

        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Insights
          </p>

          <h2 className="mt-2 text-3xl font-bold text-purple-400">
            {insights.length}
          </h2>

        </div>

      </div>

      <div className="mt-10 space-y-6">
              {insights.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-zinc-700 py-16 text-center">

            <BarChart3
              size={48}
              className="mx-auto mb-4 text-zinc-600"
            />

            <h3 className="text-xl font-semibold text-white">
              Nenhum insight encontrado
            </h3>

            <p className="mt-3 text-zinc-400">
              A Inteligência Artificial ainda está
              coletando dados suficientes para gerar
              insights personalizados.
            </p>

          </div>

        ) : (

          insights.map((item) => (

            <div
              key={item.id}
              className="
                rounded-3xl
                border
                border-zinc-800
                bg-zinc-900/50
                p-6
              "
            >

              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                <div className="flex-1">

                  <div className="mb-4 flex flex-wrap items-center gap-3">

                    <Badge variant="premium">
                      Insight IA
                    </Badge>

                    <Badge
                      variant={
                        item.growth >= 50
                          ? 'success'
                          : item.growth >= 20
                          ? 'warning'
                          : 'error'
                      }
                    >
                      Crescimento {item.growth}%
                    </Badge>

                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-zinc-400">
                    {item.description}
                  </p>

                </div>

                <Flame
                  size={34}
                  className="text-orange-400"
                />

              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

                  <p className="text-sm text-zinc-500">
                    Crescimento
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-emerald-400">
                    {item.growth}%
                  </h2>

                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

                  <p className="text-sm text-zinc-500">
                    Oportunidade
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-orange-400">
                    {item.opportunity}%
                  </h2>

                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

                  <p className="text-sm text-zinc-500">
                    Lucro Potencial
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-sky-400">
                    R$ {item.estimatedProfit.toFixed(2)}
                  </h2>

                </div>

              </div>

            </div>

          ))

        )}
              <div className="mt-10 rounded-3xl border border-purple-500/20 bg-purple-500/5 p-6">

        <div className="mb-6 flex items-center gap-3">

          <Brain
            size={22}
            className="text-purple-400"
          />

          <h3 className="text-xl font-semibold text-white">
            Resumo da Inteligência Artificial
          </h3>

        </div>

        <div className="grid gap-5 md:grid-cols-4">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-sm text-zinc-500">
              Insights
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {insights.length}
            </h2>

          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Alta Tendência
            </p>

            <h2 className="mt-2 text-3xl font-bold text-emerald-400">
              {
                insights.filter(
                  (item) => item.growth >= 60,
                ).length
              }
            </h2>

          </div>

          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Alta Oportunidade
            </p>

            <h2 className="mt-2 text-3xl font-bold text-orange-400">
              {
                insights.filter(
                  (item) =>
                    item.opportunity >= 70,
                ).length
              }
            </h2>

          </div>

          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Lucro Total
            </p>

            <h2 className="mt-2 text-3xl font-bold text-sky-400">
              R${' '}
              {estimatedProfit.toFixed(2)}
            </h2>

          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

          <h4 className="font-semibold text-white">
            Diagnóstico da IA
          </h4>

          <p className="mt-3 leading-7 text-zinc-400">

            A Inteligência Artificial identifica
            tendências emergentes, crescimento das
            categorias, comportamento dos compradores,
            sazonalidade e potencial de lucratividade
            para destacar oportunidades antes dos
            concorrentes.

          </p>

        </div>

      </div>
            <div className="mt-10 border-t border-zinc-800 pt-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="text-lg font-semibold text-white">
              Inteligência de Mercado
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">

              Os insights são atualizados continuamente
              utilizando dados de vendas, comportamento
              dos consumidores, sazonalidade, concorrência,
              tendências do mercado e algoritmos de
              Inteligência Artificial do GlobalSeller para
              antecipar oportunidades e auxiliar na tomada
              de decisões estratégicas.

            </p>

          </div>

          <Badge variant="premium">
            Insights em Tempo Real
          </Badge>

        </div>

      </div>

      </div>

    </Card>
  )
}
'use client'

import {
  TrendingUp,
  Target,
  Lightbulb,
} from 'lucide-react'

import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export interface MarketOpportunity {
  id: string

  title: string

  category: string

  demand: number

  competition: number

  estimatedProfit: number
}

interface MarketOpportunityCardProps {
  opportunities: MarketOpportunity[]
}

function getDemandVariant(
  demand: number,
): 'success' | 'warning' | 'error' {
  if (demand >= 80) {
    return 'success'
  }

  if (demand >= 50) {
    return 'warning'
  }

  return 'error'
}

export default function MarketOpportunityCard({
  opportunities,
}: MarketOpportunityCardProps) {

  console.table(
    opportunities.map((item) => ({
      id: item.id,
      title: item.title,
    })),
  )

  return (
    <Card>

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <TrendingUp
              size={22}
              className="text-emerald-400"
            />

            <h2 className="text-2xl font-bold text-white">
              Oportunidades de Mercado
            </h2>

          </div>

          <p className="mt-3 max-w-2xl text-zinc-400">

            Produtos com maior potencial de venda
            identificados pela Inteligência Artificial.

          </p>

        </div>

        <Badge variant="premium">
          IA Insights
        </Badge>

      </div>

      <div className="mt-10 space-y-5">
              {opportunities.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-zinc-700 py-16 text-center">

            <Lightbulb
              size={48}
              className="mx-auto mb-4 text-zinc-600"
            />

            <h3 className="text-xl font-semibold text-white">
              Nenhuma oportunidade encontrada
            </h3>

            <p className="mt-3 text-zinc-400">
              A Inteligência Artificial ainda está
              analisando o mercado para encontrar
              novas oportunidades.
            </p>

          </div>

        ) : (

          opportunities.map((item) => (

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

              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex-1">

                  <div className="mb-4 flex flex-wrap items-center gap-3">

                    <Badge
                      variant={getDemandVariant(
                        item.demand,
                      )}
                    >
                      Demanda {item.demand}%
                    </Badge>

                    <Badge variant="info">
                      {item.category}
                    </Badge>

                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {item.title}
                  </h3>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">

                    <div>

                      <p className="text-sm text-zinc-500">
                        Concorrência
                      </p>

                      <p className="mt-2 text-2xl font-bold text-orange-400">
                        {item.competition}%
                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-zinc-500">
                        Demanda
                      </p>

                      <p className="mt-2 text-2xl font-bold text-emerald-400">
                        {item.demand}%
                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-zinc-500">
                        Lucro Estimado
                      </p>

                      <p className="mt-2 text-2xl font-bold text-sky-400">
                        R$ {item.estimatedProfit.toFixed(2)}
                      </p>

                    </div>

                  </div>

                </div>

                <div className="flex justify-end">

                  <button
                    className="
                      rounded-2xl
                      bg-orange-500
                      px-8
                      py-4
                      font-semibold
                      text-white
                      transition-all
                      duration-300
                      hover:bg-orange-400
                    "
                  >
                    <Target
                      size={18}
                      className="mr-2 inline"
                    />

                    Analisar Produto

                  </button>

                </div>

              </div>

            </div>

          ))

        )}
              <div className="mt-10 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">

        <div className="mb-6 flex items-center gap-3">

          <TrendingUp
            size={22}
            className="text-emerald-400"
          />

          <h3 className="text-xl font-semibold text-white">
            Resumo das Oportunidades
          </h3>

        </div>

        <div className="grid gap-5 md:grid-cols-4">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-sm text-zinc-500">
              Oportunidades
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {opportunities.length}
            </h2>

          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Alta Demanda
            </p>

            <h2 className="mt-2 text-3xl font-bold text-emerald-400">
              {
                opportunities.filter(
                  (item) => item.demand >= 80,
                ).length
              }
            </h2>

          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Baixa Concorrência
            </p>

            <h2 className="mt-2 text-3xl font-bold text-yellow-400">
              {
                opportunities.filter(
                  (item) =>
                    item.competition <= 40,
                ).length
              }
            </h2>

          </div>

          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Lucro Potencial
            </p>

            <h2 className="mt-2 text-3xl font-bold text-sky-400">
              R${' '}
              {opportunities
                .reduce(
                  (total, item) =>
                    total +
                    item.estimatedProfit,
                  0,
                )
                .toFixed(2)}
            </h2>

          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

          <h4 className="font-semibold text-white">
            Diagnóstico da IA
          </h4>

          <p className="mt-3 leading-7 text-zinc-400">

            A Inteligência Artificial monitora
            continuamente tendências do mercado,
            concorrência, margem de lucro e demanda
            para destacar produtos com maior potencial
            de crescimento.

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

              As oportunidades apresentadas são
              recalculadas automaticamente utilizando
              informações de demanda, concorrência,
              lucratividade, sazonalidade e desempenho
              dos marketplaces conectados ao
              GlobalSeller.

            </p>

          </div>

          <Badge variant="premium">
            Atualização Automática
          </Badge>

        </div>

      </div>

      </div>

    </Card>
  )
}
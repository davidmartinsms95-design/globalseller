'use client'

import {
  Brain,
  TrendingUp,
  CalendarDays,
  Target,
} from 'lucide-react'

import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export interface SalesForecastProps {
  next7Days: number

  next30Days: number

  estimatedRevenue: number

  estimatedOrders: number

  confidence: number
}

function getConfidenceVariant(
  confidence: number,
): 'success' | 'warning' | 'error' {
  if (confidence >= 85) {
    return 'success'
  }

  if (confidence >= 60) {
    return 'warning'
  }

  return 'error'
}

export default function SalesForecast({
  next7Days,
  next30Days,
  estimatedRevenue,
  estimatedOrders,
  confidence,
}: SalesForecastProps) {
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
              Previsão de Vendas
            </h2>

          </div>

          <p className="mt-3 max-w-2xl text-zinc-400">

            A Inteligência Artificial estima o
            desempenho futuro com base no histórico
            de vendas, sazonalidade e tendências
            identificadas.

          </p>

        </div>

        <Badge
          variant={getConfidenceVariant(
            confidence,
          )}
        >
          {confidence}% confiança
        </Badge>

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Próximos 7 dias
          </p>

          <h2 className="mt-2 text-3xl font-bold text-orange-400">
            {next7Days}
          </h2>

        </div>

        <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Próximos 30 dias
          </p>

          <h2 className="mt-2 text-3xl font-bold text-sky-400">
            {next30Days}
          </h2>

        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Receita Estimada
          </p>

          <h2 className="mt-2 text-3xl font-bold text-emerald-400">
            R$ {estimatedRevenue.toFixed(2)}
          </h2>

        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Pedidos Estimados
          </p>

          <h2 className="mt-2 text-3xl font-bold text-purple-400">
            {estimatedOrders}
          </h2>

        </div>

      </div>

      <div className="mt-10">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">

          <div className="mb-6 flex items-center gap-3">

            <TrendingUp
              size={22}
              className="text-emerald-400"
            />

            <h3 className="text-xl font-semibold text-white">
              Cenário Previsto
            </h3>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

              <div className="flex items-center gap-3">

                <CalendarDays
                  size={20}
                  className="text-orange-400"
                />

                <span className="font-semibold text-white">
                  Próximos 7 dias
                </span>

              </div>

              <h2 className="mt-5 text-5xl font-bold text-orange-400">
                {next7Days}
              </h2>

              <p className="mt-3 leading-7 text-zinc-400">

                Quantidade estimada de pedidos
                considerando o comportamento
                recente das vendas.

              </p>

            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

              <div className="flex items-center gap-3">

                <CalendarDays
                  size={20}
                  className="text-sky-400"
                />

                <span className="font-semibold text-white">
                  Próximos 30 dias
                </span>

              </div>

              <h2 className="mt-5 text-5xl font-bold text-sky-400">
                {next30Days}
              </h2>

              <p className="mt-3 leading-7 text-zinc-400">

                Estimativa baseada em tendências,
                sazonalidade e histórico completo
                do marketplace.

              </p>

            </div>

          </div>

        </div>

        <div className="mt-10 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">

          <div className="mb-6 flex items-center gap-3">

            <Target
              size={22}
              className="text-emerald-400"
            />

            <h3 className="text-xl font-semibold text-white">
              Receita Projetada
            </h3>

          </div>

          <div className="grid gap-5 md:grid-cols-3">

            <div>

              <p className="text-sm text-zinc-500">
                Receita Estimada
              </p>

              <h2 className="mt-2 text-4xl font-bold text-emerald-400">
                R$ {estimatedRevenue.toFixed(2)}
              </h2>

            </div>

            <div>

              <p className="text-sm text-zinc-500">
                Pedidos
              </p>

              <h2 className="mt-2 text-4xl font-bold text-white">
                {estimatedOrders}
              </h2>

            </div>

            <div>

              <p className="text-sm text-zinc-500">
                Confiabilidade
              </p>

              <h2 className="mt-2 text-4xl font-bold text-purple-400">
                {confidence}%
              </h2>

            </div>

          </div>

        </div>
              <div className="mt-10 rounded-3xl border border-purple-500/20 bg-purple-500/5 p-6">

        <div className="mb-6 flex items-center gap-3">

          <Brain
            size={22}
            className="text-purple-400"
          />

          <h3 className="text-xl font-semibold text-white">
            Recomendações da Inteligência Artificial
          </h3>

        </div>

        <div className="grid gap-5 md:grid-cols-4">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-sm text-zinc-500">
              Confiança
            </p>

            <h2 className="mt-2 text-3xl font-bold text-purple-400">
              {confidence}%
            </h2>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-sm text-zinc-500">
              Receita
            </p>

            <h2 className="mt-2 text-3xl font-bold text-emerald-400">
              R$ {estimatedRevenue.toFixed(2)}
            </h2>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-sm text-zinc-500">
              Pedidos
            </p>

            <h2 className="mt-2 text-3xl font-bold text-orange-400">
              {estimatedOrders}
            </h2>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-sm text-zinc-500">
              Tendência
            </p>

            <h2 className="mt-2 text-3xl font-bold text-sky-400">

              {confidence >= 85
                ? 'Alta'
                : confidence >= 60
                ? 'Estável'
                : 'Instável'}

            </h2>

          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

          <h4 className="font-semibold text-white">
            Diagnóstico da IA
          </h4>

          <p className="mt-3 leading-7 text-zinc-400">

            A previsão indica uma tendência
            positiva baseada no comportamento
            histórico das vendas, sazonalidade,
            crescimento da categoria e desempenho
            recente dos anúncios publicados.

          </p>

        </div>

      </div>
            <div className="mt-10 border-t border-zinc-800 pt-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="text-lg font-semibold text-white">
              Planejamento Inteligente
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">

              As previsões são recalculadas
              automaticamente pela Inteligência
              Artificial utilizando histórico de
              vendas, sazonalidade, comportamento
              dos compradores, tendências de mercado,
              performance dos anúncios e eventos
              futuros para fornecer estimativas cada
              vez mais precisas.

            </p>

          </div>

          <Badge
            variant={getConfidenceVariant(
              confidence,
            )}
          >
            IA Preditiva
          </Badge>

        </div>

      </div>

      </div>

    </Card>
  )
}
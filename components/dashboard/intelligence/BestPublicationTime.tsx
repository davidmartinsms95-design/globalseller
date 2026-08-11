'use client'

import {
  Clock3,
  Calendar,
  TrendingUp,
} from 'lucide-react'

import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export interface PublicationHour {
  hour: string
  sales: number
  conversion: number
}

interface BestPublicationTimeProps {
  bestHour: string

  bestDay: string

  averageConversion: number

  averageSales: number

  hours: PublicationHour[]
}

export default function BestPublicationTime({
  bestHour,
  bestDay,
  averageConversion,
  averageSales,
  hours,
}: BestPublicationTimeProps) {
  const maxSales = Math.max(
    ...hours.map((item) => item.sales),
    1,
  )

  return (
    <Card>

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <Clock3
              size={22}
              className="text-orange-400"
            />

            <h2 className="text-2xl font-bold text-white">
              Melhor Horário para Publicação
            </h2>

          </div>

          <p className="mt-3 max-w-2xl text-zinc-400">

            A Inteligência Artificial analisa o
            histórico de vendas para identificar
            os horários com maior potencial de
            conversão.

          </p>

        </div>

        <Badge variant="premium">
          IA Analytics
        </Badge>

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Melhor Horário
          </p>

          <h2 className="mt-2 text-3xl font-bold text-orange-400">
            {bestHour}
          </h2>

        </div>

        <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Melhor Dia
          </p>

          <h2 className="mt-2 text-3xl font-bold text-sky-400">
            {bestDay}
          </h2>

        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Conversão Média
          </p>

          <h2 className="mt-2 text-3xl font-bold text-emerald-400">
            {averageConversion.toFixed(1)}%
          </h2>

        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Média de Vendas
          </p>

          <h2 className="mt-2 text-3xl font-bold text-purple-400">
            {averageSales.toFixed(1)}
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
              Performance por Horário
            </h3>

          </div>

          <div className="space-y-5">

            {hours.map((item) => {

              const percentage =
                (item.sales / maxSales) * 100

              return (

                <div key={item.hour}>

                  <div className="mb-2 flex items-center justify-between">

                    <span className="font-medium text-white">
                      {item.hour}
                    </span>

                    <div className="flex items-center gap-4 text-sm">

                      <span className="text-zinc-400">
                        {item.sales} vendas
                      </span>

                      <span className="font-semibold text-emerald-400">
                        {item.conversion.toFixed(1)}%
                      </span>

                    </div>

                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

                    <div
                      className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-orange-500
                        to-emerald-500
                        transition-all
                        duration-700
                      "
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                </div>

              )

            })}

          </div>

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <div className="rounded-3xl border border-orange-500/20 bg-orange-500/5 p-6">

            <div className="mb-5 flex items-center gap-3">

              <Clock3
                size={20}
                className="text-orange-400"
              />

              <h3 className="font-semibold text-white">
                Melhor Horário
              </h3>

            </div>

            <h2 className="text-5xl font-bold text-orange-400">
              {bestHour}
            </h2>

            <p className="mt-4 leading-7 text-zinc-300">

              Este é o horário com maior volume
              de vendas e melhor taxa de conversão.

            </p>

          </div>

          <div className="rounded-3xl border border-sky-500/20 bg-sky-500/5 p-6">

            <div className="mb-5 flex items-center gap-3">

              <Calendar
                size={20}
                className="text-sky-400"
              />

              <h3 className="font-semibold text-white">
                Melhor Dia
              </h3>

            </div>

            <h2 className="text-5xl font-bold text-sky-400">
              {bestDay}
            </h2>

            <p className="mt-4 leading-7 text-zinc-300">

              Dia da semana com maior potencial
              para publicação de novos anúncios.

            </p>

          </div>

                  </div>

        </div>

        <div className="mt-10 rounded-3xl border border-purple-500/20 bg-purple-500/5 p-6">
        <div className="mb-6 flex items-center gap-3">

          <TrendingUp
            size={22}
            className="text-purple-400"
          />

          <h3 className="text-xl font-semibold text-white">
            Recomendação da Inteligência Artificial
          </h3>

        </div>

        <div className="grid gap-5 md:grid-cols-4">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-sm text-zinc-500">
              Horário Ideal
            </p>

            <h2 className="mt-2 text-3xl font-bold text-orange-400">
              {bestHour}
            </h2>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-sm text-zinc-500">
              Melhor Dia
            </p>

            <h2 className="mt-2 text-3xl font-bold text-sky-400">
              {bestDay}
            </h2>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-sm text-zinc-500">
              Conversão
            </p>

            <h2 className="mt-2 text-3xl font-bold text-emerald-400">
              {averageConversion.toFixed(1)}%
            </h2>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-sm text-zinc-500">
              Média de Vendas
            </p>

            <h2 className="mt-2 text-3xl font-bold text-purple-400">
              {averageSales.toFixed(1)}
            </h2>

          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

          <h4 className="font-semibold text-white">
            Diagnóstico Inteligente
          </h4>

          <p className="mt-3 leading-7 text-zinc-400">

            A IA identificou que publicar anúncios
            próximos do horário de maior conversão
            aumenta significativamente a chance de
            visualizações iniciais, favorecendo o
            algoritmo dos marketplaces e melhorando
            o desempenho do anúncio nas primeiras
            horas após a publicação.

          </p>

        </div>

            <div className="mt-10 border-t border-zinc-800 pt-8">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="text-lg font-semibold text-white">
              Estratégia de Publicação
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">

              As recomendações são recalculadas
              continuamente utilizando o histórico de
              pedidos, horários de maior conversão,
              sazonalidade, comportamento dos clientes e
              desempenho dos anúncios publicados pelo
              GlobalSeller.

            </p>

          </div>

          <Badge variant="premium">
            Publicação Inteligente
          </Badge>

        </div>

      </div>

    </div>

    </Card>
  )
}
'use client'

import {
  CheckCircle2,
  Clock3,
  Package,
  DollarSign,
  RefreshCw,
  Brain,
} from 'lucide-react'

import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export interface TimelineEvent {
  id: string

  title: string

  description: string

  date: string

  type:
    | 'published'
    | 'price'
    | 'stock'
    | 'sale'
    | 'status'
    | 'ai'
}

interface PublicationTimelineProps {
  events: TimelineEvent[]
}

function getIcon(type: TimelineEvent['type']) {
  switch (type) {
    case 'published':
      return (
        <CheckCircle2
          size={18}
          className="text-emerald-400"
        />
      )

    case 'price':
      return (
        <DollarSign
          size={18}
          className="text-orange-400"
        />
      )

    case 'stock':
      return (
        <Package
          size={18}
          className="text-sky-400"
        />
      )

    case 'sale':
      return (
        <DollarSign
          size={18}
          className="text-green-400"
        />
      )

    case 'status':
      return (
        <RefreshCw
          size={18}
          className="text-yellow-400"
        />
      )

    case 'ai':
      return (
        <Brain
          size={18}
          className="text-purple-400"
        />
      )

    default:
      return (
        <Clock3
          size={18}
          className="text-zinc-400"
        />
      )
  }
}

function getBadge(
  type: TimelineEvent['type'],
):
  | 'success'
  | 'warning'
  | 'info'
  | 'premium'
  | 'default' {
  switch (type) {
    case 'published':
      return 'success'

    case 'price':
      return 'warning'

    case 'stock':
      return 'info'

    case 'sale':
      return 'success'

    case 'status':
      return 'warning'

    case 'ai':
      return 'premium'

    default:
      return 'default'
  }
}

export default function PublicationTimeline({
  events,
}: PublicationTimelineProps) {
  return (
    <Card>

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Timeline da Publicação
          </h2>

          <p className="mt-2 text-zinc-400">
            Histórico completo das alterações
            realizadas no anúncio.
          </p>

        </div>

        <Badge variant="premium">
          IA Timeline
        </Badge>

      </div>

      <div className="mt-10 space-y-8">
              {events.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-zinc-700 py-16 text-center">

            <Clock3
              size={42}
              className="mx-auto mb-4 text-zinc-600"
            />

            <h3 className="text-xl font-semibold text-white">
              Nenhum evento encontrado
            </h3>

            <p className="mt-3 text-zinc-400">
              O histórico da publicação será exibido
              automaticamente conforme alterações
              forem realizadas.
            </p>

          </div>

        ) : (

          events.map((event, index) => (

            <div
              key={event.id}
              className="relative flex gap-5"
            >

              {index !== events.length - 1 && (

                <div
                  className="
                    absolute
                    left-[8px]
                    top-8
                    h-full
                    w-px
                    bg-zinc-800
                  "
                />

              )}

              <div
                className="
                  z-10
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-zinc-700
                  bg-zinc-900
                "
              >

                {getIcon(event.type)}

              </div>

              <div className="flex-1 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  <div>

                    <h3 className="text-lg font-semibold text-white">
                      {event.title}
                    </h3>

                    <p className="mt-2 leading-7 text-zinc-400">
                      {event.description}
                    </p>

                  </div>

                  <div className="flex flex-col items-end gap-3">

                    <Badge
                      variant={getBadge(
                        event.type,
                      )}
                    >
                      {event.type
                        .replace(
                          '_',
                          ' ',
                        )
                        .toUpperCase()}
                    </Badge>

                    <span className="text-sm text-zinc-500">
                      {event.date}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          ))

        )}
              <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">

        <div className="mb-6 flex items-center gap-3">

          <Brain
            size={22}
            className="text-purple-400"
          />

          <h3 className="text-xl font-semibold text-white">
            Resumo Inteligente
          </h3>

        </div>

        <div className="grid gap-5 md:grid-cols-4">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-sm text-zinc-500">
              Eventos
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {events.length}
            </h2>

          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Publicações
            </p>

            <h2 className="mt-2 text-3xl font-bold text-emerald-400">
              {
                events.filter(
                  (event) =>
                    event.type ===
                    'published',
                ).length
              }
            </h2>

          </div>

          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Alterações
            </p>

            <h2 className="mt-2 text-3xl font-bold text-orange-400">
              {
                events.filter((event) =>
                  ['price', 'stock', 'status'].includes(
                    event.type,
                  ),
                ).length
              }
            </h2>

          </div>

          <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Ações da IA
            </p>

            <h2 className="mt-2 text-3xl font-bold text-purple-400">
              {
                events.filter(
                  (event) =>
                    event.type === 'ai',
                ).length
              }
            </h2>

          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

          <h4 className="font-semibold text-white">
            Análise da Inteligência Artificial
          </h4>

          <p className="mt-3 leading-7 text-zinc-400">

            A timeline registra automaticamente
            todas as alterações importantes do
            anúncio, permitindo acompanhar sua
            evolução, identificar padrões e tomar
            decisões mais rápidas sobre preço,
            estoque e performance.

          </p>

        </div>

      </div>
            <div className="mt-10 border-t border-zinc-800 pt-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="text-lg font-semibold text-white">
              Histórico Inteligente
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">

              O histórico é atualizado automaticamente
              sempre que houver publicação, alteração de
              preço, atualização de estoque, mudança de
              status, venda realizada ou qualquer ação
              executada pela Inteligência Artificial do
              GlobalSeller.

            </p>

          </div>

          <Badge variant="premium">
            Histórico Ativo
          </Badge>

        </div>

      </div>

      </div>

    </Card>
  )
}
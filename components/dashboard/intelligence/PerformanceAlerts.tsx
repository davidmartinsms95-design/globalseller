'use client'

import {
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Package,
  DollarSign,
  Search,
} from 'lucide-react'

import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export interface PerformanceAlert {
  id: string

  title: string

  description: string

  type:
    | 'sales'
    | 'stock'
    | 'profit'
    | 'seo'
    | 'growth'

  severity:
    | 'low'
    | 'medium'
    | 'high'

  actionLabel?: string

  onAction?: () => void
}

interface PerformanceAlertsProps {
  alerts: PerformanceAlert[]
}

function getSeverityVariant(
  severity: PerformanceAlert['severity'],
): 'success' | 'warning' | 'error' {
  switch (severity) {
    case 'low':
      return 'success'

    case 'medium':
      return 'warning'

    default:
      return 'error'
  }
}

function getIcon(
  type: PerformanceAlert['type'],
) {
  switch (type) {
    case 'sales':
      return (
        <TrendingDown
          size={20}
          className="text-red-400"
        />
      )

    case 'stock':
      return (
        <Package
          size={20}
          className="text-orange-400"
        />
      )

    case 'profit':
      return (
        <DollarSign
          size={20}
          className="text-yellow-400"
        />
      )

    case 'seo':
      return (
        <Search
          size={20}
          className="text-sky-400"
        />
      )

    case 'growth':
      return (
        <TrendingUp
          size={20}
          className="text-emerald-400"
        />
      )

    default:
      return (
        <AlertTriangle
          size={20}
          className="text-zinc-400"
        />
      )
  }
}

export default function PerformanceAlerts({
  alerts,
}: PerformanceAlertsProps) {
  return (
    <Card>

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <AlertTriangle
              size={22}
              className="text-red-400"
            />

            <h2 className="text-2xl font-bold text-white">
              Alertas Inteligentes
            </h2>

          </div>

          <p className="mt-3 max-w-2xl text-zinc-400">

            A Inteligência Artificial monitora seus
            anúncios continuamente e identifica
            situações que precisam de atenção.

          </p>

        </div>

        <Badge variant="premium">
          IA Monitor
        </Badge>

      </div>

      <div className="mt-10 space-y-5">
                {alerts.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-zinc-700 py-16 text-center">

            <AlertTriangle
              size={46}
              className="mx-auto mb-4 text-zinc-600"
            />

            <h3 className="text-xl font-semibold text-white">
              Nenhum alerta encontrado
            </h3>

            <p className="mt-3 text-zinc-400">
              A Inteligência Artificial não detectou
              nenhum problema no momento.
            </p>

          </div>

        ) : (

          alerts.map((alert) => (

            <div
              key={alert.id}
              className="
                rounded-3xl
                border
                border-zinc-800
                bg-zinc-900/50
                p-6
              "
            >

              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                <div className="flex flex-1 gap-4">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-zinc-700
                      bg-zinc-950
                    "
                  >
                    {getIcon(alert.type)}
                  </div>

                  <div className="flex-1">

                    <div className="mb-4 flex flex-wrap items-center gap-3">

                      <Badge
                        variant={getSeverityVariant(
                          alert.severity,
                        )}
                      >
                        {alert.severity === 'high'
                          ? 'Alta Prioridade'
                          : alert.severity === 'medium'
                          ? 'Média Prioridade'
                          : 'Baixa Prioridade'}
                      </Badge>

                      <Badge variant="premium">
                        IA
                      </Badge>

                    </div>

                    <h3 className="text-xl font-bold text-white">
                      {alert.title}
                    </h3>

                    <p className="mt-3 leading-7 text-zinc-400">
                      {alert.description}
                    </p>

                  </div>

                </div>

                <div>

                  <Button
                    onClick={() =>
                      alert.onAction?.()
                    }
                  >
                    {alert.actionLabel ??
                      'Resolver'}

                  </Button>

                </div>

              </div>

            </div>

          ))

        )}
              <div className="mt-10 rounded-3xl border border-red-500/20 bg-red-500/5 p-6">

        <div className="mb-6 flex items-center gap-3">

          <AlertTriangle
            size={22}
            className="text-red-400"
          />

          <h3 className="text-xl font-semibold text-white">
            Resumo dos Alertas
          </h3>

        </div>

        <div className="grid gap-5 md:grid-cols-4">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

            <p className="text-sm text-zinc-500">
              Total de Alertas
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {alerts.length}
            </h2>

          </div>

          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Alta Prioridade
            </p>

            <h2 className="mt-2 text-3xl font-bold text-red-400">
              {
                alerts.filter(
                  alert =>
                    alert.severity === 'high'
                ).length
              }
            </h2>

          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Média Prioridade
            </p>

            <h2 className="mt-2 text-3xl font-bold text-yellow-400">
              {
                alerts.filter(
                  alert =>
                    alert.severity === 'medium'
                ).length
              }
            </h2>

          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Baixa Prioridade
            </p>

            <h2 className="mt-2 text-3xl font-bold text-emerald-400">
              {
                alerts.filter(
                  alert =>
                    alert.severity === 'low'
                ).length
              }
            </h2>

          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

          <h4 className="font-semibold text-white">
            Diagnóstico da IA
          </h4>

          <p className="mt-3 leading-7 text-zinc-400">

            Os alertas são gerados automaticamente
            quando a Inteligência Artificial detecta
            quedas de desempenho, problemas de SEO,
            estoque crítico, redução da margem de
            lucro ou qualquer comportamento fora do
            padrão esperado.

          </p>

        </div>

      </div>
            <div className="mt-10 border-t border-zinc-800 pt-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="text-lg font-semibold text-white">
              Monitoramento Inteligente
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">

              O sistema monitora continuamente todos os
              produtos publicados e gera alertas em tempo
              real sempre que identificar oportunidades de
              melhoria ou riscos que possam impactar suas
              vendas, margem de lucro ou posicionamento
              nos marketplaces.

            </p>

          </div>

          <Badge variant="premium">
            Monitoramento 24/7
          </Badge>

        </div>

      </div>

      </div>

    </Card>
  )
}
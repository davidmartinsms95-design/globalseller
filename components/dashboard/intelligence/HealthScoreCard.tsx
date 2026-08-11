'use client'

import { AlertTriangle, CheckCircle2, HeartPulse, Info } from 'lucide-react'

import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

import { ProductHealthResult } from '@/lib/intelligence/types'

interface Props {
  health: ProductHealthResult
}

function getColor(score: number) {
  if (score >= 90) return 'text-emerald-600'
  if (score >= 75) return 'text-green-600'
  if (score >= 50) return 'text-yellow-600'
  return 'text-red-600'
}

type BadgeVariant =
  | 'success'
  | 'info'
  | 'warning'
  | 'error'

function getBadge(
  score: number,
): BadgeVariant {
  if (score >= 90) return 'success'
  if (score >= 75) return 'info'
  if (score >= 50) return 'warning'
  return 'error'
}

export default function HealthScoreCard({
  health,
}: Props) {
  return (
    <Card className="space-y-6">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <HeartPulse className="h-6 w-6 text-emerald-600" />

          <div>

            <h2 className="text-lg font-semibold">
              Saúde do Produto
            </h2>

            <p className="text-sm text-gray-500">
              Avaliação automática da qualidade do anúncio
            </p>

          </div>

        </div>

        <Badge variant={getBadge(health.score)}>
          {health.score}/100
        </Badge>

      </div>

      <div className="space-y-2">

        <div className="flex justify-between text-sm">

          <span>Health Score</span>

          <span className={getColor(health.score)}>
            {health.score}%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200">

          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{
              width: `${health.score}%`,
            }}
          />

        </div>

      </div>

      <div className="grid grid-cols-2 gap-4">

        <Metric
          label="Título"
          value={health.title}
        />

        <Metric
          label="Descrição"
          value={health.description}
        />

        <Metric
          label="Imagem"
          value={health.image}
        />

        <Metric
          label="Estoque"
          value={health.stock}
        />

        <Metric
          label="Categoria"
          value={health.category}
        />

        <Metric
          label="Status"
          value={health.status}
        />

      </div>

      {health.strengths.length > 0 && (

        <div>

          <div className="mb-2 flex items-center gap-2 font-medium">

            <CheckCircle2
              size={18}
              className="text-green-600"
            />

            Pontos Fortes

          </div>

          <ul className="space-y-2">

            {health.strengths.map((item) => (

              <li
                key={item}
                className="text-sm text-gray-600"
              >
                • {item}
              </li>

            ))}

          </ul>

        </div>

      )}

      {health.warnings.length > 0 && (

        <div>

          <div className="mb-2 flex items-center gap-2 font-medium">

            <AlertTriangle
              size={18}
              className="text-yellow-500"
            />

            Atenção

          </div>

          <ul className="space-y-2">

            {health.warnings.map((item) => (

              <li
                key={item}
                className="text-sm text-gray-600"
              >
                • {item}
              </li>

            ))}

          </ul>

        </div>

      )}

      {health.recommendations.length > 0 && (

        <div>

          <div className="mb-2 flex items-center gap-2 font-medium">

            <Info
              size={18}
              className="text-sky-500"
            />

            Recomendações

          </div>

          <ul className="space-y-2">

            {health.recommendations.map((item) => (

              <li
                key={item}
                className="text-sm text-gray-600"
              >
                • {item}
              </li>

            ))}

          </ul>

        </div>

      )}

    </Card>
  )
}

interface MetricProps {
  label: string
  value: number
}

function Metric({
  label,
  value,
}: MetricProps) {
  return (
    <div className="rounded-xl border p-3">

      <div className="text-xs text-gray-500">
        {label}
      </div>

      <div className="mt-1 text-xl font-bold">
        {value}
      </div>

    </div>
  )
}
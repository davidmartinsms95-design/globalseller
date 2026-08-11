'use client'

import {
  Activity,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'

import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export interface ProductHealthCardProps {
  score: number

  strengths: string[]

  warnings: string[]

  suggestions: string[]
}

function getVariant(
  score: number,
): 'success' | 'warning' | 'error' {
  if (score >= 85) {
    return 'success'
  }

  if (score >= 60) {
    return 'warning'
  }

  return 'error'
}

function getColor(score: number) {
  if (score >= 85) {
    return 'text-emerald-400'
  }

  if (score >= 60) {
    return 'text-yellow-400'
  }

  return 'text-red-400'
}

export default function ProductHealthCard({
  score,
  strengths,
  warnings,
  suggestions,
}: ProductHealthCardProps) {
  return (
    <Card>

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-3">

            <Activity
              size={22}
              className={getColor(score)}
            />

            <h2 className="text-2xl font-bold text-white">
              Health Score
            </h2>

          </div>

          <p className="mt-3 max-w-xl text-zinc-400">

            Avaliação automática da qualidade do
            anúncio utilizando os critérios da
            Inteligência do GlobalSeller.

          </p>

        </div>

        <Badge variant={getVariant(score)}>
          {score}%
        </Badge>

      </div>

      <div className="mt-8">

        <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

          <div
            className={`
              h-full
              rounded-full
              transition-all
              duration-700
              ${
                score >= 85
                  ? 'bg-emerald-500'
                  : score >= 60
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }
            `}
            style={{
              width: `${score}%`,
            }}
          />

        </div>

      </div>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">

        <div>

          <div className="mb-5 flex items-center gap-2">

            <CheckCircle2
              size={18}
              className="text-emerald-400"
            />

            <h3 className="text-lg font-semibold text-white">
              Pontos Fortes
            </h3>

          </div>

          {strengths.length === 0 ? (

            <p className="text-sm text-zinc-500">
              Nenhum ponto forte identificado.
            </p>

          ) : (

            <div className="space-y-3">

              {strengths.map((item, index) => (

                <div
                  key={index}
                  className="
                    flex
                    items-start
                    gap-3
                    rounded-2xl
                    border
                    border-emerald-500/20
                    bg-emerald-500/5
                    p-4
                  "
                >

                  <CheckCircle2
                    size={18}
                    className="mt-0.5 text-emerald-400"
                  />

                  <p className="text-sm leading-6 text-zinc-300">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

        <div>

          <div className="mb-5 flex items-center gap-2">

            <AlertTriangle
              size={18}
              className="text-yellow-400"
            />

            <h3 className="text-lg font-semibold text-white">
              Pontos de Atenção
            </h3>

          </div>

          {warnings.length === 0 ? (

            <p className="text-sm text-zinc-500">
              Nenhum alerta encontrado.
            </p>

          ) : (

            <div className="space-y-3">

              {warnings.map((item, index) => (

                <div
                  key={index}
                  className="
                    flex
                    items-start
                    gap-3
                    rounded-2xl
                    border
                    border-yellow-500/20
                    bg-yellow-500/5
                    p-4
                  "
                >

                  <AlertTriangle
                    size={18}
                    className="mt-0.5 text-yellow-400"
                  />

                  <p className="text-sm leading-6 text-zinc-300">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
            <div className="mt-10">

        <div className="mb-5 flex items-center gap-2">

          <Activity
            size={18}
            className="text-sky-400"
          />

          <h3 className="text-lg font-semibold text-white">
            Recomendações da Inteligência Artificial
          </h3>

        </div>

        {suggestions.length === 0 ? (

          <div
            className="
              rounded-2xl
              border
              border-emerald-500/20
              bg-emerald-500/5
              p-5
            "
          >

            <p className="text-emerald-400 font-medium">
              Excelente!
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Seu anúncio já atende aos principais critérios
              de qualidade do GlobalSeller.
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {suggestions.map((item, index) => (

              <div
                key={index}
                className="
                  rounded-2xl
                  border
                  border-sky-500/20
                  bg-sky-500/5
                  p-4
                "
              >

                <div className="flex items-start gap-3">

                  <Activity
                    size={18}
                    className="mt-0.5 text-sky-400"
                  />

                  <p className="text-sm leading-6 text-zinc-300">
                    {item}
                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <p className="text-sm text-zinc-500">
            Saúde do anúncio
          </p>

          <p className={`mt-2 text-3xl font-bold ${getColor(score)}`}>
            {score}%
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <p className="text-sm text-zinc-500">
            Pontos fortes
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {strengths.length}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <p className="text-sm text-zinc-500">
            Melhorias sugeridas
          </p>

          <p className="mt-2 text-3xl font-bold text-orange-400">
            {suggestions.length}
          </p>

        </div>

      </div>
            <div className="mt-10 border-t border-zinc-800 pt-8">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <h3 className="text-lg font-semibold text-white">
              Status Geral
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              O Health Score é atualizado automaticamente sempre que
              as informações do produto forem alteradas. Quanto maior
              a pontuação, maiores as chances de melhor desempenho nos
              marketplaces integrados.
            </p>

          </div>

          <Badge variant={getVariant(score)}>
            {score >= 85
              ? 'Excelente'
              : score >= 60
              ? 'Bom'
              : 'Precisa de atenção'}
          </Badge>

        </div>

      </div>

    </Card>
  )
}
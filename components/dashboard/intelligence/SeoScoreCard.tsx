'use client'

import {
  Search,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'

import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export interface SeoScoreCardProps {
  score: number

  keywords: string[]

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

export default function SeoScoreCard({
  score,
  keywords,
  strengths,
  warnings,
  suggestions,
}: SeoScoreCardProps) {
  return (
    <Card>

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-3">

            <Search
              size={22}
              className={getColor(score)}
            />

            <h2 className="text-2xl font-bold text-white">
              SEO Score
            </h2>

          </div>

          <p className="mt-3 max-w-xl text-zinc-400">

            Avaliação da otimização do anúncio para
            Mercado Livre, Shopee e futuros marketplaces.

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
              Pontos Fortes de SEO
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
              Oportunidades de Melhoria
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

          <Search
            size={18}
            className="text-sky-400"
          />

          <h3 className="text-lg font-semibold text-white">
            Palavras-chave Encontradas
          </h3>

        </div>

        <div className="flex flex-wrap gap-3">

          {keywords.length === 0 ? (

            <Badge variant="error">
              Nenhuma palavra-chave encontrada
            </Badge>

          ) : (

            keywords.map((keyword, index) => (

              <Badge
                key={index}
                variant="info"
              >
                {keyword}
              </Badge>

            ))

          )}

        </div>

      </div>
            <div className="mt-10">

        <div className="mb-5 flex items-center gap-2">

          <Search
            size={18}
            className="text-sky-400"
          />

          <h3 className="text-lg font-semibold text-white">
            Recomendações para melhorar o SEO
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

            <p className="font-medium text-emerald-400">
              Excelente otimização!
            </p>

            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Seu anúncio já possui uma boa estrutura para
              posicionamento nos marketplaces.
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

                  <Search
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

      <div className="mt-10 grid gap-4 md:grid-cols-4">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <p className="text-sm text-zinc-500">
            SEO Score
          </p>

          <p className={`mt-2 text-3xl font-bold ${getColor(score)}`}>
            {score}%
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <p className="text-sm text-zinc-500">
            Keywords
          </p>

          <p className="mt-2 text-3xl font-bold text-sky-400">
            {keywords.length}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <p className="text-sm text-zinc-500">
            Pontos Fortes
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {strengths.length}
          </p>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <p className="text-sm text-zinc-500">
            Melhorias
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
              Diagnóstico SEO
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">

              O SEO Score é calculado considerando
              qualidade do título, descrição,
              palavras-chave, categoria, imagens e
              estrutura do anúncio.

            </p>

          </div>

          <Badge variant={getVariant(score)}>

            {score >= 90
              ? 'Excelente'
              : score >= 75
              ? 'Muito Bom'
              : score >= 60
              ? 'Bom'
              : 'Precisa Melhorar'}

          </Badge>

        </div>

      </div>

    </Card>
  )
}
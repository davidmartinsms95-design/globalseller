'use client'

import {
  Brain,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export interface AIRecommendation {
  id: string

  title: string

  description: string

  priority:
    | 'low'
    | 'medium'
    | 'high'

  category:
    | 'seo'
    | 'price'
    | 'stock'
    | 'publication'
    | 'sales'

  actionLabel?: string

  onApply?: () => void
}

interface AIRecommendationsProps {
  recommendations: AIRecommendation[]
}

function getPriorityVariant(
  priority: AIRecommendation['priority'],
):
  | 'success'
  | 'warning'
  | 'error' {
  switch (priority) {
    case 'low':
      return 'success'

    case 'medium':
      return 'warning'

    default:
      return 'error'
  }
}

function getCategoryLabel(
  category: AIRecommendation['category'],
) {
  switch (category) {
    case 'seo':
      return 'SEO'

    case 'price':
      return 'Preço'

    case 'stock':
      return 'Estoque'

    case 'publication':
      return 'Publicação'

    case 'sales':
      return 'Vendas'

    default:
      return 'IA'
  }
}

export default function AIRecommendations({
  recommendations,
}: AIRecommendationsProps) {
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
              Recomendações da IA
            </h2>

          </div>

          <p className="mt-3 max-w-2xl text-zinc-400">

            A Inteligência Artificial analisa
            continuamente seus anúncios para
            identificar oportunidades de melhoria.

          </p>

        </div>

        <Badge variant="premium">

          {recommendations.length} ações

        </Badge>

      </div>

      <div className="mt-10 space-y-5"></div>
              {recommendations.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-zinc-700 py-16 text-center">

            <Sparkles
              size={46}
              className="mx-auto mb-4 text-purple-500"
            />

            <h3 className="text-xl font-semibold text-white">
              Nenhuma recomendação encontrada
            </h3>

            <p className="mt-3 text-zinc-400">
              No momento a Inteligência Artificial
              não encontrou oportunidades de melhoria.
            </p>

          </div>

        ) : (

          recommendations.map(
            (recommendation) => (

              <div
                key={recommendation.id}
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
                        {getCategoryLabel(
                          recommendation.category,
                        )}
                      </Badge>

                      <Badge
                        variant={getPriorityVariant(
                          recommendation.priority,
                        )}
                      >
                        {recommendation.priority ===
                        'high'
                          ? 'Alta Prioridade'
                          : recommendation.priority ===
                            'medium'
                          ? 'Média Prioridade'
                          : 'Baixa Prioridade'}
                      </Badge>

                    </div>

                    <h3 className="text-xl font-bold text-white">
                      {recommendation.title}
                    </h3>

                    <p className="mt-3 leading-7 text-zinc-400">
                      {recommendation.description}
                    </p>

                  </div>

                  <div className="flex items-center">

                    <Button
                      onClick={() =>
                        recommendation.onApply?.()
                      }
                    >
                      {recommendation.actionLabel ??
                        'Aplicar'}

                      <ArrowRight
                        size={18}
                        className="ml-2"
                      />

                    </Button>

                  </div>

                </div>

              </div>

            ),
          )

        )}
                {recommendations.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-zinc-700 py-16 text-center">

            <Sparkles
              size={46}
              className="mx-auto mb-4 text-purple-500"
            />

            <h3 className="text-xl font-semibold text-white">
              Nenhuma recomendação encontrada
            </h3>

            <p className="mt-3 text-zinc-400">
              No momento a Inteligência Artificial
              não encontrou oportunidades de melhoria.
            </p>

          </div>

        ) : (

          recommendations.map(
            (recommendation) => (

              <div
                key={recommendation.id}
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
                        {getCategoryLabel(
                          recommendation.category,
                        )}
                      </Badge>

                      <Badge
                        variant={getPriorityVariant(
                          recommendation.priority,
                        )}
                      >
                        {recommendation.priority ===
                        'high'
                          ? 'Alta Prioridade'
                          : recommendation.priority ===
                            'medium'
                          ? 'Média Prioridade'
                          : 'Baixa Prioridade'}
                      </Badge>

                    </div>

                    <h3 className="text-xl font-bold text-white">
                      {recommendation.title}
                    </h3>

                    <p className="mt-3 leading-7 text-zinc-400">
                      {recommendation.description}
                    </p>

                  </div>

                  <div className="flex items-center">

                    <Button
                      onClick={() =>
                        recommendation.onApply?.()
                      }
                    >
                      {recommendation.actionLabel ??
                        'Aplicar'}

                      <ArrowRight
                        size={18}
                        className="ml-2"
                      />

                    </Button>

                  </div>

                </div>

              </div>

            ),
          )

        )}
              <div className="mt-10 border-t border-zinc-800 pt-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="text-lg font-semibold text-white">
              Central de Recomendações
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">

              Todas as recomendações são geradas pela
              Inteligência Artificial do GlobalSeller com
              base nas informações do produto, desempenho
              do anúncio, SEO, estoque, margem de lucro,
              competitividade e comportamento dos
              marketplaces integrados.

            </p>

          </div>

          <Badge variant="premium">
            IA Ativa
          </Badge>

        </div>

      </div>

    </Card>
  )
}
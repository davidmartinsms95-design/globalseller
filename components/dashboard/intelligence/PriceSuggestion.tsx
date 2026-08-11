'use client'

import { useMemo } from 'react'

import {
  Sparkles,
  TrendingUp,
  DollarSign,
} from 'lucide-react'

import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

export interface PriceSuggestionProps {
  costPrice: number

  currentPrice: number

  suggestedPrice: number

  minimumPrice: number

  premiumPrice: number

  marketplaceFee?: number

  shippingCost?: number

  onApplyPrice?: (
    price: number,
  ) => void
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat(
    'pt-BR',
    {
      style: 'currency',
      currency: 'BRL',
    },
  ).format(value)
}

export default function PriceSuggestion({
  costPrice,
  currentPrice,
  suggestedPrice,
  minimumPrice,
  premiumPrice,
  marketplaceFee = 16,
  shippingCost = 0,
  onApplyPrice,
}: PriceSuggestionProps) {
  const analysis = useMemo(() => {
    const marketplaceCost =
      suggestedPrice *
      (marketplaceFee / 100)

    const totalCost =
      costPrice +
      marketplaceCost +
      shippingCost

    const estimatedProfit =
      suggestedPrice - totalCost

    const margin =
      suggestedPrice > 0
        ? (estimatedProfit /
            suggestedPrice) *
          100
        : 0

    return {
      marketplaceCost,
      totalCost,
      estimatedProfit,
      margin,
    }
  }, [
    suggestedPrice,
    costPrice,
    marketplaceFee,
    shippingCost,
  ])

  const difference =
    suggestedPrice -
    currentPrice

  const badgeVariant =
    difference > 0
      ? 'premium'
      : difference === 0
      ? 'info'
      : 'warning'

  return (
    <Card>

      <div className="flex items-start justify-between">

        <div>

          <div className="flex items-center gap-3">

            <Sparkles
              size={22}
              className="text-orange-400"
            />

            <h2 className="text-2xl font-bold text-white">
              Sugestão Inteligente de Preço
            </h2>

          </div>

          <p className="mt-3 max-w-2xl text-zinc-400">

            A Inteligência Artificial analisa
            margem, custos e competitividade
            para recomendar o melhor preço.

          </p>

        </div>

        <Badge variant={badgeVariant}>

          IA

        </Badge>

      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

          <p className="text-sm text-zinc-500">
            Preço Atual
          </p>

          <h3 className="mt-3 text-3xl font-bold text-white">
            {formatCurrency(currentPrice)}
          </h3>

        </div>

        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Preço Sugerido
          </p>

          <h3 className="mt-3 text-3xl font-bold text-orange-400">
            {formatCurrency(suggestedPrice)}
          </h3>

        </div>

        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Preço Mínimo
          </p>

          <h3 className="mt-3 text-3xl font-bold text-red-400">
            {formatCurrency(minimumPrice)}
          </h3>

        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

          <p className="text-sm text-zinc-500">
            Preço Premium
          </p>

          <h3 className="mt-3 text-3xl font-bold text-emerald-400">
            {formatCurrency(premiumPrice)}
          </h3>

        </div>

      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">

          <div className="mb-5 flex items-center gap-3">

            <DollarSign
              size={22}
              className="text-emerald-400"
            />

            <h3 className="text-xl font-semibold text-white">
              Simulação Financeira
            </h3>

          </div>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span className="text-zinc-400">
                Custo do Produto
              </span>

              <strong className="text-white">
                {formatCurrency(costPrice)}
              </strong>

            </div>

            <div className="flex justify-between">

              <span className="text-zinc-400">
                Taxa Marketplace
              </span>

              <strong className="text-orange-400">
                {formatCurrency(
                  analysis.marketplaceCost,
                )}
              </strong>

            </div>

            <div className="flex justify-between">

              <span className="text-zinc-400">
                Frete
              </span>

              <strong className="text-white">
                {formatCurrency(
                  shippingCost,
                )}
              </strong>

            </div>

            <div className="border-t border-zinc-800 pt-4">

              <div className="flex justify-between">

                <span className="font-semibold text-zinc-300">
                  Custo Total
                </span>

                <strong className="text-red-400">
                  {formatCurrency(
                    analysis.totalCost,
                  )}
                </strong>

              </div>

            </div>

          </div>

        </div>

        <div className="rounded-3xl border border-sky-500/20 bg-sky-500/5 p-6">

          <div className="mb-5 flex items-center gap-3">

            <TrendingUp
              size={22}
              className="text-sky-400"
            />

            <h3 className="text-xl font-semibold text-white">
              Resultado Esperado
            </h3>

          </div>

          <div className="space-y-5">

            <div>

              <p className="text-sm text-zinc-500">
                Lucro Estimado
              </p>

              <h2 className="mt-2 text-4xl font-bold text-emerald-400">
                {formatCurrency(
                  analysis.estimatedProfit,
                )}
              </h2>

            </div>

            <div>

              <p className="text-sm text-zinc-500">
                Margem
              </p>

              <h2 className="mt-2 text-4xl font-bold text-sky-400">
                {analysis.margin.toFixed(1)}%
              </h2>

            </div>

          </div>

        </div>

      </div>
            <div className="mt-10 rounded-3xl border border-orange-500/20 bg-orange-500/5 p-6">

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-xl font-bold text-white">
              Análise da Inteligência Artificial
            </h3>

            <p className="mt-2 text-zinc-400">
              A IA comparou o preço atual com a margem
              estimada e identificou a melhor estratégia.
            </p>

          </div>

          <Badge variant={badgeVariant}>
            {difference > 0
              ? 'Aumentar preço'
              : difference < 0
              ? 'Reduzir preço'
              : 'Preço ideal'}
          </Badge>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

            <p className="text-sm text-zinc-500">
              Diferença
            </p>

            <h2
              className={`mt-2 text-3xl font-bold ${
                difference > 0
                  ? 'text-emerald-400'
                  : difference < 0
                  ? 'text-red-400'
                  : 'text-sky-400'
              }`}
            >
              {difference >= 0 ? '+' : ''}
              {formatCurrency(difference)}
            </h2>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

            <p className="text-sm text-zinc-500">
              Competitividade
            </p>

            <h2 className="mt-2 text-3xl font-bold text-orange-400">

              {analysis.margin >= 30
                ? 'Alta'
                : analysis.margin >= 15
                ? 'Média'
                : 'Baixa'}

            </h2>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">

            <p className="text-sm text-zinc-500">
              Recomendação
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">

              {analysis.margin >= 30
                ? 'Manter'
                : 'Revisar'}

            </h2>

          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

          <h4 className="font-semibold text-white">
            Resumo da IA
          </h4>

          <p className="mt-3 leading-7 text-zinc-400">

            O preço sugerido busca maximizar o lucro
            mantendo competitividade no marketplace.
            A análise considera custos, taxas e margem
            mínima para manter a operação saudável.

          </p>

        </div>

      </div>
            <div className="mt-10 border-t border-zinc-800 pt-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="text-lg font-semibold text-white">
              Aplicar Sugestão Inteligente
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">

              Você pode utilizar o preço sugerido pela
              Inteligência Artificial para atualizar
              automaticamente o anúncio e aumentar a
              competitividade mantendo uma margem
              saudável.

            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              onApplyPrice?.(suggestedPrice)
            }
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
              hover:shadow-lg
              hover:shadow-orange-500/30
            "
          >
            Aplicar Preço Sugerido
          </button>

        </div>

      </div>

    </Card>
  )
}
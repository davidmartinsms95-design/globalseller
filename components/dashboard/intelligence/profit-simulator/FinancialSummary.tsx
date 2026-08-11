import { BarChart3 } from 'lucide-react'

import Card from '@/components/ui/Card'

interface FinancialSummaryProps {
  costPrice: number
  feeValue: number
  shipping: number
  totalCost: number
  formatCurrency: (value: number) => string
}

export function FinancialSummary({
  costPrice,
  feeValue,
  shipping,
  totalCost,
  formatCurrency,
}: FinancialSummaryProps) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <BarChart3
          size={24}
          className="text-orange-400"
        />

        <h3 className="text-xl font-semibold text-white">
          Indicadores Financeiros
        </h3>
      </div>

      <div className="mt-8 space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            Custo Produto
          </span>

          <strong className="text-white">
            {formatCurrency(costPrice)}
          </strong>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            Comissão
          </span>

          <strong className="text-orange-400">
            {formatCurrency(feeValue)}
          </strong>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            Frete
          </span>

          <strong className="text-white">
            {formatCurrency(shipping)}
          </strong>
        </div>

        <div className="border-t border-zinc-800 pt-5">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-zinc-300">
              Custo Total
            </span>

            <strong className="text-red-400">
              {formatCurrency(totalCost)}
            </strong>
          </div>
        </div>
      </div>
    </Card>
  )
}
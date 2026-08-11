import Card from '@/components/ui/Card'
import { Landmark } from 'lucide-react'

interface BreakEvenCardProps {
  breakEven: number
  salePrice: number
  minimumPrice: number
  recommendedPrice: number
  formatCurrency: (value: number) => string
}

export default function BreakEvenCard({
  breakEven,
  salePrice,
  minimumPrice,
  recommendedPrice,
  formatCurrency,
}: BreakEvenCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <Landmark
          size={24}
          className="text-emerald-400"
        />

        <h3 className="text-xl font-semibold text-white">
          Break-even
        </h3>
      </div>

      <div className="mt-8">
        <h2 className="text-5xl font-bold text-emerald-400">
          {formatCurrency(breakEven)}
        </h2>

        <p className="mt-4 leading-7 text-zinc-400">
          Este é o menor valor possível
          para vender sem prejuízo,
          considerando custo do produto
          e frete.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            Preço Atual
          </span>

          <strong className="text-white">
            {formatCurrency(salePrice)}
          </strong>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-zinc-400">
            Preço Mínimo
          </span>

          <strong className="text-orange-400">
            {formatCurrency(minimumPrice)}
          </strong>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-zinc-400">
            Preço Ideal
          </span>

          <strong className="text-emerald-400">
            {formatCurrency(recommendedPrice)}
          </strong>
        </div>
      </div>
    </Card>
  )
}
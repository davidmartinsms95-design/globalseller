import Card from '@/components/ui/Card'

interface ComparisonCardProps {
  currentPrice: number
  salePrice: number
  recommendedPrice: number
  marketplaceName: string
  marketplaceFee: number
  marketplaceShipping: number
  formatCurrency: (value: number) => string
}

export default function ComparisonCard({
  currentPrice,
  salePrice,
  recommendedPrice,
  marketplaceName,
  marketplaceFee,
  marketplaceShipping,
  formatCurrency,
}: ComparisonCardProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card>
        <h3 className="text-lg font-semibold text-white">
          Comparativo
        </h3>

        <div className="mt-8 space-y-5">
          <div className="flex justify-between">
            <span className="text-zinc-400">
              Preço Atual
            </span>

            <strong className="text-white">
              {formatCurrency(currentPrice)}
            </strong>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">
              Preço Simulado
            </span>

            <strong className="text-orange-400">
              {formatCurrency(salePrice)}
            </strong>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">
              Melhor Preço
            </span>

            <strong className="text-emerald-400">
              {formatCurrency(recommendedPrice)}
            </strong>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white">
          Resultado
        </h3>

        <div className="mt-8 space-y-5">
          <div className="flex justify-between">
            <span className="text-zinc-400">
              Marketplace
            </span>

            <strong className="text-white">
              {marketplaceName}
            </strong>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">
              Comissão
            </span>

            <strong className="text-orange-400">
              {marketplaceFee}%
            </strong>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">
              Frete
            </span>

            <strong className="text-white">
              {formatCurrency(
                marketplaceShipping,
              )}
            </strong>
          </div>
        </div>
      </Card>
    </div>
  )
}
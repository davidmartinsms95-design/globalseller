import Card from '@/components/ui/Card'
import { Sparkles } from 'lucide-react'

interface MarketplaceData {
  fee: number
  shipping: number
}

interface SimulationResult {
  margin: number
}

interface AIRecommendationCardProps {
  simulation: SimulationResult
  recommendedPrice: number
  costPrice: number
  marketplace: MarketplaceData
  formatCurrency: (value: number) => string
  calculateSimulation: (
    salePrice: number,
    costPrice: number,
    fee: number,
    shipping: number,
  ) => {
    profit: number
    roi: number
  }
}

export default function AIRecommendationCard({
  simulation,
  recommendedPrice,
  costPrice,
  marketplace,
  formatCurrency,
  calculateSimulation,
}: AIRecommendationCardProps) {
  const projectedSimulation = calculateSimulation(
    recommendedPrice,
    costPrice,
    marketplace.fee,
    marketplace.shipping,
  )

  return (
    <Card>
      <div className="flex items-center gap-3">
        <Sparkles
          className="text-orange-400"
          size={24}
        />

        <h3 className="text-xl font-semibold text-white">
          Inteligência Artificial
        </h3>
      </div>

      <div className="mt-8 space-y-6">
        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
          <h4 className="font-semibold text-white">
            Recomendação
          </h4>

          <p className="mt-3 leading-7 text-zinc-300">
            {simulation.margin >= 35 &&
              'Sua margem está excelente. Você possui espaço para investir em anúncios patrocinados sem comprometer significativamente a lucratividade.'}

            {simulation.margin >= 20 &&
              simulation.margin < 35 &&
              'O produto apresenta boa rentabilidade. Pequenos aumentos de preço podem elevar o lucro mantendo competitividade.'}

            {simulation.margin >= 10 &&
              simulation.margin < 20 &&
              'A margem está aceitável, porém recomenda-se revisar frete, fornecedores ou aumentar discretamente o preço de venda.'}

            {simulation.margin < 10 &&
              'O lucro está abaixo do ideal. Recomendamos renegociar custos ou reajustar imediatamente o preço.'}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-sm text-zinc-500">
              Melhor Preço
            </p>

            <h3 className="mt-3 text-3xl font-bold text-emerald-400">
              {formatCurrency(recommendedPrice)}
            </h3>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-sm text-zinc-500">
              Lucro Projetado
            </p>

            <h3 className="mt-3 text-3xl font-bold text-orange-400">
              {formatCurrency(projectedSimulation.profit)}
            </h3>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <p className="text-sm text-zinc-500">
              ROI Projetado
            </p>

            <h3 className="mt-3 text-3xl font-bold text-sky-400">
              {projectedSimulation.roi.toFixed(1)}%
            </h3>
          </div>
        </div>
      </div>
    </Card>
  )
}
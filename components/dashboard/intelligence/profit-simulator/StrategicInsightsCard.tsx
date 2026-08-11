import { Target } from 'lucide-react'

import Card from '@/components/ui/Card'

interface StrategicInsightsCardProps {
  margin: number
  salePrice: number
  recommendedPrice: number
}

export default function StrategicInsightsCard({
  margin,
  salePrice,
  recommendedPrice,
}: StrategicInsightsCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <Target
          size={24}
          className="text-emerald-400"
        />

        <h3 className="text-xl font-semibold text-white">
          Insights Estratégicos
        </h3>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <h4 className="font-semibold text-emerald-400">
            Lucratividade
          </h4>

          <p className="mt-4 leading-7 text-zinc-300">
            {margin >= 35
              ? 'Excelente margem para escalar vendas e investir em anúncios.'
              : margin >= 20
                ? 'Produto saudável financeiramente com boa competitividade.'
                : margin >= 10
                  ? 'Margem moderada. Vale revisar fornecedores.'
                  : 'Margem muito baixa. Reavalie imediatamente a precificação.'}
          </p>
        </div>

        <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-6">
          <h4 className="font-semibold text-sky-400">
            Competitividade
          </h4>

          <p className="mt-4 leading-7 text-zinc-300">
            O preço atual está{' '}
            {salePrice >= recommendedPrice
              ? 'acima'
              : 'abaixo'}{' '}
            da faixa considerada ideal para este cenário.
          </p>
        </div>

        <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
          <h4 className="font-semibold text-orange-400">
            Próxima ação
          </h4>

          <p className="mt-4 leading-7 text-zinc-300">
            Utilize o cenário Premium para maximizar lucro ou o cenário
            Competitivo para aumentar a taxa de conversão.
          </p>
        </div>
      </div>
    </Card>
  )
}
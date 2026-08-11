import { BarChart3, Sparkles } from 'lucide-react'

import Card from '@/components/ui/Card'

interface ExecutivePanelCardProps {
  recommendedPrice: number
  profit: number
  roi: number
  roiColor: string
  margin: number
  formatCurrency: (value: number) => string
}

export default function ExecutivePanelCard({
  recommendedPrice,
  profit,
  roi,
  roiColor,
  margin,
  formatCurrency,
}: ExecutivePanelCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <BarChart3
          size={24}
          className="text-violet-400"
        />

        <h3 className="text-xl font-semibold text-white">
          Painel Executivo
        </h3>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h4 className="text-sm text-zinc-500">
            Melhor Preço
          </h4>

          <h2 className="mt-3 text-3xl font-bold text-orange-400">
            {formatCurrency(recommendedPrice)}
          </h2>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h4 className="text-sm text-zinc-500">
            Lucro Estimado
          </h4>

          <h2 className="mt-3 text-3xl font-bold text-emerald-400">
            {formatCurrency(profit)}
          </h2>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h4 className="text-sm text-zinc-500">
            ROI
          </h4>

          <h2 className={`mt-3 text-3xl font-bold ${roiColor}`}>
            {roi.toFixed(1)}%
          </h2>
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-orange-500/20 bg-orange-500/5 p-8">
        <div className="flex items-center gap-3">
          <Sparkles
            className="text-orange-400"
            size={26}
          />

          <h3 className="text-xl font-semibold text-white">
            Recomendação Final da IA
          </h3>
        </div>

        <p className="mt-6 leading-8 text-zinc-300">
          {margin >= 35 && (
            <>
              A operação apresenta excelente lucratividade. A recomendação é
              manter este preço e considerar campanhas patrocinadas para
              aumentar o volume de vendas.
            </>
          )}

          {margin >= 20 && margin < 35 && (
            <>
              O cenário é saudável e permite pequenos reajustes positivos de
              preço para aumentar o lucro sem comprometer significativamente a
              competitividade.
            </>
          )}

          {margin >= 10 && margin < 20 && (
            <>
              Há potencial para melhorar a rentabilidade negociando custos,
              reduzindo despesas logísticas ou ajustando discretamente o preço
              final.
            </>
          )}

          {margin < 10 && (
            <>
              O preço atual oferece pouca segurança financeira. Revise
              fornecedores, logística ou aumente o preço antes de investir em
              anúncios pagos.
            </>
          )}
        </p>
      </div>
    </Card>
  )
}
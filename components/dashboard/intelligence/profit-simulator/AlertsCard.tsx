import Card from '@/components/ui/Card'

interface AlertsCardProps {
  margin: number
}

export default function AlertsCard({
  margin,
}: AlertsCardProps) {
  return (
    <Card>
      <h3 className="text-xl font-semibold text-white">
        Alertas Inteligentes
      </h3>

      <div className="mt-8 space-y-4">
        {margin < 10 && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
            <h4 className="font-semibold text-red-400">
              Margem Crítica
            </h4>

            <p className="mt-2 text-zinc-300">
              O lucro está muito baixo para absorver
              oscilações de comissão, frete ou anúncios
              patrocinados.
            </p>
          </div>
        )}

        {margin >= 10 && margin < 20 && (
          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
            <h4 className="font-semibold text-yellow-400">
              Atenção
            </h4>

            <p className="mt-2 text-zinc-300">
              Há espaço para otimizar a margem
              negociando melhores custos de aquisição.
            </p>
          </div>
        )}

        {margin >= 20 && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <h4 className="font-semibold text-emerald-400">
              Excelente Resultado
            </h4>

            <p className="mt-2 text-zinc-300">
              O produto apresenta boa rentabilidade e
              potencial para escalar campanhas de vendas.
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
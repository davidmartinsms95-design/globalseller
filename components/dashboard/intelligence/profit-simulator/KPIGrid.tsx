import {
  DollarSign,
  Percent,
  Target,
  TrendingUp,
} from 'lucide-react'

import { MetricCard } from './MetricCard'

interface SimulationData {
  profit: number
  margin: number
  roi: number
  markup: number
}

interface KPIGridProps {
  simulation: SimulationData
  profitColor: string
  roiColor: string
  formatCurrency: (value: number) => string
}

export function KPIGrid({
  simulation,
  profitColor,
  roiColor,
  formatCurrency,
}: KPIGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Lucro Líquido"
        value={formatCurrency(simulation.profit)}
        valueClassName={profitColor}
        icon={DollarSign}
        iconClassName="text-emerald-400"
        iconContainerClassName="bg-emerald-500/10"
      />

      <MetricCard
        title="Margem"
        value={`${simulation.margin.toFixed(1)}%`}
        valueClassName="text-sky-400"
        icon={TrendingUp}
        iconClassName="text-sky-400"
        iconContainerClassName="bg-sky-500/10"
      />

      <MetricCard
        title="ROI"
        value={`${simulation.roi.toFixed(1)}%`}
        valueClassName={roiColor}
        icon={Target}
        iconClassName="text-orange-400"
        iconContainerClassName="bg-orange-500/10"
      />

      <MetricCard
        title="Markup"
        value={`${simulation.markup.toFixed(1)}%`}
        valueClassName="text-violet-400"
        icon={Percent}
        iconClassName="text-violet-400"
        iconContainerClassName="bg-violet-500/10"
      />
    </div>
  )
}
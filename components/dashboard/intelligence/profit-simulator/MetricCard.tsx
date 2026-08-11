import { LucideIcon } from 'lucide-react'

import Card from '@/components/ui/Card'

interface MetricCardProps {
  title: string
  value: string
  valueClassName: string
  icon: LucideIcon
  iconClassName: string
  iconContainerClassName: string
}

export function MetricCard({
  title,
  value,
  valueClassName,
  icon: Icon,
  iconClassName,
  iconContainerClassName,
}: MetricCardProps) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">
            {title}
          </p>

          <h2
            className={`mt-3 text-3xl font-bold ${valueClassName}`}
          >
            {value}
          </h2>
        </div>

        <div
          className={`rounded-2xl p-4 ${iconContainerClassName}`}
        >
          <Icon
            className={iconClassName}
            size={26}
          />
        </div>
      </div>
    </Card>
  )
}
import {
  LucideIcon,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'

import Card from '@/components/ui/Card'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
  trend?: 'up' | 'down'
  trendText?: string
  variant?:
    | 'default'
    | 'success'
    | 'warning'
    | 'error'
    | 'glass'
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-orange-500',
  trend,
  trendText,
  variant = 'default',
}: StatCardProps) {
  return (
    <Card
      variant={variant}
      className="group relative overflow-hidden"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-orange-500/5 blur-3xl transition-all duration-500 group-hover:scale-150" />

      <div className="relative flex items-start justify-between">
        <div className="flex flex-1 flex-col">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-400">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white lg:text-5xl">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-3 text-sm leading-6 text-zinc-500">
              {subtitle}
            </p>
          )}

          {trend && trendText && (
            <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/70 px-3 py-1">
              {trend === 'up' ? (
                <TrendingUp
                  size={15}
                  className="text-emerald-400"
                />
              ) : (
                <TrendingDown
                  size={15}
                  className="text-red-400"
                />
              )}

              <span
                className={`text-sm font-semibold ${
                  trend === 'up'
                    ? 'text-emerald-400'
                    : 'text-red-400'
                }`}
              >
                {trendText}
              </span>
            </div>
          )}
        </div>

        <div
          className={`
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
            border-zinc-700
            bg-zinc-800/80
            shadow-lg
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:rotate-3
            ${iconColor}
          `}
        >
          <Icon size={30} />
        </div>
      </div>
    </Card>
  )
}
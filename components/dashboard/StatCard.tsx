import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-orange-500',
}: StatCardProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-orange-500 hover:shadow-lg">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-zinc-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-zinc-500">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`rounded-2xl bg-zinc-800 p-4 ${iconColor}`}
        >
          <Icon size={28} />
        </div>

      </div>
    </div>
  )
}
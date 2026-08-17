import { ReactNode } from 'react'
import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-dashed
        border-zinc-700
        bg-zinc-900/70
        px-10
        py-20
        text-center
        backdrop-blur-xl
      "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col items-center">

        <div
          className="
            mb-8
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            border
            border-zinc-700
            bg-zinc-800
            shadow-lg
          "
        >
          {icon ?? (
            <Inbox
              size={42}
              className="text-zinc-400"
            />
          )}
        </div>

        <h2 className="text-3xl font-bold text-white">
          {title}
        </h2>

        {description && (
          <p className="mt-4 max-w-lg text-lg leading-7 text-zinc-400">
            {description}
          </p>
        )}

        {action && (
          <div className="mt-10">
            {action}
          </div>
        )}

      </div>
    </div>
  )
}
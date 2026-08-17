import { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  badge?: string
}

export default function PageHeader({
  title,
  description,
  actions,
  badge,
}: PageHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-8 border-b border-zinc-800/60 pb-8 lg:flex-row lg:items-end lg:justify-between">

      <div className="space-y-4">

        {badge && (
          <span
            className="
              inline-flex
              rounded-full
              border
              border-orange-500/30
              bg-orange-500/10
              px-3
              py-1
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-orange-400
            "
          >
            {badge}
          </span>
        )}

        <h1
          className="
            bg-gradient-to-r
            from-white
            via-zinc-100
            to-zinc-400
            bg-clip-text
            text-4xl
            font-bold
            tracking-tight
            text-transparent
            md:text-5xl
          "
        >
          {title}
        </h1>

        {description && (
          <p className="max-w-3xl text-lg leading-8 text-zinc-400">
            {description}
          </p>
        )}

      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-3">
          {actions}
        </div>
      )}

    </div>
  )
}
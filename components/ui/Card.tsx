import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?:
    | 'default'
    | 'success'
    | 'warning'
    | 'error'
    | 'glass'
  hover?: boolean
}

export default function Card({
  children,
  className = '',
  variant = 'default',
  hover = true,
}: CardProps) {
  const variants = {
    default: `
      border-zinc-800/70
      bg-zinc-900/80
      backdrop-blur-xl
      shadow-lg
      shadow-black/20
    `,

    success: `
      border-emerald-500/30
      bg-emerald-500/10
      backdrop-blur-xl
    `,

    warning: `
      border-yellow-500/30
      bg-yellow-500/10
      backdrop-blur-xl
    `,

    error: `
      border-red-500/30
      bg-red-500/10
      backdrop-blur-xl
    `,

    glass: `
      border-white/10
      bg-white/5
      backdrop-blur-2xl
    `,
  }

  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        p-8
        transition-all
        duration-300
        ${hover ? 'hover:-translate-y-1 hover:shadow-2xl' : ''}
        ${hover ? 'hover:border-orange-500/60' : ''}
        ${variants[variant]}
        ${className}
      `}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
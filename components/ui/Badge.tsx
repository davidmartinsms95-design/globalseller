import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?:
    | 'default'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'premium'

  size?: 'sm' | 'md'

  className?: string
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variants = {
    default: `
      border border-zinc-700
      bg-zinc-800/70
      text-zinc-200
    `,

    success: `
      border border-emerald-500/30
      bg-emerald-500/10
      text-emerald-400
    `,

    warning: `
      border border-yellow-500/30
      bg-yellow-500/10
      text-yellow-400
    `,

    error: `
      border border-red-500/30
      bg-red-500/10
      text-red-400
    `,

    info: `
      border border-sky-500/30
      bg-sky-500/10
      text-sky-400
    `,

    premium: `
      border border-orange-500/30
      bg-gradient-to-r
      from-orange-500/15
      to-amber-500/15
      text-orange-300
    `,
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-3 py-1 text-xs',
  }

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        font-semibold
        tracking-wide
        transition-all
        backdrop-blur-sm
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
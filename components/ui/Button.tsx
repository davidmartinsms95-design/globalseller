import { ButtonHTMLAttributes } from 'react'

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'destructive'
    | 'success'
    | 'ghost'
    | 'outline'
  loading?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
    primary: `
      bg-gradient-to-r
      from-orange-500
      to-orange-600
      text-white
      hover:from-orange-400
      hover:to-orange-500
      shadow-lg
      shadow-orange-500/20
    `,

    secondary: `
      border
      border-zinc-700
      bg-zinc-900
      text-white
      hover:bg-zinc-800
    `,

    danger: `
      bg-gradient-to-r
      from-red-600
      to-red-500
      text-white
      hover:opacity-90
    `,

    destructive: `
      bg-gradient-to-r
      from-red-700
      to-red-600
      text-white
      hover:from-red-600
      hover:to-red-500
      shadow-lg
      shadow-red-500/20
    `,

    success: `
      bg-gradient-to-r
      from-emerald-600
      to-emerald-500
      text-white
      hover:opacity-90
    `,

    ghost: `
      bg-transparent
      border
      border-zinc-700
      text-zinc-300
      hover:bg-zinc-800
    `,

    outline: `
      border
      border-orange-500/60
      bg-transparent
      text-orange-400
      hover:bg-orange-500/10
      hover:border-orange-400
      hover:text-orange-300
    `,
  }

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        px-6
        py-3
        font-semibold
        transition-all
        duration-300
        hover:-translate-y-0.5
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${variants[variant]}
        ${className}
      `}
    >
      {loading && (
        <div
          className="
            h-4
            w-4
            animate-spin
            rounded-full
            border-2
            border-white/30
            border-t-white
          "
        />
      )}

      {children}
    </button>
  )
}
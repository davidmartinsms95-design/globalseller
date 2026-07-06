import { ButtonHTMLAttributes } from 'react'

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      'bg-orange-500 hover:bg-orange-400 text-white',
    secondary:
      'bg-zinc-800 hover:bg-zinc-700 text-white',
    danger:
      'bg-red-600 hover:bg-red-500 text-white',
  }

  return (
    <button
      {...props}
      className={`rounded-xl px-6 py-3 font-semibold transition ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
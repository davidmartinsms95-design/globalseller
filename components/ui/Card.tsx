import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
}

export default function Card({
  children,
}: CardProps) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        p-8
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-orange-500
        hover:shadow-[0_0_35px_rgba(249,115,22,0.18)]
      "
    >
      {children}
    </div>
  )
}
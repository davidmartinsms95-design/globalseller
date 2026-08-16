'use client'

import Link from 'next/link'

import Button from '@/components/ui/Button'

interface ProductActionsProps {
  productId: string
  permalink?: string | null
  onRemove: () => void
}

export default function ProductActions({
  productId,
  permalink,
  onRemove,
}: ProductActionsProps) {
  return (
    <div className="space-y-3">

      <Link
        href={`/dashboard/publish?id=${productId}`}
      >
        <Button className="w-full">
          🚀 Preparar Publicação
        </Button>
      </Link>

      <Button
        variant="outline"
        className="w-full"
      >
        🤖 Abrir Inteligência
      </Button>

      {permalink && (
        <Link
          href={permalink}
          target="_blank"
        >
          <Button
            variant="ghost"
            className="w-full"
          >
            🌎 Ver anúncio
          </Button>
        </Link>
      )}

      <Button
        variant="destructive"
        className="w-full"
        onClick={onRemove}
      >
        🗑 Remover do Catálogo
      </Button>

    </div>
  )
}
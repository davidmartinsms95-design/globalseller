'use client'

import { useState } from 'react'

interface Props {
  productId: string
  permalink: string | null
  status: string | null
}

export default function PublishedProductActions({
  productId,
  permalink,
  status,
}: Props) {
    const [loading, setLoading] = useState(false)

async function syncProduct() {
  try {
    setLoading(true)

    const response = await fetch(
      '/api/integrations/mercadolivre/update-stock',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      alert(data.message)
      return
    }

    alert('Produto sincronizado com sucesso!')
  } catch (error) {
    console.error(error)
    alert('Erro ao sincronizar produto.')
  } finally {
    setLoading(false)
  }
}
  return (
    <div className="flex flex-wrap gap-2">

      {permalink && (
        <a
          href={permalink}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          🌎 Abrir
        </a>
      )}

      <button
  onClick={syncProduct}
  disabled={loading}
  className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:opacity-50"
>
  {loading ? 'Sincronizando...' : '🔄 Sincronizar'}
</button>

      <button
        className="rounded-lg bg-zinc-800 px-3 py-2 text-sm font-semibold transition hover:bg-zinc-700"
      >
        ✏️ Editar
      </button>

      <button
        className="rounded-lg bg-yellow-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-yellow-500"
      >
        ⏸️ Pausar
      </button>

      <button
        className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
      >
        🗑 Encerrar
      </button>

    </div>
  )
}
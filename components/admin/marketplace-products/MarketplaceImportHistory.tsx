'use client'

import { useEffect, useState } from 'react'

interface HistoryItem {
  id: string
  fileName: string
  total: number
  imported: number
  duplicates: number
  errors: number
  duration: number
  createdAt: string

  supplier: {
    companyName: string
  }
}

export default function MarketplaceImportHistory() {
  const [history, setHistory] = useState<
    HistoryItem[]
  >([])

  const [loading, setLoading] =
    useState(true)

  async function loadHistory() {
    try {
      const response = await fetch(
        '/api/admin/marketplace-products/import/history'
      )

      const data =
        await response.json()

      setHistory(data.history ?? [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadHistory()
  }, [])

  if (loading) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
        Carregando histórico...
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-400">
        Nenhuma importação encontrada.
      </div>
    )
  }

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold text-white">
        Histórico de Importações
      </h2>

      {history.map((item) => (

        <div
          key={item.id}
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
        >

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h3 className="text-xl font-bold text-white">
                {item.supplier.companyName}
              </h3>

              <p className="text-zinc-400">
                {item.fileName}
              </p>

            </div>

            <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">
              Concluído
            </span>

          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">

            <div>

              <p className="text-sm text-zinc-500">
                Total
              </p>

              <p className="text-2xl font-bold text-white">
                {item.total}
              </p>

            </div>

            <div>

              <p className="text-sm text-zinc-500">
                Importados
              </p>

              <p className="text-2xl font-bold text-green-400">
                {item.imported}
              </p>

            </div>

            <div>

              <p className="text-sm text-zinc-500">
                Duplicados
              </p>

              <p className="text-2xl font-bold text-yellow-400">
                {item.duplicates}
              </p>

            </div>

            <div>

              <p className="text-sm text-zinc-500">
                Erros
              </p>

              <p className="text-2xl font-bold text-red-400">
                {item.errors}
              </p>

            </div>

            <div>

  <p className="text-sm text-zinc-500">
    Tempo
  </p>

  <p className="text-2xl font-bold text-cyan-400">
  {(item.duration / 1000).toFixed(2)} s
</p>

</div>

          </div>

          <div className="mt-6 border-t border-zinc-800 pt-4 text-sm text-zinc-500">

            {new Date(item.createdAt).toLocaleString(
              'pt-BR'
            )}

          </div>

        </div>

      ))}

    </div>
  )
}
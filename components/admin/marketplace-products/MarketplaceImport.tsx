'use client'

import { useRef, useState } from 'react'

import { toast } from 'sonner'

interface Supplier {
  id: string
  companyName: string
}

interface MarketplaceImportProps {
  suppliers: Supplier[]
  onSuccess: () => void
}

interface ImportResult {
  total: number
  imported: number
  duplicates: number
  duration: number
  errors: string[]
}

export default function MarketplaceImport({
  suppliers,
  onSuccess,
}: MarketplaceImportProps) {
  const fileRef =
    useRef<HTMLInputElement>(null)

  const [supplierId, setSupplierId] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [result, setResult] =
    useState<ImportResult | null>(null)

  async function handleImport() {
    if (!supplierId) {
      toast.warning(
        'Selecione um fornecedor.'
      )

      return
    }

    const file =
      fileRef.current?.files?.[0]

    if (!file) {
      toast.warning(
        'Selecione um arquivo CSV.'
      )

      return
    }

    const formData = new FormData()

    formData.append(
      'supplierId',
      supplierId
    )

    formData.append(
      'file',
      file
    )

    try {
      setLoading(true)

      const response = await fetch(
        '/api/admin/marketplace-products/import',
        {
          method: 'POST',
          body: formData,
        }
      )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ??
            'Erro ao importar.'
        )
      }

      setResult({
        total: data.total,
        imported: data.imported,
        duplicates:
          data.duplicates,
        duration: data.duration,
        errors: data.errors,
      })

      if (fileRef.current) {
        fileRef.current.value = ''
      }

      setSupplierId('')

      toast.success(
        `${data.imported} produtos importados com sucesso!`
      )
    } catch (error) {
      console.error(error)

      toast.error(
        error instanceof Error
          ? error.message
          : 'Erro ao importar.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Importar Catálogo
      </h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Fornecedor
          </label>

          <select
            value={supplierId}
            onChange={(e) =>
              setSupplierId(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-zinc-950
              px-4
              py-3
              text-white
            "
          >
            <option value="">
              Selecione
            </option>

            {suppliers.map(
              (supplier) => (
                <option
                  key={supplier.id}
                  value={supplier.id}
                >
                  {supplier.companyName}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Arquivo CSV
          </label>

          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            className="
              w-full
              text-white
              file:mr-4
              file:rounded-lg
              file:border-0
              file:bg-orange-500
              file:px-4
              file:py-2
              file:font-semibold
              file:text-white
              hover:file:bg-orange-400
            "
          />
        </div>

        <button
          onClick={handleImport}
          disabled={loading}
          className="
            rounded-xl
            bg-orange-500
            px-6
            py-3
            font-bold
            text-white
            transition
            hover:bg-orange-400
            disabled:opacity-60
          "
        >
          {loading
            ? 'Importando...'
            : 'Importar Catálogo'}
        </button>

        {result && (
          <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
            <h3 className="mb-5 text-xl font-bold text-green-400">
              ✅ Importação concluída
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-zinc-400">
                  Total
                </span>

                <p className="text-2xl font-bold text-white">
                  {result.total}
                </p>
              </div>

              <div>
                <span className="text-zinc-400">
                  Importados
                </span>

                <p className="text-2xl font-bold text-green-400">
                  {result.imported}
                </p>
              </div>

              <div>
                <span className="text-zinc-400">
                  Duplicados
                </span>

                <p className="text-2xl font-bold text-yellow-400">
                  {result.duplicates}
                </p>
              </div>

              <div>
                <span className="text-zinc-400">
                  Tempo
                </span>

                <p className="text-2xl font-bold text-cyan-400">
                  {(
                    result.duration / 1000
                  ).toFixed(2)} s
                </p>
              </div>
            </div>

            {result.errors.length > 0 && (
              <div className="mt-6">
                <h4 className="mb-2 font-bold text-red-400">
                  Produtos com erro
                </h4>

                <ul className="list-disc pl-5 text-red-300">
                  {result.errors.map(
                    (item) => (
                      <li key={item}>
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            <button
              onClick={() => {
                setResult(null)
                onSuccess()
              }}
              className="mt-6 rounded-xl bg-zinc-800 px-5 py-3 font-bold text-white transition hover:bg-zinc-700"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
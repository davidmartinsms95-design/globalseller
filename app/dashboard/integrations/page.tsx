'use client'

import { useEffect, useState } from 'react'

interface IntegrationStatus {
  connected: boolean
  externalUserId: string | null
  products: number
  orders: number
}

export default function IntegrationsPage() {
  const [status, setStatus] =
    useState<IntegrationStatus | null>(null)

  const [loading, setLoading] =
    useState(true)

  async function loadStatus() {
    try {
      const response = await fetch(
        '/api/integrations/status'
      )

      const data = await response.json()

      setStatus(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  function connectMercadoLivre() {
    window.open(
      'https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=7497664436144745&redirect_uri=https%3A%2F%2Fglobalseller-zhun.vercel.app%2Fapi%2Fintegrations%2Fmercadolivre%2Fcallback'
    )
  }

  useEffect(() => {
    loadStatus()
  }, [])

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-white">
          Integrações
        </h1>

        <p className="mt-4 text-zinc-400">
          Conecte marketplaces e centralize sua operação.
        </p>
      </div>

      <div className="rounded-[32px] border border-yellow-500/20 bg-zinc-900 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-yellow-400">
            Mercado Livre
          </h2>

          {status?.connected ? (
            <span className="rounded-full bg-green-500/20 px-4 py-2 font-bold text-green-400">
              Conectado
            </span>
          ) : (
            <span className="rounded-full bg-red-500/20 px-4 py-2 font-bold text-red-400">
              Desconectado
            </span>
          )}
        </div>

        {loading ? (
          <p className="mt-6 text-zinc-400">
            Carregando...
          </p>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-black p-5">
                <p className="text-sm text-zinc-400">
                  Conta ML
                </p>

                <h3 className="mt-2 text-lg font-bold text-white">
                  {status?.externalUserId ||
                    '-'}
                </h3>
              </div>

              <div className="rounded-2xl bg-black p-5">
                <p className="text-sm text-zinc-400">
                  Produtos
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  {status?.products ?? 0}
                </h3>
              </div>

              <div className="rounded-2xl bg-black p-5">
                <p className="text-sm text-zinc-400">
                  Pedidos
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  {status?.orders ?? 0}
                </h3>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <a
                href="/dashboard/mercadolivre"
                className="rounded-2xl bg-yellow-400 px-6 py-4 text-center font-bold text-black"
              >
                Ver Produtos
              </a>

              <a
                href="/dashboard/orders"
                className="rounded-2xl bg-zinc-800 px-6 py-4 text-center font-bold text-white"
              >
                Ver Pedidos
              </a>

              <button
                onClick={connectMercadoLivre}
                className="rounded-2xl bg-green-600 px-6 py-4 font-bold text-white"
              >
                Reconectar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
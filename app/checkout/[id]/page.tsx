'use client'

import { use, useEffect, useState } from 'react'

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  const [pixCode, setPixCode] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function generatePix() {
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            productId: id,
            title: 'Produto Premium',
            amount: 10,
          }),
        })

        const data = await response.json()

        setPixCode(data.qr_code)

        setQrCode(
          `data:image/png;base64,${data.qr_code_base64}`
        )

        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    generatePix()
  }, [id])

  async function copyPixCode() {
    try {
      await navigator.clipboard.writeText(
        pixCode
      )

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090b] p-6 text-white">
      <div className="w-full max-w-2xl rounded-[32px] border border-zinc-800 bg-zinc-900 p-10 shadow-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-orange-500">
            Checkout PIX
          </h1>

          <p className="mt-4 text-zinc-400">
            Pagamento seguro via Mercado Pago
          </p>
        </div>

        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-6 h-20 w-20 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>

              <p className="text-2xl font-bold">
                Gerando PIX...
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="rounded-3xl bg-white p-6">
              <img
                src={qrCode}
                alt="QR Code PIX"
                className="mx-auto h-80 w-80 object-contain"
              />
            </div>

            <div className="mt-8 rounded-3xl border border-zinc-800 bg-black p-6">
              <p className="mb-4 text-lg font-bold text-zinc-300">
                PIX Copia e Cola
              </p>

              <textarea
                readOnly
                value={pixCode}
                className="h-40 w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-4 text-sm text-zinc-300"
              />

              <button
                onClick={copyPixCode}
                className="mt-6 w-full rounded-2xl bg-orange-500 px-6 py-5 text-xl font-bold text-white transition hover:bg-orange-400"
              >
                {copied
                  ? 'PIX Copiado!'
                  : 'Copiar Código PIX'}
              </button>
            </div>

            <div className="mt-8 rounded-3xl border border-green-500/20 bg-green-500/10 p-6">
              <h2 className="text-2xl font-bold text-green-400">
                Pagamento Seguro
              </h2>

              <p className="mt-3 text-zinc-300">
                Seu pagamento será confirmado
                automaticamente após a aprovação
                do PIX.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
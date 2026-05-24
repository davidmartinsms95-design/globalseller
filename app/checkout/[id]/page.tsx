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
            title: 'Produto Teste',
            amount: 10,
          }),
        })

        const data = await response.json()

        setPixCode(data.qr_code)

        setQrCode(
          `data:image/png;base64,${data.qr_code_base64}`
        )
      } catch (error) {
        console.log(error)
      }
    }

    generatePix()
  }, [id])

  async function copyPixCode() {
    try {
      await navigator.clipboard.writeText(pixCode)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-8 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
        <h1 className="mb-8 text-center text-5xl font-bold text-yellow-400">
          Checkout PIX
        </h1>

        {qrCode ? (
          <div>
            <img
              src={qrCode}
              alt="QR Code PIX"
              className="mx-auto h-72 w-72 rounded-2xl bg-white p-4"
            />

            <div className="mt-8">
              <p className="mb-3 text-zinc-400">
                PIX Copia e Cola
              </p>

              <textarea
                readOnly
                value={pixCode}
                className="h-40 w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-4 text-sm"
              />

              <button
                onClick={copyPixCode}
                className="mt-6 w-full rounded-2xl bg-yellow-400 px-6 py-4 font-bold text-black transition hover:bg-yellow-300"
              >
                {copied
                  ? 'PIX Copiado!'
                  : 'Copiar Código PIX'}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-xl">
            Gerando PIX...
          </p>
        )}
      </div>
    </div>
  )
}
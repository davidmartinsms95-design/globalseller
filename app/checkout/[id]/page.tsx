'use client'

import {
  use,
  useEffect,
  useRef,
  useState,
} from 'react'

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  const hasGeneratedPix = useRef(false)

  const [loading, setLoading] =
    useState(true)

  const [pixCode, setPixCode] =
    useState('')

  const [pixImage, setPixImage] =
    useState('')

  const [orderId, setOrderId] =
    useState('')

  useEffect(() => {
    if (hasGeneratedPix.current)
      return

    hasGeneratedPix.current = true

    async function generatePix() {
      try {
        const productResponse =
          await fetch(
            `/api/products/${id}`
          )

        const product =
          await productResponse.json()

        if (!product.id) {
          alert(
            'Produto não encontrado'
          )

          return
        }

        const response =
          await fetch(
            '/api/checkout',
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',
              },

              body: JSON.stringify({
                productId:
                  product.id,

                sellerId:
                  product.userId,

                title:
                  product.title,

                amount:
                  product.price,
              }),
            }
          )

        const data =
          await response.json()

        setPixCode(
          data.qr_code || ''
        )

        setPixImage(
          data.qr_code_base64 || ''
        )

        setOrderId(
          data.orderId || ''
        )
      } catch (error) {
        console.log(error)

        alert(
          'Erro ao gerar PIX'
        )
      } finally {
        setLoading(false)
      }
    }

    generatePix()
  }, [id])

  async function copyPix() {
    await navigator.clipboard.writeText(
      pixCode
    )

    alert(
      'PIX copiado com sucesso!'
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Gerando PIX...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
        <h1 className="mb-8 text-4xl font-bold">
          Pagamento PIX
        </h1>

        {pixImage && (
          <img
            src={`data:image/png;base64,${pixImage}`}
            alt="QR Code PIX"
            className="mx-auto mb-8 w-80"
          />
        )}

        <p className="mb-4 text-zinc-400">
          Escaneie o QR Code ou copie
          o código PIX abaixo:
        </p>

        <textarea
          readOnly
          value={pixCode}
          className="mb-6 h-40 w-full rounded-xl bg-black p-4 text-sm text-white"
        />

        <button
          onClick={copyPix}
          className="mb-6 rounded-xl bg-green-600 px-6 py-4 font-bold text-white hover:bg-green-700"
        >
          Copiar PIX
        </button>

        <p className="text-zinc-400">
          Pedido:
          <span className="ml-2 font-bold text-white">
            {orderId}
          </span>
        </p>

        <p className="mt-4 text-yellow-400">
          Aguardando pagamento...
        </p>
      </div>
    </div>
  )
}
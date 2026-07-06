'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { calculateProductScore } from '@/lib/services/productScore.service'

interface Product {
  id: string
  title: string
  description?: string
  image?: string
  price: number
  stock: number
}

export default function PublishPage() {
  const searchParams = useSearchParams()

  const productId = searchParams.get('id')

  const [product, setProduct] =
    useState<Product | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [publishing, setPublishing] =
    useState(false)

  useEffect(() => {
    async function loadProduct() {
      if (!productId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(
          `/api/products/${productId}`
        )

        if (!response.ok) {
          throw new Error(
            'Erro ao carregar produto'
          )
        }

        const data = await response.json()

        setProduct(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [productId])

  async function publish() {
    if (!product) return

    try {
      setPublishing(true)

      const response = await fetch(
        '/api/publish',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            productId: product.id,
          }),
        }
      )

      const data =
        await response.json()

      if (!response.ok) {
        alert(
          data.error ??
            'Erro ao publicar produto.'
        )

        return
      }

      alert(
        'Produto publicado com sucesso!'
      )
    } catch (error) {
      console.error(error)

      alert(
        'Erro inesperado.'
      )
    } finally {
      setPublishing(false)
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-white">
        Carregando produto...
      </div>
    )
  }

  if (!product) {
    return (
      <div className="p-10 text-red-500">
        Produto não encontrado.
      </div>
    )
  }

  const score =
    calculateProductScore(product)

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-5xl font-bold text-white">
          Central de Publicação
        </h1>

        <p className="mt-3 text-zinc-400">
          Revise todas as informações antes da publicação.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="mb-6 h-80 w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="mb-6 flex h-80 items-center justify-center rounded-2xl bg-zinc-800 text-zinc-500">
              Sem imagem
            </div>
          )}

          <h2 className="text-3xl font-bold">
            {product.title}
          </h2>

          <p className="mt-5 text-zinc-400">
            {product.description ??
              'Sem descrição.'}
          </p>

        </div>

        <div className="space-y-6">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <h2 className="text-2xl font-bold">
              Score do anúncio
            </h2>

            <div className="mt-6 h-5 overflow-hidden rounded-full bg-zinc-800">

              <div
                className="h-full rounded-full bg-green-500 transition-all duration-700"
                style={{
                  width: `${score}%`,
                }}
              />

            </div>

            <p className="mt-4 text-green-400">
              Qualidade estimada: {score}%
            </p>

          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

            <h2 className="text-2xl font-bold">
              Resumo
            </h2>

            <div className="mt-6 space-y-3">

              <p>
                💰 Preço:
                <strong>
                  {' '}
                  R$ {product.price.toFixed(2)}
                </strong>
              </p>

              <p>
                📦 Estoque:
                <strong>
                  {' '}
                  {product.stock}
                </strong>
              </p>

            </div>

          </div>

          <button
            onClick={publish}
            disabled={publishing}
            className="w-full rounded-2xl bg-green-600 py-4 text-xl font-bold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {publishing
              ? 'Publicando...'
              : '🚀 Publicar Agora'}
          </button>

        </div>

      </div>

    </div>
  )
}
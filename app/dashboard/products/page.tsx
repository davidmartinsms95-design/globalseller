'use client'

import { useEffect, useState } from 'react'

interface Product {
  id: string
  customPrice?: number
  active: boolean
  marketplaceProduct: {
    id: string
    title: string
    description?: string
    costPrice: number
    suggestedPrice: number
    image?: string
    stock: number
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  async function loadProducts() {
    try {
      const response = await fetch(
        '/api/my-products'
      )

      const data = await response.json()

setProducts(data.products || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function savePrice(
    id: string,
    customPrice: number
  ) {
    try {
      const response = await fetch(
        '/api/my-products/update-price',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            id,
            customPrice,
          }),
        }
      )

      const data =
        await response.json()

      if (data.success) {
        alert('Preço atualizado')
      }
    } catch (error) {
      console.error(error)

      alert(
        'Erro ao atualizar preço'
      )
    }
  }

  async function publishProduct(
    resellerProductId: string
  ) {
    try {
      const response = await fetch(
        '/api/my-products/publish',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            resellerProductId,
          }),
        }
      )

      const data =
        await response.json()

      if (data.success) {
        alert(
          'Produto publicado com sucesso'
        )
      } else {
        alert(
          data.error ||
            'Erro ao publicar produto'
        )
      }
    } catch (error) {
      console.error(error)

      alert(
        'Erro ao publicar produto'
      )
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  if (loading) {
    return (
      <div className="p-10 text-white">
        Carregando produtos...
      </div>
    )
  }

  return (
    <div className="p-10">
      <h1 className="mb-10 text-5xl font-bold text-white">
        Meus Produtos
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {products.map((product) => {
          const sellPrice =
            product.customPrice ??
            product.marketplaceProduct
              .suggestedPrice

          const profit =
            sellPrice -
            product.marketplaceProduct
              .costPrice

          return (
            <div
              key={product.id}
              className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
            >
              <img
                src={
                  product
                    .marketplaceProduct
                    .image || ''
                }
                alt={
                  product
                    .marketplaceProduct
                    .title
                }
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h2 className="text-xl font-bold text-white">
                  {
                    product
                      .marketplaceProduct
                      .title
                  }
                </h2>

                <p className="mt-3 text-zinc-400">
                  {
                    product
                      .marketplaceProduct
                      .description
                  }
                </p>

                <p className="mt-4 text-3xl font-bold text-green-500">
                  R$ {sellPrice}
                </p>

                <div className="mt-4 space-y-2">
                  <p className="text-zinc-400">
                    Preço fornecedor:{' '}
                    <span className="font-bold text-white">
                      R${' '}
                      {
                        product
                          .marketplaceProduct
                          .costPrice
                      }
                    </span>
                  </p>

                  <p className="text-zinc-400">
                    Preço sugerido:{' '}
                    <span className="font-bold text-white">
                      R${' '}
                      {
                        product
                          .marketplaceProduct
                          .suggestedPrice
                      }
                    </span>
                  </p>

                  <p className="font-bold text-green-500">
                    Lucro estimado: R$ {profit}
                  </p>
                </div>

                <p className="mt-4 text-zinc-400">
                  Estoque:{' '}
                  {
                    product
                      .marketplaceProduct
                      .stock
                  }
                </p>

                <p className="mt-2 text-zinc-400">
                  Status:{' '}
                  {product.active
                    ? 'Ativo'
                    : 'Inativo'}
                </p>

                <div className="mt-4">
                  <p className="mb-2 text-sm text-zinc-400">
                    Seu preço de venda
                  </p>

<input
  type="number"
  defaultValue={sellPrice}
  className="w-full rounded-xl border border-zinc-700 bg-black p-3 text-white"
  onBlur={(e) => {
    savePrice(
      product.id,
      Number(e.target.value)
    )
  }}
/>

                </div>

                <button
                  onClick={() =>
                    publishProduct(
                      product.id
                    )
                  }
                  className="mt-4 w-full rounded-xl bg-green-600 px-4 py-3 font-bold text-white"
                >
                  Publicar Produto
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


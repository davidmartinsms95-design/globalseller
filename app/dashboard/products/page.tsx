'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Product {
  id: string

  productId: string | null

  marketplaceId?: string | null

  permalink?: string | null

  status?: string | null

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

    supplier: {
      companyName: string
    }
  }
}

  

export default function ProductsPage() {
  const [products, setProducts] =
    useState<Product[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState('')

  async function loadProducts() {
    try {
      const response = await fetch(
        '/api/my-products'
      )

      const data =
        await response.json()

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
          data.error ??
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
  async function removeProduct(id: string) {
  const confirmDelete = confirm(
    'Deseja remover este produto do catálogo?'
  )

  if (!confirmDelete) return

  try {
    const response = await fetch(
      '/api/my-products/remove',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.error)
    }

    setProducts((current) =>
      current.filter((product) => product.id !== id)
    )

    alert('Produto removido com sucesso!')
  } catch (error) {
    console.error(error)

    alert('Erro ao remover produto.')
  }
}
    useEffect(() => {
    loadProducts()
  }, [])

  const totalProducts = products.length

  const activeProducts = products.filter(
    (product) => product.active
  ).length

  const totalStock = products.reduce(
    (total, product) =>
      total + product.marketplaceProduct.stock,
    0
  )

  const estimatedProfit = products.reduce(
    (total, product) => {
      const sellPrice =
        product.customPrice ??
        product.marketplaceProduct.suggestedPrice

      return (
        total +
        (sellPrice -
          product.marketplaceProduct.costPrice)
      )
    },
    0
  )

  const filteredProducts = products.filter(
    (product) =>
      product.marketplaceProduct.title
        .toLowerCase()
        .includes(search.toLowerCase())
  )

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

      <div className="mb-8">
        <input
          type="text"
          placeholder="🔍 Buscar produto..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 p-4 text-white placeholder:text-zinc-500 focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400">
            Produtos
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {totalProducts}
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400">
            Ativos
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-500">
            {activeProducts}
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400">
            Estoque
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {totalStock}
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400">
            Lucro Estimado
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-500">
            R$ {estimatedProfit.toFixed(2)}
          </h2>
        </div>

      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {filteredProducts.map((product) => {
          const sellPrice =
            product.customPrice ??
            product.marketplaceProduct.suggestedPrice

          const profit =
            sellPrice -
            product.marketplaceProduct.costPrice
                      return (
            <div
              key={product.id}
              className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition hover:border-orange-500"
            >
              <img
                src={product.marketplaceProduct.image || ''}
                alt={product.marketplaceProduct.title}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">

                <h2 className="text-xl font-bold text-white">
                  {product.marketplaceProduct.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-zinc-400">
                  {product.marketplaceProduct.description}
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <div>
                    <p className="text-sm text-zinc-500">
                      Venda
                    </p>

                    <p className="text-3xl font-bold text-green-500">
                      R$ {sellPrice}
                    </p>
                  </div>

                  <div className="rounded-xl bg-green-500/10 px-4 py-2">
                    <p className="text-xs text-green-400">
                      Lucro
                    </p>

                    <p className="font-bold text-green-500">
                      R$ {profit.toFixed(2)}
                    </p>
                  </div>

                </div>

                <div className="mt-6 space-y-2">

                  <p className="text-zinc-400">
  Fornecedor:
  <span className="ml-2 font-bold text-white">
    {product.marketplaceProduct.supplier.companyName}
  </span>
</p>

                  <p className="text-zinc-400">
                    Sugerido:
                    <span className="ml-2 font-bold text-white">
                      R$ {product.marketplaceProduct.suggestedPrice}
                    </span>
                  </p>

                  <p className="text-zinc-400">
                    Estoque:
                    <span className="ml-2 font-bold text-white">
                      {product.marketplaceProduct.stock}
                    </span>
                  </p>

                  <p className="text-zinc-400">
                    Status:
                    <span
                      className={`ml-2 font-bold ${
                        product.active
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}
                    >
                      {product.active
                        ? 'Ativo'
                        : 'Inativo'}
                    </span>
                  </p>

                </div>

                <div className="mt-6">

                  <label className="mb-2 block text-sm text-zinc-400">
                    Seu preço
                  </label>

                  <input
                    type="number"
                    defaultValue={sellPrice}
                    className="w-full rounded-xl border border-zinc-700 bg-black p-3 text-white"
                    onBlur={(e) =>
                      savePrice(
                        product.id,
                        Number(e.target.value)
                      )
                    }
                  />

                </div>

                <div className="mt-6 space-y-3">

  <Link
  href={`/dashboard/publish?id=${product.id}`}
>
  <button className="w-full rounded-xl bg-green-600 py-3 font-bold text-white transition hover:bg-green-500">
    🚀 Preparar Publicação
  </button>
</Link>

  <button
    onClick={() =>
      removeProduct(product.id)
    }
    className="w-full rounded-xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-500"
  >
    🗑️ Remover do Catálogo
  </button>

</div>

              </div>
            </div>
          )
                  })}
      </div>
    </div>
  )
}
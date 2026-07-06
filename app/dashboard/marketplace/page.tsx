'use client'

import { useEffect, useState } from 'react'

interface MarketplaceProduct {
  id: string
  title: string
  description: string
  suggestedPrice: number
  stock: number
  image: string
}

export default function MarketplacePage() {
  const [products, setProducts] = useState<
    MarketplaceProduct[]
  >([])

  const [search, setSearch] = useState('')

  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [importing, setImporting] = useState(false)
const [progress, setProgress] = useState(0)

  async function addToCatalog(
  marketplaceProductId: string
) {
  const response = await fetch(
    '/api/marketplace/add',
    {
      method: 'POST',
      headers: {
        'Content-Type':
          'application/json',
      },
      body: JSON.stringify({
        marketplaceProductId,
      }),
    }
  )

  const data =
    await response.json()

  alert(
    data.message ||
      'Produto adicionado ao catálogo'
  )
}
async function importSelectedProducts() {
  if (selectedProducts.length === 0) return

  setImporting(true)
  setProgress(0)

  try {
    for (let i = 0; i < selectedProducts.length; i++) {
      await addToCatalog(selectedProducts[i])

      setProgress(
        Math.round(((i + 1) / selectedProducts.length) * 100)
      )
    }

    alert('Produtos importados com sucesso!')

    setSelectedProducts([])
  } catch (error) {
    console.error(error)
    alert('Erro ao importar alguns produtos.')
  } finally {
    setImporting(false)
  }
}
  async function loadProducts() {
  try {
    const response = await fetch(
      '/api/marketplace'
    )

    const result =
      await response.json()

    console.log(
      'MARKETPLACE API:',
      result
    )

    setProducts(result.products || [])
  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  loadProducts()
}, [])

  return (
    <div className="p-10">
      <h1 className="mb-10 text-5xl font-bold text-white">
  Marketplace
</h1>

<div className="mb-8">
  <input
    type="text"
    placeholder="Buscar produto..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-4 text-white outline-none focus:border-orange-500"
  />
</div>

<div className="mb-8 flex flex-wrap gap-4">
  <button
    onClick={() =>
      setSelectedProducts(products.map((p) => p.id))
    }
    className="rounded-xl bg-zinc-800 px-5 py-3 font-semibold text-white transition hover:bg-zinc-700"
  >
    Selecionar Todos
  </button>

  <button
    onClick={() => setSelectedProducts([])}
    className="rounded-xl bg-zinc-800 px-5 py-3 font-semibold text-white transition hover:bg-zinc-700"
  >
    Limpar Seleção
  </button>

  <button
  onClick={importSelectedProducts}
  disabled={
    selectedProducts.length === 0 || importing
  }
  className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
>
  {importing
    ? `Importando... ${progress}%`
    : `Importar Selecionados (${selectedProducts.length})`}
</button>
</div>

{importing && (
  <div className="mt-4 mb-8 h-3 w-full overflow-hidden rounded-full bg-zinc-800">
    <div
      className="h-full bg-orange-500 transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  </div>
)}

<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {products
  .filter((product) =>
    product.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((product) => (
          <div
  key={product.id}
  className={`overflow-hidden rounded-3xl border ${
    selectedProducts.includes(product.id)
      ? 'border-orange-500'
      : 'border-zinc-800'
  } bg-zinc-900`}
><div className="flex justify-end p-4">
  <input
    type="checkbox"
    checked={selectedProducts.includes(product.id)}
    onChange={(e) => {
      if (e.target.checked) {
        setSelectedProducts([
          ...selectedProducts,
          product.id,
        ])
      } else {
        setSelectedProducts(
          selectedProducts.filter(
            (id) => id !== product.id
          )
        )
      }
    }}
    className="h-5 w-5 cursor-pointer"
  />
</div>
            <img
              src={product.image}
              alt={product.title}
              className="h-64 w-full object-cover"
            />

            <div className="p-6">
              <h2 className="text-xl font-bold text-white">
                {product.title}
              </h2>

              <p className="mt-3 text-zinc-400">
                {product.description}
              </p>

              <p className="mt-4 text-3xl font-bold text-green-500">
                R$ {product.suggestedPrice}
              </p>

              <p className="mt-2 text-zinc-400">
                Estoque: {product.stock}
              </p>

              <button
  onClick={() =>
    addToCatalog(product.id)
  }
  className="mt-6 w-full rounded-xl bg-orange-500 px-4 py-3 font-bold text-white"
>
  Adicionar ao meu catálogo
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


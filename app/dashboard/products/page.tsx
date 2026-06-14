'use client'

import { useEffect, useState } from 'react'

interface Product {
  id: string
  title: string
  price: number
  category: string
  image: string
  stock?: number
  sku?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  async function loadProducts() {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()

      if (Array.isArray(data)) {
        setProducts(data)
      } else {
        setProducts([])
      }
    } catch (error) {
      console.error(error)
      setProducts([])
    }
  }

  async function deleteProduct(id: string) {
    const confirmDelete = confirm(
      'Tem certeza que deseja excluir este produto?'
    )

    if (!confirmDelete) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert('Produto excluído com sucesso!')
        loadProducts()
      } else {
        alert('Erro ao excluir produto')
      }
    } catch (error) {
      console.error(error)
      alert('Erro ao excluir produto')
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div className="p-10">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-5xl font-bold text-white">
            Produtos
          </h1>

          <p className="mt-3 text-zinc-400">
            Gerencie estoque e marketplaces
          </p>
        </div>

        <a
          href="/dashboard/products/new"
          className="rounded-2xl bg-orange-500 px-6 py-4 font-bold text-white"
        >
          Novo Produto
        </a>
      </div>

      <p className="mb-8 text-xl text-white">
        Total de produtos: {products.length}
      </p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-900"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-64 w-full object-cover"
            />

            <div className="p-8">
              <h2 className="text-2xl font-bold text-white">
                {product.title}
              </h2>

              <p className="mt-2 text-zinc-400">
                {product.category}
              </p>

              <p className="mt-4 text-3xl font-bold text-green-500">
                R$ {product.price}
              </p>

              <a
                href={`/dashboard/products/edit/${product.id}`}
                className="mt-6 block w-full rounded-xl bg-blue-600 px-4 py-3 text-center font-bold text-white hover:bg-blue-700"
              >
                Editar Produto
              </a>

              <button
                onClick={() => deleteProduct(product.id)}
                className="mt-3 w-full rounded-xl bg-red-600 px-4 py-3 font-bold text-white hover:bg-red-700"
              >
                Excluir Produto
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
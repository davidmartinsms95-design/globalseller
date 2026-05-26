'use client'

import { useEffect, useState } from 'react'

interface Product {
  id: string
  title: string
  price: number
  category: string
  image: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  async function loadProducts() {
    const response = await fetch('/api/products')

    const data = await response.json()

    setProducts(data)
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm(
      'Deseja excluir este produto?'
    )

    if (!confirmDelete) return

    await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })

    loadProducts()
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div className="p-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Produtos
        </h1>

        <a
          href="/dashboard/products/new"
          className="rounded-xl bg-orange-500 px-5 py-3 font-bold text-white"
        >
          Novo Produto
        </a>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl bg-white p-4 shadow"
          >
            <img
              src={product.image}
              alt={product.title}
              className="mb-4 h-48 w-full rounded-xl object-cover"
            />

            <h2 className="text-xl font-bold text-black">
              {product.title}
            </h2>

            <p className="mt-2 text-gray-600">
              {product.category}
            </p>

            <p className="mt-4 text-2xl font-bold text-orange-500">
              R$ {product.price}
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href={`/dashboard/products/${product.id}`}
                className="rounded-xl bg-blue-500 px-4 py-2 font-bold text-white"
              >
                Editar
              </a>

              <button
                onClick={() =>
                  handleDelete(product.id)
                }
                className="rounded-xl bg-red-500 px-4 py-2 font-bold text-white"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')

  async function loadProduct() {
    const response = await fetch(
      `/api/products/${params.id}`
    )

    const data = await response.json()

    setTitle(data.title)
    setPrice(data.price)
    setCategory(data.category)
    setImage(data.image)
  }

  useEffect(() => {
    loadProduct()
  }, [])

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0]

    if (!file) return

    const formData = new FormData()

    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (data.url) {
      setImage(data.url)
    }
  }

  async function handleUpdateProduct() {
    const response = await fetch(
      `/api/products/${params.id}`,
      {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          title,
          price,
          category,
          image,
        }),
      }
    )

    if (response.ok) {
      alert('Produto atualizado!')

      router.push('/dashboard/products')
    }
  }

  return (
    <div className="max-w-2xl p-10">
      <h1 className="mb-8 text-4xl font-bold">
        Editar Produto
      </h1>

      <div className="rounded-2xl bg-white p-8 shadow">
        <div className="mb-6">
          <label className="mb-2 block font-bold text-black">
            Nome
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border p-4 text-black"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-bold text-black">
            Preço
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-xl border p-4 text-black"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-bold text-black">
            Categoria
          </label>

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border p-4 text-black"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-bold text-black">
            Imagem
          </label>

          <input
            type="file"
            onChange={handleUpload}
            className="w-full text-black"
          />

          {image && (
            <img
              src={image}
              alt=""
              className="mt-4 h-40 rounded-xl object-cover"
            />
          )}
        </div>

        <button
          onClick={handleUpdateProduct}
          className="rounded-2xl bg-orange-500 px-6 py-4 font-bold text-white"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  )
}
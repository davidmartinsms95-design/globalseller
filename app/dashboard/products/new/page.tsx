'use client'

import { useState } from 'react'

export default function NewProductPage() {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onloadend = async () => {
      const response = await fetch(
        '/api/upload',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            image: reader.result,
          }),
        }
      )

      const data = await response.json()

      setImage(data.url)
    }
  }

  async function handleCreateProduct() {
    const response = await fetch('/api/products', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        title,
        price,
        category,
        image,
      }),
    })

    if (response.ok) {
      alert('Produto criado com sucesso!')

      setTitle('')
      setPrice('')
      setCategory('')
      setImage('')
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-8 text-4xl font-bold">
        Novo Produto
      </h1>

      <div className="rounded-2xl bg-white p-8 shadow">
        <div className="mb-6">
          <label className="mb-2 block font-bold">
            Nome do Produto
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border p-4"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-bold">
            Preço
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-xl border p-4"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-bold">
            Categoria
          </label>

          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border p-4"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-bold">
            Imagem
          </label>

          <input
            type="file"
            onChange={handleUpload}
            className="w-full"
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
          onClick={handleCreateProduct}
          className="rounded-2xl bg-orange-500 px-6 py-4 font-bold text-white"
        >
          Salvar Produto
        </button>
      </div>
    </div>
  )
}
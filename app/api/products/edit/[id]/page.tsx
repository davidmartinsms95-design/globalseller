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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(
          `/api/products/${params.id}`
        )

        const product = await response.json()

        setTitle(product.title || '')
        setPrice(String(product.price || ''))
        setCategory(product.category || '')
        setImage(product.image || '')
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    try {
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
        alert('Produto atualizado com sucesso!')
        router.push('/dashboard/products')
      } else {
        alert('Erro ao atualizar produto')
      }
    } catch (error) {
      console.error(error)
      alert('Erro ao atualizar produto')
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-white">
        Carregando...
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl p-10">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Editar Produto
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block text-white">
            Nome do Produto
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-white">
            Preço
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-white">
            Categoria
          </label>

          <input
            type="text"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-white">
            URL da Imagem
          </label>

          <input
            type="text"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-orange-500 px-6 py-4 font-bold text-white"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  )
}
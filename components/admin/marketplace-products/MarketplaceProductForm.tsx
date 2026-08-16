'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Supplier {
  id: string
  companyName: string
}

interface Product {
  id?: string
  title: string
  description?: string | null
  costPrice: number
  suggestedPrice: number
  stock: number
  supplierId: string
  brand?: string | null
  categoryId?: string | null
  categoryName?: string | null
  listingType?: string | null
  sku?: string | null
  ean?: string | null
}

interface MarketplaceCategory {
  category_id: string
  category_name: string
}

interface MarketplaceProductFormProps {
  product: Product | null
  suppliers: Supplier[]
  onSuccess: () => void
  onCancel: () => void
}

export default function MarketplaceProductForm({
  product,
  suppliers,
  onSuccess,
  onCancel,
}: MarketplaceProductFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] =
    useState('')

  const [costPrice, setCostPrice] =
    useState(0)

  const [suggestedPrice, setSuggestedPrice] =
    useState(0)

  const [stock, setStock] = useState(0)

  const [supplierId, setSupplierId] =
    useState('')

  const [brand, setBrand] =
    useState('Sem Marca')

  const [categoryId, setCategoryId] =
    useState('')

  const [categoryName, setCategoryName] =
    useState('')

  const [categorySearch, setCategorySearch] =
    useState('')

  const [categories, setCategories] =
    useState<MarketplaceCategory[]>([])

  const [searchingCategory, setSearchingCategory] =
    useState(false)

  const [listingType, setListingType] =
    useState('gold_special')

  const [sku, setSku] = useState('')
  const [ean, setEan] = useState('')

  const [loading, setLoading] =
    useState(false)

  useEffect(() => {
    if (product) {
      setTitle(product.title)

      setDescription(
        product.description || ''
      )

      setCostPrice(product.costPrice)

      setSuggestedPrice(
        product.suggestedPrice
      )

      setStock(product.stock)

      setSupplierId(
        product.supplierId
      )

      setBrand(
        product.brand || 'Sem Marca'
      )

      setCategoryId(
        product.categoryId || ''
      )

      setCategoryName(
        product.categoryName || ''
      )

      setCategorySearch(
        product.categoryName || ''
      )

      setListingType(
        product.listingType ||
          'gold_special'
      )

      setSku(product.sku || '')
      setEan(product.ean || '')

      return
    }

    setTitle('')
    setDescription('')
    setCostPrice(0)
    setSuggestedPrice(0)
    setStock(0)
    setSupplierId('')
    setBrand('Sem Marca')
    setCategoryId('')
    setCategoryName('')
    setCategorySearch('')
    setListingType('gold_special')
    setSku('')
    setEan('')
  }, [product])

  async function searchCategories(
    value: string
  ) {
    setCategorySearch(value)
    setSearchingCategory(true)

    if (value.length < 3) {
      setSearchingCategory(false)
      setCategories([])
      return
    }

    try {
      const response = await fetch(
        '/api/integrations/mercadolivre/categories',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            query: value,
          }),
        }
      )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            'Erro ao buscar categorias.'
        )
      }

      setCategories(
        Array.isArray(data.categories)
          ? data.categories
          : []
      )
    } catch (error) {
      console.error(error)

      setCategories([])

      toast.error(
        'Erro ao buscar categorias.'
      )
    } finally {
      setSearchingCategory(false)
    }
  }

  async function handleSubmit() {
    if (!title.trim()) {
      toast.warning(
        'Informe o nome do produto.'
      )

      return
    }

    if (!supplierId) {
      toast.warning(
        'Selecione um fornecedor.'
      )

      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        product
          ? `/api/admin/marketplace-products/${product.id}`
          : '/api/admin/marketplace-products',
        {
          method: product ? 'PUT' : 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            costPrice,
            suggestedPrice,
            stock,
            supplierId,
            brand,
            categoryId,
            categoryName,
            listingType,
            sku,
            ean,
          }),
        }
      )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            'Erro ao salvar produto.'
        )
      }

      toast.success(
        product
          ? 'Produto atualizado com sucesso!'
          : 'Produto cadastrado com sucesso!'
      )

      onSuccess()
    } catch (error) {
      console.error(error)

      toast.error(
        error instanceof Error
          ? error.message
          : 'Erro ao salvar produto.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        {product
          ? 'Editar Produto'
          : 'Novo Produto'}
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
          placeholder="Nome do produto"
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
        />

        <select
          value={supplierId}
          onChange={(event) =>
            setSupplierId(
              event.target.value
            )
          }
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
        >
          <option value="">
            Selecione o fornecedor
          </option>

          {suppliers.map((supplier) => (
            <option
              key={supplier.id}
              value={supplier.id}
            >
              {supplier.companyName}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={costPrice}
          onChange={(event) =>
            setCostPrice(
              Number(event.target.value)
            )
          }
          placeholder="Preço de custo"
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
        />

        <input
          type="number"
          value={suggestedPrice}
          onChange={(event) =>
            setSuggestedPrice(
              Number(event.target.value)
            )
          }
          placeholder="Preço sugerido"
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
        />

        <input
          type="number"
          value={stock}
          onChange={(event) =>
            setStock(
              Number(event.target.value)
            )
          }
          placeholder="Estoque"
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
        />

        <input
          value={brand}
          onChange={(event) =>
            setBrand(event.target.value)
          }
          placeholder="Marca"
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
        />

        <div className="space-y-2">
          <input
            value={categorySearch}
            onChange={(event) =>
              searchCategories(
                event.target.value
              )
            }
            placeholder="Pesquisar categoria..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
          />

          {searchingCategory && (
            <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-center text-zinc-400">
              Buscando categorias...
            </div>
          )}

          {!searchingCategory &&
            categories.length > 0 && (
              <div className="max-h-56 overflow-y-auto rounded-xl border border-zinc-700 bg-zinc-950">
                {categories.map(
                  (category) => (
                    <button
                      key={
                        category.category_id
                      }
                      type="button"
                      onClick={() => {
                        setCategoryId(
                          category.category_id
                        )

                        setCategoryName(
                          category.category_name
                        )

                        setCategorySearch(
                          category.category_name
                        )

                        setCategories([])
                      }}
                      className="block w-full border-b border-zinc-800 px-4 py-3 text-left text-white transition hover:bg-zinc-800"
                    >
                      <div className="font-semibold">
                        {
                          category.category_name
                        }
                      </div>

                      <div className="text-sm text-zinc-400">
                        {
                          category.category_id
                        }
                      </div>
                    </button>
                  )
                )}
              </div>
            )}

          {!searchingCategory &&
            categorySearch.length >= 3 &&
            categories.length === 0 && (
              <div className="rounded-xl border border-red-900 bg-red-500/10 p-4 text-red-400">
                Nenhuma categoria
                encontrada.
              </div>
            )}

          {categoryId && (
            <div className="rounded-lg border border-green-700 bg-green-500/10 p-3">
              <p className="text-sm text-green-400">
                Categoria selecionada
              </p>

              <p className="font-semibold text-white">
                {categoryName}
              </p>

              <p className="text-xs text-zinc-400">
                {categoryId}
              </p>
            </div>
          )}
        </div>

        <input
          value={categoryName}
          onChange={(event) =>
            setCategoryName(
              event.target.value
            )
          }
          placeholder="Nome da categoria"
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
        />

        <select
          value={listingType}
          onChange={(event) =>
            setListingType(
              event.target.value
            )
          }
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
        >
          <option value="gold_special">
            Clássico
          </option>

          <option value="gold_pro">
            Premium
          </option>
        </select>

        <input
          value={sku}
          onChange={(event) =>
            setSku(event.target.value)
          }
          placeholder="SKU"
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
        />

        <input
          value={ean}
          onChange={(event) =>
            setEan(event.target.value)
          }
          placeholder="EAN ou SEM GTIN"
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white"
        />

        <textarea
          value={description}
          onChange={(event) =>
            setDescription(
              event.target.value
            )
          }
          placeholder="Descrição"
          rows={4}
          className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white md:col-span-2"
        />
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? 'Salvando...'
            : product
              ? 'Atualizar'
              : 'Cadastrar'}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-xl bg-zinc-700 px-6 py-3 font-bold text-white transition hover:bg-zinc-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
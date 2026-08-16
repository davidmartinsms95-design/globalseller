'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import PageHeader from '@/components/ui/PageHeader'
import ProductForm from '@/components/dashboard/products/ProductForm'

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')

  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')

  const [salePrice, setSalePrice] =
    useState('')

  const [costPrice, setCostPrice] =
    useState('')

  const [sku, setSku] = useState('')
  const [ean, setEan] = useState('')
  const [stock, setStock] = useState('')

  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [width, setWidth] = useState('')
  const [length, setLength] = useState('')

  const [shortDescription, setShortDescription] =
    useState('')

  const [description, setDescription] =
    useState('')

  const [isAnalyzing] =
    useState(false)

  const [healthScore] =
    useState<number>()

  const [seoScore] =
    useState<number>()

  const [suggestedTitle] =
    useState('')

  const [suggestedCategory] =
    useState('')

  const [suggestedPrice] =
    useState<number>()

  const [suggestedDescription] =
    useState('')

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(
          `/api/products/${params.id}`
        )

        const product =
          await response.json()

        setTitle(
          product.title || ''
        )

        setPrice(
          String(product.price || '')
        )

        setCategory(
          product.category || ''
        )

        setImage(
          product.image || ''
        )

        setBrand(
          product.brand || ''
        )

        setModel(
          product.model || ''
        )

        setSalePrice(
          String(product.price || '')
        )

        setCostPrice(
          String(
            product.costPrice || ''
          )
        )

        setSku(
          product.sku || ''
        )

        setEan(
          product.ean || ''
        )

        setStock(
          String(product.stock || '')
        )

        setWeight(
          String(product.weight || '')
        )

        setHeight(
          String(product.height || '')
        )

        setWidth(
          String(product.width || '')
        )

        setLength(
          String(product.length || '')
        )

        setShortDescription(
          product.shortDescription || ''
        )

        setDescription(
          product.description || ''
        )
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0]

    if (!file) {
      return
    }

    const formData =
      new FormData()

    formData.append(
      'file',
      file
    )

    const response = await fetch(
      '/api/upload',
      {
        method: 'POST',
        body: formData,
      }
    )

    const data =
      await response.json()

    setImage(data.url)
  }

  async function handleSave() {
    try {
      const response = await fetch(
        `/api/products/${params.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            title,
            price,
            costPrice,
            category,
            image,
            stock,
            description,
            shortDescription,
            sku,
            ean,
            brand,
            model,
            weight,
            height,
            width,
            length,
          }),
        }
      )

      if (response.ok) {
        alert(
          'Produto atualizado com sucesso!'
        )

        router.push(
          '/dashboard/products'
        )

        return
      }

      alert(
        'Erro ao atualizar produto'
      )
    } catch (error) {
      console.error(error)

      alert(
        'Erro ao atualizar produto'
      )
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
    <div className="space-y-8 p-8">
      <PageHeader
        title="Editar Produto"
        description="Atualize as informações do produto."
        badge="Produtos"
      />

      <ProductForm
        title={title}
        category={category}
        price={price}
        image={image}
        brand={brand}
        model={model}
        salePrice={salePrice}
        costPrice={costPrice}
        sku={sku}
        ean={ean}
        stock={stock}
        weight={weight}
        height={height}
        width={width}
        length={length}
        shortDescription={
          shortDescription
        }
        description={description}
        onTitleChange={setTitle}
        onCategoryChange={
          setCategory
        }
        onPriceChange={setPrice}
        onBrandChange={setBrand}
        onModelChange={setModel}
        onSalePriceChange={
          setSalePrice
        }
        onCostPriceChange={
          setCostPrice
        }
        onSkuChange={setSku}
        onEanChange={setEan}
        onStockChange={setStock}
        onWeightChange={setWeight}
        onHeightChange={setHeight}
        onWidthChange={setWidth}
        onLengthChange={setLength}
        onShortDescriptionChange={
          setShortDescription
        }
        onDescriptionChange={
          setDescription
        }
        onUpload={handleUpload}
        onSave={handleSave}
      />
    </div>
  )
}

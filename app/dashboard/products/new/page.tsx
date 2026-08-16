'use client'

import { useState } from 'react'

import PageHeader from '@/components/ui/PageHeader'
import ProductForm from '@/components/dashboard/products/ProductForm'

export default function NewProductPage() {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')

  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')

  const [salePrice, setSalePrice] = useState('')
  const [costPrice, setCostPrice] = useState('')

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

  const [isAnalyzing] = useState(false)

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

    try {
      const response =
        await fetch(
          '/api/upload',
          {
            method: 'POST',
            body: formData,
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ??
            'Erro ao enviar imagem.'
        )
      }

      setImage(
        data.url ?? ''
      )
    } catch (error) {
      console.error(error)

      alert(
        'Erro ao enviar imagem.'
      )
    }
  }

  async function handleCreateProduct() {
    try {
      const response =
        await fetch(
          '/api/products',
          {
            method: 'POST',

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

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ??
            'Erro ao criar produto.'
        )
      }

      alert(
        'Produto criado com sucesso!'
      )

      setTitle('')
      setPrice('')
      setCategory('')
      setImage('')
      setBrand('')
      setModel('')
      setSalePrice('')
      setCostPrice('')
      setSku('')
      setEan('')
      setStock('')
      setWeight('')
      setHeight('')
      setWidth('')
      setLength('')
      setShortDescription('')
      setDescription('')
    } catch (error) {
      console.error(error)

      alert(
        error instanceof Error
          ? error.message
          : 'Erro ao criar produto.'
      )
    }
  }

  return (
    <div className="space-y-8 p-8">
      <PageHeader
        title="Novo Produto"
        description="Cadastre um novo produto para o seu catálogo inteligente."
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
        isAnalyzing={
          isAnalyzing
        }
        healthScore={
          healthScore
        }
        seoScore={
          seoScore
        }
        suggestedTitle={
          suggestedTitle
        }
        suggestedCategory={
          suggestedCategory
        }
        suggestedPrice={
          suggestedPrice
        }
        suggestedDescription={
          suggestedDescription
        }
        onTitleChange={
          setTitle
        }
        onCategoryChange={
          setCategory
        }
        onPriceChange={
          setPrice
        }
        onBrandChange={
          setBrand
        }
        onModelChange={
          setModel
        }
        onSalePriceChange={
          setSalePrice
        }
        onCostPriceChange={
          setCostPrice
        }
        onSkuChange={
          setSku
        }
        onEanChange={
          setEan
        }
        onStockChange={
          setStock
        }
        onWeightChange={
          setWeight
        }
        onHeightChange={
          setHeight
        }
        onWidthChange={
          setWidth
        }
        onLengthChange={
          setLength
        }
        onShortDescriptionChange={
          setShortDescription
        }
        onDescriptionChange={
          setDescription
        }
        onUpload={
          handleUpload
        }
        onSave={
          handleCreateProduct
        }
      />
    </div>
  )
}
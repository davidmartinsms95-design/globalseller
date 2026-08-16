'use client'

import ProductAISidebar from './ProductAISidebar'
import ProductBasicInfo from './ProductBasicInfo'
import ProductDescription from './ProductDescription'
import ProductDimensions from './ProductDimensions'
import ProductImageUpload from './ProductImageUpload'
import ProductInventory from './ProductInventory'
import ProductPricing from './ProductPricing'

import Card from '@/components/ui/Card'

interface ProductFormProps {
  title: string
  category: string
  price: string
  image: string

  brand: string
  model: string

  salePrice: string
  costPrice: string

  sku: string
  ean: string
  stock: string

  weight: string
  height: string
  width: string
  length: string

  shortDescription: string
  description: string

  onTitleChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onPriceChange: (value: string) => void

  onBrandChange: (value: string) => void
  onModelChange: (value: string) => void

  onSalePriceChange: (value: string) => void
  onCostPriceChange: (value: string) => void

  onSkuChange: (value: string) => void
  onEanChange: (value: string) => void
  onStockChange: (value: string) => void

  onWeightChange: (value: string) => void
  onHeightChange: (value: string) => void
  onWidthChange: (value: string) => void
  onLengthChange: (value: string) => void

  onShortDescriptionChange: (value: string) => void
  onDescriptionChange: (value: string) => void

  onUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void

  onSave: () => void
}

export default function ProductForm({
  title,
  category,
  price,
  image,
  brand,
  model,
  salePrice,
  costPrice,
  sku,
  ean,
  stock,
  weight,
  height,
  width,
  length,
  shortDescription,
  description,
  onTitleChange,
  onCategoryChange,
  onPriceChange,
  onBrandChange,
  onModelChange,
  onSalePriceChange,
  onCostPriceChange,
  onSkuChange,
  onEanChange,
  onStockChange,
  onWeightChange,
  onHeightChange,
  onWidthChange,
  onLengthChange,
  onShortDescriptionChange,
  onDescriptionChange,
  onUpload,
  onSave,
}: ProductFormProps) {
  return (
    <div className="grid gap-8 xl:grid-cols-3">
      <Card className="xl:col-span-2">
        <div className="space-y-10">
          <ProductBasicInfo
            title={title}
            category={category}
            price={price}
            brand={brand}
            model={model}
            onTitleChange={onTitleChange}
            onCategoryChange={onCategoryChange}
            onPriceChange={onPriceChange}
            onBrandChange={onBrandChange}
            onModelChange={onModelChange}
          />

          <ProductPricing
            salePrice={salePrice}
            costPrice={costPrice}
            onSalePriceChange={onSalePriceChange}
            onCostPriceChange={onCostPriceChange}
          />

          <ProductInventory
            sku={sku}
            ean={ean}
            stock={stock}
            onSkuChange={onSkuChange}
            onEanChange={onEanChange}
            onStockChange={onStockChange}
          />

          <ProductDimensions
            weight={weight}
            height={height}
            width={width}
            length={length}
            onWeightChange={onWeightChange}
            onHeightChange={onHeightChange}
            onWidthChange={onWidthChange}
            onLengthChange={onLengthChange}
          />

          <ProductDescription
            shortDescription={shortDescription}
            description={description}
            onShortDescriptionChange={
              onShortDescriptionChange
            }
            onDescriptionChange={
              onDescriptionChange
            }
          />

          <ProductImageUpload
            image={image}
            onUpload={onUpload}
          />
        </div>
      </Card>

      <ProductAISidebar
        title={title}
        description={description}
        category={category}
        image={image}
        price={price}
        stock={stock}
        brand={brand}
        model={model}
        onSave={onSave}
      />
    </div>
  )
}
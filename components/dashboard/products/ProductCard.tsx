'use client'

import { Brain } from 'lucide-react'

import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

import ProductActions from './ProductActions'

interface Product {
  id: string

  productId: string | null

  marketplaceId?: string | null

  permalink?: string | null

  status?: string | null

  customPrice?: number

  active: boolean

  marketplaceProduct: {
    id: string

    title: string

    description?: string

    costPrice: number

    suggestedPrice: number

    image?: string

    stock: number

    supplier: {
      companyName: string
    }
  }
}

interface ProductCardProps {
  product: Product

  onSavePrice: (
    id: string,
    customPrice: number,
  ) => void

  onRemove: (
    id: string,
  ) => void

  calculateHealth: (
    product: Product,
  ) => number

  getHealthVariant: (
    score: number,
  ) =>
    | 'success'
    | 'warning'
    | 'error'
}

export default function ProductCard({
  product,
  onSavePrice,
  onRemove,
  calculateHealth,
  getHealthVariant,
}: ProductCardProps) {
  const sellPrice =
    product.customPrice ??
    product.marketplaceProduct
      .suggestedPrice

  const profit =
    sellPrice -
    product.marketplaceProduct
      .costPrice

  const health =
    calculateHealth(product)

  return (
    <Card
      className="overflow-hidden p-0"
    >

      <img
        src={
          product.marketplaceProduct.image ||
          '/images/product-placeholder.png'
        }
        alt={
          product.marketplaceProduct.title
        }
        className="h-64 w-full object-cover"
      />

      <div className="space-y-6 p-6">

        <div className="flex items-start justify-between gap-4">

          <h2 className="line-clamp-2 text-xl font-bold text-white">

            {
              product.marketplaceProduct
                .title
            }

          </h2>

          <Badge
            variant={getHealthVariant(
              health,
            )}
          >
            {health}%
          </Badge>

        </div>

        <p className="line-clamp-3 text-sm leading-7 text-zinc-400">
                  {product.marketplaceProduct
            .description ||
            'Produto sem descrição.'}

        </p>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Venda
            </p>

            <p className="mt-1 text-2xl font-bold text-emerald-400">
              R$ {sellPrice.toFixed(2)}
            </p>

          </div>

          <div>

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Lucro
            </p>

            <p className="mt-1 text-2xl font-bold text-green-500">
              R$ {profit.toFixed(2)}
            </p>

          </div>

        </div>

        <div className="space-y-2 text-sm">

          <div className="flex justify-between">

            <span className="text-zinc-500">
              Fornecedor
            </span>

            <strong className="text-white">

              {
                product.marketplaceProduct
                  .supplier.companyName
              }

            </strong>

          </div>

          <div className="flex justify-between">

            <span className="text-zinc-500">
              Estoque
            </span>

            <strong className="text-white">

              {
                product.marketplaceProduct
                  .stock
              }

            </strong>

          </div>

          <div className="flex justify-between">

            <span className="text-zinc-500">
              Status
            </span>

            <strong
              className={
                product.active
                  ? 'text-emerald-500'
                  : 'text-red-500'
              }
            >

              {product.active
                ? 'Ativo'
                : 'Inativo'}

            </strong>

          </div>

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-zinc-400">
            Seu preço
          </label>

          <input
            type="number"
            defaultValue={sellPrice}
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-zinc-950
              p-3
              text-white
              outline-none
              transition
              focus:border-orange-500
            "
            onBlur={(e) =>
              onSavePrice(
                product.id,
                Number(e.target.value),
              )
            }
          />

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">

          <div className="mb-3 flex items-center gap-2">

            <Brain
              size={18}
              className="text-sky-400"
            />

            <span className="font-semibold text-white">
              Diagnóstico IA
            </span>

          </div>
                    {health >= 90 && (
            <p className="text-sm leading-6 text-emerald-400">
              Excelente anúncio. Continue mantendo
              título, descrição e estoque atualizados.
            </p>
          )}

          {health >= 70 &&
            health < 90 && (
              <p className="text-sm leading-6 text-yellow-400">
                Seu anúncio está bom, mas ainda pode
                melhorar para aumentar as conversões.
              </p>
            )}

          {health < 70 && (
            <p className="text-sm leading-6 text-red-400">
              Este anúncio precisa de atenção.
              Revise título, descrição, imagens
              e disponibilidade em estoque.
            </p>
          )}

        </div>

        <ProductActions
          productId={product.id}
          permalink={product.permalink}
          onRemove={() =>
            onRemove(product.id)
          }
        />
              </div>

    </Card>
  )
}
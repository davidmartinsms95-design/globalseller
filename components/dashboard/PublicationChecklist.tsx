interface Props {
  product: any
}

export default function PublicationChecklist({
  product,
}: Props) {
  const checks = [
    {
      label: 'Título',
      ok: product.title?.length >= 30,
    },
    {
      label: 'Descrição',
      ok: product.description?.length >= 100,
    },
    {
      label: 'Imagem',
      ok: !!product.image,
    },
    {
      label: 'Preço',
      ok: product.price > 0,
    },
    {
      label: 'Estoque',
      ok: product.stock > 0,
    },
    {
      label: 'Categoria',
      ok: !!product.mlCategoryId,
    },
  ]

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Checklist do Anúncio
      </h2>

      <div className="space-y-4">
        {checks.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between"
          >
            <span>{item.label}</span>

            <span
              className={
                item.ok
                  ? 'font-bold text-green-500'
                  : 'font-bold text-red-500'
              }
            >
              {item.ok ? '✓' : '✗'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
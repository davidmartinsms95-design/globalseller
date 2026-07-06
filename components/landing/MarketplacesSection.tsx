const marketplaces = [
  { name: 'Mercado Livre', status: 'Disponível' },
  { name: 'Shopee', status: 'Em desenvolvimento' },
  { name: 'Amazon', status: 'Em desenvolvimento' },
  { name: 'Temu', status: 'Planejado' },
  { name: 'Shein', status: 'Planejado' },
  { name: 'Magalu', status: 'Planejado' },
  { name: 'Americanas', status: 'Planejado' },
  { name: 'Casas Bahia', status: 'Planejado' },
  { name: 'Extra', status: 'Planejado' },
  { name: 'Carrefour', status: 'Planejado' },
  { name: 'TikTok Shop', status: 'Planejado' },
  { name: 'Instagram Shopping', status: 'Planejado' },
]

export default function MarketplacesSection() {
  return (
    <section
      id="marketplaces"
      className="border-t border-zinc-800 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-bold">
            Marketplaces Integrados
          </h2>

          <p className="mt-5 text-xl text-zinc-400">
            Publique seus produtos em vários canais utilizando um único painel.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {marketplaces.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-orange-500"
            >
              <h3 className="text-xl font-bold">
                {item.name}
              </h3>

              <span
                className={`mt-4 inline-block rounded-full px-3 py-1 text-sm ${
                  item.status === 'Disponível'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
'use client'

export default function AIPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-6xl font-bold text-white">
          Inteligência Artificial
        </h1>

        <p className="mt-4 text-xl text-zinc-400">
          Ferramentas de IA para descrições, precificação e análises.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
          <h2 className="text-3xl font-bold text-white">
            Gerador de Descrições
          </h2>

          <p className="mt-4 text-zinc-400">
            Crie descrições otimizadas para Mercado Livre,
            Shopee e outros marketplaces.
          </p>
        </div>

        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
          <h2 className="text-3xl font-bold text-white">
            Precificação Inteligente
          </h2>

          <p className="mt-4 text-zinc-400">
            Sugestão automática de preços baseada em IA.
          </p>
        </div>
      </div>
    </div>
  )
}
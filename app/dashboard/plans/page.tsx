export default function PlansPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-white">
          Planos
        </h1>

        <p className="mt-4 text-zinc-400">
          Escolha o plano ideal para seu negócio
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              FREE
            </h2>

            <p className="mt-3 text-zinc-400">
              Ideal para começar
            </p>
          </div>

          <div className="mb-8">
            <span className="text-6xl font-bold">
              R$0
            </span>

            <span className="ml-2 text-zinc-400">
              /mês
            </span>
          </div>

          <ul className="space-y-4 text-zinc-300">
            <li>✓ Até 5 produtos</li>
            <li>✓ Dashboard básico</li>
            <li>✓ Checkout PIX</li>
            <li>✓ Pedidos ilimitados</li>
          </ul>

          <button className="mt-10 w-full rounded-2xl bg-zinc-800 px-6 py-4 font-bold text-white">
            Plano Atual
          </button>
        </div>

        <div className="relative rounded-[32px] border-2 border-orange-500 bg-zinc-900 p-8 shadow-2xl shadow-orange-500/10">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-white">
            MAIS POPULAR
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-orange-500">
              PRO
            </h2>

            <p className="mt-3 text-zinc-400">
              Para vendedores profissionais
            </p>
          </div>

          <div className="mb-8">
            <span className="text-6xl font-bold">
              R$49
            </span>

            <span className="ml-2 text-zinc-400">
              /mês
            </span>
          </div>

          <ul className="space-y-4 text-zinc-300">
            <li>✓ Produtos ilimitados</li>
            <li>✓ Dashboard premium</li>
            <li>✓ Analytics avançado</li>
            <li>✓ Prioridade suporte</li>
            <li>✓ Sem limitações</li>
          </ul>

          <button className="mt-10 w-full rounded-2xl bg-orange-500 px-6 py-4 font-bold text-white transition hover:bg-orange-400">
            Fazer Upgrade
          </button>
        </div>

        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              ENTERPRISE
            </h2>

            <p className="mt-3 text-zinc-400">
              Solução completa
            </p>
          </div>

          <div className="mb-8">
            <span className="text-6xl font-bold">
              R$199
            </span>

            <span className="ml-2 text-zinc-400">
              /mês
            </span>
          </div>

          <ul className="space-y-4 text-zinc-300">
            <li>✓ White-label</li>
            <li>✓ Domínio próprio</li>
            <li>✓ Multiusuário avançado</li>
            <li>✓ Suporte dedicado</li>
            <li>✓ API enterprise</li>
          </ul>

          <button className="mt-10 w-full rounded-2xl bg-zinc-800 px-6 py-4 font-bold text-white transition hover:bg-zinc-700">
            Falar com vendas
          </button>
        </div>
      </div>
    </div>
  )
}


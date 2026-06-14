import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <header className="border-b border-zinc-800 bg-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-orange-500">
              GlobalSeller
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Plataforma SaaS para vendas digitais
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-2xl px-5 py-3 font-bold transition hover:bg-zinc-900"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-2xl bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-400"
            >
              Começar Grátis
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-bold text-orange-400">
              Plataforma SaaS Completa
            </div>

            <h1 className="text-7xl font-bold leading-tight">
              Venda produtos digitais com uma plataforma profissional
            </h1>

            <p className="mt-8 text-2xl leading-relaxed text-zinc-400">
              Dashboard premium, checkout PIX,
              analytics, multiusuário e assinatura
              recorrente em uma única plataforma.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-2xl bg-orange-500 px-8 py-5 text-lg font-bold text-white transition hover:bg-orange-400"
              >
                Começar Agora
              </Link>

              <Link
                href="/dashboard"
                className="rounded-2xl border border-zinc-700 px-8 py-5 text-lg font-bold transition hover:bg-zinc-900"
              >
                Ver Dashboard
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 text-zinc-400">
              <div>
                <p className="text-4xl font-bold text-white">
                  +10K
                </p>

                <p>Usuários</p>
              </div>

              <div>
                <p className="text-4xl font-bold text-white">
                  +R$1M
                </p>

                <p>Processados</p>
              </div>

              <div>
                <p className="text-4xl font-bold text-white">
                  99.9%
                </p>

                <p>Uptime</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-zinc-400">
                  Faturamento
                </p>

                <h2 className="mt-2 text-5xl font-bold text-green-500">
                  R$48.920
                </h2>
              </div>

              <div className="rounded-2xl bg-green-500/20 px-4 py-2 text-green-400">
                +18%
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-black p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">
                      Produto Premium
                    </p>

                    <p className="text-sm text-zinc-400">
                      Checkout PIX
                    </p>
                  </div>

                  <p className="font-bold text-green-500">
                    R$297
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-black p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">
                      Assinatura PRO
                    </p>

                    <p className="text-sm text-zinc-400">
                      Recorrente
                    </p>
                  </div>

                  <p className="font-bold text-green-500">
                    R$49
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-black p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">
                      Dashboard Analytics
                    </p>

                    <p className="text-sm text-zinc-400">
                      Tempo real
                    </p>
                  </div>

                  <p className="font-bold text-orange-500">
                    Online
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-orange-500/20 bg-orange-500/10 p-6">
              <p className="text-lg font-bold text-orange-400">
                Plataforma Enterprise
              </p>

              <p className="mt-3 text-zinc-300">
                Multiusuário, pagamentos,
                analytics e monetização em um
                único sistema.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-black">
        <div className="mx-auto max-w-7xl px-8 py-24">
          <div className="mb-16 text-center">
            <h2 className="text-6xl font-bold">
              Tudo que você precisa
            </h2>

            <p className="mt-6 text-2xl text-zinc-400">
              Plataforma completa para vender
              online
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
              <h3 className="text-3xl font-bold">
                Checkout PIX
              </h3>

              <p className="mt-4 text-zinc-400">
                Receba pagamentos instantâneos
                com Mercado Pago.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
              <h3 className="text-3xl font-bold">
                Analytics
              </h3>

              <p className="mt-4 text-zinc-400">
                Dashboard premium com métricas
                em tempo real.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
              <h3 className="text-3xl font-bold">
                Multiusuário
              </h3>

              <p className="mt-4 text-zinc-400">
                Cada vendedor possui painel e
                produtos próprios.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
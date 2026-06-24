'use client'

export default function PlansPage() {
  async function upgradePlan() {
    try {
      const response = await fetch(
        '/api/subscription',
        {
          method: 'POST',
        }
      )

      const data = await response.json()

      if (data.init_point) {
        window.location.href =
          data.init_point
      }
    } catch (error) {
      console.log(error)

      alert(
        'Erro ao iniciar assinatura'
      )
    }
  }

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
          <h2 className="text-3xl font-bold">
            FREE
          </h2>

          <div className="mt-8">
            <span className="text-6xl font-bold">
              R$0
            </span>
          </div>

          <button className="mt-10 w-full rounded-2xl bg-zinc-800 px-6 py-4 font-bold text-white">
            Plano Atual
          </button>
        </div>

        <div className="rounded-[32px] border-2 border-orange-500 bg-zinc-900 p-8">
          <h2 className="text-3xl font-bold text-orange-500">
            PRO
          </h2>

          <div className="mt-8">
            <span className="text-6xl font-bold">
              R$49
            </span>
          </div>

          <button
            onClick={upgradePlan}
            className="mt-10 w-full rounded-2xl bg-orange-500 px-6 py-4 font-bold text-white"
          >
            Fazer Upgrade
          </button>
        </div>

        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
          <h2 className="text-3xl font-bold">
            ENTERPRISE
          </h2>

          <div className="mt-8">
            <span className="text-6xl font-bold">
              R$199
            </span>
          </div>

          <button className="mt-10 w-full rounded-2xl bg-zinc-800 px-6 py-4 font-bold text-white">
            Falar com vendas
          </button>
        </div>

      </div>
    </div>
  )
}
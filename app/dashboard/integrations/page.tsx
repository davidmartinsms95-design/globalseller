'use client'

export default function IntegrationsPage() {
async function connectMercadoLivre() {
  window.open(
  'https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=7497664436144745&redirect_uri=https%3A%2F%2Fglobalseller-zhun.vercel.app%2Fapi%2Fintegrations%2Fmercadolivre%2Fcallback',
  '_self'
)
}

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-white">
          Integrações
        </h1>

        <p className="mt-4 text-zinc-400">
          Conecte marketplaces e centralize sua operação.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-[32px] border border-yellow-500/20 bg-zinc-900 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-yellow-400">
              Mercado Livre
            </h2>

            <p className="mt-3 text-zinc-400">
              Sincronize produtos, pedidos e estoque automaticamente.
            </p>
          </div>

          <button
            onClick={connectMercadoLivre}
            className="mt-10 w-full rounded-2xl bg-yellow-400 px-6 py-4 font-bold text-black transition hover:bg-yellow-300"
          >
            Conectar Mercado Livre
          </button>
        </div>
      </div>
    </div>
  )
}
'use client'
export default function IntegrationsPage() {
  async function connectMercadoLivre() {
    const clientId =
      process.env
        .NEXT_PUBLIC_MERCADO_LIVRE_CLIENT_ID

    const redirectUri =
      'https://globalseller.vercel.app/api/integrations/mercadolivre/callback'

    const authUrl = `
      https://auth.mercadolivre.com.br/authorization
      ?response_type=code
      &client_id=${clientId}
      &redirect_uri=${redirectUri}
    `.replace(/\s/g, '')

    window.location.href = authUrl
  }

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-white">
          Integrações
        </h1>

        <p className="mt-4 text-zinc-400">
          Conecte marketplaces e centralize
          sua operação.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-[32px] border border-yellow-500/20 bg-zinc-900 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-yellow-400">
              Mercado Livre
            </h2>

            <p className="mt-3 text-zinc-400">
              Sincronize produtos, pedidos e
              estoque automaticamente.
            </p>
          </div>

          <ul className="space-y-4 text-zinc-300">
            <li>
              ✓ Importação automática
            </li>

            <li>
              ✓ Sincronização pedidos
            </li>

            <li>
              ✓ Atualização estoque
            </li>

            <li>
              ✓ Analytics marketplace
            </li>
          </ul>

          <button
            onClick={connectMercadoLivre}
            className="mt-10 w-full rounded-2xl bg-yellow-400 px-6 py-4 font-bold text-black transition hover:bg-yellow-300"
          >
            Conectar Mercado Livre
          </button>
        </div>

        <div className="rounded-[32px] border border-orange-500/20 bg-zinc-900 p-8 opacity-60">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-orange-500">
              Shopee
            </h2>

            <p className="mt-3 text-zinc-400">
              Integração marketplace Shopee.
            </p>
          </div>

          <button className="mt-10 w-full rounded-2xl bg-zinc-800 px-6 py-4 font-bold text-white">
            Em breve
          </button>
        </div>

        <div className="rounded-[32px] border border-blue-500/20 bg-zinc-900 p-8 opacity-60">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-blue-400">
              Amazon
            </h2>

            <p className="mt-3 text-zinc-400">
              Integração Amazon Seller.
            </p>
          </div>

          <button className="mt-10 w-full rounded-2xl bg-zinc-800 px-6 py-4 font-bold text-white">
            Em breve
          </button>
        </div>
      </div>
    </div>
  )
}
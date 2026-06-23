'use client'

import { useEffect, useState } from 'react'

interface Insight {
  title: string

  description: string

  type:
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
}

export default function InsightsPage() {
  const [insights, setInsights] =
    useState<Insight[]>([])

  const [loading, setLoading] =
    useState(true)

  async function loadInsights() {
    try {
      /*
        Simulação IA Insights
        Próximo passo:
        GPT analisar banco real
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      )

      const generatedInsights: Insight[] =
        [
          {
            title:
              'Marketplace Mais Lucrativo',

            description:
              'Mercado Livre está gerando 62% do faturamento total da operação.',

            type: 'success',
          },

          {
            title:
              'Estoque Crítico Detectado',

            description:
              '5 produtos estão com estoque abaixo do ideal.',

            type: 'danger',
          },

          {
            title:
              'Produto com Melhor Performance',

            description:
              'Smartwatch Ultra lidera vendas nos últimos 7 dias.',

            type: 'success',
          },

          {
            title:
              'Produto com Baixo Giro',

            description:
              '2 produtos estão sem vendas há mais de 30 dias.',

            type: 'warning',
          },

          {
            title:
              'Melhor Horário de Conversão',

            description:
              'Maior volume de vendas ocorre entre 19h e 22h.',

            type: 'info',
          },

          {
            title:
              'Cliente com Maior LTV',

            description:
              'Cliente premium realizou 12 compras no último mês.',

            type: 'success',
          },
        ]

      setInsights(generatedInsights)

      setLoading(false)
    } catch (error) {
      console.log(error)

      setLoading(false)
    }
  }

  useEffect(() => {
    loadInsights()
  }, [])

  return (
    <div>
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-6xl font-bold text-white">
            AI Insights
          </h1>

          <p className="mt-4 text-xl text-zinc-400">
            Inteligência analítica da
            operação multi-marketplace.
          </p>
        </div>

        <div className="rounded-2xl bg-violet-600 px-6 py-4 font-bold text-white">
          ERP AI ANALYTICS
        </div>
      </div>

      {loading ? (
        <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-10">
          <p className="text-xl text-zinc-400">
            IA analisando operação...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">
                  {insight.title}
                </h2>

                <div
                  className={`
                    rounded-2xl px-4 py-2 font-bold
                    ${
                      insight.type ===
                      'success'
                        ? 'bg-green-500/20 text-green-400'
                        : insight.type ===
                            'warning'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : insight.type ===
                              'danger'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-blue-500/20 text-blue-400'
                    }
                  `}
                >
                  {insight.type}
                </div>
              </div>

              <p className="text-lg leading-relaxed text-zinc-300">
                {insight.description}
              </p>

              <div className="mt-8 rounded-2xl bg-black p-5">
                <p className="text-sm text-zinc-500">
                  Insight gerado por IA
                  operacional do GlobalSeller.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">
            Recursos IA Analytics
          </h2>

          <p className="mt-2 text-zinc-400">
            Inteligência operacional
            enterprise.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-black p-6">
            <h3 className="text-xl font-bold text-violet-400">
              IA Vendas
            </h3>

            <p className="mt-3 text-zinc-400">
              Insights automáticos de
              performance comercial.
            </p>
          </div>

          <div className="rounded-2xl bg-black p-6">
            <h3 className="text-xl font-bold text-violet-400">
              IA Estoque
            </h3>

            <p className="mt-3 text-zinc-400">
              Alertas inteligentes para
              reposição e giro.
            </p>
          </div>

          <div className="rounded-2xl bg-black p-6">
            <h3 className="text-xl font-bold text-violet-400">
              IA Financeiro
            </h3>

            <p className="mt-3 text-zinc-400">
              Análise automática de lucro e
              margem operacional.
            </p>
          </div>

          <div className="rounded-2xl bg-black p-6">
            <h3 className="text-xl font-bold text-violet-400">
              IA CRM
            </h3>

            <p className="mt-3 text-zinc-400">
              Inteligência sobre clientes e
              comportamento de compra.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


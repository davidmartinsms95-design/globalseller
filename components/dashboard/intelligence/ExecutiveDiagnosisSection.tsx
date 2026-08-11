'use client'

import { Brain, Sparkles } from 'lucide-react'

import Card from '@/components/ui/Card'

interface ExecutiveDiagnosisSectionProps {
  healthScore: number
  seoScore: number
  recommendationsCount: number
  alertsCount: number
}

export default function ExecutiveDiagnosisSection({
  healthScore,
  seoScore,
  recommendationsCount,
  alertsCount,
}: ExecutiveDiagnosisSectionProps) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <Sparkles
          size={22}
          className="text-orange-400"
        />

        <h2 className="text-2xl font-bold text-white">
          Resumo Executivo
        </h2>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-sm text-zinc-500">
            Health Score
          </p>

          <h2 className="mt-2 text-4xl font-bold text-emerald-400">
            {healthScore}%
          </h2>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-sm text-zinc-500">
            SEO Score
          </p>

          <h2 className="mt-2 text-4xl font-bold text-sky-400">
            {seoScore}%
          </h2>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-sm text-zinc-500">
            Recomendações
          </p>

          <h2 className="mt-2 text-4xl font-bold text-orange-400">
            {recommendationsCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="text-sm text-zinc-500">
            Alertas
          </p>

          <h2 className="mt-2 text-4xl font-bold text-red-400">
            {alertsCount}
          </h2>
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-orange-500/20 bg-orange-500/5 p-6">
        <div className="flex items-center gap-3">
          <Brain
            size={22}
            className="text-orange-400"
          />

          <h3 className="text-xl font-bold text-white">
            Diagnóstico Executivo da IA
          </h3>
        </div>

        <p className="mt-5 leading-8 text-zinc-300">
          A Central de Inteligência consolida todas as análises do
          GlobalSeller em um único painel, permitindo visualizar
          indicadores de SEO, saúde dos anúncios, lucratividade,
          concorrência, tendências de mercado, previsões de vendas,
          alertas automáticos e recomendações geradas pela
          Inteligência Artificial.
        </p>

        <p className="mt-5 leading-8 text-zinc-300">
          Todas as informações são atualizadas em tempo real para
          auxiliar na tomada de decisões e aumentar a performance
          dos produtos publicados.
        </p>
      </div>
    </Card>
  )
}
'use client'

import { useEffect, useState } from 'react'

import {
  Activity,
  AlertTriangle,
  ShieldCheck,
  Timer,
} from 'lucide-react'

import StatCard from '@/components/dashboard/StatCard'
import Card from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'
import SkeletonCard from '@/components/ui/SkeletonCard'

interface ExecutiveRecommendation {
  title: string
  description: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
}

interface ExecutiveKpis {
  totalIssues: number
  criticalIssues: number
  warnings: number
  analyzedFiles: number
}

interface AuditorResponse {
  audit: {
    analysis: {
      imports: {
        totalFiles: number
        totalImports: number
        averageImportsPerFile: number
      }

      duplicateImports: {
        filesWithDuplicates: number
        totalDuplicates: number
      }

      unusedFiles: {
        totalUnusedFiles: number
      }

      circularDependencies: {
        totalCycles: number
      }

      largeFiles: {
        totalLargeFiles: number
      }

      complexity: {
        totalFiles: number
        averageScore: number
        criticalFiles: number
      }
    }

        executive: {
  architecture: unknown

  hotspots: {
    totalHotspots: number
    averageScore: number
    highestScore: number
    topFiles: string[]
  }

  hotspotReport: {
    hotspots: Hotspot[]
    totalHotspots: number
    averageScore: number
    highestScore: number
  }

  executive: {
        score: number

        health: {
          score: number
          level: string
        }

        risk: {
          score: number
          level: string
        }

        technicalDebt: {
          estimatedHours: number
          priority: string
        }

        kpis: ExecutiveKpis

        recommendations: ExecutiveRecommendation[]
      }

      generatedAt: string
    }
  }

  metadata: {
    startedAt: string
    finishedAt: string
    duration: number
    success: boolean
    scannersExecuted: string[]
    errors: string[]
  }
}

interface Hotspot {
  path: string

  score: number

  complexity: number

  fanIn: number

  fanOut: number

  lines: number

  reasons: string[]
}

export default function AuditorPage() {
  const [data, setData] =
    useState<AuditorResponse | null>(
      null,
    )

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState<string | null>(null)

  useEffect(() => {
    async function loadAudit() {
      try {
        setLoading(true)

        const response =
          await fetch('/api/auditor')

        if (!response.ok) {
          throw new Error(
            'Não foi possível carregar a auditoria.',
          )
        }

        const json =
          (await response.json()) as AuditorResponse

        setData(json)

        console.log(json.audit.executive.hotspots)

        setError(null)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Erro inesperado ao carregar a auditoria.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadAudit()
  }, [])

  const executive =
    data?.audit.executive.executive
      if (loading) {
    return (
      <div className="space-y-8">

        <PageHeader
          badge="Auditor Técnico"
          title="Auditoria do GlobalSeller"
          description="Analisando arquitetura, qualidade do código, riscos técnicos e indicadores executivos do projeto."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

      </div>
    )
  }

  if (error || !executive) {
    return (
      <div className="space-y-8">

        <PageHeader
          badge="Auditor Técnico"
          title="Auditoria do GlobalSeller"
          description="Analisando arquitetura, qualidade do código, riscos técnicos e indicadores executivos do projeto."
        />

        <Card
          variant="error"
          hover={false}
        >
          <div className="flex items-start gap-4">

            <AlertTriangle className="mt-1 h-8 w-8 text-red-400" />

            <div>

              <h2 className="text-xl font-semibold text-white">
                Erro ao carregar auditoria
              </h2>

              <p className="mt-2 text-zinc-400">
                {error ??
                  'Não foi possível carregar os dados da auditoria.'}
              </p>

            </div>

          </div>
        </Card>

      </div>
    )
  }

  return (
    <div className="space-y-8">

      <PageHeader
        badge="Auditor Técnico"
        title="Auditoria do GlobalSeller"
        description="Monitore a saúde técnica do projeto através do Executive Score, arquitetura, riscos, hotspots e indicadores estratégicos."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
          title="Executive Score"
          value={`${executive.score}/100`}
          subtitle="Pontuação geral da auditoria"
          icon={Activity}
          iconColor="text-cyan-400"
          variant="glass"
        />

        <StatCard
          title="Health"
          value={`${executive.health.score}/100`}
          subtitle={executive.health.level}
          icon={ShieldCheck}
          iconColor="text-emerald-400"
          variant="success"
        />

        <StatCard
          title="Risk"
          value={`${executive.risk.score}/100`}
          subtitle={executive.risk.level}
          icon={AlertTriangle}
          iconColor="text-amber-400"
          variant="warning"
        />

        <StatCard
          title="Technical Debt"
          value={`${executive.technicalDebt.estimatedHours}h`}
          subtitle={executive.technicalDebt.priority}
          icon={Timer}
          iconColor="text-red-400"
          variant="error"
        />

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <Card>

  <div className="mb-6 flex items-center justify-between">

    <div>

      <h2 className="text-xl font-semibold text-white">
        🔥 Top Hotspots
      </h2>

      <p className="mt-1 text-sm text-zinc-500">
        Arquivos com maior risco arquitetural.
      </p>

    </div>

    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-right">

      <p className="text-xs text-zinc-500">
        Total
      </p>

      <p className="text-lg font-bold text-white">
        {data.audit.executive.hotspots.totalHotspots}
      </p>

    </div>

  </div>

  <div className="space-y-4">

    {data.audit.executive.hotspotReport.hotspots
      .slice(0, 5)
      .map((hotspot, index) => (

        <div
          key={`${hotspot.path}-${index}`}
          className="
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900/40
            p-5
          "
        >

          <div className="flex items-center justify-between">

            <h3 className="truncate font-semibold text-white">
              {hotspot.path}
            </h3>

            <span
              className="
                rounded-full
                bg-red-500/10
                px-3
                py-1
                text-sm
                font-semibold
                text-red-400
              "
            >
              {hotspot.score.toFixed(0)}
            </span>

          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">

            <div className="rounded-lg bg-zinc-950/40 p-3">

              <p className="text-zinc-500">
                Complexidade
              </p>

              <p className="mt-1 font-semibold text-white">
                {hotspot.complexity}
              </p>

            </div>

            <div className="rounded-lg bg-zinc-950/40 p-3">

              <p className="text-zinc-500">
                Linhas
              </p>

              <p className="mt-1 font-semibold text-white">
                {hotspot.lines}
              </p>

            </div>

            <div className="rounded-lg bg-zinc-950/40 p-3">

              <p className="text-zinc-500">
                Fan-In
              </p>

              <p className="mt-1 font-semibold text-white">
                {hotspot.fanIn}
              </p>

            </div>

            <div className="rounded-lg bg-zinc-950/40 p-3">

              <p className="text-zinc-500">
                Fan-Out
              </p>

              <p className="mt-1 font-semibold text-white">
                {hotspot.fanOut}
              </p>

            </div>

          </div>

          {hotspot.reasons.length > 0 && (

            <div className="mt-5">

              <p className="mb-2 text-sm font-semibold text-zinc-300">
                Motivos
              </p>

              <div className="flex flex-wrap gap-2">

                {hotspot.reasons.map(reason => (

                  <span
                    key={reason}
                    className="
                      rounded-full
                      border
                      border-orange-500/20
                      bg-orange-500/10
                      px-3
                      py-1
                      text-xs
                      text-orange-300
                    "
                  >
                    {reason}
                  </span>

                ))}

              </div>

            </div>

          )}

        </div>

      ))}

  </div>

</Card>

      </div>
          </div>
  )
}
import {
  ExecutiveHealth,
  ExecutiveKpis,
  ExecutiveMetrics,
  ExecutiveRecommendation,
  ExecutiveRisk,
  TechnicalDebt,
} from './executive.types'

import {
  buildExecutiveScore,
} from './score.engine'

export interface MetricsEngineInput {
  health: ExecutiveHealth
  risk: ExecutiveRisk
  technicalDebt: TechnicalDebt
  recommendations: ExecutiveRecommendation[]

  analyzedFiles: number
  criticalIssues: number
  warnings: number
}

function buildKpis(
  input: MetricsEngineInput,
): ExecutiveKpis {
  return {
    totalIssues:
      input.criticalIssues +
      input.warnings,

    criticalIssues:
      input.criticalIssues,

    warnings:
      input.warnings,

    analyzedFiles:
      input.analyzedFiles,
  }
}

export function buildExecutiveMetrics(
  input: MetricsEngineInput,
): ExecutiveMetrics {
  const score =
    buildExecutiveScore({
      health:
        input.health.score,

      risk:
        input.risk.score,

      technicalDebtHours:
  input.technicalDebt.estimatedHours,

      criticalIssues:
        input.criticalIssues,

      warnings:
        input.warnings,
    })

    console.log({
  health: input.health.score,
  risk: input.risk.score,
  technicalDebtHours:
    input.technicalDebt.estimatedHours,
  criticalIssues:
    input.criticalIssues,
  warnings:
    input.warnings,
  score,
})
  return {
    health: input.health,

    risk: input.risk,

    technicalDebt:
      input.technicalDebt,

    recommendations:
      input.recommendations,

    kpis: buildKpis(input),

    score,
  }
}
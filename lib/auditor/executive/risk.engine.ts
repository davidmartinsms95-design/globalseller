import type {
  AnalyzerResults,
} from '../types/audit.types'

import type {
  ExecutiveRisk,
  RiskLevel,
} from './executive.types'

import {
  RISK_LEVELS,
  RISK_WEIGHTS,
} from './executiveWeights'

export function buildRisk(
  analysis: AnalyzerResults,
): ExecutiveRisk {
  const securitySeverities =
  analysis.security.items.map(
    item => item.severity,
  )

const architectureSeverities =
  analysis.architecture.items.map(
    item => item.severity,
  )

const codeSmellSeverities =
  analysis.codeSmells.items.map(
    item => item.severity,
  )

const allSeverities = [
  ...securitySeverities,
  ...architectureSeverities,
  ...codeSmellSeverities,
]

const weightedScore =
  calculateRisk(
    allSeverities,
  )

const totalItems =
  allSeverities.length

const averageRisk =
  totalItems === 0
    ? 0
    : weightedScore /
      totalItems

const maxSeverityWeight =
  Math.max(
    ...Object.values(
      RISK_WEIGHTS,
    ),
  )

const score = Math.round(
  Math.max(
    0,
    Math.min(
      100,
      (
        averageRisk /
        maxSeverityWeight
      ) * 100,
    ),
  ),
)

  return {
    score,

    level:
      calculateRiskLevel(
        score,
      ),
  }
}

function calculateRisk(
  severities: readonly string[],
): number {
  return severities.reduce(
    (
      total,
      severity,
    ) =>
      total +
      (
        RISK_WEIGHTS[
          severity as keyof typeof RISK_WEIGHTS
        ] ?? 0
      ),
    0,
  )
}

function calculateRiskLevel(
  score: number,
): RiskLevel {
  if (
    score >=
    RISK_LEVELS.HIGH
  ) {
    return 'CRITICAL'
  }

  if (
    score >=
    RISK_LEVELS.MEDIUM
  ) {
    return 'HIGH'
  }

  if (
    score >=
    RISK_LEVELS.LOW
  ) {
    return 'MEDIUM'
  }

  return 'LOW'
}
import type {
  AnalyzerResults,
} from '../types/audit.types'

import type {
  ExecutiveHealth,
} from './executive.types'

import {
  EXECUTIVE_WEIGHTS,
  HEALTH_LEVELS,
} from './executiveWeights'

export function buildHealth(
  analysis: AnalyzerResults,
): ExecutiveHealth {
  const securityScore =
    calculateAverageScore(
      analysis.security.items.map(
        item => item.score,
      ),
    )

  const architectureScore =
    calculateAverageScore(
      analysis.architecture.items.map(
        item => item.score,
      ),
    )

  const codeSmellScore =
    calculateAverageScore(
      analysis.codeSmells.items.map(
        item => item.score,
      ),
    )

  const complexityScore =
    analysis.complexity.averageScore

  const weightedScore =
  (
    securityScore *
      EXECUTIVE_WEIGHTS.security +

    architectureScore *
      EXECUTIVE_WEIGHTS.architecture +

    codeSmellScore *
      EXECUTIVE_WEIGHTS.codeSmells +

    complexityScore *
      EXECUTIVE_WEIGHTS.complexity
  )

  const normalizedScore =
    Math.max(
      0,
      Math.min(
        100,
        Number(
          (
            100 -
            weightedScore * 10
          ).toFixed(2),
        ),
      ),
    )

  return {
    score: normalizedScore,

    level:
      calculateHealthLevel(
        normalizedScore,
      ),
  }
}

function calculateAverageScore(
  scores: number[],
): number {
  if (
    scores.length === 0
  ) {
    return 0
  }

  return (
    scores.reduce(
      (
        total,
        score,
      ) =>
        total +
        score,
      0,
    ) /
    scores.length
  )
}

function calculateHealthLevel(
  score: number,
):
  | 'EXCELLENT'
  | 'GOOD'
  | 'FAIR'
  | 'POOR'
  | 'CRITICAL' {
  if (
    score >=
    HEALTH_LEVELS.excellent
  ) {
    return 'EXCELLENT'
  }

  if (
    score >=
    HEALTH_LEVELS.good
  ) {
    return 'GOOD'
  }

  if (
    score >=
    HEALTH_LEVELS.warning
  ) {
    return 'FAIR'
  }

  if (
    score >= 30
  ) {
    return 'POOR'
  }

  return 'CRITICAL'
}
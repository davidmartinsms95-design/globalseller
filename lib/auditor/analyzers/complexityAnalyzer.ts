import type {
  ComplexityMetrics,
} from '../collectors/complexityCollector'

import type {
  ProjectIndex,
} from '../index/projectIndex'

export interface ComplexityItem {
  path: string

  score: number

  level:
    | 'LOW'
    | 'MEDIUM'
    | 'HIGH'
    | 'CRITICAL'

  metrics: ComplexityMetrics

  recommendations: string[]
}

export interface ComplexityReport {
  totalFiles: number

  averageScore: number

  criticalFiles: number

  items: ComplexityItem[]
}

export function analyzeComplexity(
  index: ProjectIndex,
): ComplexityReport {
  const items: ComplexityItem[] = []

  for (const file of index.files) {
    const metrics =
  file.complexity

    const score =
      calculateScore(metrics)

    items.push({
      path: file.path,

      score,

      level:
        calculateLevel(score),

      metrics,

      recommendations:
        generateRecommendations(
          metrics,
        ),
    })
  }

  const averageScore =
    items.length === 0
      ? 0
      : Number(
          (
            items.reduce(
              (sum, item) =>
                sum +
                item.score,
              0,
            ) / items.length
          ).toFixed(2),
        )

  return {
    totalFiles:
      items.length,

    averageScore,

    criticalFiles:
      items.filter(
        (
          item,
        ) =>
          item.level ===
          'CRITICAL',
      ).length,

    items:
      items.sort(
        (
          a,
          b,
        ) =>
          b.score -
          a.score,
      ),
  }
}

function calculateScore(
  metrics: ComplexityMetrics,
): number {
  let score = 0

  score +=
    metrics.lines / 250

  score +=
    metrics.functions / 8

  score +=
    metrics.ifs / 8

  score +=
    metrics.loops / 8

  score +=
    metrics.imports / 20

  score +=
    metrics.jsxDepth / 8

  return Number(
    Math.min(
      score,
      10,
    ).toFixed(2),
  )
}

function calculateLevel(
  score: number,
):
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL' {
  if (score < 2)
    return 'LOW'

  if (score < 5)
    return 'MEDIUM'

  if (score < 8)
    return 'HIGH'

  return 'CRITICAL'
}

function generateRecommendations(
  metrics: ComplexityMetrics,
): string[] {
  const recommendations: string[] =
    []

  if (
    metrics.lines > 500
  ) {
    recommendations.push(
      'Dividir arquivo em módulos.',
    )
  }

  if (
    metrics.functions >
    15
  ) {
    recommendations.push(
      'Extrair funções auxiliares.',
    )
  }

  if (
    metrics.jsxDepth >
    8
  ) {
    recommendations.push(
      'Simplificar árvore JSX.',
    )
  }

  if (
    metrics.imports >
    25
  ) {
    recommendations.push(
      'Reduzir dependências.',
    )
  }

  return recommendations
}
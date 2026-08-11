export interface BuildExecutiveScoreInput {
  health: number
  risk: number
  technicalDebtHours: number
  criticalIssues: number
  warnings: number
}

function clamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.min(
    Math.max(value, min),
    max,
  )
}

export function buildExecutiveScore(
  input: BuildExecutiveScoreInput,
): number {
  let score = 100

  score -= (100 - input.health) * 0.35

  score -= input.risk * 0.25

  score -= Math.min(
    input.technicalDebtHours * 0.2,
    15,
  )

  score -= input.criticalIssues * 2

  score -= input.warnings * 0.5

  return Math.round(
    clamp(score, 0, 100),
  )
}
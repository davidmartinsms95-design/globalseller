export interface AggregatableCheck {
  health: number
  risk: number
  technicalDebtHours: number
  criticalIssues: number
  warnings: number
}

export interface AggregatedChecks {
  health: number
  risk: number
  technicalDebtHours: number
  criticalIssues: number
  warnings: number
}

export function aggregateChecks(
  checks: AggregatableCheck[],
): AggregatedChecks {
  if (checks.length === 0) {
    return {
      health: 100,
      risk: 0,
      technicalDebtHours: 0,
      criticalIssues: 0,
      warnings: 0,
    }
  }

  const totals = checks.reduce(
    (acc, check) => {
      acc.health += check.health
      acc.risk += check.risk
      acc.technicalDebtHours +=
        check.technicalDebtHours
      acc.criticalIssues +=
        check.criticalIssues
      acc.warnings +=
        check.warnings

      return acc
    },
    {
      health: 0,
      risk: 0,
      technicalDebtHours: 0,
      criticalIssues: 0,
      warnings: 0,
    },
  )

  return {
    health: Math.round(
      totals.health / checks.length,
    ),

    risk: Math.round(
      totals.risk / checks.length,
    ),

    technicalDebtHours:
      totals.technicalDebtHours,

    criticalIssues:
      totals.criticalIssues,

    warnings:
      totals.warnings,
  }
}
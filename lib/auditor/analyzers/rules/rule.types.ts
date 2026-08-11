import type {
  ArchitectureSeverity,
} from '../../types/architecture.types'

export const ARCHITECTURE_THRESHOLDS = {
  medium: 4,
  high: 7,
  critical: 10,
} as const

export function calculateSeverity(
  score: number,
): ArchitectureSeverity {
  if (
    score >=
    ARCHITECTURE_THRESHOLDS.critical
  ) {
    return 'CRITICAL'
  }

  if (
    score >=
    ARCHITECTURE_THRESHOLDS.high
  ) {
    return 'HIGH'
  }

  if (
    score >=
    ARCHITECTURE_THRESHOLDS.medium
  ) {
    return 'MEDIUM'
  }

  return 'LOW'
}
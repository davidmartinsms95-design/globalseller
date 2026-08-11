import type {
  ArchitectureIssue,
} from '../types/architecture.types'

import type {
  HotspotReport,
} from './hotspot.types'

export function convertHotspotsToIssues(
  report: HotspotReport,
): ArchitectureIssue[] {
  return report.hotspots.map(
    hotspot => ({
      path: hotspot.path,

      rule: 'HOTSPOT',

      severity:
        hotspot.score >= 90
          ? 'CRITICAL'
          : hotspot.score >= 70
            ? 'HIGH'
            : hotspot.score >= 50
              ? 'MEDIUM'
              : 'LOW',

      score: hotspot.score,

      issues: hotspot.reasons,

      recommendations: [
        'Reduce complexity.',
        'Reduce coupling.',
        'Split responsibilities.',
      ],
    }),
  )
}
export function getTopHotspots(
  report: HotspotReport,
  limit = 10,
) {
  return [...report.hotspots]
  .sort(
    (a, b) => b.score - a.score,
  )
  .slice(
    0,
    limit,
  )
}

export function buildHotspotSummary(
  report: HotspotReport,
) {
  return {
    totalHotspots:
      report.totalHotspots,

    averageScore:
      report.averageScore,

    highestScore:
      report.highestScore,

    topFiles:
      report.hotspots
        .slice(0, 5)
        .map(
          hotspot => hotspot.path,
        ),
  }
}
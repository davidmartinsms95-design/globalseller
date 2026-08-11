import type {
  ArchitectureReport,
} from '../types/architecture.types'

import type {
  HotspotReport,
  HotspotSummary,
} from '../hotspots/hotspot.types'

import type {
  ExecutiveMetrics,
} from '../executive/executive.types'

import type {
  ExecutiveReport,
} from './executiveReport.types'

export function buildExecutiveReport(
  architecture: ArchitectureReport,
  hotspots: HotspotSummary,
  hotspotReport: HotspotReport,
  executive: ExecutiveMetrics,
): ExecutiveReport {
  return {
    architecture,

    hotspots,

    hotspotReport,

    executive,

    generatedAt: new Date(),
  }
}

export function buildExecutiveReportFromParts(
  params: {
    architecture: ArchitectureReport

    hotspots: HotspotSummary

    hotspotReport: HotspotReport

    executive: ExecutiveMetrics
  },
): ExecutiveReport {
  return buildExecutiveReport(
    params.architecture,
    params.hotspots,
    params.hotspotReport,
    params.executive,
  )
}
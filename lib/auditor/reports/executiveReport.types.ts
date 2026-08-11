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

export interface ExecutiveReport {
  architecture: ArchitectureReport

  hotspots: HotspotSummary

  hotspotReport: HotspotReport

  executive: ExecutiveMetrics

  generatedAt: Date
}
import type {
  ProjectIndex,
} from '../index/projectIndex'

import type {
  ArchitectureIssue,
  ArchitectureReport,
} from '../types/architecture.types'

import {
  buildDependencyGraph,
} from '../graph/dependencyGraph.builder'

import {
  analyzeComplexity,
} from './rules/complexity.rule'

import {
  analyzeCoupling,
} from './rules/coupling.rule'

import {
  analyzeCircularDependencies,
} from './rules/circularDependency.rule'

import {
  analyzeFanIn,
} from './rules/fanIn.rule'

import {
  analyzeFanOut,
} from './rules/fanOut.rule'

import {
  analyzeGodComponent,
} from './rules/godComponent.rule'

import {
  analyzeLayering,
} from './rules/layering.rule'

import {
  analyzeSRP,
} from './rules/srp.rule'

import {
  buildHotspotReport,
} from '../hotspots/hotspot.engine'

import {
  convertHotspotsToIssues,
} from '../hotspots/hotspot.report'

export function analyzeArchitecture(
  index: ProjectIndex,
): ArchitectureReport {
  const dependencyGraph =
    buildDependencyGraph(index)

  const hotspotReport =
    buildHotspotReport(
      index,
      dependencyGraph,
    )

  const items: ArchitectureIssue[] = []

  items.push(
    ...analyzeSRP(index),
    ...analyzeCoupling(index),
    ...analyzeGodComponent(index),
    ...analyzeComplexity(index),
    ...analyzeLayering(index),
    ...analyzeFanOut(
      dependencyGraph,
    ),
    ...analyzeFanIn(
      dependencyGraph,
    ),
    ...analyzeCircularDependencies(
      dependencyGraph,
    ),
    ...convertHotspotsToIssues(
      hotspotReport,
    ),
  )

  items.sort(
    (a, b) => b.score - a.score,
  )

  return {
    totalFiles: index.files.length,
    totalIssues: items.length,
    items,
  }
}
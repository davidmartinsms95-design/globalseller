import type {
  ProjectIndex,
} from '../index/projectIndex'

import {
  buildDependencyGraph,
} from '../graph/dependencyGraph.builder'

import {
  detectCycles,
} from '../graph/cycleDetector'

export interface CircularDependency {
  cycle: string[]
}

export interface CircularDependencyReport {
  totalCycles: number

  items: CircularDependency[]
}

export function analyzeCircularDependencies(
  index: ProjectIndex,
): CircularDependencyReport {
  const graph =
    buildDependencyGraph(index)

  const cycles =
    detectCycles(graph)

  return {
    totalCycles:
      cycles.length,

    items: cycles.map(
      cycle => ({
        cycle: cycle.path,
      }),
    ),
  }
}
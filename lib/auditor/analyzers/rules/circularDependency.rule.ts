import type {
  ArchitectureIssue,
} from '../../types/architecture.types'

import type {
  DependencyGraph,
} from '../../graph/dependencyGraph.types'

import {
  detectCycles,
} from '../../graph/cycleDetector'

import {
  calculateSeverity,
} from './rule.types'

export function analyzeCircularDependencies(
  graph: DependencyGraph,
): ArchitectureIssue[] {
  const issues: ArchitectureIssue[] = []

  for (const cycle of detectCycles(graph)) {
    const score = Math.min(
      cycle.path.length * 15,
      100,
    )

    issues.push({
      rule: 'CIRCULAR_DEPENDENCY',
      path: cycle.path[0],
      score,
      severity: calculateSeverity(score),
      issues: [
        `Circular dependency detected involving ${cycle.path.length} modules.`,
      ],
      recommendations: [
        'Break the dependency cycle by introducing abstractions, dependency inversion, or extracting shared functionality into a separate module.',
      ],
    })
  }

  return issues
}
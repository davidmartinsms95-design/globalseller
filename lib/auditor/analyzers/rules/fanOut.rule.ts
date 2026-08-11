import type {
  ArchitectureIssue,
} from '../../types/architecture.types'

import type {
  DependencyGraph,
} from '../../graph/dependencyGraph.types'

import {
  getHighFanOut,
} from '../../graph/dependencyAnalyzer'

import {
  calculateSeverity,
} from './rule.types'

export function analyzeFanOut(
  graph: DependencyGraph,
): ArchitectureIssue[] {
  const issues: ArchitectureIssue[] = []

  for (const node of getHighFanOut(graph)) {
    const score = Math.min(
      node.fanOut * 4,
      100,
    )

    issues.push({
      rule: 'FAN_OUT',
      path: node.path,
      score,
      severity: calculateSeverity(score),
      issues: [
        `High Fan-Out detected (${node.fanOut} dependencies).`,
      ],
      recommendations: [
        'Reduce dependencies by extracting responsibilities into smaller modules.',
      ],
    })
  }

  return issues
}
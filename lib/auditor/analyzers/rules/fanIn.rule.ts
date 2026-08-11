import type {
  ArchitectureIssue,
} from '../../types/architecture.types'

import type {
  DependencyGraph,
} from '../../graph/dependencyGraph.types'

import {
  getHighFanIn,
} from '../../graph/dependencyAnalyzer'

import {
  calculateSeverity,
} from './rule.types'

export function analyzeFanIn(
  graph: DependencyGraph,
): ArchitectureIssue[] {
  const issues: ArchitectureIssue[] = []

  for (const node of getHighFanIn(graph)) {
    const score = Math.min(
      node.fanIn * 4,
      100,
    )

    issues.push({
      rule: 'FAN_IN',
      path: node.path,
      score,
      severity: calculateSeverity(score),
      issues: [
        `High Fan-In detected (${node.fanIn} dependents).`,
      ],
      recommendations: [
        'Consider splitting this module if it has accumulated too many responsibilities or has become a central dependency.',
      ],
    })
  }

  return issues
}
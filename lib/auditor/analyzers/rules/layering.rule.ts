import type {
  ArchitectureIssue,
} from '../../types/architecture.types'

import type {
  ProjectIndex,
} from '../../index/projectIndex'

import {
  calculateSeverity,
} from './rule.types'

export function analyzeLayering(
  index: ProjectIndex,
): ArchitectureIssue[] {
  const issues: ArchitectureIssue[] = []

  for (const file of index.files) {
    const findings: string[] = []
    const recommendations: string[] = []

    const imports = file.imports.map(
      (item) => item.source.toLowerCase(),
    )

    if (
      file.isComponent &&
      imports.some((value) =>
        value.includes('prisma'),
      )
    ) {
      findings.push(
        'UI component importing Prisma directly.',
      )

      recommendations.push(
        'Move database access to a service or repository.',
      )
    }

    if (
      file.isPage &&
      imports.some((value) =>
        value.includes('/prisma'),
      )
    ) {
      findings.push(
        'Page importing Prisma directly.',
      )

      recommendations.push(
        'Use a service layer instead of direct database access.',
      )
    }

    if (
      file.isService &&
      imports.some((value) =>
        value.includes('/components/'),
      )
    ) {
      findings.push(
        'Service depending on UI components.',
      )

      recommendations.push(
        'Remove UI dependencies from the service layer.',
      )
    }

    const finalScore =
      findings.length * 25

    if (finalScore === 0) {
      continue
    }

    issues.push({
      rule: 'LAYERING',
      path: file.path,
      score: finalScore,
      severity: calculateSeverity(
        finalScore,
      ),
      issues: findings,
      recommendations,
    })
  }

  return issues
}
import {
  parseFile,
} from '../ast/parser'

import {
  visitSecurity,
} from '../ast/visitors/securityVisitor'

import type {
  ProjectIndex,
} from '../index/projectIndex'

import type {
  SecurityIssue,
  SecurityReport,
  SecuritySeverity,
} from '../types/security.types'

export function analyzeSecurity(
  index: ProjectIndex,
): SecurityReport {
  const items: SecurityIssue[] = []

  for (const file of index.files) {
    let sourceFile

    try {
      sourceFile = parseFile(
        file.path,
      )
    } catch {
      continue
    }

    const findings =
      visitSecurity(sourceFile)

    if (findings.length === 0) {
      continue
    }

    const issues: string[] = []

    const recommendations: string[] =
      []

    let score = 0

    for (const finding of findings) {
      issues.push(
        `${finding.rule} (linha ${finding.line})`,
      )

      switch (
        finding.severity
      ) {
        case 'LOW':
          score += 1
          break

        case 'MEDIUM':
          score += 2
          break

        case 'HIGH':
          score += 3
          break

        case 'CRITICAL':
          score += 4
          break
      }

      switch (
        finding.rule
      ) {
        case 'eval':
          recommendations.push(
            'Evite utilizar eval().'
          )
          break

        case 'new Function':
          recommendations.push(
            'Evite criar funções dinamicamente.'
          )
          break

        case 'dangerouslySetInnerHTML':
          recommendations.push(
            'Sanitize o conteúdo antes da renderização.'
          )
          break
      }
    }

    recommendations.splice(
      0,
      recommendations.length,
      ...new Set(
        recommendations,
      ),
    )

    let severity: SecuritySeverity =
      'LOW'

    if (score >= 8) {
      severity =
        'CRITICAL'
    } else if (score >= 5) {
      severity = 'HIGH'
    } else if (score >= 2) {
      severity =
        'MEDIUM'
    }

    items.push({
      path: file.path,
      severity,
      score,
      issues,
      recommendations,
    })
  }

  items.sort(
    (a, b) =>
      b.score - a.score,
  )

  return {
    totalFiles:
      index.files.length,
    totalIssues:
      items.length,
    items,
  }
}
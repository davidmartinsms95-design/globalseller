import {
  buildProjectIndex,
} from './engine/auditEngine'

import {
  runAnalyzers,
} from './engine/analyzerEngine'

import {
  analyzeExecutive,
} from './analyzers/executiveAnalyzer'

import type {
  AuditResult,
} from './types/audit.types'

export function runAudit(
  root: string,
): AuditResult {
  const index =
    buildProjectIndex(root)

  const analysis =
    runAnalyzers(index)

  const executive =
  analyzeExecutive(
    index,
    analysis,
  )

  return {
    analysis,
    executive,
  }
}
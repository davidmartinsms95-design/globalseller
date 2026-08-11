import type {
  ImportAnalysis,
} from '../analyzers/importAnalyzer'

import type {
  DuplicateImportReport,
} from '../analyzers/duplicateImportAnalyzer'

import type {
  UnusedFileReport,
} from '../analyzers/unusedFileAnalyzer'

import type {
  CircularDependencyReport,
} from '../analyzers/circularDependencyAnalyzer'

import type {
  LargeFileReport,
} from '../analyzers/largeFileAnalyzer'

import type {
  ComplexityReport,
} from '../analyzers/complexityAnalyzer'

import type {
  DeadCodeReport,
} from '../analyzers/deadCodeAnalyzer'

import type {
  CodeSmellReport,
} from './codeSmell.types'

import type {
  ArchitectureReport,
} from './architecture.types'

import type {
  SecurityReport,
} from './security.types'

import type {
  ExecutiveReport,
} from '../reports/executiveReport.types'

export interface AnalyzerResults {
  imports: ImportAnalysis

  duplicateImports: DuplicateImportReport

  unusedFiles: UnusedFileReport

  circularDependencies: CircularDependencyReport

  largeFiles: LargeFileReport

  complexity: ComplexityReport

  deadCode: DeadCodeReport

  codeSmells: CodeSmellReport

  architecture: ArchitectureReport

  security: SecurityReport
}

export interface AuditResult {
  analysis: AnalyzerResults

  executive: ExecutiveReport
}
import {
  analyzeImports,
} from './importAnalyzer'

import {
  analyzeDuplicateImports,
} from './duplicateImportAnalyzer'

import {
  analyzeUnusedFiles,
} from './unusedFileAnalyzer'

import {
  analyzeCircularDependencies,
} from './circularDependencyAnalyzer'

import {
  analyzeLargeFiles,
} from './largeFileAnalyzer'

import {
  analyzeComplexity,
} from './complexityAnalyzer'

import {
  analyzeDeadCode,
} from './deadCodeAnalyzer'

import {
  analyzeCodeSmells,
} from './codeSmellAnalyzer'

import {
  analyzeArchitecture,
} from './architectureAnalyzer'

import {
  analyzeSecurity,
} from './securityAnalyzer'

export const analyzers = {
  imports:
    analyzeImports,

  duplicateImports:
    analyzeDuplicateImports,

  unusedFiles:
    analyzeUnusedFiles,

  circularDependencies:
    analyzeCircularDependencies,

  largeFiles:
    analyzeLargeFiles,

  complexity:
    analyzeComplexity,

  deadCode:
    analyzeDeadCode,

    codeSmells:
  analyzeCodeSmells,

  architecture:
  analyzeArchitecture,

  security:
  analyzeSecurity,
}
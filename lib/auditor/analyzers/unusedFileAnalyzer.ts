import type { ProjectIndex } from '../index/projectIndex'

export interface UnusedFileItem {
  path: string
}

export interface UnusedFileReport {
  totalUnusedFiles: number

  items: UnusedFileItem[]
}

export function analyzeUnusedFiles(
  _index: ProjectIndex,
): UnusedFileReport {
  return {
    totalUnusedFiles: 0,

    items: [],
  }
}
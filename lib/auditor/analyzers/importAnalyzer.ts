import type { ProjectIndex } from '../index/projectIndex'

export interface ImportAnalysis {
  totalFiles: number

  totalImports: number

  averageImportsPerFile: number
}

export function analyzeImports(
  index: ProjectIndex,
): ImportAnalysis {
  const totalFiles =
    index.files.length

  const totalImports =
    index.files.reduce(
      (total, file) =>
        total + file.imports.length,
      0,
    )

  return {
    totalFiles,

    totalImports,

    averageImportsPerFile:
      totalFiles === 0
        ? 0
        : Number(
            (
              totalImports /
              totalFiles
            ).toFixed(2),
          ),
  }
}
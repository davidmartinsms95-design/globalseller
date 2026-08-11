import type { ProjectIndex } from '../index/projectIndex'

export interface DuplicateImportItem {
  file: string

  duplicates: {
    source: string
    count: number
  }[]
}

export interface DuplicateImportReport {
  filesWithDuplicates: number

  totalDuplicates: number

  items: DuplicateImportItem[]
}

function findDuplicateImports(
  imports: ProjectIndex['files'][number]['imports'],
): DuplicateImportItem['duplicates'] {
  const occurrences = new Map<string, number>()

  for (const imported of imports) {
    occurrences.set(
      imported.source,
      (
        occurrences.get(imported.source) ??
        0
      ) + 1,
    )
  }

  return [...occurrences.entries()]
    .filter(
      ([, count]) => count > 1,
    )
    .map(
      ([source, count]) => ({
        source,
        count,
      }),
    )
}

export function analyzeDuplicateImports(
  index: ProjectIndex,
): DuplicateImportReport {
  const items: DuplicateImportItem[] = []

  let totalDuplicates = 0

  for (const file of index.files) {
    const duplicates =
      findDuplicateImports(
        file.imports,
      )

    if (duplicates.length === 0) {
      continue
    }

    totalDuplicates +=
      duplicates.length

    items.push({
      file: file.path,

      duplicates,
    })
  }

  return {
    filesWithDuplicates:
      items.length,

    totalDuplicates,

    items,
  }
}
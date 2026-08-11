import type {
  ProjectIndex,
} from '../index/projectIndex'

export interface LargeFile {
  path: string

  lines: number
}

export interface LargeFileReport {
  totalLargeFiles: number

  items: LargeFile[]
}

const MAX_LINES = 500

export function analyzeLargeFiles(
  index: ProjectIndex,
): LargeFileReport {
  const items: LargeFile[] = []

  for (const file of index.files) {
    const { lines } = file

if (lines >= MAX_LINES) {
  items.push({
    path: file.path,

    lines,
  })
}
  }

  items.sort(
    (a, b) => b.lines - a.lines,
  )

  return {
    totalLargeFiles:
      items.length,

    items,
  }
}
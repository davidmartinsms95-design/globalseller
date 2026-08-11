import type {
  ProjectEntry,
} from '../types/explorer.types'
import type { ImportReference } from '../collectors/importCollector'
import type {
  DeadCodeMetrics,
} from '../collectors/deadCodeCollector'

import type {
  ComplexityMetrics,
} from '../collectors/complexityCollector'

export interface IndexedFile {
  path: string

  imports: ImportReference[]

  deadCode: DeadCodeMetrics

  complexity: ComplexityMetrics

  lines: number

  directory: string

  extension: string

  fileName: string

  isPage: boolean

  isComponent: boolean

  isApi: boolean

  isService: boolean

  isHook: boolean

  isPrisma: boolean
}

export interface ProjectIndex {
  files: IndexedFile[]
}

export function createProjectIndex(): ProjectIndex {
  return {
    files: [],
  }
}

export function addFile(
  index: ProjectIndex,
  file: IndexedFile,
) {
  index.files.push(file)
}

export function createIndexedFile(
  file: ProjectEntry,
  imports: ImportReference[],
  deadCode: DeadCodeMetrics,
  complexity: ComplexityMetrics,
): IndexedFile {
  const normalizedPath =
    file.path.replace(/\\/g, '/')

  const fileName = file.name

  const extension =
    fileName.includes('.')
      ? fileName.substring(
          fileName.lastIndexOf('.'),
        )
      : ''

  const directory =
    normalizedPath.substring(
      0,
      normalizedPath.lastIndexOf('/'),
    )

  return {
    path: normalizedPath,

    imports,

    deadCode,

    complexity,

    lines: complexity.lines,

    directory,

    extension,

    fileName,

    isPage:
      normalizedPath.startsWith('app/'),

    isComponent:
      normalizedPath.includes('/components/'),

    isApi:
      normalizedPath.includes('/api/'),

    isService:
      normalizedPath.includes('/services/'),

    isHook:
      normalizedPath.includes('/hooks/'),

    isPrisma:
      normalizedPath.includes('/prisma/'),
  }
}
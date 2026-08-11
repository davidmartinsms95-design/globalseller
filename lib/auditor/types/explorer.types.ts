export interface ProjectEntry {
  path: string

  name: string

  extension: string

  directory: string
}

export interface ExplorerResult {
  startedAt: Date

  finishedAt: Date

  files: ProjectEntry[]
}
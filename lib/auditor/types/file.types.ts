export interface FileImport {
  source: string
}

export interface ProjectFile {
  path: string

  extension: string

  imports: FileImport[]
}

export interface CollectorResult {
  files: ProjectFile[]
}
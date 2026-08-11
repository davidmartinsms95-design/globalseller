import fs from 'node:fs'

export interface ImportReference {
  source: string
}

const IMPORT_REGEX =
  /from\s+['"]([^'"]+)['"]|import\s+['"]([^'"]+)['"]/g

export function collectImports(
  filePath: string,
): ImportReference[] {
  const content = fs.readFileSync(
    filePath,
    'utf8',
  )

  const imports: ImportReference[] = []

  for (const match of content.matchAll(IMPORT_REGEX)) {
    const source =
      match[1] ?? match[2]

    if (!source) {
      continue
    }

    imports.push({
      source,
    })
  }

  return imports
}
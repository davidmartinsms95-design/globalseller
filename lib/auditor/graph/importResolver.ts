import path from 'node:path'

export function resolveImport(
  importer: string,
  imported: string,
): string | null {
  if (
    imported.startsWith('.') === false &&
    imported.startsWith('@/') === false
  ) {
    return null
  }

  if (imported.startsWith('@/')) {
    return imported.substring(2)
  }

  const importerDirectory =
    path.dirname(importer)

  const resolved =
    path.normalize(
      path.join(
        importerDirectory,
        imported,
      ),
    )

  return resolved.replace(/\\/g, '/')
}
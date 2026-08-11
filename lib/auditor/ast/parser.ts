import fs from 'node:fs'

import ts from 'typescript'

export function parseFile(
  filePath: string,
): ts.SourceFile {
  const source =
    fs.readFileSync(
      filePath,
      'utf8',
    )

  return ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )
}
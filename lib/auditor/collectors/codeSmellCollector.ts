import fs from 'node:fs'

export interface CodeMetrics {
  lines: number

  ifs: number

  switches: number

  returns: number

  trys: number

  functions: number
}

export function collectCodeMetrics(
  filePath: string,
): CodeMetrics {
  const content = fs.readFileSync(
    filePath,
    'utf8',
  )

  return {
    lines:
      content.split('\n').length,

    ifs:
      (content.match(/\bif\b/g) ?? [])
        .length,

    switches:
      (
        content.match(
          /\bswitch\b/g,
        ) ?? []
      ).length,

    returns:
      (
        content.match(
          /\breturn\b/g,
        ) ?? []
      ).length,

    trys:
      (
        content.match(
          /\btry\b/g,
        ) ?? []
      ).length,

    functions:
      (
        content.match(
          /function\s+|=>/g,
        ) ?? []
      ).length,
  }
}
import fs from 'node:fs'

export interface ComplexityMetrics {
  path: string

  lines: number

  imports: number

  functions: number

  ifs: number

  switches: number

  loops: number

  jsxDepth: number

  reactComponents: number
}

const FUNCTION_REGEX =
  /\bfunction\b|=>/g

const IF_REGEX =
  /\bif\b/g

const SWITCH_REGEX =
  /\bswitch\b/g

const LOOP_REGEX =
  /\bfor\b|\bwhile\b|\.map\(|\.filter\(|\.reduce\(/g

const IMPORT_REGEX =
  /\bimport\b/g

const COMPONENT_REGEX =
  /<[A-Z][A-Za-z0-9]*/g

export function collectComplexity(
  filePath: string,
): ComplexityMetrics {
  const content =
    fs.readFileSync(
      filePath,
      'utf8',
    )

  return {
    path: filePath,

    lines:
      content.split('\n').length,

    imports:
      [...content.matchAll(IMPORT_REGEX)]
        .length,

    functions:
      [...content.matchAll(FUNCTION_REGEX)]
        .length,

    ifs:
      [...content.matchAll(IF_REGEX)]
        .length,

    switches:
      [...content.matchAll(SWITCH_REGEX)]
        .length,

    loops:
      [...content.matchAll(LOOP_REGEX)]
        .length,

    reactComponents:
      [...content.matchAll(COMPONENT_REGEX)]
        .length,

    jsxDepth: estimateJsxDepth(
      content,
    ),
  }
}

function estimateJsxDepth(
  content: string,
): number {
  let depth = 0

  let maxDepth = 0

  const regex =
    /<\/?[A-Za-z][^>]*>/g

  for (const match of content.matchAll(regex)) {
    const tag = match[0]

    if (
      tag.startsWith('</')
    ) {
      depth--

    } else if (
      !tag.endsWith('/>')
    ) {
      depth++

      if (
        depth > maxDepth
      ) {
        maxDepth = depth
      }
    }
  }

  return maxDepth
}
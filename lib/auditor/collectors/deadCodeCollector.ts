import fs from 'node:fs'

export interface DeadCodeMetrics {
  path: string

  functions: string[]

  interfaces: string[]

  types: string[]

  enums: string[]

  classes: string[]

  exports: string[]
}

const FUNCTION_REGEX =
  /export\s+function\s+([A-Za-z0-9_]+)|function\s+([A-Za-z0-9_]+)/g

const INTERFACE_REGEX =
  /interface\s+([A-Za-z0-9_]+)/g

const TYPE_REGEX =
  /type\s+([A-Za-z0-9_]+)/g

const ENUM_REGEX =
  /enum\s+([A-Za-z0-9_]+)/g

const CLASS_REGEX =
  /class\s+([A-Za-z0-9_]+)/g

const EXPORT_REGEX =
  /export\s+(?:const|function|class|type|interface|enum)\s+([A-Za-z0-9_]+)/g

export function collectDeadCode(
  filePath: string,
): DeadCodeMetrics {
  const content =
    fs.readFileSync(
      filePath,
      'utf8',
    )

  return {
    path: filePath,

    functions:
      collect(
        content,
        FUNCTION_REGEX,
      ),

    interfaces:
      collect(
        content,
        INTERFACE_REGEX,
      ),

    types:
      collect(
        content,
        TYPE_REGEX,
      ),

    enums:
      collect(
        content,
        ENUM_REGEX,
      ),

    classes:
      collect(
        content,
        CLASS_REGEX,
      ),

    exports:
      collect(
        content,
        EXPORT_REGEX,
      ),
  }
}

function collect(
  content: string,
  regex: RegExp,
): string[] {
  const result: string[] = []

  for (const match of content.matchAll(regex)) {
    const name =
      match
        .slice(1)
        .find(Boolean)

    if (name) {
      result.push(name)
    }
  }

  return result
}
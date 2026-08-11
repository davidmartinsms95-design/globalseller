import type {
  ProjectIndex,
} from '../index/projectIndex'

export interface DeadCodeItem {
  path: string

  functions: string[]

  interfaces: string[]

  types: string[]

  enums: string[]

  classes: string[]

  exports: string[]
}

export interface DeadCodeReport {
  totalFunctions: number

  totalInterfaces: number

  totalTypes: number

  totalEnums: number

  totalClasses: number

  totalExports: number

  items: DeadCodeItem[]
}

export function analyzeDeadCode(
  index: ProjectIndex,
): DeadCodeReport {
  const items: DeadCodeItem[] = []

  let totalFunctions = 0

  let totalInterfaces = 0

  let totalTypes = 0

  let totalEnums = 0

  let totalClasses = 0

  let totalExports = 0

  for (const file of index.files) {
    if (!('deadCode' in file)) {
      continue
    }

    const deadCode =
      (file as ProjectIndex['files'][number] & {
        deadCode: DeadCodeItem
      }).deadCode

    totalFunctions +=
      deadCode.functions.length

    totalInterfaces +=
      deadCode.interfaces.length

    totalTypes +=
      deadCode.types.length

    totalEnums +=
      deadCode.enums.length

    totalClasses +=
      deadCode.classes.length

    totalExports +=
      deadCode.exports.length

    items.push(deadCode)
  }

  return {
    totalFunctions,

    totalInterfaces,

    totalTypes,

    totalEnums,

    totalClasses,

    totalExports,

    items,
  }
}
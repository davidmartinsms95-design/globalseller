import { exploreProject } from '../explorer/explorer.service'
import { collectImports } from '../collectors/importCollector'

import {
  collectDeadCode,
} from '../collectors/deadCodeCollector'

import {
  addFile,
  createIndexedFile,
  createProjectIndex,
} from '../index/projectIndex'

import {
  collectComplexity,
} from '../collectors/complexityCollector'

export function buildProjectIndex(
  root: string,
) {
  const explorer = exploreProject(root)

  const index = createProjectIndex()

  for (const file of explorer.files) {
    if (
      !file.extension.endsWith('ts') &&
      !file.extension.endsWith('tsx')
    ) {
      continue
    }

    addFile(
      index,
      createIndexedFile(
        file,
        collectImports(file.path),
        collectDeadCode(file.path),
        collectComplexity(file.path),
      ),
    )
  }

  return index
}
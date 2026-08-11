import fs from 'node:fs'
import path from 'node:path'

import type {
  ExplorerResult,
  ProjectEntry,
} from '../types/explorer.types'

const IGNORED_DIRECTORIES = new Set([
  '.git',
  '.next',
  '.expo',
  '.turbo',
  '.vercel',
  '.vscode',
  '.idea',
  '.prisma',

  'node_modules',

  'coverage',
  'dist',
  'build',

  'globalseller-mobile',
  'globalseller-mobile-clean',

  '.cache',
  'tmp',
  'temp',
])

function walk(
  directory: string,
  files: ProjectEntry[],
) {
  const entries = fs.readdirSync(
    directory,
    {
      withFileTypes: true,
    },
  )

  for (const entry of entries) {
    if (
      entry.isDirectory() &&
      IGNORED_DIRECTORIES.has(entry.name)
    ) {
      continue
    }

    const fullPath = path.join(
      directory,
      entry.name,
    )

    if (entry.isDirectory()) {
      walk(fullPath, files)
      continue
    }

    files.push({
      path: fullPath.replace(/\\/g, '/'),

      name: entry.name,

      extension: path.extname(
        entry.name,
      ),

      directory: path
        .dirname(fullPath)
        .replace(/\\/g, '/'),
    })
  }
}

export function exploreProject(
  root: string,
): ExplorerResult {
  const startedAt = new Date()

  const files: ProjectEntry[] = []

  walk(root, files)

  return {
    startedAt,

    finishedAt: new Date(),

    files,
  }
}
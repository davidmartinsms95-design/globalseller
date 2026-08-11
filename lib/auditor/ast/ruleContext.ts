import ts from 'typescript'

import type {
  ImportContext,
} from './importContext'

export interface RuleContext {
  sourceFile: ts.SourceFile

  imports: ImportContext
}
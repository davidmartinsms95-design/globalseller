import ts from 'typescript'

export interface FunctionInfo {
  name: string

  line: number

  parameters: number

  isArrow: boolean

  isAsync: boolean
}

export function visitFunctions(
  sourceFile: ts.SourceFile,
): FunctionInfo[] {
  const functions: FunctionInfo[] = []

  function visit(
    node: ts.Node,
  ) {
    if (
      ts.isFunctionDeclaration(
        node,
      )
    ) {
      functions.push({
        name:
          node.name?.text ??
          '<anonymous>',

        line:
          sourceFile.getLineAndCharacterOfPosition(
            node.getStart(),
          ).line + 1,

        parameters:
          node.parameters.length,

        isArrow: false,

        isAsync:
          node.modifiers?.some(
            modifier =>
              modifier.kind ===
              ts.SyntaxKind.AsyncKeyword,
          ) ?? false,
      })
    }

    if (
      ts.isArrowFunction(
        node,
      )
    ) {
      functions.push({
        name: '<arrow>',

        line:
          sourceFile.getLineAndCharacterOfPosition(
            node.getStart(),
          ).line + 1,

        parameters:
          node.parameters.length,

        isArrow: true,

        isAsync:
          node.modifiers?.some(
            modifier =>
              modifier.kind ===
              ts.SyntaxKind.AsyncKeyword,
          ) ?? false,
      })
    }

    ts.forEachChild(
      node,
      visit,
    )
  }

  visit(sourceFile)

  return functions
}
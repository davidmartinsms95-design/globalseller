import ts from 'typescript'

export interface FunctionMetrics {
  name: string

  line: number

  parameters: number

  lines: number

  ifs: number

  returns: number

  switches: number

  trys: number

  isArrow: boolean

  isAsync: boolean
}

export function collectFunctionMetrics(
  sourceFile: ts.SourceFile,
): FunctionMetrics[] {
  const metrics: FunctionMetrics[] = []

  function visit(
    node: ts.Node,
  ) {
    if (
      ts.isFunctionDeclaration(node) ||
      ts.isArrowFunction(node)
    ) {
      let ifs = 0
      let returns = 0
      let switches = 0
      let trys = 0

      function walk(
        child: ts.Node,
      ) {
        if (
          ts.isIfStatement(child)
        ) {
          ifs++
        }

        if (
          ts.isReturnStatement(child)
        ) {
          returns++
        }

        if (
          ts.isSwitchStatement(child)
        ) {
          switches++
        }

        if (
          ts.isTryStatement(child)
        ) {
          trys++
        }

        ts.forEachChild(
          child,
          walk,
        )
      }

      walk(node)

      const start =
        sourceFile.getLineAndCharacterOfPosition(
          node.getStart(),
        ).line

      const end =
        sourceFile.getLineAndCharacterOfPosition(
          node.getEnd(),
        ).line

      metrics.push({
        name:
          ts.isFunctionDeclaration(node)
            ? node.name?.text ??
              '<anonymous>'
            : '<arrow>',

        line: start + 1,

        parameters:
          node.parameters.length,

        lines:
          end - start + 1,

        ifs,

        returns,

        switches,

        trys,

        isArrow:
          ts.isArrowFunction(node),

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

  return metrics
}
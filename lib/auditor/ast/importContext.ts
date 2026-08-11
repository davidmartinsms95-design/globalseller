import ts from 'typescript'

export interface ImportContext {
  childProcessNames: Set<string>

  childProcessNamespaces: Set<string>

  childProcessRequires: Set<string>
}

export function buildImportContext(
  sourceFile: ts.SourceFile,
): ImportContext {
  const context: ImportContext = {
    childProcessNames: new Set(),

    childProcessNamespaces:
      new Set(),

    childProcessRequires:
      new Set(),
  }

  for (const statement of sourceFile.statements) {
    //
    // import ...
    //
    if (
      ts.isImportDeclaration(
        statement,
      )
    ) {
      if (
        !ts.isStringLiteral(
          statement.moduleSpecifier,
        )
      ) {
        continue
      }

      const moduleName =
        statement.moduleSpecifier.text

      if (
        moduleName !==
          'child_process' &&
        moduleName !==
          'node:child_process'
      ) {
        continue
      }

      const clause =
        statement.importClause

      if (!clause) {
        continue
      }

      if (
        clause.namedBindings &&
        ts.isNamedImports(
          clause.namedBindings,
        )
      ) {
        for (const element of clause
          .namedBindings.elements) {
          context.childProcessNames.add(
            element.name.text,
          )
        }
      }

      if (
        clause.namedBindings &&
        ts.isNamespaceImport(
          clause.namedBindings,
        )
      ) {
        context.childProcessNamespaces.add(
          clause.namedBindings.name.text,
        )
      }

      continue
    }

    //
    // const ... = require(...)
    //
    if (
      ts.isVariableStatement(
        statement,
      )
    ) {
      for (const declaration of statement
        .declarationList
        .declarations) {
        if (
          !declaration.initializer ||
          !ts.isCallExpression(
            declaration.initializer,
          )
        ) {
          continue
        }

        const call =
          declaration.initializer

        if (
          !ts.isIdentifier(
            call.expression,
          ) ||
          call.expression.text !==
            'require'
        ) {
          continue
        }

        const argument =
          call.arguments[0]

        if (
          !argument ||
          !ts.isStringLiteral(
            argument,
          )
        ) {
          continue
        }

        if (
          argument.text !==
            'child_process' &&
          argument.text !==
            'node:child_process'
        ) {
          continue
        }

        if (
          ts.isIdentifier(
            declaration.name,
          )
        ) {
          context.childProcessRequires.add(
            declaration.name.text,
          )
        }

        if (
          ts.isObjectBindingPattern(
            declaration.name,
          )
        ) {
          for (const element of declaration
            .name.elements) {
            if (
              ts.isIdentifier(
                element.name,
              )
            ) {
              context.childProcessNames.add(
                element.name.text,
              )
            }
          }
        }
      }

      continue
    }
  }

  return context
}
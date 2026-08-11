import ts from 'typescript'

import {
  analyzeHardcodedSecrets,
} from '../../analyzers/rules/hardcodedSecrets.rule'

import {
  analyzeChildProcess,
} from '../../analyzers/rules/childProcess.rule'

import {
  buildImportContext,
} from '../importContext'

export interface SecurityFinding {
  rule: string

  line: number

  severity:
    | 'LOW'
    | 'MEDIUM'
    | 'HIGH'
    | 'CRITICAL'
}

export function visitSecurity(
  sourceFile: ts.SourceFile,
): SecurityFinding[] {
  const findings: SecurityFinding[] = []

  const context = {
    sourceFile,

    imports:
      buildImportContext(
        sourceFile,
      ),
  }

  function report(
    rule: string,
    severity: SecurityFinding['severity'],
    node: ts.Node,
  ) {
    findings.push({
      rule,
      severity,
      line:
        sourceFile.getLineAndCharacterOfPosition(
          node.getStart(),
        ).line + 1,
    })
  }

  function visit(
    node: ts.Node,
  ) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'eval'
    ) {
      report(
        'eval',
        'CRITICAL',
        node,
      )
    }

    if (
      ts.isNewExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'Function'
    ) {
      report(
        'new Function',
        'CRITICAL',
        node,
      )
    }

    if (
      ts.isJsxAttribute(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text ===
        'dangerouslySetInnerHTML'
    ) {
      report(
        'dangerouslySetInnerHTML',
        'HIGH',
        node,
      )
    }

    findings.push(
      ...analyzeHardcodedSecrets(
        node,
        context,
      ),
    )

    findings.push(
      ...analyzeChildProcess(
        node,
        context,
      ),
    )

    ts.forEachChild(
      node,
      visit,
    )
  }

  visit(sourceFile)

  return findings
}
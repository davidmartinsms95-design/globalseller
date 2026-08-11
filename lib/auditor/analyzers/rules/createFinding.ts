import ts from 'typescript'

import type {
  RuleContext,
} from '../../ast/ruleContext'

import type {
  SecurityFinding,
} from '../../ast/visitors/securityVisitor'

export function createFinding(
  context: RuleContext,
  node: ts.Node,
  rule: string,
  severity: SecurityFinding['severity'],
): SecurityFinding {
  const position =
    context.sourceFile.getLineAndCharacterOfPosition(
      node.getStart(),
    )

  return {
    rule,
    severity,
    line: position.line + 1,
  }
}
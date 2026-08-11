import ts from 'typescript'

import type {
  RuleContext,
} from '../../ast/ruleContext'

import type {
  SecurityFinding,
} from '../../ast/visitors/securityVisitor'

const SECRET_NAMES = [
  'password',
  'passwd',
  'pwd',
  'secret',
  'clientSecret',
  'apiKey',
  'apikey',
  'accessKey',
  'privateKey',
  'token',
  'bearer',
]

export function analyzeHardcodedSecrets(
  node: ts.Node,
  context: RuleContext,
): SecurityFinding[] {
  const findings: SecurityFinding[] = []

  if (!ts.isVariableDeclaration(node)) {
    return findings
  }

  if (
    !ts.isIdentifier(node.name) ||
    !node.initializer
  ) {
    return findings
  }

  const variable =
    node.name.text.toLowerCase()

  const isSecret =
    SECRET_NAMES.some(name =>
      variable.includes(
        name.toLowerCase(),
      ),
    )

  if (!isSecret) {
    return findings
  }

  if (
    ts.isStringLiteral(
      node.initializer,
    ) ||
    ts.isNoSubstitutionTemplateLiteral(
      node.initializer,
    )
  ) {
    findings.push({
      rule:
        'hardcoded-secret',

      severity:
        'CRITICAL',

      line:
        context.sourceFile.getLineAndCharacterOfPosition(
          node.getStart(),
        ).line + 1,
    })
  }

  return findings
}
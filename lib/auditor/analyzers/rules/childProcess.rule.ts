import ts from 'typescript'

import type {
  RuleContext,
} from '../../ast/ruleContext'

import type {
  SecurityFinding,
} from '../../ast/visitors/securityVisitor'

import {
  createFinding,
} from './createFinding'

const DANGEROUS_METHODS = new Set([
  'exec',
  'execSync',
  'spawn',
  'spawnSync',
  'fork',
  'execFile',
  'execFileSync',
])

export function analyzeChildProcess(
  node: ts.Node,
  context: RuleContext,
): SecurityFinding[] {
  const findings: SecurityFinding[] = []

  if (!ts.isCallExpression(node)) {
    return findings
  }

  const expression = node.expression

  // exec(...)
  if (ts.isIdentifier(expression)) {
    if (
      context.imports.childProcessNames.has(
        expression.text,
      ) &&
      DANGEROUS_METHODS.has(
        expression.text,
      )
    ) {
      findings.push(
        createFinding(
          context,
          node,
          'child-process',
          'HIGH',
        ),
      )
    }

    return findings
  }

  // cp.exec(...)
  if (
    ts.isPropertyAccessExpression(
      expression,
    ) &&
    ts.isIdentifier(
      expression.expression,
    )
  ) {
    const namespace =
      expression.expression.text

    const method =
      expression.name.text

    if (
      (
        context.imports.childProcessNamespaces.has(
          namespace,
        ) ||
        context.imports.childProcessRequires.has(
          namespace,
        )
      ) &&
      DANGEROUS_METHODS.has(
        method,
      )
    ) {
      findings.push(
        createFinding(
          context,
          node,
          'child-process',
          'HIGH',
        ),
      )
    }
  }

  return findings
}
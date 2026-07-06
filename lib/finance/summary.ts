export interface FinanceTransaction {
  amount: number
  type: string
  status?: string | null
}

export function calculateFinanceSummary(
  transactions: FinanceTransaction[]
) {
  const receitas = transactions.filter(
    (t) => t.type === 'income'
  )

  const despesas = transactions.filter(
    (t) => t.type === 'expense'
  )

  const totalReceitas = receitas.reduce(
    (total, item) => total + Number(item.amount),
    0
  )

  const totalDespesas = despesas.reduce(
    (total, item) => total + Number(item.amount),
    0
  )

  const saldo =
    totalReceitas - totalDespesas

  const contasReceber = receitas
    .filter((t) => t.status !== 'paid')
    .reduce(
      (total, item) => total + Number(item.amount),
      0
    )

  const contasPagar = despesas
    .filter((t) => t.status !== 'paid')
    .reduce(
      (total, item) => total + Number(item.amount),
      0
    )

  return {
    receitas: totalReceitas,
    despesas: totalDespesas,
    saldo,
    contasReceber,
    contasPagar,
  }
}
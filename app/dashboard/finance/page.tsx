'use client'

import { useEffect, useState } from 'react'

import FinanceForm from '@/components/dashboard/finance/FinanceForm'
import FinanceSummary from '@/components/dashboard/finance/FinanceSummary'
import FinanceTransactions from '@/components/dashboard/finance/FinanceTransactions'
import FinanceChart from '@/components/dashboard/finance/FinanceChart'
import FinanceFilters from '@/components/dashboard/finance/FinanceFilters'
import FinanceTabs from '@/components/dashboard/finance/FinanceTabs'
import { calculateFinanceSummary } from '@/lib/finance/summary'

interface FinanceTransaction {
  id: string
  amount: number
  type: string
  category: string
  description?: string
  createdAt: string

  status?: string | null
  dueDate?: string | null
  paymentMethod?: string | null
}

export default function FinancePage() {
  const [transactions, setTransactions] =
  useState<FinanceTransaction[]>([])

const [loading, setLoading] =
  useState(true)

const [filter, setFilter] =
  useState('all')

  async function loadFinance() {
    try {
      const response = await fetch('/api/finance')

      const data = await response.json()

      if (Array.isArray(data)) {
        setTransactions(data)
      } else {
        console.error('Resposta inesperada da API:', data)
        setTransactions([])
      }
    } catch (error) {
      console.error(error)
      setTransactions([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFinance()
  }, [])

  const summary =
  calculateFinanceSummary(transactions)

const filteredTransactions =
  filter === 'all'
    ? transactions
    : transactions.filter(
        (t) => t.type === filter
      )

  return (
    <div className="space-y-8">

      <FinanceForm
        onCreated={loadFinance}
      />

      <div>
  <h1 className="text-5xl font-bold text-white">
    Financeiro
  </h1>

  <p className="mt-2 text-zinc-400">
    Controle financeiro do GlobalSeller
  </p>
</div>

<FinanceTabs />

      <FinanceFilters
  filter={filter}
  setFilter={setFilter}
/>

      <FinanceSummary
  summary={summary}
/>

      <FinanceChart
  transactions={transactions}
/>

      <FinanceTransactions
  loading={loading}
  transactions={filteredTransactions}
/>

    </div>
  )
}
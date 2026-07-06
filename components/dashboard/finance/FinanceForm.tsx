'use client'

import { useState } from 'react'

interface Props {
  onCreated: () => void
}

export default function FinanceForm({
  onCreated,
}: Props) {
  const [type, setType] = useState('income')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('pending')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [notes, setNotes] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    setLoading(true)

    try {
      await fetch('/api/finance', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          type,
          category,
          amount: Number(amount),
          description,

          dueDate,
          status,
          paymentMethod,
          notes,
        }),
      })

      setType('income')
      setCategory('')
      setAmount('')
      setDescription('')

      setDueDate('')
      setStatus('pending')
      setPaymentMethod('')
      setNotes('')

      onCreated()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
    >
      <h2 className="text-2xl font-bold">
        Novo lançamento
      </h2>

      <select
        value={type}
        onChange={(e) =>
          setType(e.target.value)
        }
        className="w-full rounded-xl bg-zinc-800 p-3"
      >
        <option value="income">
          Receita
        </option>

        <option value="expense">
          Despesa
        </option>
      </select>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Data de vencimento
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="w-full rounded-xl bg-zinc-800 p-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-400">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full rounded-xl bg-zinc-800 p-3"
          >
            <option value="pending">
              Pendente
            </option>

            <option value="paid">
              Pago
            </option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-400">
          Forma de pagamento
        </label>

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(
              e.target.value
            )
          }
          className="w-full rounded-xl bg-zinc-800 p-3"
        >
          <option value="">
            Selecione
          </option>

          <option value="PIX">
            PIX
          </option>

          <option value="Boleto">
            Boleto
          </option>

          <option value="Cartão">
            Cartão
          </option>

          <option value="Transferência">
            Transferência
          </option>

          <option value="Dinheiro">
            Dinheiro
          </option>
        </select>
      </div>

      <input
        placeholder="Categoria"
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        className="w-full rounded-xl bg-zinc-800 p-3"
      />

      <input
        type="number"
        step="0.01"
        placeholder="Valor"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
        className="w-full rounded-xl bg-zinc-800 p-3"
      />

      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        className="w-full rounded-xl bg-zinc-800 p-3"
        rows={3}
      />

      <textarea
        placeholder="Observações"
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        className="w-full rounded-xl bg-zinc-800 p-3"
        rows={3}
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-400 disabled:opacity-50"
      >
        {loading
          ? 'Salvando...'
          : 'Salvar'}
      </button>
    </form>
  )
}
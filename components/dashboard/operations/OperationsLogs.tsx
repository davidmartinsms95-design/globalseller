'use client'

import { useEffect, useState } from 'react'

interface SystemLog {
  id: string
  service: string
  event: string
  status: string
  message?: string
  createdAt: string
}

export default function OperationsLogs() {
  const [logs, setLogs] = useState<SystemLog[]>([])
  const [loading, setLoading] = useState(true)

  async function loadLogs() {
    try {
      const response = await fetch('/api/system-logs')
      const data = await response.json()

      setLogs(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error(error)
      setLogs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLogs()
  }, [])

  if (loading) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        Carregando logs...
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h2 className="mb-6 text-2xl font-bold">
        Últimos Eventos
      </h2>

      {logs.length === 0 ? (
        <p className="text-zinc-500">
          Nenhum log encontrado.
        </p>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="rounded-xl border border-zinc-800 p-4"
            >
              <div className="flex items-center justify-between">
                <strong>{log.service}</strong>

                <span className="text-sm text-zinc-400">
                  {new Date(log.createdAt).toLocaleString('pt-BR')}
                </span>
              </div>

              <p className="mt-2 font-medium">
                {log.event}
              </p>

              {log.message && (
                <p className="mt-1 text-sm text-zinc-400">
                  {log.message}
                </p>
              )}

              <span
                className={`mt-3 inline-block rounded-lg px-3 py-1 text-xs ${
                  log.status === 'success'
                    ? 'bg-green-600 text-white'
                    : log.status === 'error'
                    ? 'bg-red-600 text-white'
                    : 'bg-yellow-600 text-white'
                }`}
              >
                {log.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
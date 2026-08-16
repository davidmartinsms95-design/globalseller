import prisma from '@/lib/prisma'

import Card from '@/components/ui/Card'
import OperationsLogs from '@/components/dashboard/operations/OperationsLogs'

export default async function OperationsPage() {
  const [
    processedJobs,
    failedJobs,
    onlineIntegrations,
  ] = await Promise.all([
    prisma.systemLog.count({
      where: {
        service: 'Worker',
        event: 'Job concluído',
      },
    }),

    prisma.systemLog.count({
      where: {
        status: 'error',
      },
    }),

    prisma.integration.count(),
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl font-bold text-white">
          Operations Center
        </h1>

        <p className="mt-2 text-zinc-400">
          Monitoramento das filas, workers,
          sincronizações e logs do GlobalSeller.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <p className="text-zinc-400">
            Jobs Processados
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {processedJobs}
          </h2>
        </Card>

        <Card variant="warning">
          <p className="text-zinc-400">
            Jobs Pendentes
          </p>

          <h2 className="mt-3 text-4xl font-bold text-yellow-400">
            0
          </h2>
        </Card>

        <Card variant="error">
          <p className="text-zinc-400">
            Falhas
          </p>

          <h2 className="mt-3 text-4xl font-bold text-red-500">
            {failedJobs}
          </h2>
        </Card>

        <Card variant="success">
          <p className="text-zinc-400">
            Integrações Online
          </p>

          <h2 className="mt-3 text-4xl font-bold text-green-500">
            {onlineIntegrations}
          </h2>
        </Card>
      </div>

      <OperationsLogs />
    </div>
  )
}
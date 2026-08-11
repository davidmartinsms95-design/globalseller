import { Worker } from 'bullmq'

import { getRedisConnection } from '@/lib/queues'
import { updateMercadoLivreStock } from '@/lib/mercadolivre/updateStock'
import { updateMercadoLivrePrice } from '@/lib/mercadolivre/updatePrice'
import { updateMercadoLivreStatus } from '@/lib/mercadolivre/updateStatus'
import { processOrder } from '@/lib/mercadolivre/processors/processOrder'
import { processPayment } from '@/lib/mercadolivre/processors/processPayment'
import { processShipment } from '@/lib/mercadolivre/processors/processShipment'
import { createSystemLog } from '@/lib/systemLog'

export const marketplaceWorker = new Worker(
  'marketplace-events',

  async (job) => {
    console.log(
      `▶ Processando Job: ${job.name}`,
      job.data
    )

    await createSystemLog({
      service: 'Worker',
      event: 'Job iniciado',
      status: 'info',
      message: `Job ${job.name} iniciado.`,
      payload: job.data,
    })

    switch (job.name) {
      case 'update-stock':
        await updateMercadoLivreStock(
          job.data.productId,
          job.data.quantity
        )
        break

      case 'update-price':
        await updateMercadoLivrePrice(
          job.data.productId,
          job.data.price
        )
        break

      case 'update-status':
        await updateMercadoLivreStatus(
          job.data.productId,
          job.data.status
        )
        break

      case 'order-created':
        await processOrder(job.data)
        break

      case 'payment-approved':
        await processPayment(job.data)
        break

      case 'shipment-updated':
        await processShipment(job.data)
        break

      default:
        console.log(
          `Job desconhecido: ${job.name}`
        )

        await createSystemLog({
          service: 'Worker',
          event: 'Job desconhecido',
          status: 'warning',
          message: `Job ${job.name} não possui processador.`,
          payload: job.data,
        })
    }
  },

  {
  connection: getRedisConnection(),
}
)

marketplaceWorker.on(
  'completed',
  async (job) => {
    console.log(
      `✅ Job ${job?.id} concluído`
    )

    await createSystemLog({
      service: 'Worker',
      event: 'Job concluído',
      status: 'success',
      message: `Job ${job?.name} concluído.`,
      payload: job?.data,
    })
  }
)

marketplaceWorker.on(
  'failed',
  async (job, err) => {
    console.error(
      `❌ Job ${job?.id} falhou`,
      err
    )

    await createSystemLog({
      service: 'Worker',
      event: 'Job falhou',
      status: 'error',
      message: err.message,
      payload: job?.data,
    })
  }
)

console.log(
  '🚀 Marketplace Worker iniciado.'
)
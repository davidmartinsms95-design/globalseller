import { Worker } from 'bullmq'

import { redis } from '../lib/redis'

const worker = new Worker(
  'marketplace-events',

  async (job) => {
    console.log(
      'PROCESSANDO JOB:',
      job.name
    )

    /*
      Eventos:
      - order-created
      - stock-updated
      - payment-approved
    */

    if (job.name === 'order-created') {
      console.log(
        'NOVO PEDIDO:',
        job.data
      )

      /*
        Próximos passos:
        - atualizar estoque
        - sincronizar marketplaces
        - analytics
      */
    }

    if (job.name === 'stock-updated') {
      console.log(
        'ESTOQUE ATUALIZADO:',
        job.data
      )
    }

    if (
      job.name ===
      'payment-approved'
    ) {
      console.log(
        'PAGAMENTO APROVADO:',
        job.data
      )
    }
  },

  {
    connection: redis,
  }
)

worker.on('completed', (job) => {
  console.log(
    `JOB COMPLETADO: ${job.id}`
  )
})

worker.on('failed', (job, err) => {
  console.log(
    `JOB FALHOU: ${job?.id}`,
    err
  )
})
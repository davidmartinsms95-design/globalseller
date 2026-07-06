import prisma from '@/lib/prisma'
import { mercadoLivreRequest } from '@/lib/mercadolivre/api'
import { createSystemLog } from '@/lib/systemLog'

export async function processOrder(data: any) {
  try {
    console.log('📦 Processando pedido', data)

    if (!data.resource) {
      console.log('Webhook sem resource.')

      await createSystemLog({
        service: 'Mercado Livre',
        event: 'Webhook inválido',
        status: 'warning',
        message: 'Webhook recebido sem resource.',
        payload: data,
      })

      return
    }

    const integration =
      await prisma.integration.findFirst({
        where: {
          provider: 'mercadolivre',
        },
      })

    if (!integration?.accessToken) {
      throw new Error(
        'Integração do Mercado Livre não encontrada.'
      )
    }

    const order = await mercadoLivreRequest(
      data.resource,
      integration.accessToken
    )

    console.log(
      'PEDIDO IMPORTADO:',
      JSON.stringify(order, null, 2)
    )

    const existingOrder =
      await prisma.order.findFirst({
        where: {
          externalOrderId: String(order.id),
          marketplace: 'mercadolivre',
        },
      })

    if (existingOrder) {
      console.log(
        'Pedido já existe no banco.'
      )

      await createSystemLog({
        service: 'Mercado Livre',
        event: 'Pedido duplicado',
        status: 'warning',
        message: `Pedido ${order.id} já existe no banco.`,
        payload: order,
      })

      return
    }

    console.log(
      'Pedido ainda não existe. Pronto para salvar.'
    )

    await createSystemLog({
      service: 'Mercado Livre',
      event: 'Pedido importado',
      status: 'success',
      message: `Pedido ${order.id} importado com sucesso.`,
      payload: order,
    })

    // Aqui ficará a gravação do pedido no banco
  } catch (error) {
    console.error(error)

    await createSystemLog({
      service: 'Mercado Livre',
      event: 'Erro ao processar pedido',
      status: 'error',
      message: String(error),
      payload: data,
    })

    throw error
  }
}
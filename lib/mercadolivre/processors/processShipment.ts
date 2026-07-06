import { createSystemLog } from '@/lib/systemLog'

export async function processShipment(
  data: {
    topic: string
    resource: string
    receivedAt: Date
  }
) {
  try {
    console.log(
      '📦 Processando envio Mercado Livre:',
      data
    )

    await createSystemLog({
      service: 'Mercado Livre',
      event: 'Envio recebido',
      status: 'success',
      message: `Envio recebido (${data.resource})`,
      payload: data,
    })

    // ===================================================
    // TODO:
    // Consultar envio na API do Mercado Livre
    // Atualizar status do pedido
    // Atualizar rastreamento
    // Atualizar informações de entrega
    // ===================================================

    return {
      success: true,
    }
  } catch (error) {
    console.error(error)

    await createSystemLog({
      service: 'Mercado Livre',
      event: 'Erro ao processar envio',
      status: 'error',
      message: String(error),
      payload: data,
    })

    throw error
  }
}
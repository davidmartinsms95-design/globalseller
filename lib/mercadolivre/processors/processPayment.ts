import { createSystemLog } from '@/lib/systemLog'

export async function processPayment(
  data: {
    topic: string
    resource: string
    receivedAt: Date
  }
) {
  try {
    console.log(
      '💰 Processando pagamento Mercado Livre:',
      data
    )

    await createSystemLog({
      service: 'Mercado Livre',
      event: 'Pagamento recebido',
      status: 'success',
      message: `Pagamento recebido (${data.resource})`,
      payload: data,
    })

    // ===================================================
    // TODO:
    // Buscar pagamento na API do Mercado Livre
    // Localizar pedido correspondente
    // Atualizar status do pedido
    // Registrar movimentação financeira
    // Atualizar dashboard financeiro
    // ===================================================

    return {
      success: true,
    }
  } catch (error) {
    console.error(error)

    await createSystemLog({
      service: 'Mercado Livre',
      event: 'Erro ao processar pagamento',
      status: 'error',
      message: String(error),
      payload: data,
    })

    throw error
  }
}
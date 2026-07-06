import prisma from '@/lib/prisma'

import { updateMercadoLivreStock } from '@/lib/mercadolivre/updateStock'
import { updateMercadoLivreStatus } from '@/lib/mercadolivre/updateStatus'
import { createSystemLog } from '@/lib/systemLog'

export async function syncMarketplaces(
  userId: string
) {
  try {
    console.log(
      'Iniciando sincronização...'
    )

    await createSystemLog({
      service: 'Marketplace Sync',
      event: 'Sincronização iniciada',
      status: 'info',
      message: `Sincronização iniciada para o usuário ${userId}.`,
      payload: {
        userId,
      },
    })

    const products =
      await prisma.product.findMany({
        where: {
          userId,
          marketplace: 'mercadolivre',
          marketplaceId: {
            not: null,
          },
        },
      })

    for (const product of products) {
      await updateMercadoLivreStock(
        product.id,
        product.stock
      )

      if (
        product.status === 'active' ||
        product.status === 'paused' ||
        product.status === 'closed'
      ) {
        await updateMercadoLivreStatus(
          product.id,
          product.status
        )
      }
    }

    await createSystemLog({
      service: 'Marketplace Sync',
      event: 'Sincronização concluída',
      status: 'success',
      message: `${products.length} produto(s) sincronizado(s).`,
      payload: {
        userId,
        synchronized: products.length,
      },
    })

    return {
      success: true,
      synchronized: products.length,
    }
  } catch (error) {
    console.error(error)

    await createSystemLog({
      service: 'Marketplace Sync',
      event: 'Erro na sincronização',
      status: 'error',
      message: String(error),
      payload: {
        userId,
      },
    })

    return {
      success: false,
      error: String(error),
    }
  }
}
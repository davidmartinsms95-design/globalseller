import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'

interface CreateSystemLogParams {
  service: string
  event: string
  status: string
  message?: string
  payload?: Prisma.InputJsonValue
}

export async function createSystemLog({
  service,
  event,
  status,
  message,
  payload,
}: CreateSystemLogParams) {
  try {
    await prisma.systemLog.create({
      data: {
        service,
        event,
        status,
        message,
        payload,
      },
    })
  } catch (error) {
    console.error(
      'Erro ao criar SystemLog:',
      error
    )
  }
}
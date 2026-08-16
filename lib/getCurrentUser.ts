import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function getCurrentUser() {
  console.time('[AUTH] getCurrentUser')

  console.time('[AUTH] getServerSession')

  const session =
    await getServerSession(authOptions)

  console.timeEnd('[AUTH] getServerSession')

  if (!session?.user?.email) {
    console.timeEnd('[AUTH] getCurrentUser')

    return null
  }

  console.time('[AUTH] findUser')

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

  console.timeEnd('[AUTH] findUser')

  console.timeEnd('[AUTH] getCurrentUser')

  return user
}
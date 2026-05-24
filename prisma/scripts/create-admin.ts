import prisma from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const hashedPassword = await bcrypt.hash(
    '123456',
    10
  )

  const user = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@globalseller.com',
      password: hashedPassword,
    },
  })

  console.log('ADMIN CRIADO:')
  console.log(user)
}

main()
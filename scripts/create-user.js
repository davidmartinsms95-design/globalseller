const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('123456', 10)

  await prisma.user.create({
    data: {
      name: 'David',
      email: 'admin@globalseller.com',
      password,
    },
  })

  console.log('Usuário criado')
}

main()
require('dotenv').config()

const { PrismaClient } = require('@prisma/client')

console.log(process.env.DATABASE_URL)

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany()
  console.log(users)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
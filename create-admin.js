const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('123456', 10);

  const user = await prisma.user.create({
    data: {
      name: 'David Martins',
      email: 'admin@globalseller.com',
      password,
      plan: 'pro',
      maxProducts: 999,
    },
  });

  console.log('Usuário criado:', user.email);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
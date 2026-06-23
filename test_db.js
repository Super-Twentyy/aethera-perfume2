const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ log: ['error'] });

async function main() {
  const users = await prisma.user.findMany();
  console.log("Users in DB:", users.length);
  console.log(users);
}
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

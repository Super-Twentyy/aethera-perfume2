const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  try {
    const order = await prisma.order.create({
      data: {
        customerName: 'test',
        phone: '123',
        address: 'test',
        totalAmount: 100
      }
    });
    console.log("Success:", order);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}
main();

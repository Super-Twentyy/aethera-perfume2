const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const mockProducts = [
  { id: "prod-001", name: "Aethera Miroir", description: "Seperti pantulan cermin yang mengungkapkan sisi terdalam dirimu.", price: 189000, stock: 25, size: "30ml", image: "/products/miroir.jpg" },
  { id: "prod-002", name: "Aethera Nuit", description: "Terinspirasi dari keheningan malam berbintang.", price: 219000, stock: 20, size: "30ml", image: "/products/nuit.jpg" },
  { id: "prod-003", name: "Aethera Zéphyr", description: "Dinamis seperti angin barat yang membawa kesegaran musim semi.", price: 169000, stock: 30, size: "30ml", image: "/products/zephyr.jpg" },
  { id: "prod-004", name: "Aethera Boisé", description: "Kehangatan hutan di pagi hari yang tertangkap dalam botol.", price: 199000, stock: 18, size: "30ml", image: "/products/boise.jpg" },
  { id: "prod-005", name: "Aethera Lumière", description: "Sinar matahari pertama yang menyentuh kelopak bunga.", price: 189000, stock: 28, size: "30ml", image: "/products/lumiere.jpg" },
  { id: "prod-006", name: "Aethera Onyx", description: "Kedalaman batu onyx hitam yang menyimpan misteri.", price: 239000, stock: 0, size: "30ml", image: "/products/onyx.jpg" },
  { id: "prod-007", name: "Aethera Soleil", description: "Kehangatan matahari mediterania yang memeluk kulitmu.", price: 179000, stock: 35, size: "30ml", image: "/products/soleil.jpg" },
  { id: "prod-008", name: "Aethera Velvet", description: "Kelembutan beludru yang mewah dan memanjakan indera.", price: 209000, stock: 22, size: "30ml", image: "/products/velvet.jpg" }
];

async function main() {
  for (const p of mockProducts) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: p
    });
  }
  console.log("Mock products seeded successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

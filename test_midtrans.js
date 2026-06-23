require('dotenv').config();
const midtransClient = require('midtrans-client');

const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
const isProduction = !serverKey.startsWith("SB-");

const snap = new midtransClient.Snap({
  isProduction,
  serverKey,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
});

async function main() {
  const parameter = {
    transaction_details: {
      order_id: "test-order-12345",
      gross_amount: 189000,
    },
    customer_details: {
      first_name: "Test User",
      phone: "08123456789",
      billing_address: {
        address: "Test Address",
      },
    },
    item_details: [{
      id: "prod-001",
      price: 189000,
      quantity: 1,
      name: "Aethera Miroir",
    }],
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    console.log("Token:", transaction.token);
  } catch (err) {
    console.error("Error creating transaction:");
    console.error(err);
  }
}
main();

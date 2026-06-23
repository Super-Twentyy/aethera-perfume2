const midtransClient = require("midtrans-client");

const serverKey = process.env.MIDTRANS_SERVER_KEY || "";
const isProduction = false; // Forced to sandbox

export const snap = new midtransClient.Snap({
  isProduction,
  serverKey,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
});

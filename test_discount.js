const http = require('http');

const data = JSON.stringify({
  items: [
    { variantId: "v1", productId: "prod-002", name: "Aethera Nuit", price: 219000, qty: 1 }
  ],
  customerName: "Risky",
  phone: "0088776655",
  address: "jl",
  deliveryMethod: "delivery",
  notes: "",
  totalAmount: 153300,
  paymentMethod: "midtrans"
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/checkout',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();

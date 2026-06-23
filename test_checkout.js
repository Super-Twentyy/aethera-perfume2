const http = require('http');

const data = JSON.stringify({
  items: [
    { id: "prod-001", name: "Aethera Miroir", price: 189000, qty: 1 }
  ],
  customerName: "Test User",
  phone: "08123456789",
  address: "Test Address",
  deliveryMethod: "delivery",
  notes: "",
  totalAmount: 189000,
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

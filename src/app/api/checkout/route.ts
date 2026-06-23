import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { snap } from "@/lib/midtrans";
import { getServerSession } from "next-auth/next";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    const body = await req.json();
    const { items, customerName, phone, address, deliveryMethod, notes, totalAmount, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    let userId = null;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (user) userId = user.id;
    }

    // 2. Buat Order di Database
    const order = await prisma.order.create({
      data: {
        userId,
        customerName,
        phone,
        address,
        deliveryMethod,
        notes,
        totalAmount,
        status: "PENDING",
        items: {
          create: items.map((item: any) => ({
            productId: item.productId || item.id,
            quantity: item.qty,
            price: item.price,
          })),
        },
      },
    });

    if (paymentMethod === 'whatsapp') {
       // Return orderId, client will handle WA redirect
       return NextResponse.json({ orderId: order.id }, { status: 200 });
    }

    const item_details = items.map((item: any) => ({
      id: item.variantId || item.productId || item.id,
      price: item.price,
      quantity: item.qty,
      name: item.name,
    }));

    const calculatedSubtotal = items.reduce((acc: number, item: any) => acc + item.price * item.qty, 0);
    const discount = totalAmount - calculatedSubtotal;
    
    if (discount < 0) {
      item_details.push({
        id: "DISCOUNT",
        price: discount, // negative value
        quantity: 1,
        name: "Discount Promo",
      });
    }

    const parameter = {
      transaction_details: {
        order_id: order.id,
        gross_amount: totalAmount,
      },
      customer_details: {
        first_name: customerName,
        phone: phone,
        billing_address: {
          address: address,
        },
      },
      item_details: item_details,
    };

    const transaction = await snap.createTransaction(parameter);
    const paymentToken = transaction.token;

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentToken },
    });

    return NextResponse.json({ token: paymentToken, orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ message: "An error occurred during checkout", error: String(error) }, { status: 500 });
  }
}

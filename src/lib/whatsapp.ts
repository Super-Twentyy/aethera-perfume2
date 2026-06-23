// =============================================
// Aethera Perfume — WhatsApp URL Generator
// =============================================

import type { CartItem } from "@/types";
import { formatRupiah } from "./utils";

/**
 * Generate WhatsApp URL with pre-filled order message
 * Target: Admin Aethera at 62895338550439
 */
export const generateWAUrl = (
  orderId: string,
  customerName: string,
  phone: string,
  deliveryMethod: "pickup" | "delivery",
  address: string, // empty string if pickup
  isJabodetabek: boolean,
  cartItems: CartItem[],
  totalProduct: number,
  notes?: string
): string => {
  const adminPhone = "62895338550439";

  let itemsText = "";
  cartItems.forEach((item, index) => {
    itemsText += `${index + 1}. ${item.qty}x ${item.name} - ${item.size} (${formatRupiah(item.price * item.qty)})\n`;
  });

  let deliveryInfo = "";
  if (deliveryMethod === "pickup") {
    deliveryInfo = `*Metode Pengambilan:* Ambil di Toko`;
  } else {
    deliveryInfo = `*Metode Pengiriman:* Dikirim ke alamat\n*Alamat:* ${address}`;
    if (isJabodetabek) {
      deliveryInfo += `\n*Ongkir:* GRATIS (Jabodetabek) ✅`;
    } else {
      deliveryInfo += `\n*Ongkir:* Akan dikonfirmasi oleh admin`;
    }
  }

  const notesLine = notes?.trim()
    ? `\n*Catatan / Kartu Ucapan:*\n${notes.trim()}\n`
    : "";

  const message = `Halo Admin *Aethera*, 
Saya ingin menyelesaikan pesanan saya dengan detail berikut:

*Order ID:* #${orderId}
*Nama:* ${customerName}
*No. Telepon:* ${phone}
${deliveryInfo}

*Detail Pesanan:*
${itemsText}
*Subtotal Produk:* ${formatRupiah(totalProduct)}
${notesLine}
Mohon konfirmasi ketersediaan dan informasi pembayarannya ya. Terima kasih! ✨`;

  return `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
};

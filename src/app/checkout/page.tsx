"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Script from "next/script";
import { useCartStore } from "@/store/cartStore";
import { showToast } from "@/components/Toast";
import { formatRupiah, cn } from "@/lib/utils";
import type { CheckoutFormData, CartItem } from "@/types";

const JABODETABEK_KEYWORDS = [
  "jakarta", "bogor", "depok", "tangerang", "bekasi",
  "south tangerang", "tangerang selatan",
];

function isJabodetabekArea(address: string): boolean {
  if (!address) return false;
  const lower = address.toLowerCase();
  return JABODETABEK_KEYWORDS.some((kw) => lower.includes(kw));
}

function CheckoutContent() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isBuyNow = searchParams.get("buyNow") === "true";

  const cartItems = useCartStore((s) => s.items);
  const buyNowItem = useCartStore((s) => s.buyNowItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const clearBuyNowItem = useCartStore((s) => s.clearBuyNowItem);

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CheckoutFormData>({
    customerName: "",
    phone: "",
    deliveryMethod: "delivery",
    address: "",
    isJabodetabek: false,
    notes: "",
  });

  // Pre-fill form from session
  useEffect(() => {
    if (session?.user) {
      // We don't have phone/address in session.user by default unless we add it,
      // but we can at least fill the name and email.
      // Ideally, we'd fetch the full user profile if needed, but for now we rely on the name.
      setForm((prev) => ({
        ...prev,
        customerName: session?.user?.name || prev.customerName,
      }));
      // Fetch full profile to get phone and address
      fetch("/api/user/profile")
        .then(res => res.json())
        .then(data => {
          if (data?.user) {
            setForm(prev => ({
              ...prev,
              phone: data.user.phone || prev.phone,
              address: data.user.address || prev.address,
              isJabodetabek: isJabodetabekArea(data.user.address || prev.address)
            }));
          }
        })
        .catch(err => console.error("Could not fetch user profile", err));
    }
    setMounted(true);
  }, [session]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      isJabodetabek: isJabodetabekArea(prev.address),
    }));
  }, [form.address]);

  // Determine items to checkout
  const itemsToCheckOut: CartItem[] = useMemo(() => {
    if (!mounted) return [];
    if (isBuyNow && buyNowItem) return [buyNowItem];
    return cartItems;
  }, [mounted, isBuyNow, buyNowItem, cartItems]);

  const pricingSummary = useMemo(() => {
    if (!mounted) return { subtotal: 0, promoDiscount: 0, buy2get1Discount: 0, totalFinal: 0 };

    const subtotal = itemsToCheckOut.reduce((acc, item) => acc + item.price * item.qty, 0);
    let buy2get1Discount = 0;
    let promoDiscount = 0;

    itemsToCheckOut.forEach((item) => {
      const itemSubtotal = item.price * item.qty;
      promoDiscount += itemSubtotal * 0.3;

      if (item.size && item.size.toLowerCase().includes("30") && item.qty >= 3) {
        const freeItemsCount = Math.floor(item.qty / 3);
        buy2get1Discount += freeItemsCount * item.price;
      }
    });

    const totalDiscount = promoDiscount + buy2get1Discount;
    const totalFinal = Math.max(0, subtotal - totalDiscount);

    return {
      subtotal,
      promoDiscount,
      buy2get1Discount,
      totalFinal,
    };
  }, [mounted, itemsToCheckOut]);

  const isEmpty = !mounted || itemsToCheckOut.length === 0;
  const isPickup = form.deliveryMethod === "pickup";
  const isFreeOngkir = isPickup || form.isJabodetabek;

  const handleCheckout = async (paymentMethod: 'midtrans' | 'whatsapp') => {
    if (!form.customerName.trim() || !form.phone.trim() || (!isPickup && !form.address.trim())) {
      showToast("warning", "Mohon lengkapi semua data pengiriman.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: itemsToCheckOut,
          customerName: form.customerName,
          phone: form.phone,
          address: form.address,
          deliveryMethod: form.deliveryMethod,
          notes: form.notes,
          totalAmount: pricingSummary.totalFinal,
          paymentMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal membuat pesanan");
      }

      if (paymentMethod === 'whatsapp' && data.orderId) {
        const { generateWAUrl } = await import("@/lib/whatsapp");
        const waUrl = generateWAUrl(
          data.orderId.slice(-6),
          form.customerName,
          form.phone,
          form.deliveryMethod as any,
          form.address,
          form.isJabodetabek,
          itemsToCheckOut,
          pricingSummary.subtotal,
          form.notes
        );
        if (isBuyNow) clearBuyNowItem();
        else clearCart();
        window.open(waUrl, "_blank");
        router.push("/katalog");
        return;
      }

      if (paymentMethod === 'midtrans' && data.token) {
        (window as any).snap.pay(data.token, {
          onSuccess: function (result: any) {
            showToast("success", "Pembayaran berhasil!");
            if (isBuyNow) clearBuyNowItem();
            else clearCart();
            router.push("/katalog");
          },
          onPending: function (result: any) {
            showToast("warning", "Menunggu pembayaran Anda.");
            if (isBuyNow) clearBuyNowItem();
            else clearCart();
            router.push("/katalog");
          },
          onError: function (result: any) {
            showToast("error", "Pembayaran gagal!");
          },
          onClose: function () {
            showToast("warning", "Anda menutup popup tanpa menyelesaikan pembayaran.");
          },
        });
      }
    } catch (error: any) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const isCheckoutReady = !isEmpty && form.customerName.trim() !== "" && form.phone.trim() !== "" && (isPickup || form.address.trim() !== "");

  if (isEmpty) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-main text-center py-20">
          <h1 className="font-serif text-2xl text-text-primary mb-2">Keranjang Kosong</h1>
          <p className="font-sans text-text-secondary text-sm mb-6">Tambahkan parfum ke keranjang terlebih dahulu sebelum checkout.</p>
          <Link href="/katalog" className="btn-primary">Jelajahi Katalog</Link>
        </div>
      </div>
    );
  }

  const midtransScriptSrc = "https://app.sandbox.midtrans.com/snap/snap.js";

  return (
    <div className="pt-20 md:pt-24 pb-16">
      <Script src={midtransScriptSrc} data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} strategy="lazyOnload" />
      <div className="container-main">
        <div className="mb-8">
          <Link href="/katalog" className="font-sans text-sm text-text-secondary hover:text-brand transition-colors inline-flex items-center gap-1 mb-4">
            ← Kembali Belanja
          </Link>
          <h1 className="section-title">Checkout</h1>
        </div>

        {!session && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 text-sm">
            <Link href="/login" className="font-semibold underline">Masuk akun Anda</Link> untuk pengalaman checkout yang lebih cepat.
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left: Form */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-serif text-lg mb-5 flex items-center gap-2">Data Penerima</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-field">Nama Lengkap</label>
                  <input type="text" value={form.customerName} onChange={(e) => setForm(p => ({ ...p, customerName: e.target.value }))} className="input-field" />
                </div>
                <div>
                  <label className="label-field">No. Telepon / WA</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} className="input-field" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-serif text-lg mb-5 flex items-center gap-2">Metode Pengiriman</h2>
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                <button onClick={() => setForm(p => ({ ...p, deliveryMethod: "pickup" }))} className={cn("p-4 rounded-xl border-2 text-left", form.deliveryMethod === "pickup" ? "border-brand bg-brand/5" : "border-gray-200")}>
                  <p className="font-semibold text-sm">Ambil di Toko</p>
                </button>
                <button onClick={() => setForm(p => ({ ...p, deliveryMethod: "delivery" }))} className={cn("p-4 rounded-xl border-2 text-left", form.deliveryMethod === "delivery" ? "border-brand bg-brand/5" : "border-gray-200")}>
                  <p className="font-semibold text-sm">Dikirim ke Alamat</p>
                </button>
              </div>

              {form.deliveryMethod === "delivery" && (
                <div>
                  <label className="label-field">Alamat Lengkap</label>
                  <textarea rows={3} value={form.address} onChange={(e) => setForm(p => ({ ...p, address: e.target.value }))} className="input-field resize-none" />
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-serif text-lg mb-5 flex items-center gap-2">Catatan</h2>
              <textarea rows={2} value={form.notes} onChange={(e) => setForm(p => ({ ...p, notes: e.target.value }))} className="input-field resize-none w-full" placeholder="Opsional..." />
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-28">
              <h2 className="font-serif text-lg mb-5">Ringkasan Pesanan</h2>
              <div className="space-y-4 mb-6">
                {itemsToCheckOut.map((item) => (
                  <div key={item.variantId} className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/products/placeholder.jpg"} alt={item.name} width={56} height={56} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm truncate">{item.name}</p>
                      <p className="text-xs text-text-secondary">{item.size} × {item.qty}</p>
                    </div>
                    <p className="text-sm font-semibold">{formatRupiah(item.price * item.qty)}</p>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-100 my-4" />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-text-secondary"><span>Subtotal</span><span>{formatRupiah(pricingSummary.subtotal)}</span></div>
                {pricingSummary.promoDiscount > 0 && <div className="flex justify-between text-green-600 font-medium"><span>Diskon 30%</span><span>-{formatRupiah(pricingSummary.promoDiscount)}</span></div>}
                {pricingSummary.buy2get1Discount > 0 && <div className="flex justify-between text-green-600 font-medium"><span>Beli 2 Gratis 1</span><span>-{formatRupiah(pricingSummary.buy2get1Discount)}</span></div>}
                <div className="flex justify-between text-text-secondary"><span>Ongkir</span><span>{isFreeOngkir ? <span className="text-green-600">Gratis 🎉</span> : <span className="text-amber-600">Dikonfirmasi admin</span>}</span></div>
                <div className="h-px bg-gray-100" />
                <div className="flex justify-between font-bold text-lg pt-1"><span>Total Akhir</span><span className="text-brand">{formatRupiah(pricingSummary.totalFinal)}</span></div>
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <button
                  onClick={() => handleCheckout('midtrans')}
                  disabled={!isCheckoutReady || loading}
                  className={cn("w-full py-4 rounded-xl font-semibold text-base flex justify-center", isCheckoutReady && !loading ? "bg-brand text-white hover:bg-brand-hover shadow-lg" : "bg-gray-200 text-gray-400 cursor-not-allowed")}
                >
                  {loading ? "Memproses..." : "Bayar Otomatis (Midtrans)"}
                </button>

                <button
                  onClick={() => handleCheckout('whatsapp')}
                  disabled={!isCheckoutReady || loading}
                  className={cn("w-full py-4 rounded-xl font-semibold text-base flex justify-center items-center gap-2", isCheckoutReady && !loading ? "bg-[#25D366] text-white hover:bg-[#1fba57] shadow-lg shadow-[#25D366]/20" : "bg-gray-200 text-gray-400 cursor-not-allowed")}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                  {loading ? "Memproses..." : "Pesan via WhatsApp"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="pt-24 text-center">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
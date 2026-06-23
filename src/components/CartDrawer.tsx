"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { formatRupiah } from "@/lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);

  const totalPrice = getTotalPrice();
  const isEmpty = items.length === 0;

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={onClose} />}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-serif text-xl text-text-primary">
            Keranjang Belanja
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-text-secondary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="font-sans text-text-secondary text-sm">
                Keranjangmu masih kosong
              </p>
              <Link
                href="/katalog"
                onClick={onClose}
                className="btn-primary mt-4 text-sm"
              >
                Jelajahi Parfum
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                    <Image
                      src={item.image || "/products/placeholder.jpg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-sm text-text-primary truncate">
                      {item.name}
                    </h3>
                    <p className="font-sans text-xs text-text-secondary mt-0.5">
                      {item.size}
                    </p>
                    <p className="font-sans text-sm font-semibold text-brand mt-1">
                      {formatRupiah(item.price)}
                    </p>

                    {/* Qty Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          if (item.qty <= 1) {
                            removeItem(item.variantId);
                          } else {
                            updateQty(item.variantId, item.qty - 1);
                          }
                        }}
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-text-primary text-sm font-bold transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="font-sans text-sm font-medium text-text-primary w-6 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.variantId, item.qty + 1)}
                        className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-text-primary text-sm font-bold transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="ml-auto p-1.5 rounded-lg hover:bg-red-50 text-text-secondary hover:text-sold-out transition-colors"
                        aria-label="Remove item"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="border-t border-gray-100 px-6 py-5 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="font-sans text-sm text-text-secondary">
                Subtotal
              </span>
              <span className="font-sans text-lg font-bold text-text-primary">
                {formatRupiah(totalPrice)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="btn-primary w-full text-center block"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

// =============================================
// Aethera Perfume — Zustand Cart Store
// Persisted to localStorage for cross-session persistence
// =============================================

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartStore } from "@/types";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      buyNowItem: null,

      setBuyNowItem: (item: CartItem) => {
        set({ buyNowItem: item });
      },

      clearBuyNowItem: () => {
        set({ buyNowItem: null });
      },

      addItem: (newItem: CartItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.variantId === newItem.variantId
          );

          if (existingIndex > -1) {
            // Increment qty if variant already in cart
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              qty: updatedItems[existingIndex].qty + newItem.qty,
            };
            return { items: updatedItems };
          }

          // Add new item
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (variantId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== variantId),
        }));
      },

      updateQty: (variantId: string, qty: number) => {
        if (qty < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === variantId ? { ...item, qty } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.qty,
          0
        );
      },

      getTotalWeight: () => {
        return get().items.reduce(
          (total, item) => total + item.weightGram * item.qty,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.qty, 0);
      },
    }),
    {
      name: "aethera-cart",
    }
  )
);

"use client";

import { useEffect, useState, useCallback } from "react";
import type { ToastMessage } from "@/types";

// =============================================
// Global Toast State (simple pub/sub)
// =============================================

type ToastListener = (toasts: ToastMessage[]) => void;

let toasts: ToastMessage[] = [];
const listeners: Set<ToastListener> = new Set();

function notifyListeners() {
  listeners.forEach((listener) => listener([...toasts]));
}

export function showToast(type: ToastMessage["type"], message: string) {
  const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
  toasts = [...toasts, { id, type, message }];
  notifyListeners();

  // Auto-remove after 4 seconds
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notifyListeners();
  }, 4000);
}

// =============================================
// Toast Component
// =============================================

const iconMap = {
  success: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

const colorMap = {
  success: "bg-brand text-white",
  warning: "bg-amber-500 text-white",
  error: "bg-sold-out text-white",
};

export default function Toast() {
  const [currentToasts, setCurrentToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const listener: ToastListener = (newToasts) => {
      setCurrentToasts(newToasts);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const dismissToast = useCallback((id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    notifyListeners();
  }, []);

  if (currentToasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {currentToasts.map((toast) => (
        <div
          key={toast.id}
          className={`${colorMap[toast.type]} rounded-xl px-4 py-3 shadow-lg flex items-center gap-3 animate-slide-in-right pointer-events-auto`}
        >
          <span className="flex-shrink-0">{iconMap[toast.type]}</span>
          <p className="text-sm font-sans font-medium flex-1">{toast.message}</p>
          <button
            onClick={() => dismissToast(toast.id)}
            className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

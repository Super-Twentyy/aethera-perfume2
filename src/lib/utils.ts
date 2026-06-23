// =============================================
// Aethera Perfume — Utility Functions
// =============================================

/**
 * Format number to Indonesian Rupiah
 * @example formatRupiah(350000) => "Rp 350.000"
 */
export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

/**
 * Generate a random order ID
 * Format: AET-YYYYMMDD-XXXXX
 */
export function generateOrderId(): string {
  const now = new Date();
  const dateStr =
    now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    now.getDate().toString().padStart(2, "0");
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `AET-${dateStr}-${random}`;
}

/**
 * Merge class names — simple utility (no clsx/tailwind-merge dependency)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Check if a product is completely sold out (all variants stock = 0)
 */
export function isProductSoldOut(
  variants: { stock: number }[]
): boolean {
  return variants.every((v) => v.stock <= 0);
}

/**
 * Get the lowest price from product variants
 */
export function getStartingPrice(
  variants: { price: number; stock: number }[]
): number {
  const available = variants.filter((v) => v.stock > 0);
  if (available.length === 0) {
    return Math.min(...variants.map((v) => v.price));
  }
  return Math.min(...available.map((v) => v.price));
}

/** Packaging weight constant (grams) — used for total weight calculation */
export const PACKAGING_WEIGHT_GRAM = 100;

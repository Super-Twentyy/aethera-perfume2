// =============================================
// Aethera Perfume — Core TypeScript Interfaces
// =============================================

/** Fragrance family classification */
export type FragranceFamily = "Woody" | "Floral" | "Fresh" | "Oriental";

/** Fragrance notes breakdown */
export interface FragranceNotes {
  top: string;
  middle: string;
  base: string;
}

/** Product variant (size + pricing) */
export interface ProductVariant {
  _key: string;
  size: string;
  price: number;
  weightGram: number;
  stock: number;
}

/** Product image */
export interface ProductImage {
  _key: string;
  asset: {
    _ref: string;
    url?: string;
  };
  alt?: string;
}

/** Full product schema */
export interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  images: ProductImage[];
  description?: string;
  fragranceFamily: FragranceFamily;
  notes: FragranceNotes;
  variants: ProductVariant[];
  /** true if ALL variants have stock === 0 */
  isSoldOut?: boolean;
}

/** Cart item stored in Zustand / localStorage */
export interface CartItem {
  variantId: string;
  productId: string;
  name: string;
  slug: string;
  size: string;
  price: number;
  weightGram: number;
  qty: number;
  image: string;
}

/** Cart store interface */
export interface CartStore {
  items: CartItem[];
  buyNowItem: CartItem | null;
  addItem: (item: CartItem) => void;
  setBuyNowItem: (item: CartItem) => void;
  clearBuyNowItem: () => void;
  removeItem: (variantId: string) => void;
  updateQty: (variantId: string, qty: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalWeight: () => number;
  getTotalItems: () => number;
}

/** Checkout form data */
export interface CheckoutFormData {
  customerName: string;
  phone: string;
  deliveryMethod: "pickup" | "delivery";
  address: string;
  isJabodetabek: boolean;
  notes: string;
}

/** Toast notification */
export interface ToastMessage {
  id: string;
  type: "success" | "warning" | "error";
  message: string;
}

/** Filter state for catalog */
export interface FilterState {
  fragranceFamily: FragranceFamily | "all";
  sortBy: "newest" | "price-low" | "price-high" | "name";
  searchQuery: string;
}

"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { mockProducts } from "@/data/mockProducts";
import { useCartStore } from "@/store/cartStore";
import { showToast } from "@/components/Toast";
import {
  formatRupiah,
  isProductSoldOut,
  cn,
} from "@/lib/utils";
import type { Product, ProductVariant } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const addItem = useCartStore((s) => s.addItem);
  const setBuyNowItem = useCartStore((s) => s.setBuyNowItem);

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    // Find product from mock data (or Sanity in production)
    const found = mockProducts.find((p) => p.slug.current === slug);
    if (found) {
      setProduct(found);
      // Select first in-stock variant by default
      const firstAvailable = found.variants.find((v) => v.stock > 0) || found.variants[0];
      setSelectedVariant(firstAvailable);
    }
    setIsLoading(false);
  }, [slug]);

  const soldOut = useMemo(() => {
    if (!product) return false;
    return product.isSoldOut || isProductSoldOut(product.variants);
  }, [product]);

  const variantSoldOut = selectedVariant ? selectedVariant.stock <= 0 : false;

  const handleAddToCart = () => {
    if (!product || !selectedVariant || variantSoldOut) return;

    addItem({
      variantId: selectedVariant._key,
      productId: product._id,
      name: product.name,
      slug: product.slug.current,
      size: selectedVariant.size,
      price: selectedVariant.price,
      weightGram: selectedVariant.weightGram,
      qty,
      image: product.images?.[0]?.asset?.url || "/products/placeholder.jpg",
    });

    showToast("success", `${product.name} (${selectedVariant.size}) ditambahkan ke keranjang!`);
    setQty(1);
  };

  const handleBuyNow = () => {
    if (!product || !selectedVariant || variantSoldOut) return;

    setBuyNowItem({
      variantId: selectedVariant._key,
      productId: product._id,
      name: product.name,
      slug: product.slug.current,
      size: selectedVariant.size,
      price: selectedVariant.price,
      weightGram: selectedVariant.weightGram,
      qty,
      image: product.images?.[0]?.asset?.url || "/products/placeholder.jpg",
    });

    router.push("/checkout?buyNow=true");
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="aspect-[3/4] skeleton" />
            <div className="space-y-4">
              <div className="h-8 w-48 skeleton" />
              <div className="h-6 w-24 skeleton" />
              <div className="h-32 skeleton" />
              <div className="h-12 w-full skeleton" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-main text-center py-20">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-text-secondary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl text-text-primary mb-2">
            Produk Tidak Ditemukan
          </h1>
          <p className="font-sans text-text-secondary text-sm mb-6">
            Parfum yang kamu cari tidak ada atau sudah dihapus.
          </p>
          <Link href="/katalog" className="btn-primary">
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl =
    product.images?.[selectedImageIndex]?.asset?.url || "/products/placeholder.jpg";

  return (
    <div className="pt-20 md:pt-24 pb-16">
      <div className="container-main">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8 font-sans text-sm text-text-secondary">
          <Link href="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/katalog" className="hover:text-brand transition-colors">
            Katalog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text-primary">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* ===== Image Gallery ===== */}
          <div>
            {/* Main Image */}
            <div
              className={cn(
                "relative aspect-[3/4] rounded-3xl overflow-hidden bg-gray-50",
                soldOut && "sold-out-image"
              )}
            >
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {soldOut && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="badge-sold-out text-sm font-semibold px-4 py-1.5">
                    Sold Out
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, idx) => (
                  <button
                    key={img._key}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={cn(
                      "w-16 h-20 rounded-xl overflow-hidden border-2 transition-all",
                      selectedImageIndex === idx
                        ? "border-brand shadow-sm"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img.asset?.url || "/products/placeholder.jpg"}
                      alt={`${product.name} view ${idx + 1}`}
                      width={64}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ===== Product Info ===== */}
          <div className="flex flex-col">
            {/* Family Badge */}
            <span className="badge-family w-fit text-xs uppercase tracking-wider mb-3">
              {product.fragranceFamily}
            </span>

            {/* Name */}
            <h1 className="font-serif text-3xl md:text-4xl text-text-primary leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4">
              {selectedVariant && (
                <p className="font-sans text-2xl font-bold text-brand">
                  {formatRupiah(selectedVariant.price)}
                </p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="font-sans text-text-secondary leading-relaxed mt-6 text-sm md:text-base">
                {product.description}
              </p>
            )}

            {/* Divider */}
            <div className="h-px bg-gray-100 my-6" />

            {/* Fragrance Notes Pyramid */}
            <div className="mb-6">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary mb-4">
                Fragrance Notes
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Top Notes", notes: product.notes.top, color: "bg-brand/10 text-brand" },
                  { label: "Middle Notes", notes: product.notes.middle, color: "bg-amber-50 text-amber-700" },
                  { label: "Base Notes", notes: product.notes.base, color: "bg-rose-50 text-rose-700" },
                ].map((note) => (
                  <div key={note.label} className="flex items-start gap-3">
                    <span
                      className={cn(
                        "font-sans text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md flex-shrink-0 min-w-[90px] text-center",
                        note.color
                      )}
                    >
                      {note.label}
                    </span>
                    <p className="font-sans text-sm text-text-secondary pt-0.5">
                      {note.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 my-6" />

            {/* Variant Selector */}
            <div className="mb-6">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3">
                Pilih Ukuran
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => {
                  const isVarSoldOut = variant.stock <= 0;
                  const isSelected = selectedVariant?._key === variant._key;

                  return (
                    <button
                      key={variant._key}
                      onClick={() => {
                        if (!isVarSoldOut) {
                          setSelectedVariant(variant);
                          setQty(1);
                        }
                      }}
                      disabled={isVarSoldOut}
                      className={cn(
                        "font-sans text-sm px-5 py-3 rounded-xl border-2 transition-all duration-200 relative",
                        isSelected && !isVarSoldOut
                          ? "border-brand bg-brand/5 text-brand font-semibold"
                          : isVarSoldOut
                          ? "border-gray-200 bg-gray-50 text-text-secondary/40 cursor-not-allowed line-through"
                          : "border-gray-200 hover:border-brand/30 text-text-primary"
                      )}
                    >
                      {variant.size}
                      {isVarSoldOut && (
                        <span className="absolute -top-2 -right-2 text-[9px] bg-sold-out text-white px-1.5 py-0.5 rounded-full font-semibold">
                          Habis
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            {!soldOut && selectedVariant && !variantSoldOut && (
              <div className="flex items-center gap-4 mt-auto">
                {/* Qty */}
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-11 h-11 flex items-center justify-center text-text-primary hover:bg-gray-50 transition-colors font-bold"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="w-10 h-11 flex items-center justify-center font-sans text-sm font-medium text-text-primary border-x border-gray-200">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-11 h-11 flex items-center justify-center text-text-primary hover:bg-gray-50 transition-colors font-bold"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                  id="add-to-cart"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Tambah
                </button>
                {/* Buy Now */}
                <button
                  onClick={handleBuyNow}
                  className="btn-primary bg-[#25D366] hover:bg-[#1fba57] shadow-lg shadow-[#25D366]/20 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Beli Langsung
                </button>
              </div>
            )}

            {/* Sold Out Message */}
            {(soldOut || variantSoldOut) && (
              <div className="mt-auto">
                <button
                  disabled
                  className="btn-primary w-full opacity-50 cursor-not-allowed"
                >
                  Stok Habis
                </button>
                <p className="font-sans text-xs text-text-secondary text-center mt-2">
                  Hubungi kami via WhatsApp untuk info restock
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

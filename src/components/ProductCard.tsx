"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatRupiah, isProductSoldOut, getStartingPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const soldOut =
    product.isSoldOut || isProductSoldOut(product.variants);
  const startingPrice = getStartingPrice(product.variants);

  const imageUrl =
    product.images?.[0]?.asset?.url ||
    "/products/placeholder.jpg";

  return (
    <Link
      href={`/produk/${product.slug.current}`}
      className="card-product group block"
      id={`product-${product._id}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            soldOut ? "sold-out-image" : ""
          }`}
        />

        {/* Sold Out Badge */}
        {soldOut && (
          <div className="absolute top-3 right-3 z-10">
            <span className="badge-sold-out text-xs font-semibold px-3 py-1">
              Sold Out
            </span>
          </div>
        )}

        {/* Fragrance Family Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="badge-family text-[10px] uppercase tracking-wider">
            {product.fragranceFamily}
          </span>
        </div>

        {/* Hover Overlay */}
        {!soldOut && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <span className="bg-white/90 backdrop-blur-sm text-text-primary font-sans text-xs font-semibold px-5 py-2.5 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Lihat Detail →
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-serif text-base md:text-lg text-text-primary group-hover:text-brand transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Notes preview */}
        {product.notes?.top && (
          <p className="font-sans text-xs text-text-secondary mt-1 line-clamp-1">
            {product.notes.top}
          </p>
        )}

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-1.5">
          {soldOut ? (
            <span className="font-sans text-sm text-text-secondary line-through">
              {formatRupiah(startingPrice)}
            </span>
          ) : (
            <>
              <span className="font-sans text-sm font-bold text-brand">
                {formatRupiah(startingPrice)}
              </span>
              {product.variants.length > 1 && (
                <span className="font-sans text-[10px] text-text-secondary">
                  mulai dari
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

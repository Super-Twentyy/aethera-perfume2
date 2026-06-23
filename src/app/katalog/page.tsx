"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import FilterDrawer from "@/components/FilterDrawer";
import { mockProducts } from "@/data/mockProducts";
import type { Product, FilterState, FragranceFamily } from "@/types";
import { getStartingPrice, cn } from "@/lib/utils";

// ======================================================
// Inner component — useSearchParams harus di dalam
// komponen yang dibungkus Suspense agar bisa static build
// ======================================================
function KatalogContent() {
  const searchParams = useSearchParams();
  const familyParam = searchParams.get("family") as FragranceFamily | null;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products] = useState<Product[]>(mockProducts);
  const [filters, setFilters] = useState<FilterState>({
    fragranceFamily: familyParam || "all",
    sortBy: "newest",
    searchQuery: "",
  });

  useEffect(() => {
    if (familyParam) {
      setFilters((prev) => ({ ...prev, fragranceFamily: familyParam }));
    }
  }, [familyParam]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.fragranceFamily !== "all") {
      result = result.filter(
        (p) => p.fragranceFamily === filters.fragranceFamily
      );
    }

    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.fragranceFamily.toLowerCase().includes(query) ||
          p.notes.top.toLowerCase().includes(query) ||
          p.notes.middle.toLowerCase().includes(query) ||
          p.notes.base.toLowerCase().includes(query)
      );
    }

    switch (filters.sortBy) {
      case "price-low":
        result.sort(
          (a, b) => getStartingPrice(a.variants) - getStartingPrice(b.variants)
        );
        break;
      case "price-high":
        result.sort(
          (a, b) => getStartingPrice(b.variants) - getStartingPrice(a.variants)
        );
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, filters]);

  return (
    <div className="pt-20 md:pt-24 pb-16">
      <div className="container-main">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand font-semibold">
            Collection
          </span>
          <h1 className="section-title mt-2">Katalog Parfum</h1>
          <p className="section-subtitle">
            Temukan wewangian sempurna dari koleksi eksklusif Aethera
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 md:mb-8">
          <div className="relative max-w-md">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Cari parfum, notes, atau fragrance family..."
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
              }
              className="input-field pl-12"
              id="search-input"
            />
          </div>
        </div>

        <div className="flex gap-8">
          <FilterDrawer
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFilterChange={setFilters}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="font-sans text-sm text-text-secondary">
                {filteredProducts.length} produk ditemukan
              </p>
              {filters.fragranceFamily !== "all" && (
                <button
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, fragranceFamily: "all" }))
                  }
                  className="font-sans text-xs text-brand bg-brand/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-brand/20 transition-colors"
                >
                  {filters.fragranceFamily}
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-text-secondary/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p className="font-serif text-lg text-text-primary mb-1">
                  Tidak ada produk ditemukan
                </p>
                <p className="font-sans text-sm text-text-secondary">
                  Coba ubah filter atau kata kunci pencarianmu
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Floating Filter Button */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className={cn(
          "md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-30",
          "bg-brand text-white font-sans font-semibold text-sm",
          "px-6 py-3.5 rounded-full shadow-lg shadow-brand/30",
          "flex items-center gap-2",
          "hover:bg-brand-dark active:scale-95 transition-all"
        )}
        id="filter-button"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filter
        {filters.fragranceFamily !== "all" && (
          <span className="w-2 h-2 bg-white rounded-full" />
        )}
      </button>
    </div>
  );
}

// ======================================================
// Skeleton fallback saat Suspense loading
// ======================================================
function KatalogSkeleton() {
  return (
    <div className="pt-20 md:pt-24 pb-16">
      <div className="container-main">
        <div className="mb-8">
          <div className="h-3 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-8 w-48 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-4 w-72 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] bg-gray-200 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ======================================================
// Default export — WAJIB bungkus KatalogContent
// dengan Suspense agar build berhasil
// ======================================================
export default function KatalogPage() {
  return (
    <Suspense fallback={<KatalogSkeleton />}>
      <KatalogContent />
    </Suspense>
  );
}

"use client";

import { cn } from "@/lib/utils";
import type { FilterState, FragranceFamily } from "@/types";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const fragranceFamilies: { value: FragranceFamily | "all"; label: string; icon: string }[] = [
  { value: "all", label: "Semua", icon: "✦" },
  { value: "Floral", label: "Floral", icon: "🌸" },
  { value: "Woody", label: "Woody", icon: "🌿" },
  { value: "Fresh", label: "Fresh", icon: "💧" },
  { value: "Oriental", label: "Oriental", icon: "🌙" },
];

const sortOptions: { value: FilterState["sortBy"]; label: string }[] = [
  { value: "newest", label: "Terbaru" },
  { value: "price-low", label: "Harga: Rendah → Tinggi" },
  { value: "price-high", label: "Harga: Tinggi → Rendah" },
  { value: "name", label: "Nama: A → Z" },
];

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}: FilterDrawerProps) {
  const updateFilter = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const FilterContent = () => (
    <div className="flex flex-col gap-8">
      {/* Fragrance Family */}
      <div>
        <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3">
          Fragrance Family
        </h3>
        <div className="flex flex-wrap gap-2">
          {fragranceFamilies.map((family) => (
            <button
              key={family.value}
              onClick={() => updateFilter("fragranceFamily", family.value)}
              className={cn(
                "font-sans text-sm px-4 py-2.5 rounded-xl border transition-all duration-200",
                filters.fragranceFamily === family.value
                  ? "bg-brand text-white border-brand shadow-sm shadow-brand/20"
                  : "bg-white text-text-secondary border-gray-200 hover:border-brand/30 hover:text-brand"
              )}
            >
              <span className="mr-1.5">{family.icon}</span>
              {family.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3">
          Urutkan
        </h3>
        <div className="flex flex-col gap-1.5">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFilter("sortBy", option.value)}
              className={cn(
                "font-sans text-sm px-4 py-3 rounded-xl text-left transition-all duration-200",
                filters.sortBy === option.value
                  ? "bg-brand/10 text-brand font-medium"
                  : "text-text-secondary hover:bg-gray-50"
              )}
            >
              {filters.sortBy === option.value && (
                <svg className="w-4 h-4 inline-block mr-2 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() =>
          onFilterChange({
            fragranceFamily: "all",
            sortBy: "newest",
            searchQuery: filters.searchQuery,
          })
        }
        className="font-sans text-sm text-text-secondary hover:text-sold-out transition-colors underline underline-offset-4"
      >
        Reset Filter
      </button>
    </div>
  );

  return (
    <>
      {/* ===== MOBILE: Slide-out Drawer from Bottom ===== */}
      <div className="md:hidden">
        {/* Overlay */}
        {isOpen && <div className="overlay" onClick={onClose} />}

        {/* Drawer */}
        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out max-h-[80vh] overflow-y-auto",
            isOpen ? "translate-y-0" : "translate-y-full"
          )}
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-100">
            <h2 className="font-serif text-lg text-text-primary">Filter</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Close filter"
            >
              <svg className="w-5 h-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <FilterContent />
          </div>

          {/* Apply Button */}
          <div className="px-6 pb-6 pt-2">
            <button onClick={onClose} className="btn-primary w-full">
              Terapkan Filter
            </button>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP: Static Sidebar ===== */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-serif text-lg text-text-primary mb-6">Filter</h2>
          <FilterContent />
        </div>
      </aside>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Tampilkan popup setelah 1.5 detik
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] animate-fade-in"
        onClick={() => setIsVisible(false)}
      />

      {/* Popup Card */}
      <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
        <div className="relative w-full max-w-sm md:max-w-md pointer-events-auto animate-scale-in">
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-800 hover:scale-110 transition-all duration-200"
            aria-label="Tutup popup"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Card */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Gambar Promo */}
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/promo-banner.jpg"
                alt="Promo Aethera Perfume"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-sold-out text-white font-sans text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                  🎉 Grand Opening Sale!
                </span>
              </div>

              {/* Teks di atas gambar */}
              <div className="absolute bottom-4 left-4 right-4">
                <h2 className="font-serif text-white text-2xl md:text-3xl font-bold leading-tight drop-shadow-lg">
                  Diskon Hingga<br />
                  <span className="text-yellow-300">30% Off</span>
                </h2>
                <p className="font-sans text-white/90 text-sm mt-1 drop-shadow">
                  Semua koleksi parfum premium Aethera
                </p>
              </div>
            </div>

            {/* Body konten */}
            <div className="p-5">
              {/* Promo poin-poin */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="font-sans text-sm text-text-secondary">
                    <span className="font-semibold text-text-primary">Gratis Ongkir</span> area Jabodetabek
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="font-sans text-sm text-text-secondary">
                    <span className="font-semibold text-text-primary">Beli 2 Gratis 1</span> untuk ukuran 30ml
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="font-sans text-sm text-text-secondary">
                    Mulai dari <span className="font-semibold text-brand">Rp 169.000</span> saja
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-2.5">
                <Link
                  href="/katalog"
                  onClick={() => setIsVisible(false)}
                  className="flex-1 bg-brand text-white font-sans font-semibold text-sm py-3 rounded-xl text-center hover:bg-brand-dark transition-colors shadow-sm shadow-brand/20"
                >
                  Belanja Sekarang
                </Link>
                <button
                  onClick={() => setIsVisible(false)}
                  className="px-4 py-3 rounded-xl border border-gray-200 font-sans text-sm text-text-secondary hover:border-gray-300 transition-colors"
                >
                  Nanti saja
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

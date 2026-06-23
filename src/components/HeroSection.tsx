"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    tag: "GRAND OPENING SALE 🎉",
    title: "Diskon Hingga 30%",
    subtitle: "Untuk Seluruh Koleksi Parfum",
    description:
      "Rayakan grand opening Aethera dengan diskon spesial! Temukan wewangian premium favoritmu dengan harga terbaik. Promo terbatas — jangan sampai kehabisan.",
    cta: "Belanja Sekarang",
    ctaLink: "/katalog",
    image: "/hero-banner.jpg",
  },
  {
    tag: "NEW ARRIVAL ✨",
    title: "Koleksi Terbaru 2025",
    subtitle: "Aethera Signature Collection",
    description:
      "8 varian wewangian eksklusif yang terinspirasi dari keindahan alam. Mulai dari Rp 169.000 — kualitas premium dengan harga terjangkau.",
    cta: "Lihat Koleksi",
    ctaLink: "/katalog",
    image: "/promo-banner.jpg",
  },
];

const promoFeatures = [
  { icon: "🚚", title: "Gratis Ongkir", desc: "Pembelian pertama" },
  { icon: "✅", title: "100% Original", desc: "Garansi keaslian" },
  { icon: "💳", title: "Pembayaran Mudah", desc: "Transfer & COD" },
  { icon: "📦", title: "Pengiriman Cepat", desc: "1-3 hari sampai" },
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[activeSlide];

  return (
    <section className="relative bg-background overflow-hidden">
      {/* ===== HERO CAROUSEL ===== */}
      <div className="relative min-h-[85vh] md:min-h-[75vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={slide.image}
            alt="Aethera Perfume"
            fill
            className="object-cover transition-opacity duration-1000"
            priority
          />
          {/* Overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:hidden" />
        </div>

        {/* Content */}
        <div className="container-main relative z-10 py-16 md:py-0">
          <div className="max-w-xl">
            {/* Tag */}
            <div
              className={`inline-flex items-center gap-2 bg-brand/10 border border-brand/20 rounded-full px-4 py-1.5 mb-5 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse-soft" />
              <span className="font-sans text-xs font-semibold text-brand uppercase tracking-widest">
                {slide.tag}
              </span>
            </div>

            {/* Title */}
            <h1
              className={`font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary leading-[1.1] tracking-tight transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {slide.title}
              <span className="block text-brand">{slide.subtitle}</span>
            </h1>

            {/* Description */}
            <p
              className={`font-sans text-sm md:text-base text-text-secondary leading-relaxed mt-5 max-w-md transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {slide.description}
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-3 mt-8 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <Link
                href={slide.ctaLink}
                className="btn-primary text-sm md:text-base px-8 py-3.5 rounded-xl shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/35 transition-all"
              >
                {slide.cta} →
              </Link>
              <a
                href="https://wa.me/62895338550439"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white font-sans font-semibold text-sm md:text-base px-6 py-3.5 rounded-xl hover:bg-[#1fba57] shadow-lg shadow-[#25D366]/20 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat Admin
              </a>
            </div>

            {/* Price highlight */}
            <div
              className={`mt-6 inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-sm border border-gray-100 transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="font-sans text-xs text-text-secondary">Mulai dari</span>
              <span className="font-serif text-2xl text-brand font-bold">Rp 169.000</span>
              <span className="font-sans text-[10px] text-white bg-sold-out rounded-full px-2 py-0.5 font-semibold">
                -30%
              </span>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === idx ? "w-8 bg-brand" : "w-2 bg-brand/30"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ===== USP BAR ===== */}
      <div className="bg-white border-y border-gray-100">
        <div className="container-main py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {promoFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-3 justify-center md:justify-start"
              >
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <p className="font-sans text-sm font-semibold text-text-primary">
                    {feature.title}
                  </p>
                  <p className="font-sans text-[11px] text-text-secondary">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

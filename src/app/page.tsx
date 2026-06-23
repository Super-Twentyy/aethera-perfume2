import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/data/mockProducts";
import type { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

const fragranceFamilies = [
  {
    name: "Floral",
    icon: "🌸",
    description: "Kelembutan bunga yang memukau",
    gradient: "from-pink-50 to-rose-50",
    textColor: "text-pink-600",
    count: 2,
  },
  {
    name: "Woody",
    icon: "🌿",
    description: "Kehangatan kayu yang maskulin",
    gradient: "from-amber-50 to-yellow-50",
    textColor: "text-amber-700",
    count: 1,
  },
  {
    name: "Fresh",
    icon: "💧",
    description: "Kesegaran yang membangkitkan semangat",
    gradient: "from-cyan-50 to-sky-50",
    textColor: "text-cyan-600",
    count: 2,
  },
  {
    name: "Oriental",
    icon: "🌙",
    description: "Kemisteriusan yang memikat",
    gradient: "from-violet-50 to-purple-50",
    textColor: "text-violet-600",
    count: 3,
  },
];

const testimonials = [
  {
    name: "Sarah A.",
    avatar: "S",
    rating: 5,
    product: "Aethera Miroir",
    text: "Wanginya tahan seharian! Banyak teman yang nanya pakai parfum apa. Worth every penny. 💖",
  },
  {
    name: "Dinda R.",
    avatar: "D",
    rating: 5,
    product: "Aethera Soleil",
    text: "Fresh banget! Cocok buat sehari-hari. Packagingnya juga premium. Pasti reorder lagi!",
  },
  {
    name: "Aldi M.",
    avatar: "A",
    rating: 5,
    product: "Aethera Boisé",
    text: "Woody-nya dapet banget, maskulin tapi ga lebay. Harga segini kualitasnya juara sih.",
  },
  {
    name: "Putri N.",
    avatar: "P",
    rating: 5,
    product: "Aethera Nuit",
    text: "Parfum ini bikin aku feel confident! Wangi orientalnya unik dan beda dari yang lain.",
  },
];

export default function HomePage() {
  const products: Product[] = mockProducts;
  const featuredProducts = products.slice(0, 6);
  const bestSellers = products.filter((p) => !p.isSoldOut).slice(0, 4);

  return (
    <>
      {/* Hero with promotions */}
      <HeroSection />

      {/* ===== Flash Sale / Promo Banner ===== */}
      <section className="py-8 md:py-10">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Promo Card 1 */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-brand/10 to-brand/5 p-6 md:p-8 group hover:shadow-lg transition-all">
              <div className="relative z-10">
                <span className="inline-block bg-sold-out text-white font-sans text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  Limited Time
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-text-primary mb-2">
                  Beli 2 Gratis 1
                </h3>
                <p className="font-sans text-sm text-text-secondary mb-4 max-w-xs">
                  Untuk ukuran 30ml. Mix &amp; match semua varian favoritmu!
                </p>
                <Link
                  href="/katalog"
                  className="inline-flex items-center font-sans text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
                >
                  Belanja Sekarang
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="absolute top-3 right-3 text-6xl md:text-7xl opacity-20">🎁</div>
            </div>

            {/* Promo Card 2 */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 p-6 md:p-8 group hover:shadow-lg transition-all">
              <div className="relative z-10">
                <span className="inline-block bg-amber-500 text-white font-sans text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                  Free Shipping
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-text-primary mb-2">
                  Gratis Ongkir Jabodetabek
                </h3>
                <p className="font-sans text-sm text-text-secondary mb-4 max-w-xs">
                  Atau pick up langsung di toko kami di Pamulang — hemat ongkir!
                </p>
                <Link
                  href="/checkout"
                  className="inline-flex items-center font-sans text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                >
                  Pesan Sekarang
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div className="absolute top-3 right-3 text-6xl md:text-7xl opacity-20">🚚</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Best Sellers ===== */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container-main">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand font-semibold">
                Terlaris 🔥
              </span>
              <h2 className="section-title mt-1">Best Sellers</h2>
              <p className="font-sans text-sm text-text-secondary mt-2">
                Produk paling diminati pelanggan kami
              </p>
            </div>
            <Link
              href="/katalog"
              className="hidden md:inline-flex items-center font-sans text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product, idx) => (
              <div key={product._id} className="relative">
                {idx === 0 && (
                  <div className="absolute top-3 left-3 z-20 bg-amber-500 text-white font-sans text-[10px] font-bold px-2.5 py-1 rounded-full">
                    #1 Best Seller
                  </div>
                )}
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/katalog" className="btn-secondary text-sm">
              Lihat Semua Produk →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== New Arrivals ===== */}
      <section id="new-arrivals" className="py-10 md:py-16">
        <div className="container-main">
          <div className="text-center mb-10">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand font-semibold">
              Discover ✨
            </span>
            <h2 className="section-title mt-2">New Arrivals</h2>
            <p className="section-subtitle mx-auto">
              Koleksi terbaru kami yang terinspirasi dari keindahan alam dan esensi kehidupan
            </p>
            <div className="w-12 h-0.5 bg-brand/30 mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/katalog" className="btn-secondary">
              Jelajahi Semua Koleksi →
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Why Aethera — Trust Badges ===== */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container-main">
          <div className="text-center mb-10">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand font-semibold">
              Why Us
            </span>
            <h2 className="section-title mt-2">Kenapa Pilih Aethera?</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: "✦",
                title: "Premium Quality",
                desc: "Bahan baku berkualitas tinggi dari parfumer profesional",
                bg: "bg-brand/5",
              },
              {
                icon: "♡",
                title: "Cruelty-Free",
                desc: "Tidak diuji pada hewan. Aman untuk kulit sensitif",
                bg: "bg-pink-50",
              },
              {
                icon: "⏱",
                title: "Tahan 8-12 Jam",
                desc: "Wangi bertahan seharian tanpa perlu semprot ulang",
                bg: "bg-amber-50",
              },
              {
                icon: "💰",
                title: "Harga Terjangkau",
                desc: "Kualitas premium mulai dari Rp 169.000 saja",
                bg: "bg-green-50",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`${item.bg} rounded-2xl p-6 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
              >
                <span className="text-3xl md:text-4xl">{item.icon}</span>
                <h3 className="font-serif text-base md:text-lg text-text-primary mt-3 mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Fragrance Families ===== */}
      <section className="py-10 md:py-16">
        <div className="container-main">
          <div className="text-center mb-10">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand font-semibold">
              Categories
            </span>
            <h2 className="section-title mt-2">Fragrance Families</h2>
            <p className="section-subtitle mx-auto">
              Temukan karakter wewangian yang paling sesuai dengan kepribadianmu
            </p>
            <div className="w-12 h-0.5 bg-brand/30 mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {fragranceFamilies.map((family) => (
              <Link
                key={family.name}
                href={`/katalog?family=${family.name}`}
                className={`group rounded-2xl bg-gradient-to-br ${family.gradient} p-6 md:p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <span className="text-4xl md:text-5xl block mb-3 group-hover:scale-110 transition-transform duration-300">
                  {family.icon}
                </span>
                <h3 className={`font-serif text-lg md:text-xl ${family.textColor} mb-1`}>
                  {family.name}
                </h3>
                <p className="font-sans text-xs text-text-secondary/70">
                  {family.count} produk
                </p>
                <p className="font-sans text-[11px] text-text-secondary/50 mt-1 hidden md:block">
                  {family.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container-main">
          <div className="text-center mb-10">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand font-semibold">
              Reviews ⭐
            </span>
            <h2 className="section-title mt-2">Apa Kata Mereka?</h2>
            <p className="section-subtitle mx-auto">
              Testimoni pelanggan yang sudah merasakan keharuman Aethera
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {testimonials.map((review) => (
              <div
                key={review.name}
                className="bg-background rounded-2xl p-5 md:p-6 hover:shadow-md transition-all"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-sans text-sm text-text-secondary leading-relaxed mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-brand/10 text-brand flex items-center justify-center font-sans text-sm font-bold">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-text-primary">
                      {review.name}
                    </p>
                    <p className="font-sans text-[11px] text-text-secondary">
                      {review.product}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Store Location Section ===== */}
      <section className="py-10 md:py-16">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-brand font-semibold">
                Visit Us 📍
              </span>
              <h2 className="section-title mt-2 mb-4">Kunjungi Toko Kami</h2>
              <p className="font-sans text-sm text-text-secondary leading-relaxed mb-6">
                Datang langsung ke toko kami untuk mencium aroma parfum secara langsung.
                Tersedia opsi <strong className="text-text-primary">Pick Up di Toko</strong> — hemat ongkir!
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="font-sans text-sm text-text-secondary">
                    Jl. Pd. Salak No.D4, RT.4/RW.6, Pd. Benda, Kec. Pamulang, Kota Tangerang Selatan, Banten 15416
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-brand flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-sans text-sm text-text-secondary">
                    Senin - Sabtu: 09:00 - 21:00 • Minggu: 10:00 - 20:00
                  </p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/place/Jl.+Pd.+Salak+No.D4"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                Buka di Google Maps →
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d37452.068043039966!2d106.68728218738222!3d-6.3347319939069955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e589b7ce9d29%3A0xe0becb8d64d391b3!2sJl.%20Pd.%20Salak%20No.D4%2C%20RT.4%2FRW.6%2C%20Pd.%20Benda%2C%20Kec.%20Pamulang%2C%20Kota%20Tangerang%20Selatan%2C%20Banten%2015416!5e0!3m2!1sid!2sid!4v1781618295941!5m2!1sid!2sid"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Aethera Perfume"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="py-10 md:py-14">
        <div className="container-main">
          <div className="relative rounded-3xl bg-gradient-to-r from-brand to-brand-dark overflow-hidden px-8 py-12 md:py-16 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
            </div>
            <div className="relative z-10">
              <h2 className="font-serif text-2xl md:text-4xl text-white mb-3">
                Masih Bingung Pilih Parfum?
              </h2>
              <p className="font-sans text-white/80 text-sm md:text-base max-w-md mx-auto mb-8">
                Konsultasikan dengan admin kami via WhatsApp. Kami bantu pilihkan wewangian yang sempurna untukmu — gratis!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/62895338550439?text=Halo%20Admin%20Aethera,%20saya%20butuh%20rekomendasi%20parfum%20yang%20cocok%20untuk%20saya."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-brand font-sans font-semibold px-8 py-3.5 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Konsultasi Gratis via WhatsApp
                </a>
                <Link
                  href="/katalog"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-sans font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-200"
                >
                  Lihat Semua Produk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

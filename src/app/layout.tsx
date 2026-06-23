import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import PromoPopup from "@/components/PromoPopup";
import { Providers } from "@/components/Providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aethera Perfume — Where Air Meets Elegance",
  description:
    "Koleksi parfum eksklusif terinspirasi dari elemen udara dan zodiak Gemini. Temukan wewangian premium yang mencerminkan sisi terbaikmu. Aethera — parfum untuk jiwa-jiwa bebas.",
  keywords: [
    "parfum",
    "perfume",
    "Aethera",
    "wewangian",
    "fragrance",
    "parfum premium",
    "parfum Indonesia",
  ],
  openGraph: {
    title: "Aethera Perfume — Where Air Meets Elegance",
    description:
      "Koleksi parfum eksklusif terinspirasi dari elemen udara dan zodiak Gemini.",
    url: "https://aethera.my.id",
    siteName: "Aethera Perfume",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aethera Perfume — Where Air Meets Elegance",
    description:
      "Koleksi parfum eksklusif terinspirasi dari elemen udara dan zodiak Gemini.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="bg-background text-text-primary font-sans antialiased">
        <Providers>
          <Toast />
          <PromoPopup />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

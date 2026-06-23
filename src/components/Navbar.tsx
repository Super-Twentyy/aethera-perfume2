"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "./CartDrawer";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const totalItems = useCartStore((s) => s.getTotalItems());

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isCartOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/katalog", label: "Katalog" },
  ];

  return (
    <>
      {/* Top announcement bar */}
{/* Top announcement bar */}
<div className="bg-brand text-white py-2 font-sans text-[11px] md:text-xs font-medium tracking-wide z-[60] relative overflow-hidden whitespace-nowrap">
  <div 
    className="inline-flex gap-16 pr-16 min-w-full animate-[marquee-smooth_30s_linear_infinite]"
    style={{ animation: 'marquee-smooth 30s linear infinite' }}
  >
    {[1, 2, 3].map((i) => (
      <span key={i} className="flex-shrink-0" aria-hidden={i > 1 ? "true" : undefined}>
        🎁 <span className="font-semibold">GRAND OPENING SALE!</span> Gratis ongkir untuk pembelian pertama • Diskon hingga 30% semua produk
      </span>
    ))}
  </div>

  <style jsx global>{`
    @keyframes marquee-smooth {
      0% { transform: translateX(0); }
      100% { transform: translateX(-33.33%); }
    }
  `}</style>
</div>

      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-lg shadow-md"
            : "bg-background border-b border-gray-100"
        )}
      >
        <nav className="container-main flex items-center justify-between h-14 md:h-16">
          {/* Brand Name (text only, no logo) */}
          <Link href="/" className="group">
            <span className="font-serif text-2xl md:text-3xl text-brand font-bold tracking-tight group-hover:text-brand-dark transition-colors">
              Aethera
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium text-text-secondary hover:text-brand transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            
            {/* Admin Link */}
            {session?.user && (session.user as any).role === "ADMIN" && (
              <Link
                href="/admin"
                className="font-sans text-sm font-medium text-brand hover:text-brand-dark transition-colors"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Auth Button */}
            <div className="hidden md:block">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="font-sans text-sm font-medium text-text-secondary hover:text-red-500 transition-colors px-3 py-2"
                >
                  Keluar
                </button>
              ) : (
                <Link
                  href="/login"
                  className="font-sans text-sm font-medium text-text-secondary hover:text-brand transition-colors px-3 py-2"
                >
                  Masuk
                </Link>
              )}
            </div>
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Shopping Cart"
              id="cart-button"
            >
              <svg
                className="w-6 h-6 text-text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {mounted && totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand text-white text-[10px] font-sans font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse-soft">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Toggle Menu"
              id="menu-toggle"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={cn(
                    "w-full h-0.5 bg-text-primary rounded-full transition-all duration-300 origin-left",
                    isMenuOpen && "rotate-45 translate-x-[1px] -translate-y-[1px]"
                  )}
                />
                <span
                  className={cn(
                    "w-full h-0.5 bg-text-primary rounded-full transition-all duration-300",
                    isMenuOpen && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "w-full h-0.5 bg-text-primary rounded-full transition-all duration-300 origin-left",
                    isMenuOpen && "-rotate-45 translate-x-[1px] translate-y-[1px]"
                  )}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 bg-background/95 backdrop-blur-lg",
            isMenuOpen ? "max-h-80 border-b border-gray-100" : "max-h-0"
          )}
        >
          <div className="container-main py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="font-sans text-base font-medium text-text-primary hover:text-brand py-3 px-4 rounded-xl hover:bg-brand/5 transition-all"
              >
                {link.label}
              </Link>
            ))}

            {session?.user && (session.user as any).role === "ADMIN" && (
              <Link
                href="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="font-sans text-base font-medium text-brand py-3 px-4 rounded-xl hover:bg-brand/5 transition-all"
              >
                Admin
              </Link>
            )}

            {session ? (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  signOut();
                }}
                className="text-left font-sans text-base font-medium text-red-500 hover:text-red-600 py-3 px-4 rounded-xl hover:bg-red-50 transition-all"
              >
                Keluar
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="font-sans text-base font-medium text-text-primary hover:text-brand py-3 px-4 rounded-xl hover:bg-brand/5 transition-all"
              >
                Masuk
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="overlay md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}

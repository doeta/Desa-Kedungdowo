"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/profil", label: "Profil" },
  { href: "/perangkat", label: "Perangkat Desa" },
  { href: "/umkm", label: "UMKM" },
  { href: "/berita", label: "Berita" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isLogin = pathname === "/login";
  const isAdmin = pathname.startsWith("/admin");
  const isHome = pathname === "/";

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (isLogin || isAdmin) return null;

  // On non-home pages, always show solid bg
  const showSolid = scrolled || !isHome;

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-in-out ${
        showSolid
          ? "bg-surface/95 border-outline-variant/20 shadow-sm backdrop-blur-md"
          : "bg-surface/0 border-outline-variant/0"
      }`}
    >
      <div className="w-full flex justify-between items-center px-4 md:px-8 h-20">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className={`font-serif text-xl font-bold transition-colors duration-300 ${
            showSolid ? "text-primary" : "text-white"
          }`}
        >
          Desa Kedungdowo
        </Link>

        {/* Desktop Nav Links (Centered) */}
        <div className="hidden md:flex gap-1 items-center absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  showSolid
                    ? isActive
                      ? "text-primary bg-primary/10"
                      : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                    : isActive
                      ? "text-white bg-white/15"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Section (Toggle on Mobile) */}
        <div className="flex items-center">
          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              showSolid
                ? "text-on-surface hover:bg-surface-container"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-surface/95 backdrop-blur-md border-t border-outline-variant/20 px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

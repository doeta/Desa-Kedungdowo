"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getVisitorStats } from "./footer-actions";

export default function Footer() {
  const pathname = usePathname();
  const isLogin = pathname === "/login";
  const isAdmin = pathname.startsWith("/admin");

  const [stats, setStats] = useState({
    today: "0",
    yesterday: "0",
    month: "0",
    year: "0",
    total: "0",
  });

  useEffect(() => {
    if (isLogin || isAdmin) return;

    getVisitorStats().then((data) => {
      setStats(data);
    });
  }, [pathname, isLogin, isAdmin]);

  if (isLogin || isAdmin) return null;

  return (
    <footer
      id="kontak"
      className="bg-[#111612] border-t border-white/5 text-white/80"
    >
      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-bold text-[#a3f69c] mb-4">
              Desa Kedungdowo
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Membangun desa tangguh melalui inovasi peternakan korporasi,
              pemberdayaan UMKM syariah, dan semangat gotong royong.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span
                className="material-symbols-outlined text-[#a3f69c] text-lg"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                location_on
              </span>
              <span>Kec. Andong, Kab. Boyolali, Jawa Tengah 57384</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Navigasi
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { href: "/", label: "Beranda" },
                { href: "/profil", label: "Profil Desa" },
                { href: "/perangkat", label: "Perangkat Desa" },
                { href: "/umkm", label: "Direktori UMKM" },
                { href: "/berita", label: "Berita Desa" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/60 hover:text-[#a3f69c] transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Visitor Statistics */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Statistik Pengunjung
            </h4>
            <div className="flex flex-col gap-2.5 text-sm text-white/60">
              <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">today</span> Hari Ini
                </span>
                <span className="font-semibold text-white">{stats.today}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">history</span> Kemarin
                </span>
                <span className="font-semibold text-white">{stats.yesterday}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">calendar_month</span> Bulan Ini
                </span>
                <span className="font-semibold text-white">{stats.month}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">date_range</span> Tahun Ini
                </span>
                <span className="font-semibold text-white">{stats.year}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">group</span> Semua Waktu
                </span>
                <span className="font-semibold text-white">{stats.total}</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Kontak
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-[#a3f69c] transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Desa (Pak Asep)
              </a>
              <a
                href="mailto:desa.kedungdowo@gmail.com"
                className="flex items-center gap-2 text-white/60 hover:text-[#a3f69c] transition-colors text-sm"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
                desa.kedungdowo@gmail.com
              </a>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <span className="material-symbols-outlined text-lg">
                  schedule
                </span>
                Sen - Jum, 08:00 - 15:00 WIB
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} Pemerintah Desa Kedungdowo. 
          </p>
            <p className="text-white text-sm">
            Made With ❤️ by Kelompok 4 KKN UNDIP TIM II 2026
          </p>
        </div>
      </div>
    </footer>
  );
}

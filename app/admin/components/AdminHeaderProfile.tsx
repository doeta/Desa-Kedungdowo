"use client";

import { useState, useEffect, useRef } from "react";
import Icon from "../../components/Icon";
import Link from "next/link";

export default function AdminHeaderProfile({ logoutAction }: { logoutAction: () => Promise<void> }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      await logoutAction();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20 shadow-sm ml-2 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-primary/40 transition-all focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img
          alt="Admin Avatar"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWK1vZmFyYts8dzgeLqBkSaek8Koy54V8gd1gaDWaRMy2SrrlQQ2fc_JuhokK7c2Ujf47_qOsxfFqgbd9geG_ijzTegBKBNhs7rJG49LG9GzIaS87w04HPcghgUE6p3o0SdI7Twuewfn0Q83zqzC_Aqntn5IX9FFjP-fAvQP30r9Ao2uSLSyT1MfD2bJjVHWtfL4N_618gYWvLorZ2zC3YRqj41q8Hjg9t-4oNlZ0tMLz-LM_8uWnOk26zeM0niDE4A7m6iuVkzDtB"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-outline-variant/20 rounded-2xl shadow-xl py-3 z-50 animate-fadeIn">
          {/* User Profile Header */}
          <div className="px-4 py-2 border-b border-outline-variant/20 mb-2">
            <p className="text-sm font-bold text-on-surface">Admin Desa</p>
            <p className="text-xs text-on-surface-variant/70 font-medium truncate">admin@kedungdowo.desa.id</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-0.5 px-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors"
            >
              <Icon name="arrow_back" className="text-lg" />
              <span>Ke Web Publik</span>
            </Link>
          </div>

          <div className="border-t border-outline-variant/10 my-2" />

          {/* Logout Action */}
          <div className="px-2">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-error hover:bg-error/5 transition-colors text-left"
            >
              <Icon name="logout" className="text-lg" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

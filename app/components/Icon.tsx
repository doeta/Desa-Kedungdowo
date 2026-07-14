"use client";

import { Icon as IconifyIcon } from "@iconify/react";

export default function Icon({
  name,
  filled,
  className,
}: {
  name: string;
  filled?: boolean;
  className?: string;
}) {
  // Jika nama mengandung titik dua (misal: "mdi:home", "lucide:search"), 
  // maka ini adalah format Iconify. Kita render menggunakan komponen Iconify.
  if (name.includes(":")) {
    return (
      <IconifyIcon 
        icon={name} 
        className={className} 
      />
    );
  }

  // Jika tidak, berarti ini adalah format lama (material-symbols dari Google Font).
  // Kita kembalikan ke render aslinya agar 100% aman dan tidak ada icon yang hilang.
  return (
    <span
      className={`material-symbols-outlined ${className ?? ""}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}

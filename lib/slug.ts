export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Hapus karakter non-alphanumeric kecuali spasi dan strip
    .replace(/[\s_-]+/g, "-") // Ubah spasi dan underscore menjadi strip
    .replace(/^-+|-+$/g, ""); // Bersihkan strip di awal dan akhir teks
}

export function getBeritaUrl(judul: string, id: number): string {
  return `/berita/${slugify(judul)}-${id}`;
}

export function extractIdFromSlug(slug: string): number | null {
  if (/^\d+$/.test(slug)) {
    return parseInt(slug, 10);
  }
  const match = slug.match(/-(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}

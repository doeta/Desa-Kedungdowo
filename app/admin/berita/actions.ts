"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBerita(data: { judul: string; kategori: string; konten: string; fotoUrl?: string }) {
  await prisma.artikel.create({
    data: {
      judul: data.judul,
      kategori: data.kategori,
      konten: data.konten,
      fotoUrl: data.fotoUrl || null,
    },
  });
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
}

export async function updateBerita(id: number, data: { judul: string; kategori: string; konten: string; fotoUrl?: string }) {
  await prisma.artikel.update({
    where: { id },
    data: {
      judul: data.judul,
      kategori: data.kategori,
      konten: data.konten,
      fotoUrl: data.fotoUrl || null,
    },
  });
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
}

export async function deleteBerita(id: number) {
  await prisma.artikel.delete({
    where: { id },
  });
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
}

export async function toggleSorotanUtama(id: number, currentStatus: boolean) {
  // Setel semua isSorotan ke false terlebih dahulu
  await prisma.artikel.updateMany({
    data: { isSorotan: false }
  });
  
  // Jika sebelumnya bukan sorotan, jadikan ini sorotan utama
  if (!currentStatus) {
    await prisma.artikel.update({
      where: { id },
      data: { isSorotan: true }
    });
  }
  
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  revalidatePath("/");
}

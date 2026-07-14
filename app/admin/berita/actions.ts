"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type BlokInput = {
  tipe: string;
  konten: string;
  caption?: string;
  urutan: number;
};

export async function createBerita(data: { 
  judul: string; 
  kategori: string; 
  konten: string; 
  fotoUrl?: string;
  bloks?: BlokInput[];
}) {
  await prisma.artikel.create({
    data: {
      judul: data.judul,
      kategori: data.kategori,
      konten: data.konten,
      fotoUrl: data.fotoUrl || null,
      bloks: data.bloks && data.bloks.length > 0 ? {
        create: data.bloks.map((b) => ({
          tipe: b.tipe,
          konten: b.konten,
          caption: b.caption || null,
          urutan: b.urutan,
        })),
      } : undefined,
    },
  });
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
}

export async function updateBerita(id: number, data: { 
  judul: string; 
  kategori: string; 
  konten: string; 
  fotoUrl?: string;
  bloks?: BlokInput[];
}) {
  // Update artikel fields
  await prisma.artikel.update({
    where: { id },
    data: {
      judul: data.judul,
      kategori: data.kategori,
      konten: data.konten,
      fotoUrl: data.fotoUrl || null,
    },
  });

  // Delete + re-create bloks (simpler than tracking individual changes)
  if (data.bloks) {
    await prisma.artikelBlok.deleteMany({
      where: { artikelId: id },
    });

    if (data.bloks.length > 0) {
      await prisma.artikelBlok.createMany({
        data: data.bloks.map((b) => ({
          artikelId: id,
          tipe: b.tipe,
          konten: b.konten,
          caption: b.caption || null,
          urutan: b.urutan,
        })),
      });
    }
  }

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

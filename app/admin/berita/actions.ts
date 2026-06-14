"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBerita(data: { judul: string; kategori: string; konten: string }) {
  await prisma.artikel.create({
    data: {
      judul: data.judul,
      kategori: data.kategori,
      konten: data.konten,
    },
  });
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
}

export async function updateBerita(id: number, data: { judul: string; kategori: string; konten: string }) {
  await prisma.artikel.update({
    where: { id },
    data: {
      judul: data.judul,
      kategori: data.kategori,
      konten: data.konten,
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

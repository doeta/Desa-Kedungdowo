"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createUmkm(data: any) {
  await prisma.produkUMKM.create({
    data: {
      namaProduk: data.namaProduk,
      deskripsi: data.deskripsi,
      namaPemilik: data.namaPemilik,
      kontakWa: data.kontakWa,
      fotoUrl: data.fotoUrl,
      kategori: data.kategori,
      kisaranHarga: data.kisaranHarga,
    },
  });
  revalidatePath("/admin/umkm");
  revalidatePath("/umkm");
}

export async function updateUmkm(id: number, data: any) {
  await prisma.produkUMKM.update({
    where: { id },
    data: {
      namaProduk: data.namaProduk,
      deskripsi: data.deskripsi,
      namaPemilik: data.namaPemilik,
      kontakWa: data.kontakWa,
      fotoUrl: data.fotoUrl,
      kategori: data.kategori,
      kisaranHarga: data.kisaranHarga,
    },
  });
  revalidatePath("/admin/umkm");
  revalidatePath("/umkm");
}

export async function deleteUmkm(id: number) {
  await prisma.produkUMKM.delete({
    where: { id },
  });
  revalidatePath("/admin/umkm");
  revalidatePath("/umkm");
}

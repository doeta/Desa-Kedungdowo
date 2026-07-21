"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateStatusLayanan(id: string, status: string) {
  await prisma.layananPublik.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/layanan");
  revalidatePath("/layanan");
}

export async function updateTanggapanLayanan(id: string, tanggapan: string) {
  await prisma.layananPublik.update({
    where: { id },
    data: { 
      tanggapan,
      status: "Sudah Direspon" // Otomatis ubah status saat dijawab
    },
  });
  revalidatePath("/admin/layanan");
  revalidatePath("/layanan");
}

export async function deleteLayanan(id: string) {
  await prisma.layananPublik.delete({
    where: { id },
  });
  revalidatePath("/admin/layanan");
  revalidatePath("/layanan");
}

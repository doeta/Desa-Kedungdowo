"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPerangkat(data: { nama: string; jabatan: string; fotoUrl: string }) {
  await prisma.perangkatDesa.create({
    data: {
      nama: data.nama,
      jabatan: data.jabatan,
      fotoUrl: data.fotoUrl,
    },
  });
  revalidatePath("/admin/perangkat");
  revalidatePath("/perangkat");
}

export async function updatePerangkat(id: number, data: { nama: string; jabatan: string; fotoUrl: string }) {
  await prisma.perangkatDesa.update({
    where: { id },
    data: {
      nama: data.nama,
      jabatan: data.jabatan,
      fotoUrl: data.fotoUrl,
    },
  });
  revalidatePath("/admin/perangkat");
  revalidatePath("/perangkat");
}

export async function deletePerangkat(id: number) {
  await prisma.perangkatDesa.delete({
    where: { id },
  });
  revalidatePath("/admin/perangkat");
  revalidatePath("/perangkat");
}

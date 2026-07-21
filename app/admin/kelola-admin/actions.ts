"use server";

import { requireSuperadmin } from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Membuat admin baru. Hanya superadmin yang bisa.
 */
export async function createAdmin(formData: FormData) {
  await requireSuperadmin();

  const username = (formData.get("username") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const namaLengkap = (formData.get("namaLengkap") as string)?.trim() || "";
  const role = (formData.get("role") as string) || "admin";

  if (!username || !password) {
    return { error: "Username dan password wajib diisi." };
  }

  if (username.length < 3) {
    return { error: "Username minimal 3 karakter." };
  }

  if (password.length < 6) {
    return { error: "Password minimal 6 karakter." };
  }

  if (!["admin", "superadmin"].includes(role)) {
    return { error: "Role tidak valid." };
  }

  // Cek duplikat username
  const existing = await prisma.adminUser.findUnique({
    where: { username },
  });

  if (existing) {
    return { error: `Username "${username}" sudah digunakan.` };
  }

  const { hash, salt } = await hashPassword(password);

  await prisma.adminUser.create({
    data: {
      username,
      passwordHash: hash,
      salt,
      role,
      namaLengkap,
    },
  });

  revalidatePath("/admin/kelola-admin");
  return { success: true, message: `Admin "${username}" berhasil ditambahkan.` };
}

/**
 * Ubah password admin. Hanya superadmin yang bisa.
 */
export async function updatePassword(formData: FormData) {
  const session = await requireSuperadmin();

  const userId = parseInt(formData.get("userId") as string);
  const newPassword = formData.get("newPassword") as string;

  if (!userId || !newPassword) {
    return { error: "Data tidak lengkap." };
  }

  if (newPassword.length < 6) {
    return { error: "Password baru minimal 6 karakter." };
  }

  const user = await prisma.adminUser.findUnique({ where: { id: userId } });
  if (!user) {
    return { error: "User tidak ditemukan." };
  }

  const { hash, salt } = await hashPassword(newPassword);

  await prisma.adminUser.update({
    where: { id: userId },
    data: { passwordHash: hash, salt },
  });

  revalidatePath("/admin/kelola-admin");
  return { success: true, message: `Password untuk "${user.username}" berhasil diubah.` };
}

/**
 * Ubah role admin. Hanya superadmin yang bisa.
 */
export async function updateRole(formData: FormData) {
  const session = await requireSuperadmin();

  const userId = parseInt(formData.get("userId") as string);
  const newRole = formData.get("role") as string;

  if (!userId || !newRole) {
    return { error: "Data tidak lengkap." };
  }

  if (!["admin", "superadmin"].includes(newRole)) {
    return { error: "Role tidak valid." };
  }

  // Tidak bisa mengubah role diri sendiri
  if (userId === session.userId) {
    return { error: "Anda tidak bisa mengubah role Anda sendiri." };
  }

  const user = await prisma.adminUser.findUnique({ where: { id: userId } });
  if (!user) {
    return { error: "User tidak ditemukan." };
  }

  await prisma.adminUser.update({
    where: { id: userId },
    data: { role: newRole },
  });

  revalidatePath("/admin/kelola-admin");
  return { success: true, message: `Role "${user.username}" diubah menjadi ${newRole}.` };
}

/**
 * Hapus admin. Hanya superadmin yang bisa. Tidak bisa menghapus diri sendiri.
 */
export async function deleteAdmin(formData: FormData) {
  const session = await requireSuperadmin();

  const userId = parseInt(formData.get("userId") as string);

  if (!userId) {
    return { error: "Data tidak lengkap." };
  }

  // Tidak bisa menghapus diri sendiri
  if (userId === session.userId) {
    return { error: "Anda tidak bisa menghapus akun Anda sendiri." };
  }

  const user = await prisma.adminUser.findUnique({ where: { id: userId } });
  if (!user) {
    return { error: "User tidak ditemukan." };
  }

  await prisma.adminUser.delete({ where: { id: userId } });

  revalidatePath("/admin/kelola-admin");
  return { success: true, message: `Admin "${user.username}" berhasil dihapus.` };
}

"use server";

import { createSession } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function login(prevState: unknown, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username dan password wajib diisi." };
  }

  // Cari user di database
  const user = await prisma.adminUser.findUnique({
    where: { username },
  });

  if (!user) {
    return { error: "Username atau password salah." };
  }

  // Verifikasi password
  const isValid = await verifyPassword(password, user.passwordHash, user.salt);

  if (!isValid) {
    return { error: "Username atau password salah." };
  }

  // Buat session dengan data user
  await createSession({
    id: user.id,
    username: user.username,
    role: user.role,
    namaLengkap: user.namaLengkap,
  });

  redirect("/admin");
}

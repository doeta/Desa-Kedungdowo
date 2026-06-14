"use server";

import { createSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return { error: "Username dan password wajib diisi." };
  }

  if (username === validUsername && password === validPassword) {
    await createSession(username);
    redirect("/admin");
  } else {
    return { error: "Username atau password salah." };
  }
}

/**
 * Seed script untuk membuat akun superadmin pertama.
 * Jalankan: npx ts-node prisma/seed-admin.ts
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// --- Password Hashing (duplikasi karena ts-node tidak resolve alias @/) ---
async function sha256(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function generateSalt(): string {
  const array = new Uint8Array(16);
  globalThis.crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
  const salt = generateSalt();
  let hash = await sha256(salt + password);
  for (let i = 0; i < 2; i++) {
    hash = await sha256(salt + hash);
  }
  return { hash, salt };
}
// --- End Password Hashing ---

async function main() {
  // Load env
  const dotenv = await import("dotenv");
  dotenv.config();

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log("🌱 Seeding superadmin...\n");

  // Cek apakah sudah ada superadmin
  const existingSuperadmin = await prisma.adminUser.findFirst({
    where: { role: "superadmin" },
  });

  if (existingSuperadmin) {
    console.log(`✅ Superadmin sudah ada: @${existingSuperadmin.username}`);
    console.log("   Seed dibatalkan untuk menghindari duplikasi.\n");
    await prisma.$disconnect();
    await pool.end();
    return;
  }

  // Buat superadmin
  const { hash, salt } = await hashPassword("superadmin123");

  const superadmin = await prisma.adminUser.create({
    data: {
      username: "superadmin",
      passwordHash: hash,
      salt,
      role: "superadmin",
      namaLengkap: "Super Administrator",
    },
  });

  console.log("✅ Superadmin berhasil dibuat!");
  console.log(`   Username : superadmin`);
  console.log(`   Password : superadmin123`);
  console.log(`   Role     : ${superadmin.role}`);
  console.log(`\n⚠️  PENTING: Segera ubah password setelah login pertama!\n`);

  // Buat juga admin default (opsional, dari env lama)
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminUsername && adminPassword) {
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { username: adminUsername },
    });

    if (!existingAdmin) {
      const adminCreds = await hashPassword(adminPassword);
      await prisma.adminUser.create({
        data: {
          username: adminUsername,
          passwordHash: adminCreds.hash,
          salt: adminCreds.salt,
          role: "admin",
          namaLengkap: "Admin Desa",
        },
      });
      console.log(`✅ Admin dari .env juga di-migrate: @${adminUsername}`);
    }
  }

  await prisma.$disconnect();
  await pool.end();
  console.log("\n🎉 Seeding selesai!");
}

main().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});

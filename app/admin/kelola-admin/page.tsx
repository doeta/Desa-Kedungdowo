import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import KelolaAdminClient from "./KelolaAdminClient";

export const metadata = { title: "Kelola Admin | Desa Kedungdowo" };
export const dynamic = "force-dynamic";

export default async function KelolaAdminPage() {
  const session = await getSession();

  // Proteksi: hanya superadmin yang bisa akses halaman ini
  if (!session || session.role !== "superadmin") {
    redirect("/admin");
  }

  const admins = await prisma.adminUser.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      username: true,
      role: true,
      namaLengkap: true,
      createdAt: true,
    },
  });

  // Serialize dates for client component
  const serializedAdmins = admins.map((admin) => ({
    ...admin,
    createdAt: admin.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <KelolaAdminClient
        admins={serializedAdmins}
        currentUserId={session.userId}
      />
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import UmkmCatalogClient from "../components/UmkmCatalogClient";

export const metadata = { title: "Direktori UMKM Desa - Desa Kedungdowo" };

export const revalidate = 0; // Disable static rendering to support dynamic updates

export default async function UmkmPage() {
  const umkmList = await prisma.produkUMKM.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="relative min-h-screen bg-surface py-20 md:py-32">
      {/* Ambient Background Pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#707a6c_1px,transparent_1px),radial-gradient(#707a6c_1px,transparent_1px)] bg-[size:40px_40px] bg-[position:0_0,20px_20px] opacity-[0.03] pointer-events-none" />

      <main className="relative z-10 w-full">
        <UmkmCatalogClient initialProducts={umkmList} />
      </main>
    </div>
  );
}

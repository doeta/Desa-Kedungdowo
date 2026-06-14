import { prisma } from "@/lib/prisma";
import Icon from "../components/Icon";

export default async function AdminDashboard() {
  const countBerita = await prisma.artikel.count();
  const countUmkm = await prisma.produkUMKM.count();
  const countPerangkat = await prisma.perangkatDesa.count();

  const stats = [
    { label: "Berita & Kegiatan", value: countBerita, icon: "newspaper", color: "bg-primary text-on-primary", shadow: "shadow-primary/20" },
    { label: "Produk UMKM", value: countUmkm, icon: "storefront", color: "bg-secondary text-on-secondary", shadow: "shadow-secondary/20" },
    { label: "Perangkat Desa", value: countPerangkat, icon: "badge", color: "bg-tertiary text-on-tertiary", shadow: "shadow-tertiary/20" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-on-background mb-2">Dashboard</h1>
      <p className="text-on-surface-variant text-sm mb-8">Selamat datang di panel admin website Desa Kedungdowo.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20 flex items-center gap-5">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${stat.color} ${stat.shadow}`}>
              <Icon name={stat.icon} filled className="text-2xl" />
            </div>
            <div>
              <p className="text-sm font-semibold text-on-surface-variant">{stat.label}</p>
              <p className="text-3xl font-bold text-on-surface mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <h2 className="font-serif text-xl font-bold text-on-background mb-4">Panduan Penggunaan</h2>
        <div className="space-y-4 text-sm text-on-surface-variant relative z-10 max-w-2xl leading-relaxed">
          <p>
            Gunakan menu di sidebar kiri untuk mengelola konten website:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Berita & Kegiatan:</strong> Untuk mempublikasikan pengumuman atau dokumentasi kegiatan warga.</li>
            <li><strong>UMKM Syariah:</strong> Untuk mendaftarkan produk usaha warga desa agar tampil di halaman utama.</li>
            <li><strong>Perangkat Desa:</strong> Untuk memperbarui struktur organisasi dan sambutan pemerintahan desa.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

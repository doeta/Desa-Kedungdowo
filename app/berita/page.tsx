import { prisma } from "@/lib/prisma";
import Icon from "../components/Icon";
import Link from "next/link";
import { getBeritaUrl } from "@/lib/slug";
import AnimateIn from "../components/AnimateIn";
import PengumumanWidgetClient from "../components/PengumumanWidgetClient";

export const metadata = { title: "Berita & Informasi Desa - Desa Kedungdowo" };

export const revalidate = 0; // Disable static rendering for dynamic updates

const getChipColor = (kategori: string) => {
  const kat = kategori.toLowerCase();
  if (kat.includes("pembangunan") || kat.includes("infrastruktur")) return "bg-surface-container text-on-surface";
  if (kat.includes("ekonomi") || kat.includes("umkm")) return "bg-secondary-container text-on-secondary-container";
  if (kat.includes("pertanian") || kat.includes("peternakan")) return "bg-[#e9f2ff] text-[#004a75]";
  if (kat.includes("kesehatan")) return "bg-[#ffdad6] text-[#93000a]";
  if (kat.includes("pendidikan")) return "bg-tertiary-container text-on-tertiary-container";
  return "bg-primary text-on-primary";
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function BeritaPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const itemsPerPage = 6;
  const skip = (page - 1) * itemsPerPage;
  // 1. Cari berita yang ditandai sebagai sorotan utama
  let featured = await prisma.artikel.findFirst({
    where: {
      isSorotan: true,
      kategori: { not: "Pengumuman" }
    }
  });

  // 2. Jika tidak ada yang ditandai, gunakan berita terbaru sebagai fallback
  if (!featured) {
    featured = await prisma.artikel.findFirst({
      where: {
        kategori: { not: "Pengumuman" }
      },
      orderBy: { createdAt: "desc" }
    });
  }

  // 3. Ambil sisa berita lainnya dengan mengecualikan berita sorotan utama (dengan paginasi)
  const totalOthersCount = await prisma.artikel.count({
    where: {
      kategori: { not: "Pengumuman" },
      id: featured ? { not: featured.id } : undefined
    }
  });

  const totalPages = Math.ceil(totalOthersCount / itemsPerPage);

  const others = await prisma.artikel.findMany({
    where: {
      kategori: { not: "Pengumuman" },
      id: featured ? { not: featured.id } : undefined
    },
    orderBy: { createdAt: "desc" },
    skip: skip,
    take: itemsPerPage
  });

  const pengumumanList = await prisma.artikel.findMany({
    where: {
      kategori: "Pengumuman"
    },
    orderBy: { createdAt: "desc" },
    take: 3
  });

  const umkmCount = await prisma.produkUMKM.count();

  return (
    <div className="relative min-h-screen bg-surface">
      {/* Ambient Background Pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#707a6c_1px,transparent_1px),radial-gradient(#707a6c_1px,transparent_1px)] bg-[size:40px_40px] bg-[position:0_0,20px_20px] opacity-[0.03] pointer-events-none" />
      
      <main className="relative z-10 flex-grow w-full max-w-[1200px] mx-auto px-6 pt-8 pb-20 md:pb-32">
        {/* Page Header */}
        <div className="mb-12 mt-12 md:mt-20">
          <AnimateIn delay={0.1} direction="up">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-on-surface mb-4 tracking-tight">
              Berita &amp; Informasi <span className="italic font-light text-primary">Desa</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2} direction="up">
            <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Pusat informasi resmi mengenai kegiatan, pembangunan, dan pengumuman terkini di lingkungan Desa Kedungdowo.
            </p>
          </AnimateIn>
        </div>

        {/* Row 1: Featured Story & Pengumuman Penting (Flexible height on desktop, max-height matching Featured) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Featured Story (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            {featured && (
              <section className="h-full flex flex-col">
                <AnimateIn delay={0.3} direction="up" className="h-full flex flex-col">
                  <div className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-[0_8px_24px_rgba(121,85,72,0.08)] transition-all duration-300 flex flex-col h-full">
                    <div className="relative h-64 md:h-96 w-full overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center shrink-0">
                      {featured.fotoUrl ? (
                        <img src={featured.fotoUrl} alt={featured.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <Icon name="newspaper" filled className="text-9xl text-primary/20 group-hover:scale-105 transition-transform duration-500" />
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-on-primary text-sm font-semibold px-3 py-1 rounded-full shadow-sm">Sorotan Utama</span>
                      </div>
                    </div>
                    <div className="p-6 md:p-8 border-t-4 border-primary flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium mb-3">
                          <Icon name="calendar_today" className="text-base" />
                          <span>{new Date(featured.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                          <span className="mx-2">•</span>
                          <Icon name="person" className="text-base" />
                          <span>Admin Desa</span>
                        </div>
                        <h2 className="font-serif text-3xl font-bold text-on-surface mb-4 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                          {featured.judul}
                        </h2>
                        <p className="text-base text-on-surface-variant mb-6 line-clamp-3 leading-relaxed">
                          {featured.konten}
                        </p>
                      </div>
                      <Link href={getBeritaUrl(featured.judul, featured.id)} className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:text-primary-container transition-colors mt-auto">
                        Baca Selengkapnya <Icon name="arrow_forward" className="text-lg" />
                      </Link>
                    </div>
                  </div>
                </AnimateIn>
              </section>
            )}
          </div>

          {/* Right Column: Pengumuman Penting (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col">
            <AnimateIn delay={0.2} direction="left" className="w-full flex flex-col">
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-6 relative overflow-hidden flex flex-col max-h-[660px]">
                <div className="flex items-center gap-2 mb-6 shrink-0">
                  <Icon name="campaign" filled className="text-secondary text-2xl" />
                  <h3 className="font-serif text-2xl font-semibold text-on-surface">Pengumuman Penting</h3>
                </div>
                
                {/* Interactive client announcements list and modal */}
                <PengumumanWidgetClient pengumumanList={pengumumanList} />
              </div>
            </AnimateIn>
          </aside>
        </div>

        {/* Section Divider (Batik Motif) */}
        {featured && others.length > 0 && (
          <div className="w-full flex items-center justify-center opacity-20 my-8">
            <div className="h-px bg-outline w-1/3"></div>
            <Icon name="eco" className="mx-4 text-outline" />
            <div className="h-px bg-outline w-1/3"></div>
          </div>
        )}

        {/* Row 2: News Feed Grid (Full width, showing 3 columns across) */}
        <div className="w-full">
          <section>
            <AnimateIn delay={0.1} direction="up">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl font-semibold text-on-surface">Berita Terkini</h3>
              </div>
            </AnimateIn>
            
            {others.length === 0 && !featured ? (
              <AnimateIn delay={0.2} direction="up">
                <div className="text-center py-16 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm">
                  <Icon name="article" className="text-5xl text-outline-variant mb-4" />
                  <p className="text-on-surface-variant font-medium">Belum ada berita yang dipublikasikan.</p>
                </div>
              </AnimateIn>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {others.map((berita, idx) => (
                  <AnimateIn key={berita.id} delay={0.1 * (idx % 3)} direction="up" className="h-full">
                    <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-[0_4px_16px_rgba(121,85,72,0.05)] transition-all duration-300 flex flex-col h-full group">
                      <div className="h-48 w-full overflow-hidden relative bg-gradient-to-br from-surface-container to-surface-variant flex items-center justify-center">
                        {berita.fotoUrl ? (
                          <img src={berita.fotoUrl} alt={berita.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <Icon name="image" className="text-5xl text-outline/30 group-hover:scale-110 transition-transform duration-500" />
                        )}
                        <div className="absolute top-3 left-3">
                          <span className={`${getChipColor(berita.kategori)} text-xs font-medium px-2 py-1 rounded shadow-sm`}>
                            {berita.kategori}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="text-xs font-medium text-on-surface-variant mb-2">
                          {new Date(berita.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                        </div>
                        <Link href={getBeritaUrl(berita.judul, berita.id)} className="text-sm font-semibold text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {berita.judul}
                        </Link>
                        <p className="text-sm text-on-surface-variant mb-4 line-clamp-2 flex-grow leading-relaxed">
                          {berita.konten}
                        </p>
                      </div>
                    </div>
                  </AnimateIn>
                ))}
              </div>
            )}
            
            {totalPages > 1 && (
              <div className="mt-12 flex flex-wrap justify-center items-center gap-2 border-t border-outline-variant/30 pt-6">
                {/* Tombol Sebelumnya */}
                {page > 1 ? (
                  <Link
                    href={`/berita?page=${page - 1}`}
                    scroll={false}
                    className="inline-flex items-center justify-center gap-1 min-w-[40px] h-10 px-3 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all text-sm font-semibold"
                  >
                    <Icon name="chevron_left" className="text-lg" />
                    Sebelumnya
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-1 min-w-[40px] h-10 px-3 rounded-lg border border-outline-variant/30 text-on-surface-variant/30 cursor-not-allowed text-sm font-semibold"
                  >
                    <Icon name="chevron_left" className="text-lg" />
                    Sebelumnya
                  </button>
                )}

                {/* Angka Halaman */}
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  const isCurrent = pageNum === page;
                  return (
                    <Link
                      key={pageNum}
                      href={`/berita?page=${pageNum}`}
                      scroll={false}
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
                        isCurrent
                          ? "bg-primary text-on-primary shadow-sm font-bold"
                          : "border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-primary"
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}

                {/* Tombol Selanjutnya */}
                {page < totalPages ? (
                  <Link
                    href={`/berita?page=${page + 1}`}
                    scroll={false}
                    className="inline-flex items-center justify-center gap-1 min-w-[40px] h-10 px-3 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all text-sm font-semibold"
                  >
                    Selanjutnya
                    <Icon name="chevron_right" className="text-lg" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-1 min-w-[40px] h-10 px-3 rounded-lg border border-outline-variant/30 text-on-surface-variant/30 cursor-not-allowed text-sm font-semibold"
                  >
                    Selanjutnya
                    <Icon name="chevron_right" className="text-lg" />
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import Icon from "../components/Icon";

export const metadata = { title: "Berita & Kegiatan" };

export const revalidate = 0; // Disable static rendering for dynamic updates

const getChipColor = (kategori: string) => {
  switch (kategori) {
    case "Peternakan": return "bg-primary-container text-on-primary-container";
    case "Pemerintahan": return "bg-secondary-container text-on-secondary-container";
    case "Ekonomi": return "bg-tertiary-container text-on-tertiary-container";
    case "Infrastruktur": return "bg-primary-fixed text-on-primary-fixed";
    case "Pendidikan": return "bg-secondary-fixed text-on-secondary-fixed";
    case "Kesehatan": return "bg-tertiary-fixed text-on-tertiary-fixed";
    default: return "bg-surface-variant text-on-surface-variant";
  }
};

export default async function BeritaPage() {
  const beritaList = await prisma.artikel.findMany({
    orderBy: { createdAt: "desc" },
  });

  const featured = beritaList[0];
  const others = beritaList.slice(1);

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="font-serif text-3xl md:text-5xl text-on-primary font-bold mb-4">Berita & Kegiatan</h1>
          <p className="text-on-primary/80 text-base md:text-lg max-w-2xl mx-auto">
            Informasi terkini seputar kegiatan pemerintahan, pembangunan, dan aktivitas masyarakat Desa Kedungdowo.
          </p>
        </div>
      </section>

      {/* Featured News (Latest) */}
      {featured && (
        <section className="py-12 md:py-16 bg-surface-container-low border-b border-outline-variant/20">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20 flex flex-col md:flex-row group hover:shadow-md transition-shadow">
              <div className="md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-primary/20 via-surface-container to-secondary/20 flex items-center justify-center relative overflow-hidden">
                <Icon name="campaign" filled className="text-8xl text-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500" />
                <div className={`absolute top-6 left-6 ${getChipColor(featured.kategori)} px-4 py-1.5 rounded-full text-sm font-bold shadow-sm`}>
                  {featured.kategori}
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <time className="text-sm font-medium text-on-surface-variant mb-3 flex items-center gap-2">
                  <Icon name="calendar_today" className="text-base" />
                  {new Date(featured.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </time>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-on-background mb-4 group-hover:text-primary transition-colors leading-snug">
                  {featured.judul}
                </h2>
                <p className="text-on-surface-variant text-base leading-relaxed mb-8">
                  {featured.konten}
                </p>
                <div>
                  <a href="#" className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3.5 rounded-xl font-bold hover:bg-surface-tint transition-colors">
                    Baca Artikel <Icon name="arrow_forward" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-on-background">Semua Berita</h2>
          </div>

          {others.length === 0 && !featured ? (
             <div className="text-center py-20 bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-sm">
              <Icon name="newspaper" className="text-6xl text-on-surface-variant/30 mb-4" />
              <h3 className="font-serif text-xl font-bold text-on-background">Belum Ada Berita</h3>
              <p className="text-on-surface-variant text-sm mt-2">Daftar berita akan diperbarui oleh admin desa segera.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {others.map((berita) => (
                <article key={berita.id} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-md hover:shadow-secondary/5 transition-all group flex flex-col">
                  {/* Image placeholder */}
                  <div className="h-56 overflow-hidden relative bg-gradient-to-br from-surface-container to-surface-variant flex items-center justify-center">
                    <Icon name="image" className="text-6xl text-on-surface-variant/20 group-hover:scale-110 transition-transform duration-500" />
                    <div className={`absolute top-4 left-4 ${getChipColor(berita.kategori)} px-3 py-1 rounded-full text-xs font-bold`}>
                      {berita.kategori}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <time className="text-xs font-medium text-on-surface-variant mb-3 flex items-center gap-1.5">
                      <Icon name="schedule" className="text-sm" />
                      {new Date(berita.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </time>
                    <h3 className="font-serif text-xl font-bold text-on-background mb-3 group-hover:text-primary transition-colors leading-snug">
                      {berita.judul}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow truncate-3-lines line-clamp-3">
                      {berita.konten}
                    </p>

                    <div className="pt-5 border-t border-outline-variant/20">
                      <a href="#" className="text-secondary font-bold text-sm hover:text-primary transition-colors flex items-center gap-1.5">
                        Baca Selengkapnya
                        <Icon name="arrow_forward" className="text-sm" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

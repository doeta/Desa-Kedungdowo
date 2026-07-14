import { prisma } from "@/lib/prisma";
import { extractIdFromSlug, getBeritaUrl } from "@/lib/slug";
import Icon from "../../components/Icon";
import Link from "next/link";
import { notFound } from "next/navigation";

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

// Generate dynamic metadata based on the article
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const artikelId = extractIdFromSlug(resolvedParams.slug);
  if (!artikelId) return { title: "Berita Tidak Ditemukan" };
  
  const artikel = await prisma.artikel.findUnique({
    where: { id: artikelId },
    select: { judul: true }
  });
  
  if (!artikel) return { title: "Berita Tidak Ditemukan" };
  return { title: `${artikel.judul} - Desa Kedungdowo` };
}

export default async function DetailBeritaPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const artikelId = extractIdFromSlug(resolvedParams.slug);
  
  if (!artikelId) {
    return notFound();
  }

  const artikel = await prisma.artikel.findUnique({
    where: { id: artikelId },
    include: { bloks: { orderBy: { urutan: "asc" } } },
  });

  if (!artikel) {
    return notFound();
  }

  const hasBloks = artikel.bloks && artikel.bloks.length > 0;

  // Fetch recommendations
  const rekomendasiList = await prisma.artikel.findMany({
    where: {
      id: { not: artikelId },
      kategori: { not: "Pengumuman" }
    },
    orderBy: { createdAt: "desc" },
    take: 3
  });

  return (
    <div className="relative min-h-screen bg-surface">
      {/* Ambient Pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#707a6c_1px,transparent_1px),radial-gradient(#707a6c_1px,transparent_1px)] bg-[size:40px_40px] bg-[position:0_0,20px_20px] opacity-[0.03] pointer-events-none" />
      
      {/* Header Decorative Background */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-surface-container-low to-transparent z-0" />

      <main className="relative z-10 w-full max-w-[1000px] mx-auto px-6 pt-32 pb-20 md:pb-32">
        {/* Navigation */}
        <div className="mb-12">
          <Link href="/berita" className="inline-flex items-center gap-2 text-sm font-semibold text-outline hover:text-secondary transition-colors">
            <Icon name="arrow_back" className="text-lg" /> Kembali ke Berita
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className={`${getChipColor(artikel.kategori)} px-3 py-1 rounded-full text-xs font-bold shadow-sm`}>
              {artikel.kategori}
            </span>
            <div className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
              <Icon name="calendar_today" className="text-[18px]" />
              <time dateTime={artikel.createdAt.toISOString()}>
                {new Date(artikel.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
              </time>
              <span className="mx-1">•</span>
              <Icon name="person" className="text-[18px]" />
              <span>Pemerintah Desa</span>
            </div>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface leading-[1.15] tracking-tight mb-8">
            {artikel.judul}
          </h1>
          
          <div className="w-full h-1 bg-outline-variant/30 rounded-full overflow-hidden">
            <div className="w-24 h-full bg-primary rounded-full"></div>
          </div>
        </header>

        {/* Hero image (thumbnail) */}
        {artikel.fotoUrl && (
          <div className="mb-12 w-full h-[300px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-md border border-outline-variant/20">
            <img src={artikel.fotoUrl} alt={artikel.judul} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Article Content */}
        <article className="bg-surface-container-lowest p-8 md:p-12 lg:p-16 rounded-[2rem] shadow-sm border border-outline-variant/20 relative overflow-hidden">
          {/* Abstract corner decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full pointer-events-none" />
          
          <div className="relative z-10 prose prose-lg prose-headings:font-serif prose-headings:text-on-surface prose-p:text-on-surface-variant prose-p:leading-relaxed prose-a:text-secondary max-w-none">
            {hasBloks ? (
              /* Render block-based content */
              artikel.bloks.map((blok, index) => {
                if (blok.tipe === "teks") {
                  // Split text into paragraphs
                  return blok.konten.split("\n").map((paragraph, pIndex) => {
                    if (!paragraph.trim()) return null;
                    if (index === 0 && pIndex === 0) {
                      return (
                        <p key={`${blok.id}-${pIndex}`} className="text-lg md:text-xl text-on-surface leading-relaxed mb-6">
                          {paragraph}
                        </p>
                      );
                    }
                    return (
                      <p key={`${blok.id}-${pIndex}`} className="mb-6">
                        {paragraph}
                      </p>
                    );
                  });
                } else if (blok.tipe === "gambar") {
                  return (
                    <figure key={blok.id} className="my-10">
                      <div className="w-full rounded-2xl overflow-hidden shadow-md border border-outline-variant/20">
                        <img 
                          src={blok.konten} 
                          alt={blok.caption || artikel.judul} 
                          className="w-full h-auto object-cover not-prose" 
                        />
                      </div>
                      {blok.caption && (
                        <figcaption className="mt-3 text-center text-sm italic text-on-surface-variant/70 not-prose">
                          {blok.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }
                return null;
              })
            ) : (
              /* Fallback: render legacy single-content format */
              artikel.konten.split("\n").map((paragraph, index) => {
                if (!paragraph.trim()) return null;
                if (index === 0) {
                  return (
                    <p key={index} className="text-lg md:text-xl text-on-surface leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  );
                }
                return (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                );
              })
            )}
          </div>
        </article>

        {/* Social Share / Interaction */}
        <div className="flex items-center gap-4 mt-10 justify-center">
          <span className="text-sm font-medium text-on-surface-variant">Bagikan artikel:</span>
          <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors text-on-surface">
            <Icon name="share" className="text-lg" />
          </button>
          <button className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-secondary-container hover:text-on-secondary-container transition-colors text-on-surface">
            <Icon name="link" className="text-lg" />
          </button>
        </div>

        {/* Recommendations Section */}
        {rekomendasiList.length > 0 && (
          <section className="mt-24">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-serif text-3xl font-bold text-on-surface">Berita Lainnya</h3>
              <div className="h-px bg-outline-variant/30 flex-grow" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rekomendasiList.map((rec) => (
                <Link href={getBeritaUrl(rec.judul, rec.id)} key={rec.id} className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-[0_4px_16px_rgba(121,85,72,0.05)] transition-all duration-300 flex flex-col h-full">
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`${getChipColor(rec.kategori)} text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded shadow-sm`}>
                        {rec.kategori}
                      </span>
                      <time className="text-xs font-medium text-on-surface-variant">
                        {new Date(rec.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                      </time>
                    </div>
                    {rec.fotoUrl && (
                      <div className="h-32 w-full mb-3 rounded-lg overflow-hidden shrink-0">
                        <img src={rec.fotoUrl} alt={rec.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <h4 className="text-base font-serif font-bold text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {rec.judul}
                    </h4>
                    <p className="text-sm text-on-surface-variant line-clamp-2 flex-grow leading-relaxed">
                      {rec.konten}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

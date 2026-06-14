import Image from "next/image";
import Icon from "../components/Icon";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Pemerintahan Desa" };
export const revalidate = 0;

export default async function PemerintahanPage() {
  const perangkatList = await prisma.perangkatDesa.findMany({
    orderBy: { id: "asc" },
  });

  // Cari Kepala Desa untuk di-featured
  const kepalaDesa = perangkatList.find((p) => p.jabatan.toLowerCase().includes("kepala desa"));
  // Sisanya untuk daftar perangkat
  const otherPerangkat = perangkatList.filter((p) => p.id !== kepalaDesa?.id);

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="font-serif text-3xl md:text-5xl text-on-primary font-bold mb-4">Pemerintahan Desa</h1>
          <p className="text-on-primary/80 text-base md:text-lg max-w-2xl mx-auto">
            Struktur organisasi dan aparatur pemerintahan Desa Kedungdowo
          </p>
        </div>
      </section>

      {/* Sambutan Kepala Desa */}
      <section className="py-16 md:py-24 bg-surface-container relative overflow-hidden">
        <div className="blob-green absolute -left-20 top-0 w-64 h-64" />
        <div className="blob-brown absolute right-0 bottom-0 w-96 h-96" />

        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <div className="glass-card rounded-2xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-10">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative">
              <div className="absolute inset-0 bg-primary rounded-2xl rotate-3" />
              {kepalaDesa?.fotoUrl ? (
                <img
                  src={kepalaDesa.fotoUrl}
                  alt={kepalaDesa.nama}
                  className="w-full h-full object-cover rounded-2xl relative z-10 border-4 border-surface-container-lowest shadow-md -rotate-3 hover:rotate-0 transition-transform duration-300"
                />
              ) : (
                <Image
                  src="/kepala-desa.png"
                  alt="Kepala Desa Kedungdowo"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover rounded-2xl relative z-10 border-4 border-surface-container-lowest shadow-md -rotate-3 hover:rotate-0 transition-transform duration-300"
                />
              )}
            </div>
            <div className="flex-grow text-center md:text-left relative">
              <Icon name="format_quote" filled className="text-6xl text-primary/20 absolute -top-4 -left-4 md:-top-6 md:-left-6 pointer-events-none" />
              <h2 className="font-serif text-2xl md:text-3xl text-on-background font-bold mb-2">Sambutan Kepala Desa</h2>
              <h3 className="font-semibold text-sm text-secondary uppercase tracking-[0.15em] mb-6">
                {kepalaDesa ? kepalaDesa.nama : "Kepala Desa Kedungdowo"}
              </h3>
              <blockquote className="text-on-surface-variant italic text-base md:text-lg leading-relaxed mb-6">
                &ldquo;Website ini adalah jendela desa kita menuju dunia luas. Kami berkomitmen untuk
                terus transparan, inovatif, dan menjaga semangat gotong royong demi kesejahteraan
                seluruh warga Desa Kedungdowo. Bersama-sama, kita wujudkan desa yang mandiri dan
                berdaya saing.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl text-primary font-bold mb-4">Struktur Organisasi</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-4" />
            <p className="text-on-surface-variant text-base max-w-2xl mx-auto">
              Perangkat desa yang melayani masyarakat Kedungdowo setiap hari.
            </p>
          </div>

          {perangkatList.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-on-surface-variant text-sm">Belum ada data perangkat desa.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPerangkat.map((pos) => (
                <div key={pos.id} className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/20 hover:shadow-md hover:shadow-secondary/10 transition-all group flex items-center gap-4">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                    {pos.fotoUrl ? (
                      <img src={pos.fotoUrl} alt={pos.nama} className="w-full h-full object-cover" />
                    ) : (
                      <Icon name="person" filled className="text-secondary text-2xl" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-on-background mb-1">{pos.nama}</h3>
                    <p className="text-on-surface-variant text-sm bg-surface-variant/50 px-2 py-0.5 rounded inline-block">{pos.jabatan}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lembaga Kemasyarakatan */}
      <section className="py-16 md:py-20 bg-surface-container-low batik-pattern">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl text-primary font-bold mb-8 text-center">Lembaga Kemasyarakatan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { nama: "BPD", full: "Badan Permusyawaratan Desa", icon: "groups", desc: "Pengawasan dan legislasi desa" },
              { nama: "PKK", full: "Pemberdayaan Kesejahteraan Keluarga", icon: "family_restroom", desc: "Pemberdayaan perempuan dan keluarga" },
              { nama: "Karang Taruna", full: "Organisasi Kepemudaan", icon: "diversity_3", desc: "Pengembangan pemuda dan kegiatan sosial" },
              { nama: "LPMD", full: "Lembaga Pemberdayaan Masyarakat Desa", icon: "hub", desc: "Perencanaan pembangunan partisipatif" },
            ].map((lem) => (
              <div key={lem.nama} className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 text-center">
                <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name={lem.icon} filled className="text-tertiary text-xl" />
                </div>
                <h3 className="font-serif text-lg font-bold text-on-background">{lem.nama}</h3>
                <p className="text-on-surface-variant text-xs mb-2">{lem.full}</p>
                <p className="text-on-surface-variant text-sm">{lem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import { prisma } from "@/lib/prisma";
import Icon from "../components/Icon";

export const metadata = { title: "Direktori UMKM Syariah" };

export const revalidate = 0; // Disable static rendering for this page so it updates dynamically

export default async function UmkmPage() {
  const umkmList = await prisma.produkUMKM.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white font-semibold text-xs uppercase tracking-[0.2em] mb-4">
            Pemberdayaan Ekonomi Syariah
          </span>
          <h1 className="font-serif text-3xl md:text-5xl text-on-primary font-bold mb-4">Direktori UMKM</h1>
          <p className="text-on-primary/80 text-base md:text-lg max-w-2xl mx-auto">
            Produk kreatif unggulan dari perempuan pelaku UMKM desa Kedungdowo yang telah lulus program inkubasi kewirausahaan ekonomi syariah.
          </p>
        </div>
      </section>

      {/* Demographic Highlight */}
      <section className="py-12 bg-surface-container-low border-b border-outline-variant/20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-3 bg-surface-container-lowest rounded-full px-6 py-3 shadow-sm border border-outline-variant/10">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Icon name="female" filled className="text-secondary text-xl" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-medium">Demografi</p>
                <p className="text-sm font-bold text-on-surface">54% Populasi Perempuan</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-surface-container-lowest rounded-full px-6 py-3 shadow-sm border border-outline-variant/10">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="school" filled className="text-primary text-xl" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-medium">Pemberdayaan</p>
                <p className="text-sm font-bold text-on-surface">50 Lulusan Inkubasi</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-surface-container-lowest rounded-full px-6 py-3 shadow-sm border border-outline-variant/10">
              <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center">
                <Icon name="verified" filled className="text-tertiary text-xl" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-medium">Sistem Bisnis</p>
                <p className="text-sm font-bold text-on-surface">Ekonomi Syariah</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-[1200px] mx-auto px-6">
          {umkmList.length === 0 ? (
            <div className="text-center py-20 bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-sm">
              <Icon name="inventory_2" className="text-6xl text-on-surface-variant/30 mb-4" />
              <h3 className="font-serif text-xl font-bold text-on-background">Belum Ada Produk</h3>
              <p className="text-on-surface-variant text-sm mt-2">Daftar produk UMKM akan segera diperbarui oleh admin desa.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {umkmList.map((produk) => (
                <div key={produk.id} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/20 hover:shadow-md hover:shadow-secondary/10 transition-all group flex flex-col">
                  {/* Image Placeholder or Actual Image */}
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                    {produk.fotoUrl ? (
                      <img src={produk.fotoUrl} alt={produk.namaProduk} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <Icon name="inventory_2" filled className="text-6xl text-primary/30 group-hover:scale-110 transition-transform duration-500" />
                    )}
                    <div className="absolute top-3 right-3 bg-primary text-on-primary px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                      Pesan
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="font-serif text-lg font-bold text-on-background mb-1 group-hover:text-primary transition-colors">
                      {produk.namaProduk}
                    </h2>
                    <p className="text-secondary text-sm font-semibold mb-4 flex items-center gap-1.5">
                      <Icon name="person" className="text-sm" />
                      {produk.namaPemilik}
                    </p>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">
                      {produk.deskripsi}
                    </p>

                    <a
                      href={`https://wa.me/${produk.kontakWa}?text=Halo,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(produk.namaProduk)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-full bg-[#25D366] text-white py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors shadow-sm"
                    >
                      <Icon name="chat" className="text-xl" />
                      Pesan via WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Join */}
      <section className="py-16 bg-surface-container batik-pattern">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4">Ingin Mendaftarkan Usaha Anda?</h2>
          <p className="text-on-surface-variant text-base mb-8">
            Bagi warga Desa Kedungdowo yang memiliki usaha UMKM dan ingin ditampilkan di direktori ini, silakan menghubungi admin desa.
          </p>
          <a
            href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-8 py-3.5 rounded-xl font-bold hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-sm"
          >
            <Icon name="add_business" />
            Daftarkan UMKM
          </a>
        </div>
      </section>
    </>
  );
}

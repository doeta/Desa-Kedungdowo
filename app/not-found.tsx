import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      {/* Angka 404 Besar */}
      <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
      
      {/* Pesan Error yang Ramah */}
      <h2 className="text-2xl font-semibold text-on-surface mb-3">
        Waduh! Halaman Tidak Ditemukan
      </h2>
      <p className="text-on-surface-variant mb-8 max-w-md mx-auto leading-relaxed">
        Maaf, halaman atau berita yang Anda cari mungkin telah dihapus, dipindahkan, atau Anda salah memasukkan alamat URL.
      </p>
      
      {/* Tombol Penyelamat */}
      <Link 
        href="/"
        className="px-6 py-3 bg-primary text-on-primary font-medium rounded-xl hover:shadow-lg hover:-translate-y-0.5 hover:bg-primary/90 transition-all duration-300"
      >
        Kembali ke Beranda Desa
      </Link>
    </div>
  )
}

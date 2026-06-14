import Icon from "../components/Icon";

export const metadata = { title: "Profil Desa - Desa Kedungdowo" };

export default function ProfilPage() {
  return (
    <main className="w-full">
      {/* 1. Hero Section */}
      <section className="py-16 md:py-32 bg-surface relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center mt-12 md:mt-0">
          <p className="text-xs font-medium text-primary tracking-[0.2em] uppercase mb-6 inline-block border-b-2 border-primary pb-2">
            Mengenal Lebih Dekat
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-on-surface mb-8 leading-tight tracking-tight">
            Profil <span className="italic font-light text-primary">Desa</span><br />Kedungdowo
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-3xl mx-auto font-light leading-relaxed">
            Menjaga tradisi warisan leluhur sambil terus melangkah maju dengan inovasi berkelanjutan demi kesejahteraan masyarakat di jantung Boyolali.
          </p>
        </div>
        {/* Subtle background decorative element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-surface-container-low to-transparent -z-10"></div>
      </section>

      {/* 2. Informasi Umum & Wilayah */}
      <section className="pb-16 md:pb-32 pt-12 relative bg-surface">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            {/* Left Column: Lokasi */}
            <div className="lg:col-span-7">
              <div className="pr-0 lg:pr-12">
                <div className="flex items-center space-x-4 mb-8">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-container text-primary">
                    <Icon name="location_on" />
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-semibold text-on-surface">Lokasi <span className="italic font-light text-on-surface-variant">&amp;</span> Wilayah</h2>
                </div>
                <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
                  Desa Kedungdowo terletak di Kecamatan Andong, Kabupaten Boyolali. Menjadi titik strategis yang menghubungkan <strong className="text-on-surface font-semibold">tradisi agraris</strong> dengan dinamika sosial modern.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-outline/20 pt-8">
                  <div className="col-span-2 md:col-span-1">
                    <span className="block text-xs font-medium text-outline mb-2 uppercase tracking-wider">Luas</span>
                    <span className="font-serif text-2xl font-semibold text-on-surface">295.569 <span className="text-base text-on-surface-variant font-sans font-normal">Ha</span></span>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <span className="block text-xs font-medium text-outline mb-2 uppercase tracking-wider">Ke Kec.</span>
                    <span className="font-serif text-2xl font-semibold text-on-surface">2 <span className="text-base text-on-surface-variant font-sans font-normal">km</span></span>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <span className="block text-xs font-medium text-outline mb-2 uppercase tracking-wider">Ke Kab.</span>
                    <span className="font-serif text-2xl font-semibold text-on-surface">35 <span className="text-base text-on-surface-variant font-sans font-normal">km</span></span>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <span className="block text-xs font-medium text-outline mb-2 uppercase tracking-wider">Ke Prov.</span>
                    <span className="font-serif text-2xl font-semibold text-on-surface">90 <span className="text-base text-on-surface-variant font-sans font-normal">km</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dusun */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0 z-20">
              <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] border border-outline/20 relative overflow-hidden group hover:border-primary/30 transition-colors duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                <div className="relative z-10">
                  <p className="text-xs font-medium text-secondary tracking-widest uppercase mb-4">Struktur Wilayah</p>
                  <h3 className="font-serif text-2xl font-semibold text-on-surface mb-8">Pembagian Dusun</h3>
                  <div className="space-y-6">
                    {["Kedungori", "Kedung Lengkong", "Jatisari", "Kedungdowo"].map((dusun, idx) => (
                      <div key={dusun} className={`group/item flex items-center justify-between ${idx !== 3 ? 'border-b border-outline/20 pb-4' : 'pb-2'} hover:border-secondary transition-colors cursor-default`}>
                        <div className="flex items-center">
                          <span className="font-serif text-xl font-semibold text-outline/30 mr-6 group-hover/item:text-secondary transition-colors italic">0{idx + 1}</span>
                          <span className="text-lg font-medium text-on-surface">{dusun}</span>
                        </div>
                        <Icon name="arrow_forward" className="text-outline/50 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sejarah & Demografi */}
      <section className="py-16 md:py-32 bg-surface-container-low relative">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Sejarah (Editorial Story) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs font-medium text-primary tracking-[0.2em] uppercase mb-6">Warisan Leluhur</p>
              <h2 className="font-serif text-4xl font-semibold text-on-surface mb-10 leading-tight">
                Jejak Sejarah <span className="italic text-on-surface-variant font-light">Desa</span>
              </h2>
              <div className="text-base text-on-surface-variant space-y-6 mb-10">
                <p className="leading-relaxed first-letter:float-left first-letter:font-serif first-letter:text-[5rem] first-letter:leading-[4.5rem] first-letter:pr-3 first-letter:pt-2 first-letter:text-primary first-letter:font-bold">
                  Akar sejarah Desa Kedungdowo terjalin erat dengan penyebaran agama Islam di wilayah ini, yang dirintis oleh tokoh ulama <strong>Kyai Dul Jalal Awal</strong> dan <strong>Kyai Rusdi</strong>. Terkait pula dengan keberadaan <strong className="text-on-surface">Alas Jogo Paten</strong> dan <strong className="text-on-surface">Dukuh Kalioso</strong> yang sarat nilai historis.
                </p>
                <p className="leading-relaxed">
                  Asal-usul nama <span className="italic text-on-surface">&quot;Kedungdowo&quot;</span> konon bermula dari sebuah dukuh kecil yang dikelilingi oleh aliran sungai panjang (kedung yang dowo), memberikan identitas agraris yang kuat berkat ketersediaan air yang melimpah.
                </p>
              </div>
            </div>

            {/* Demografi */}
            <div className="lg:col-span-6">
              <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-outline/20 h-full flex flex-col">
                <div className="flex items-center justify-between mb-10">
                  <h2 className="font-serif text-3xl font-semibold text-on-surface">Demografi</h2>
                  <Icon name="groups" className="text-secondary text-4xl" />
                </div>
                
                {/* Large Stats */}
                <div className="flex flex-col sm:flex-row gap-8 mb-10">
                  <div className="flex-1 border-b sm:border-b-0 sm:border-r border-outline/20 pb-6 sm:pb-0 sm:pr-8">
                    <p className="text-xs font-medium text-outline uppercase tracking-wider mb-2">Total Penduduk</p>
                    <div className="flex items-baseline">
                      <span className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-primary">3.368</span>
                      <span className="text-on-surface-variant ml-2 text-base">jiwa</span>
                    </div>
                  </div>
                  <div className="flex-1 sm:pl-4">
                    <p className="text-xs font-medium text-outline uppercase tracking-wider mb-2">Agama</p>
                    <div className="flex items-baseline mb-1">
                      <span className="font-serif text-2xl font-semibold text-on-surface">3.362</span>
                      <span className="text-on-surface-variant ml-2 text-sm">Islam</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="font-serif text-2xl font-semibold text-on-surface">6</span>
                      <span className="text-on-surface-variant ml-2 text-sm">Kristen</span>
                    </div>
                  </div>
                </div>

                {/* Education & Occupation Grids */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Education */}
                  <div>
                    <h4 className="text-sm font-semibold text-on-surface mb-4 uppercase tracking-wider">Tingkat Pendidikan</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex justify-between border-b border-outline/20 pb-2"><span className="text-on-surface-variant">Belum Sekolah</span><span className="font-medium text-on-surface">968</span></li>
                      <li className="flex justify-between border-b border-outline/20 pb-2"><span className="text-on-surface-variant">SD</span><span className="font-medium text-on-surface">1.024</span></li>
                      <li className="flex justify-between border-b border-outline/20 pb-2"><span className="text-on-surface-variant">SLTP</span><span className="font-medium text-on-surface">626</span></li>
                      <li className="flex justify-between border-b border-outline/20 pb-2"><span className="text-on-surface-variant">SLTA/SMK</span><span className="font-medium text-on-surface">691</span></li>
                      <li className="flex justify-between pb-1"><span className="text-on-surface-variant">Perguruan Tinggi</span><span className="font-medium text-on-surface">61</span></li>
                    </ul>
                  </div>
                  {/* Occupation */}
                  <div>
                    <h4 className="text-sm font-semibold text-on-surface mb-4 uppercase tracking-wider">Mata Pencaharian</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex justify-between border-b border-outline/20 pb-2"><span className="text-on-surface-variant">Karyawan Swasta</span><span className="font-medium text-on-surface">511</span></li>
                      <li className="flex justify-between border-b border-outline/20 pb-2"><span className="text-on-surface-variant">Petani</span><span className="font-medium text-on-surface">451</span></li>
                      <li className="flex justify-between border-b border-outline/20 pb-2"><span className="text-on-surface-variant">Wiraswasta</span><span className="font-medium text-on-surface">422</span></li>
                      <li className="flex justify-between border-b border-outline/20 pb-2"><span className="text-on-surface-variant">Buruh Tani</span><span className="font-medium text-on-surface">415</span></li>
                      <li className="flex justify-between pb-1"><span className="text-on-surface-variant text-xs italic">Dan profesi lainnya...</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sosial & Ekonomi */}
      <section className="py-16 md:py-32 bg-surface">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-medium text-secondary tracking-[0.2em] uppercase mb-4">Pembangunan &amp; Kesejahteraan</p>
            <h2 className="font-serif text-4xl font-semibold text-on-surface mb-6">Sosial <span className="italic font-light text-on-surface-variant">&amp;</span> Ekonomi</h2>
            <p className="text-lg text-on-surface-variant">Membangun kesejahteraan melalui pemberdayaan masyarakat dan pengelolaan sumber daya desa yang transparan.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            {/* Basis Ekonomi */}
            <div className="md:col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-3xl p-8 md:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-outline/20 flex flex-col sm:flex-row gap-8 items-center bg-gradient-to-br from-surface-container-lowest to-surface">
              <div className="w-24 h-24 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0">
                <Icon name="agriculture" className="text-4xl" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-on-surface mb-4">Basis Ekonomi Utama</h3>
                <p className="text-base text-on-surface-variant mb-6 leading-relaxed">
                  Perekonomian didorong oleh hasil bumi sektor pertanian. Pembangunan desa didukung oleh kemandirian finansial melalui pilar utama:
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center px-4 py-2 bg-surface-container rounded-full text-sm font-semibold text-on-surface">
                    <span className="w-2 h-2 rounded-full bg-tertiary mr-2"></span>
                    Pendapatan Asli Desa (PADes)
                  </span>
                  <span className="inline-flex items-center px-4 py-2 bg-surface-container rounded-full text-sm font-semibold text-on-surface">
                    <span className="w-2 h-2 rounded-full bg-tertiary mr-2"></span>
                    Alokasi Dana Desa (ADD)
                  </span>
                </div>
              </div>
            </div>

            {/* Kesejahteraan */}
            <div className="md:col-span-6 lg:col-span-4 bg-surface-container-lowest rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-outline/20">
              <div className="flex items-center space-x-4 mb-8">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-container text-on-primary-container">
                  <Icon name="account_balance_wallet" />
                </span>
                <h3 className="font-serif text-xl font-semibold text-on-surface">Kesejahteraan KK</h3>
              </div>
              <div className="space-y-6">
                <div className="group flex flex-col border-b border-outline/20 pb-4 hover:border-primary transition-colors">
                  <span className="text-sm font-semibold text-on-surface-variant mb-1">Keluarga Prasejahtera</span>
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-2xl font-semibold text-on-surface">547</span>
                    <span className="text-xs text-outline font-medium">KK</span>
                  </div>
                </div>
                <div className="group flex flex-col border-b border-outline/20 pb-4 hover:border-primary transition-colors">
                  <span className="text-sm font-semibold text-on-surface-variant mb-1">Keluarga Menengah</span>
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-2xl font-semibold text-on-surface">389</span>
                    <span className="text-xs text-outline font-medium">KK</span>
                  </div>
                </div>
                <div className="group flex flex-col hover:border-primary transition-colors">
                  <span className="text-sm font-semibold text-on-surface-variant mb-1">Keluarga Sejahtera</span>
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-2xl font-semibold text-on-surface">90</span>
                    <span className="text-xs text-outline font-medium">KK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kelembagaan */}
            <div className="md:col-span-6 lg:col-span-12 bg-secondary-container/10 rounded-3xl p-8 md:p-10 border border-secondary/20">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary text-on-secondary">
                      <Icon name="diversity_3" />
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-on-surface">Kelembagaan Aktif</h3>
                  </div>
                  <p className="text-base text-on-surface-variant max-w-md">Motor penggerak kegiatan sosial dan pemberdayaan masyarakat desa.</p>
                </div>
                <div className="flex flex-wrap gap-3 md:justify-end">
                  {["Karang Taruna", "PKK", "LPMD", "BPD", "Kelompok Tani"].map(item => (
                    <span key={item} className="px-5 py-2.5 bg-surface rounded-xl text-sm font-semibold text-on-surface shadow-sm border border-outline/30 hover:border-secondary transition-colors cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sarana & Prasarana */}
      <section className="py-16 md:py-32 bg-surface-container-low">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-surface rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] border border-outline/20">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-container/30 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-container/30 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl">
                  <p className="text-xs font-medium text-outline tracking-[0.2em] uppercase mb-4">Infrastruktur</p>
                  <h2 className="font-serif text-4xl font-semibold text-on-surface mb-4">Sarana <span className="italic font-light text-on-surface-variant">&amp;</span> Prasarana</h2>
                  <p className="text-lg text-on-surface-variant leading-relaxed">Fasilitas umum pendukung kualitas hidup masyarakat yang dibangun dan dirawat dengan semangat <strong className="text-on-surface font-semibold">swadaya dan gotong royong</strong>.</p>
                </div>
                <div className="inline-flex items-center px-6 py-3 bg-surface-container rounded-full shadow-sm border border-outline/30">
                  <Icon name="handshake" className="text-primary mr-3" />
                  <span className="text-sm font-semibold text-on-surface uppercase tracking-wide">Fokus Swadaya</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Pendidikan */}
                <div className="bg-surface/50 backdrop-blur-md p-8 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-surface shadow-sm border border-outline/20 flex items-center justify-center mb-6">
                    <Icon name="school" className="text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-on-surface mb-6 border-b border-outline/20 pb-4">Pendidikan</h3>
                  <ul className="space-y-4 text-base">
                    <li className="flex justify-between items-center group">
                      <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Taman Kanak-kanak</span>
                      <span className="font-serif text-lg font-semibold text-on-surface">2</span>
                    </li>
                    <li className="flex justify-between items-center group">
                      <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Sekolah Dasar (SD)</span>
                      <span className="font-serif text-lg font-semibold text-on-surface">3</span>
                    </li>
                    <li className="flex justify-between items-center group">
                      <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">TPA / Madin</span>
                      <span className="font-serif text-lg font-semibold text-on-surface">3</span>
                    </li>
                  </ul>
                </div>

                {/* Kesehatan */}
                <div className="bg-surface/50 backdrop-blur-md p-8 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-surface shadow-sm border border-outline/20 flex items-center justify-center mb-6">
                    <Icon name="health_and_safety" className="text-secondary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-on-surface mb-6 border-b border-outline/20 pb-4">Kesehatan</h3>
                  <ul className="space-y-4 text-base">
                    <li className="flex justify-between items-center group">
                      <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Posyandu</span>
                      <span className="font-serif text-lg font-semibold text-on-surface">5</span>
                    </li>
                    <li className="flex justify-between items-center group">
                      <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Polindes</span>
                      <span className="font-serif text-lg font-semibold text-on-surface">1</span>
                    </li>
                    <li className="flex justify-between items-center group">
                      <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Bidan Desa</span>
                      <span className="font-serif text-lg font-semibold text-on-surface">1</span>
                    </li>
                  </ul>
                </div>

                {/* Fasilitas Umum */}
                <div className="bg-surface/50 backdrop-blur-md p-8 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-surface shadow-sm border border-outline/20 flex items-center justify-center mb-6">
                    <Icon name="mosque" className="text-tertiary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-on-surface mb-6 border-b border-outline/20 pb-4">Fasilitas Publik</h3>
                  <ul className="space-y-4 text-base">
                    <li className="flex justify-between items-center group">
                      <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Tempat Ibadah</span>
                      <span className="font-serif text-lg font-semibold text-on-surface">20</span>
                    </li>
                    <li className="flex justify-between items-center group">
                      <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Lapangan Olahraga</span>
                      <span className="font-serif text-lg font-semibold text-on-surface">4</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

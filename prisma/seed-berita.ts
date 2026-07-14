import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedDummyBerita() {
  console.log("🌱 Seeding 3 dummy berita dengan blok konten...\n");

  // Berita 1
  const berita1 = await prisma.artikel.create({
    data: {
      judul: "Bimbingan Teknis Profil Desa Web Informasi Desa Kedungdowo",
      kategori: "Kegiatan",
      konten: "Dalam era digital saat ini, transparansi dan kemudahan akses informasi menjadi kebutuhan utama masyarakat. Melalui kegiatan Bimbingan Teknis (Bimtek), aparatur desa dilatih untuk mengoptimalkan penggunaan web ini demi mendukung pengelolaan data desa yang lebih baik.",
      fotoUrl: null,
      bloks: {
        create: [
          {
            tipe: "teks",
            konten: "Dalam era digital saat ini, transparansi dan kemudahan akses informasi menjadi kebutuhan utama masyarakat. Untuk itu, pengembangan web profil desa melalui platform digital menjadi solusi inovatif bagi pemerintah desa dalam meningkatkan pelayanan publik dan akuntabilitas.",
            urutan: 0,
          },
          {
            tipe: "teks",
            konten: "Melalui kegiatan Bimbingan Teknis (Bimtek), aparatur desa dilatih untuk mengoptimalkan penggunaan web ini demi mendukung pengelolaan data desa yang lebih baik. Kegiatan ini merupakan langkah konkrit Pemerintah Desa Kedungdowo dalam mewujudkan tata kelola pemerintahan yang modern dan responsif terhadap perkembangan teknologi.",
            urutan: 1,
          },
          {
            tipe: "gambar",
            konten: "https://placehold.co/800x400/2d5016/ffffff?text=Bimtek+Profil+Desa",
            caption: "Suasana Bimbingan Teknis Web Profil Desa yang dihadiri oleh aparatur desa.",
            urutan: 2,
          },
          {
            tipe: "teks",
            konten: "Pelatihan ini mencakup materi pengelolaan konten website, pengunggahan berita dan pengumuman, serta cara memperbarui data statistik kependudukan desa. Para peserta sangat antusias mengikuti setiap sesi yang dipandu oleh Tim KKN Universitas Diponegoro.",
            urutan: 3,
          },
          {
            tipe: "gambar",
            konten: "https://placehold.co/800x400/1a3d0a/ffffff?text=Diskusi+Kelompok",
            caption: "Diskusi dan tanya jawab peserta Bimtek bersama Tim KKN Undip.",
            urutan: 4,
          },
          {
            tipe: "teks",
            konten: "Diharapkan setelah mengikuti bimbingan teknis ini, aparatur desa dapat secara mandiri mengelola dan memperbarui informasi desa di portal resmi. Hal ini mencakup pembaruan data kependudukan, transparansi APBDes, serta penyebarluasan informasi terkait program-program pembangunan desa.",
            urutan: 5,
          },
        ],
      },
    },
  });
  console.log(`✅ Berita 1 dibuat: "${berita1.judul}" (ID: ${berita1.id})`);

  // Berita 2
  const berita2 = await prisma.artikel.create({
    data: {
      judul: "Musyawarah Desa Bahas Rencana Pembangunan Jalan Dusun III",
      kategori: "Berita",
      konten: "Pemerintah Desa Kedungdowo menggelar Musyawarah Desa (Musdes) untuk membahas rencana pembangunan dan perbaikan jalan di wilayah Dusun III yang telah lama menjadi perhatian warga.",
      fotoUrl: null,
      bloks: {
        create: [
          {
            tipe: "teks",
            konten: "Pemerintah Desa Kedungdowo menggelar Musyawarah Desa (Musdes) pada hari Sabtu, 28 Juni 2025 di Balai Desa Kedungdowo. Agenda utama musyawarah kali ini adalah membahas rencana pembangunan dan perbaikan jalan di wilayah Dusun III yang telah lama menjadi perhatian warga.",
            urutan: 0,
          },
          {
            tipe: "gambar",
            konten: "https://placehold.co/800x400/3a6b24/ffffff?text=Musyawarah+Desa",
            caption: "Musyawarah Desa dihadiri oleh seluruh perangkat desa dan perwakilan warga.",
            urutan: 1,
          },
          {
            tipe: "teks",
            konten: "Dalam musyawarah yang dihadiri oleh Kepala Desa Bapak Suyadi, seluruh perangkat desa, Ketua RT/RW, dan perwakilan masyarakat, disepakati beberapa poin penting:\n\n1. Pembangunan jalan sepanjang 500 meter di Dusun III akan dimulai pada bulan Agustus 2025.\n2. Sumber pendanaan berasal dari Dana Desa tahun anggaran 2025.\n3. Pelaksanaan proyek akan melibatkan tenaga kerja lokal dari warga desa.\n4. Pengawasan pembangunan akan dilakukan oleh tim yang terdiri dari perangkat desa dan tokoh masyarakat.",
            urutan: 2,
          },
          {
            tipe: "teks",
            konten: "Kepala Desa Bapak Suyadi menyampaikan harapannya agar pembangunan ini dapat meningkatkan konektivitas antar dusun dan mendukung kegiatan ekonomi warga, terutama untuk distribusi hasil peternakan dan produk UMKM lokal.",
            urutan: 3,
          },
        ],
      },
    },
  });
  console.log(`✅ Berita 2 dibuat: "${berita2.judul}" (ID: ${berita2.id})`);

  // Berita 3
  const berita3 = await prisma.artikel.create({
    data: {
      judul: "Program Desa Korporasi Sapi Kedungdowo Raih Penghargaan Provinsi",
      kategori: "Berita",
      konten: "Desa Kedungdowo berhasil meraih penghargaan sebagai Desa Korporasi Terbaik tingkat Provinsi Jawa Tengah berkat program unggulan di sektor peternakan sapi.",
      fotoUrl: null,
      bloks: {
        create: [
          {
            tipe: "teks",
            konten: "Desa Kedungdowo berhasil meraih penghargaan sebagai Desa Korporasi Terbaik tingkat Provinsi Jawa Tengah berkat program unggulan di sektor peternakan sapi. Penghargaan ini diserahkan langsung oleh Gubernur Jawa Tengah dalam acara Anugerah Desa Mandiri 2025.",
            urutan: 0,
          },
          {
            tipe: "gambar",
            konten: "https://placehold.co/800x400/4a7c34/ffffff?text=Penghargaan+Desa+Korporasi",
            caption: "Penyerahan penghargaan Desa Korporasi Terbaik tingkat Provinsi Jawa Tengah.",
            urutan: 1,
          },
          {
            tipe: "teks",
            konten: "Program Desa Korporasi Sapi yang telah berjalan sejak tahun 2022 ini melibatkan lebih dari 150 peternak di seluruh wilayah desa. Melalui pendekatan korporasi, para peternak bergabung dalam kelompok usaha bersama yang mendapatkan akses permodalan, pelatihan manajemen peternakan modern, serta jaringan pemasaran yang lebih luas.",
            urutan: 2,
          },
          {
            tipe: "gambar",
            konten: "https://placehold.co/800x400/5a8c44/ffffff?text=Peternakan+Sapi+Kedungdowo",
            caption: "Peternakan sapi di Desa Kedungdowo yang menjadi program unggulan desa.",
            urutan: 3,
          },
          {
            tipe: "teks",
            konten: "Kepala Desa Bapak Suyadi mengungkapkan rasa syukur dan bangga atas pencapaian ini. Beliau menekankan bahwa keberhasilan ini merupakan hasil kerja keras seluruh warga desa, perangkat desa, dan dukungan dari berbagai pihak termasuk Dinas Peternakan Kabupaten Boyolali.",
            urutan: 4,
          },
          {
            tipe: "teks",
            konten: "Ke depan, Pemerintah Desa Kedungdowo berencana untuk memperluas program ini dengan menambah variasi produk olahan dari hasil peternakan, seperti susu segar, daging olahan, dan pupuk organik. Langkah ini diharapkan dapat semakin meningkatkan kesejahteraan ekonomi warga desa.",
            urutan: 5,
          },
        ],
      },
    },
  });
  console.log(`✅ Berita 3 dibuat: "${berita3.judul}" (ID: ${berita3.id})`);

  console.log("\n🎉 Selesai! 3 berita dummy dengan blok konten berhasil dibuat.");
}

seedDummyBerita()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

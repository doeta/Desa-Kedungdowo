// Seed script for UMKM dummy data
// Uses the same PrismaClient + PrismaPg adapter setup as the app

require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set in environment variables.');
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const dummyData = [
    {
      namaProduk: 'Warung Kopi Kedung',
      deskripsi: 'Warung kopi dengan berbagai varian minuman tradisional.',
      namaPemilik: 'Budi Santoso',
      kontakWa: '081234567890',
      fotoUrl: '/uploads/dummy1.png',
      kategori: 'Makanan & Minuman',
      kisaranHarga: '5000-20000',
    },
    {
      namaProduk: 'Toko Kelontong Sari',
      deskripsi: 'Berbagai kebutuhan harian dengan harga terjangkau.',
      namaPemilik: 'Siti Aisyah',
      kontakWa: '081298765432',
      fotoUrl: '/uploads/dummy2.png',
      kategori: 'Kelontong',
      kisaranHarga: '1000-5000',
    },
    {
      namaProduk: 'Peternakan Ayam Griya',
      deskripsi: 'Ayam kampung segar untuk pasar lokal.',
      namaPemilik: 'Andi Prasetyo',
      kontakWa: '081212345678',
      fotoUrl: '/uploads/dummy3.png',
      kategori: 'Agribisnis',
      kisaranHarga: '20000-50000',
    },
    {
      namaProduk: 'Bengkel Motor Jaya',
      deskripsi: 'Servis motor lengkap dengan sparepart asli.',
      namaPemilik: 'Rudi Hartono',
      kontakWa: '08122334455',
      fotoUrl: '/uploads/dummy4.png',
      kategori: 'Jasa',
      kisaranHarga: '50000-200000',
    },
    {
      namaProduk: 'Kerajinan Bambu Cipta',
      deskripsi: 'Produk kerajinan bambu ramah lingkungan.',
      namaPemilik: 'Mira Lestari',
      kontakWa: '081233445566',
      fotoUrl: '/uploads/dummy5.png',
      kategori: 'Kerajinan',
      kisaranHarga: '15000-75000',
    },
    {
      namaProduk: 'Jasa Jahit Elegan',
      deskripsi: 'Layanan jahit pakaian, seragam, dan kustom desain.',
      namaPemilik: 'Dewi Kurnia',
      kontakWa: '081244556677',
      fotoUrl: '/uploads/dummy6.png',
      kategori: 'Pakaian',
      kisaranHarga: '20000-100000',
    },
    {
      namaProduk: 'Usaha Lainnya XYZ',
      deskripsi: 'Berbagai layanan non-kategori khusus di desa.',
      namaPemilik: 'Fajar Nugroho',
      kontakWa: '081255667788',
      fotoUrl: '/uploads/dummy7.png',
      kategori: 'Lainnya',
      kisaranHarga: 'Hubungi Kontak',
    },
    {
      namaProduk: 'Kedai Kopi Senja',
      deskripsi: 'Kopi arabika dengan nuansa tradisional.',
      namaPemilik: 'Agus Wirawan',
      kontakWa: '081266778899',
      fotoUrl: '/uploads/dummy8.png',
      kategori: 'Makanan & Minuman',
      kisaranHarga: '8000-25000',
    },
    {
      namaProduk: 'Toko Sembako Maju',
      deskripsi: 'Sembako lengkap, bahan pokok, dan kebutuhan rumah tangga.',
      namaPemilik: 'Rina Putri',
      kontakWa: '081277889900',
      fotoUrl: '/uploads/dummy9.png',
      kategori: 'Kelontong',
      kisaranHarga: '500-3000',
    },
    {
      namaProduk: 'Peternakan Sapi Sejahtera',
      deskripsi: 'Sapi perah dan potong segar untuk pasar lokal.',
      namaPemilik: 'Hadi Saputra',
      kontakWa: '081288990011',
      fotoUrl: '/uploads/dummy10.png',
      kategori: 'Agribisnis',
      kisaranHarga: '300000-800000',
    },
    {
      namaProduk: 'Salon Kecantikan Indah',
      deskripsi: 'Layanan potong rambut, perawatan wajah, dan makeup.',
      namaPemilik: 'Lisa Marlina',
      kontakWa: '081299001122',
      fotoUrl: '/uploads/dummy11.png',
      kategori: 'Jasa',
      kisaranHarga: '25000-150000',
    },
  ];

  console.log('Seeding 11 UMKM dummy data...');
  for (let i = 0; i < dummyData.length; i++) {
    await prisma.produkUMKM.create({ data: dummyData[i] });
    console.log(`  [${i + 1}/11] ${dummyData[i].namaProduk} ✓`);
  }
  console.log('Seeding selesai!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

import type { Metadata } from "next";
import { Source_Serif_4, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBotDesa from "./components/ChatBotDesa";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Desa Kedungdowo — Kecamatan Andong, Kabupaten Boyolali",
    template: "%s | Desa Kedungdowo",
  },
  description:
    "Website resmi profil Desa Kedungdowo, Kecamatan Andong, Kabupaten Boyolali, Jawa Tengah. Informasi pemerintahan, potensi peternakan Desa Korporasi Sapi, UMKM, dan layanan publik.",
  keywords: [
    "Desa Kedungdowo",
    "Kecamatan Andong",
    "Kabupaten Boyolali",
    "Desa Korporasi Sapi",
    "UMKM Kedungdowo",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${sourceSerif.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ChatBotDesa />
      </body>
    </html>
  );
}

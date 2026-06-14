import Link from "next/link";
import Icon from "../components/Icon";
import { logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = { title: "Admin Dashboard | Desa Kedungdowo" };

const adminMenu = [
  { name: "Dashboard", path: "/admin", icon: "dashboard" },
  { name: "Berita & Kegiatan", path: "/admin/berita", icon: "newspaper" },
  { name: "UMKM Syariah", path: "/admin/umkm", icon: "storefront" },
  { name: "Perangkat Desa", path: "/admin/perangkat", icon: "badge" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-container flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-surface-container-lowest border-r border-outline-variant/20 flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between md:justify-center">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-on-primary rounded-lg flex items-center justify-center">
              <Icon name="admin_panel_settings" className="text-xl" />
            </div>
            <span className="font-serif font-bold text-lg text-primary">Admin Panel</span>
          </Link>
          <div className="md:hidden">
            <a href="/" className="text-sm text-secondary hover:underline">Ke Web Publik</a>
          </div>
        </div>

        <nav className="flex-grow p-4 flex flex-col gap-2">
          {adminMenu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-colors group"
            >
              <Icon name={item.icon} className="text-on-surface-variant/70 group-hover:text-primary transition-colors" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-outline-variant/20">
          <form action={async () => {
            "use server";
            await logout();
            redirect("/login");
          }}>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-error hover:bg-error/10 transition-colors">
              <Icon name="logout" />
              Keluar
            </button>
          </form>
          <div className="mt-4 text-center hidden md:block">
            <a href="/" className="text-xs text-on-surface-variant hover:text-primary hover:underline">
              ← Kembali ke Website Publik
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 max-h-screen overflow-y-auto relative">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

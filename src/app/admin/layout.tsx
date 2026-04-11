import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "../../app/globals.css";
import AdminSidebar from "@/components/admin/AdminSidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Architect Dashboard | Project Management",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${spaceGrotesk.variable} dark bg-surface text-on-surface font-display antialiased selection:bg-primary/30 min-h-screen`}>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .mono-data { font-family: 'JetBrains Mono', monospace; }
      `}</style>
      
      {/* SideNavBar Shell */}
      <AdminSidebar />

      {/* TopAppBar Shell */}
      <header className="fixed top-0 right-0 left-72 h-16 z-40 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-8 border-b border-slate-900">
        <div className="flex items-center gap-8">
          <span className="text-lg font-bold text-slate-100">Architect Dashboard</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-500 text-sm" data-icon="search">search</span>
            <input className="bg-slate-900 border-none rounded-lg pl-10 pr-4 py-1.5 text-[11px] font-mono text-slate-300 w-64 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-600 outline-none" placeholder="QUERY DATABASE..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-slate-400 hover:text-blue-400 transition-colors">
            <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
          </button>
          <button className="text-slate-400 hover:text-blue-400 transition-colors">
            <span className="material-symbols-outlined" data-icon="terminal">terminal</span>
          </button>
          <button className="text-slate-400 hover:text-blue-400 transition-colors">
            <span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      {children}
    </div>
  );
}

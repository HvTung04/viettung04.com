import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "../../app/globals.css";

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
      <aside className="h-screen w-72 fixed left-0 top-0 flex flex-col bg-slate-950 text-slate-200 border-r border-slate-900 z-50">
        <div className="flex flex-col h-full py-8">
          <div className="px-8 mb-12">
            <h1 className="text-xl font-black tracking-tighter text-blue-500 uppercase">Neural Cobalt</h1>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mt-1">Technical Admin</p>
          </div>
          
          <nav className="flex-1 space-y-1">
            <a className="flex items-center gap-3 px-8 py-3 bg-blue-600/10 text-blue-400 font-bold border-r-2 border-blue-500 transition-all" href="/admin/projects">
              <span className="material-symbols-outlined" data-icon="folder_special">folder_special</span>
              <span className="text-sm">Projects</span>
            </a>
            <a className="flex items-center gap-3 px-8 py-3 text-slate-500 hover:text-slate-300 font-medium transition-colors hover:bg-slate-900/80" href="#">
              <span className="material-symbols-outlined" data-icon="subject">subject</span>
              <span className="text-sm">Blog</span>
            </a>
            <a className="flex items-center gap-3 px-8 py-3 text-slate-500 hover:text-slate-300 font-medium transition-colors hover:bg-slate-900/80" href="#">
              <span className="material-symbols-outlined" data-icon="settings_heart">settings_heart</span>
              <span className="text-sm">Settings</span>
            </a>
          </nav>
          
          <div className="px-8 mt-auto pt-8 border-t border-slate-900/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-surface-container-highest overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Architect Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzxAD4IHYboWu5ilS-spx_vywByr51buyggauleXqm3x5E6r-I_KZxV9lCyhKYOtfqSC0d_bIYXMukiXVQcBUfZeEBbcrqbfNC9Bt7-00j0f4tPpAer6dB_j6-Awrzdj4jEtjdkM3FVGm1t_TXBVCCwV0sUhKoO-6y8Y-SuJOrClVdk6XDr0svBbswG0NGSfS781fbSvgZTU_VcmqNDZzqMCdMt6fzpjqPkNuyrBDs22a-Of6RbfMvJ_3RSusfh8JWWNBaRTQm51zd"/>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">System.Admin</p>
                <p className="text-[10px] font-mono text-slate-500">ID: 0092-XC</p>
              </div>
            </div>
            <button className="w-full py-3 bg-primary text-white font-bold rounded-lg text-sm hover:brightness-110 active:scale-95 transition-all">
              Deploy Project
            </button>
          </div>
        </div>
      </aside>

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

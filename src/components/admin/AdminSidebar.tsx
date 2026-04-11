'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname() || '';

  const navItems = [
    { name: 'Projects', href: '/admin/projects', icon: 'folder_special' },
    { name: 'Blog', href: '/admin/blogs', icon: 'subject' },
    { name: 'Settings', href: '/admin/settings', icon: 'settings_heart' },
  ];

  return (
    <aside className="h-screen w-72 fixed left-0 top-0 flex flex-col bg-slate-950 text-slate-200 border-r border-slate-900 z-50">
      <div className="flex flex-col h-full py-8">
        <div className="px-8 mb-12">
          <h1 className="text-xl font-black tracking-tighter text-blue-500 uppercase">Neural Cobalt</h1>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mt-1">Technical Admin</p>
        </div>

        <div className="px-6 mb-8">
          <Link href={pathname.includes('/admin/blogs') ? '/admin/blogs/new' : '/admin/projects/new'} className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-lg">add_circle</span>
            <span>New Entry</span>
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-8 py-3 transition-all ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-400 font-bold border-r-2 border-blue-500' 
                    : 'text-slate-500 hover:text-slate-300 font-medium hover:bg-slate-900/80'
                }`}
              >
                <span className="material-symbols-outlined" data-icon={item.icon}>{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="px-8 mt-auto pt-8 border-t border-slate-900/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-surface-container-highest overflow-hidden">
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
  );
}

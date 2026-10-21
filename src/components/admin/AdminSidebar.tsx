'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/admin/login/actions';

export default function AdminSidebar() {
  const pathname = usePathname() || '';

  const navItems = [
    { name: 'Dashboard', href: '/admin', marker: '[D]' },
    { name: 'Projects', href: '/admin/projects', marker: '[P]' },
    { name: 'About Page', href: '/admin/about', marker: '[A]' },
    { name: 'Blog', href: '/admin/blogs', marker: '[B]' },
    { name: 'Testimonials', href: '/admin/testimonials', marker: '[T]' },
    { name: 'Services', href: '/admin/services', marker: '[S]' },
    { name: 'FAQ', href: '/admin/faqs', marker: '[F]' },
    { name: 'Metrics', href: '/admin/metrics', marker: '[M]' },
    { name: 'Clients', href: '/admin/clients', marker: '[C]' },
    { name: 'Tech Stack', href: '/admin/technologies', marker: '[E]' },
    { name: 'Submissions', href: '/admin/submissions', marker: '[I]' },
    { name: 'Newsletter', href: '/admin/newsletter', marker: '[N]' },
  ];

  return (
    <aside className="h-screen w-72 fixed left-0 top-0 flex flex-col bg-surface-dark text-canvas border-r border-hairline z-50 font-mono">
      <div className="flex flex-col h-full py-8">
        <div className="px-8 mb-12">
          <div className="text-xs text-on-dark-muted mb-2">[+] SYSTEM</div>
          <h1 className="text-sm font-bold text-on-dark uppercase tracking-widest">Neural Cobalt</h1>
          <p className="text-[10px] text-on-dark-muted mt-1">Technical Admin Panel</p>
        </div>

        <div className="px-6 mb-8">
          <Link href={pathname.includes('/admin/blogs') ? '/admin/blogs/new' : '/admin/projects/new'} className="w-full bg-ink-deep text-canvas font-bold py-2 px-4 rounded-sm flex items-center justify-center gap-2 hover:bg-ink transition-colors border border-hairline">
            <span className="text-xs">[+]</span>
            <span className="text-xs">New Entry</span>
          </Link>
        </div>
        
        <nav className="flex-1 space-y-px">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-2 transition-colors border-l-2 ${
                  isActive 
                    ? 'bg-surface-dark-elevated text-on-dark border-on-dark' 
                    : 'text-on-dark-muted hover:text-on-dark border-transparent hover:border-hairline'
                }`}
              >
                <span className="text-xs font-mono">{item.marker}</span>
                <span className="text-xs">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="px-6 mt-auto pt-6 border-t border-hairline">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-sm bg-surface-dark-elevated border border-hairline flex items-center justify-center">
              <span className="text-xs text-on-dark-muted">[A]</span>
            </div>
            <div>
              <p className="text-xs font-bold text-on-dark">System.Admin</p>
              <p className="text-[10px] text-on-dark-muted">ID: 0092-XC</p>
            </div>
          </div>
          <form action={logout}>
            <button className="w-full py-2 bg-surface-dark-elevated text-on-dark-muted font-bold rounded-sm text-xs hover:text-on-dark hover:border-hairline transition-colors border border-transparent uppercase tracking-widest">
              [ Logout ]
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
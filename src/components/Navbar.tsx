'use client';

import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import {MdMemory} from 'react-icons/md';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <MdMemory className="text-primary text-3xl group-hover:scale-110 transition-transform" />
            <span className="font-display font-bold text-xl tracking-tight">{t('logo')}</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={`text-sm transition-colors ${pathname === '/' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'font-medium hover:text-primary text-slate-600 dark:text-slate-400'}`}>{t('home')}</Link>
            <Link href="/projects" className={`text-sm transition-colors ${pathname === '/projects' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'font-medium hover:text-primary text-slate-600 dark:text-slate-400'}`}>{t('projects')}</Link>
            <Link href="/services" className={`text-sm transition-colors ${pathname === '/services' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'font-medium hover:text-primary text-slate-600 dark:text-slate-400'}`}>{t('services')}</Link>
            <Link href="/about" className={`text-sm transition-colors ${pathname === '/about' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'font-medium hover:text-primary text-slate-600 dark:text-slate-400'}`}>{t('about')}</Link>
            <Link href="/blog" className={`text-sm transition-colors ${pathname.startsWith('/blog') ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'font-medium hover:text-primary text-slate-600 dark:text-slate-400'}`}>{t('blog')}</Link>
            <Link href="/contact" className={`text-sm transition-colors ${pathname === '/contact' ? 'text-primary font-bold border-b-2 border-primary pb-1' : 'font-medium hover:text-primary text-slate-600 dark:text-slate-400'}`}>{t('contact')}</Link>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
            <Link href="/contact" className="bg-primary hover:bg-primary/90 text-white px-4 md:px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-primary/20 hover:shadow-primary/40 active:scale-95 block text-center">
              {t('hireMe')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

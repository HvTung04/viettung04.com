'use client';

import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const ASCII_WORDMARK = `██╗   ██╗██╗███████╗████████╗    ████████╗██╗   ██╗███╗   ██╗ ██████╗      █████╗ ██╗
██║   ██║██║██╔════╝╚══██╔══╝    ██╔════╝██║   ██║████╗  ██║██╔════╝     ██╔══██╗██║
██║   ██║██║██████╗     ██║       ██║     ██║   ██║██╔██╗ ██║██║  ███╗    ███████║██║
╚██╗ ██╔╝██║██╔══╝     ██║       ██║     ██║   ██║██║╚██╗██║██║   ██║    ██╔══██║██║
 ╚████╔╝ ██║███████╗   ██║       ╚██████╗ ╚██████╔╝██║ ╚████║╚██████╔╝    ██║  ██║██║
  ╚═══╝  ╚═╝╚══════╝   ╚═╝        ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝     ╚═╝  ╚═╝╚═╝`;

export default function Navbar() {
  const t = useTranslations('Navbar');
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/projects', label: t('projects') },
    { href: '/services', label: t('services') },
    { href: '/about', label: t('about') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-canvas border-b border-hairline">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-20">
          <div className="flex items-center gap-4 md:gap-6 lg:gap-10 xl:gap-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <pre className="hidden xl:block text-[8px] leading-[1.1] text-ink font-mono whitespace-pre select-none" aria-hidden="true">
                {ASCII_WORDMARK}
              </pre>
              <span className="xl:hidden font-mono font-bold text-sm tracking-tight">VT AI</span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center shrink-0">
              <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-mono whitespace-nowrap transition-colors ${
                      pathname === link.href
                        ? 'text-ink font-bold'
                        : 'text-body hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Divider: Tabs ↔ Utility Controls */}
            <span className="hidden lg:block w-px h-5 bg-hairline shrink-0"></span>

            {/* Utility Controls */}
            <div className="flex items-center gap-1 shrink-0">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>

            {/* Divider: Utility Controls ↔ CTA */}
            <span className="w-px h-5 bg-hairline shrink-0"></span>

            {/* CTA */}
            <Link
              href="/contact"
              className="bg-ink text-canvas hover:bg-ink-deep px-5 py-2 rounded text-sm font-mono font-medium transition-colors block text-center shrink-0"
            >
              {t('hireMe')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

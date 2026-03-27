'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/routing';
import {useState, useRef, useEffect} from 'react';
import {MdLanguage, MdExpandMore} from 'react-icons/md';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'vi', label: 'Tiếng Việt' }
  ];

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function switchLocale(nextLocale: string) {
    setIsOpen(false);
    router.replace(pathname, {locale: nextLocale});
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-medium text-sm"
      >
        <MdLanguage className="text-xl" />
        <span className="hidden md:inline">{currentLang.label}</span>
        <span className="md:hidden">{currentLang.code.toUpperCase()}</span>
        <MdExpandMore className={`text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 transition-all origin-top-right duration-200 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                locale === lang.code 
                  ? 'text-primary font-bold bg-primary/5 dark:bg-primary/10' 
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

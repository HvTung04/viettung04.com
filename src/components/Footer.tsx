import {useTranslations} from 'next-intl';
import {MdMemory} from 'react-icons/md';
import {Link} from '@/i18n/routing';

export default function Footer() {
  const tNav = useTranslations('Navbar');
  const tFooter = useTranslations('Footer');

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <MdMemory className="text-primary text-2xl group-hover:rotate-12 transition-transform" />
            <span className="font-display font-bold text-lg tracking-tight">{tNav('logo')}</span>
          </Link>
          <div className="flex gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
            <a className="hover:text-primary transition-colors" href="#">LinkedIn</a>
            <a className="hover:text-primary transition-colors" href="#">GitHub</a>
            <a className="hover:text-primary transition-colors" href="#">Twitter</a>
            <Link className="hover:text-primary transition-colors" href="/contact">Email</Link>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">{tFooter('rights')}</p>
        </div>
      </div>
    </footer>
  );
}

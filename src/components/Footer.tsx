import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function Footer() {
  const tNav = useTranslations('Navbar');
  const tFooter = useTranslations('Footer');

  return (
    <footer className="border-t border-hairline py-8">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="font-mono font-bold text-base tracking-tight text-ink">
            {tNav('logo')}
          </Link>
          <div className="flex gap-6 text-[14px] font-mono text-body">
            <a className="text-ink hover:underline" href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="text-ink hover:underline" href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-ink hover:underline" href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            <Link className="text-ink hover:underline" href="/contact">Email</Link>
          </div>
          <p className="text-[14px] text-mute font-mono">{tFooter('rights')}</p>
        </div>
      </div>
    </footer>
  );
}

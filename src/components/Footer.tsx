import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

const SOCIAL_LINKS = [
  { key: 'linkedin', label: 'LinkedIn', href: process.env.NEXT_PUBLIC_LINKEDIN_URL },
  { key: 'github', label: 'GitHub', href: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/HvTung04' },
  { key: 'x', label: 'X', href: process.env.NEXT_PUBLIC_X_URL },
];

export default function Footer() {
  const tFooter = useTranslations('Footer');

  return (
    <footer className="border-t border-hairline py-8">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="font-mono font-bold text-base tracking-tight text-ink">
            [+] VIET TUNG
          </Link>
          <div className="flex gap-6 text-[14px] font-mono text-body">
            {SOCIAL_LINKS.map((social) =>
              social.href ? (
                <a
                  key={social.key}
                  className="text-ink hover:underline"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                >
                  {social.label}
                </a>
              ) : (
                // No dead links: unconfigured channels render as plain text.
                <span key={social.key} className="text-mute/60">
                  {social.label}
                </span>
              )
            )}
            <Link className="text-ink hover:underline" href="/contact">Email</Link>
          </div>
          <p className="text-[14px] text-mute font-mono">{tFooter('rights')}</p>
        </div>
      </div>
    </footer>
  );
}

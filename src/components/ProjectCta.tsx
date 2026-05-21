'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function ProjectCta() {
  const t = useTranslations('ProjectListPage.cta');

  return (
    <div className="mt-24 mb-12 bg-surface-dark p-10 md:p-16 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-on-dark">{t('title')}</h2>
      <p className="text-on-dark-muted text-base mb-8 max-w-xl mx-auto">{t('description')}</p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button className="bg-canvas text-ink px-6 py-2 rounded font-mono text-sm font-medium hover:bg-surface-soft transition-colors">{t('primaryBtn')}</button>
        <Link href="/services" className="bg-transparent border border-hairline-strong text-on-dark px-6 py-2 rounded font-mono text-sm font-medium hover:bg-surface-dark-elevated transition-colors block sm:inline-block">{t('secondaryBtn')}</Link>
      </div>
    </div>
  );
}

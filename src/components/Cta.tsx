import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function Cta() {
  const t = useTranslations('Cta');

  return (
    <section className="py-24">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-dark p-12 lg:p-16">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-on-dark">{t('title')}</h2>
            <p className="text-on-dark-muted text-base max-w-2xl">
              {t('subtitle')}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/contact"
                className="bg-canvas text-ink hover:bg-surface-soft px-5 py-1.5 rounded text-sm font-mono font-medium transition-colors inline-block"
              >
                {t('button')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

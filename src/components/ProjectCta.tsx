import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function ProjectCta() {
  const t = useTranslations('ProjectListPage.cta');

  return (
    <div className="mt-24 mb-12 rounded-2xl bg-gradient-to-br from-primary to-blue-700 p-10 md:p-16 text-center text-white shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-shadow">
      <h2 className="text-3xl md:text-4xl font-black mb-4">{t('title')}</h2>
      <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">{t('description')}</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors shadow-lg hover:-translate-y-1">{t('primaryBtn')}</button>
        <Link href="/services" className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors hover:-translate-y-1 block sm:inline-block">{t('secondaryBtn')}</Link>
      </div>
    </div>
  );
}

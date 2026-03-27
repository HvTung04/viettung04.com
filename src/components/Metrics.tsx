import {useTranslations} from 'next-intl';

export default function Metrics() {
  const t = useTranslations('Metrics');

  return (
    <section className="py-12 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
            <p className="text-4xl font-black text-primary mb-1 drop-shadow-sm">12+</p>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{t('projects')}</p>
          </div>
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
            <p className="text-4xl font-black text-primary mb-1 drop-shadow-sm">85%</p>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{t('models')}</p>
          </div>
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
            <p className="text-4xl font-black text-primary mb-1 drop-shadow-sm">+40%</p>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{t('accuracy')}</p>
          </div>
          <div className="text-center transform hover:scale-105 transition-transform duration-300">
            <p className="text-4xl font-black text-primary mb-1 drop-shadow-sm">100%</p>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{t('satisfaction')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

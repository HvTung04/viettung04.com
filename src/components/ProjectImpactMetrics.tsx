import {useTranslations} from 'next-intl';
import {MdTrendingUp, MdRocketLaunch, MdSpeed, MdArrowUpward, MdArrowDownward} from 'react-icons/md';

export default function ProjectImpactMetrics() {
  const t = useTranslations('ProjectListPage.impactMetrics');

  return (
    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-700 delay-500 fill-mode-both">
      <div className="flex flex-col gap-3 rounded-xl p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 hover:-translate-y-1 transition-transform shadow-sm hover:shadow-md">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
          <MdTrendingUp className="text-2xl" />
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">{t('impact.label')}</p>
        <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-black">{t('impact.value')}</p>
        <p className="text-emerald-500 text-sm font-semibold flex items-center gap-1">
          <MdArrowUpward className="text-sm" />
          {t('impact.trend')}
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-xl p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 hover:-translate-y-1 transition-transform shadow-sm hover:shadow-md">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
          <MdRocketLaunch className="text-2xl" />
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">{t('models.label')}</p>
        <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-black">{t('models.value')}</p>
        <p className="text-emerald-500 text-sm font-semibold flex items-center gap-1">
          <MdArrowUpward className="text-sm" />
          {t('models.trend')}
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-xl p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 hover:-translate-y-1 transition-transform shadow-sm hover:shadow-md">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
          <MdSpeed className="text-2xl" />
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">{t('optimization.label')}</p>
        <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-black">{t('optimization.value')}</p>
        <p className="text-orange-500 text-sm font-semibold flex items-center gap-1">
          <MdArrowDownward className="text-sm" />
          {t('optimization.trend')}
        </p>
      </div>
    </div>
  );
}

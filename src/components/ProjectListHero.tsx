import {useTranslations} from 'next-intl';

export default function ProjectListHero() {
  const t = useTranslations('ProjectListPage');

  return (
    <div className="flex flex-col gap-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-slate-900 dark:text-white text-5xl font-black leading-tight tracking-tight">
        {t('title')}
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl font-normal leading-relaxed">
        {t('description')}
      </p>
    </div>
  );
}

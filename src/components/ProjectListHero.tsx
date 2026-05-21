import {useTranslations} from 'next-intl';

export default function ProjectListHero() {
  const t = useTranslations('ProjectListPage');

  return (
    <div className="flex flex-col gap-4 mb-12">
      <h1 className="text-[38px] md:text-[44px] font-bold tracking-tight text-ink leading-tight">
        {t('title')}
      </h1>
      <p className="text-body text-base max-w-2xl font-normal leading-relaxed">
        {t('description')}
      </p>
    </div>
  );
}

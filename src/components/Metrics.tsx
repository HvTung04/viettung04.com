import {useTranslations} from 'next-intl';

export default function Metrics() {
  const t = useTranslations('Metrics');

  const chartLine1 = '─┬───┬────┬───┬───┬───';
  const chartLine2 = '──┼───┼────┼───┼───┼───';
  const chartLine3 = '──┴───┴────┴───┴───┴───';

  return (
    <section className="py-24 border-t border-b border-hairline">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-ink mb-1">12+</p>
            <pre className="text-body text-[10px] font-mono opacity-50 mb-2 select-none" aria-hidden="true">{chartLine1}</pre>
            <p className="text-[14px] text-mute font-mono">{t('projects')}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-ink mb-1">85%</p>
            <pre className="text-body text-[10px] font-mono opacity-50 mb-2 select-none" aria-hidden="true">{chartLine2}</pre>
            <p className="text-[14px] text-mute font-mono">{t('models')}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-ink mb-1">+40%</p>
            <pre className="text-body text-[10px] font-mono opacity-50 mb-2 select-none" aria-hidden="true">{chartLine3}</pre>
            <p className="text-[14px] text-mute font-mono">{t('accuracy')}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-ink mb-1">100%</p>
            <pre className="text-body text-[10px] font-mono opacity-50 mb-2 select-none" aria-hidden="true">{chartLine1}</pre>
            <p className="text-[14px] text-mute font-mono">{t('satisfaction')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

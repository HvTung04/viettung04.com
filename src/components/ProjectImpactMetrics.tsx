import {useTranslations} from 'next-intl';

export default function ProjectImpactMetrics() {
  const t = useTranslations('ProjectListPage.impactMetrics');

  const metrics = [
    { label: t('impact.label'), value: t('impact.value'), trend: t('impact.trend'), trendUp: true },
    { label: t('models.label'), value: t('models.value'), trend: t('models.trend'), trendUp: true },
    { label: t('optimization.label'), value: t('optimization.value'), trend: t('optimization.trend'), trendUp: false },
  ];

  return (
    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline">
      {metrics.map((m, i) => (
        <div key={i} className="flex flex-col gap-3 p-8 bg-canvas">
          <p className="text-body text-xs font-medium uppercase tracking-wider font-mono">{m.label}</p>
          <p className="text-ink tracking-tight text-3xl font-bold font-mono">{m.value}</p>
          <p className={`${m.trendUp ? 'text-success' : 'text-warning'} text-xs font-semibold font-mono flex items-center gap-1`}>
            <span>{m.trendUp ? '↑' : '↓'}</span>
            {m.trend}
          </p>
        </div>
      ))}
    </div>
  );
}

import prisma from '@/lib/db';

export default async function Metrics({ locale }: { locale: string }) {
  const metrics = await prisma.siteMetric.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { order: 'asc' },
    take: 4,
    include: { translations: true },
  });

  const resolved = metrics.map((metric) => {
    const translation = metric.translations.find((tr) => tr.locale === locale);
    return {
      id: metric.id,
      label: translation?.label || metric.label,
      value: metric.value,
      suffix: metric.suffix,
    };
  });

  const chartLine1 = '─┬───┬────┬───┬───┬───';
  const chartLine2 = '──┼───┼────┼───┼───┼───';
  const chartLine3 = '──┴───┴────┴───┴───┴───';

  const lines = [chartLine1, chartLine2, chartLine3, chartLine1];

  return (
    <section className="py-24 border-t border-b border-hairline">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {resolved.map((metric, index) => (
            <div key={metric.id} className="text-center">
              <p className="text-3xl font-bold text-ink mb-1">
                {metric.value}{metric.suffix || ''}
              </p>
              <pre className="text-body text-[10px] font-mono opacity-50 mb-2 select-none" aria-hidden="true">
                {lines[index % lines.length]}
              </pre>
              <p className="text-[14px] text-mute font-mono">{metric.label}</p>
            </div>
          ))}
          {resolved.length === 0 && (
            <div className="col-span-4 text-center text-mute text-sm py-8">
              No metrics configured yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

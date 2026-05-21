import {useTranslations} from 'next-intl';

export default function TechStack() {
  const t = useTranslations('TechStack');

  const categories = [
    {
      title: t('aiTitle'),
      items: ['PyTorch', 'Scikit-learn', 'HuggingFace', 'TensorFlow'],
    },
    {
      title: t('dataTitle'),
      items: ['Apache Spark', 'Airflow', 'PostgreSQL', 'Snowflake'],
    },
    {
      title: t('backendTitle'),
      items: ['FastAPI', 'Docker', 'Kubernetes', 'Go / Python'],
    },
  ];

  return (
    <section className="py-24 border-t border-hairline">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-base font-bold mb-12">{t('title')}</h2>
        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-sm font-bold text-ink mb-4 border-b border-hairline pb-2">
                [+] {cat.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {cat.items.map((item) => (
                  <div
                    key={item}
                    className="font-mono text-xs text-body bg-surface-card px-3 py-2 rounded"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

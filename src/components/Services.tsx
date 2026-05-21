import {useTranslations} from 'next-intl';

export default function Services() {
  const t = useTranslations('Services');

  const services = [
    {
      title: t('service1.title'),
      description: t('service1.description'),
    },
    {
      title: t('service2.title'),
      description: t('service2.description'),
    },
    {
      title: t('service3.title'),
      description: t('service3.description'),
    },
  ];

  return (
    <section className="py-24" id="services">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-base font-bold mb-4">{t('title')}</h2>
        <p className="text-body max-w-2xl mb-12 text-sm">{t('subtitle')}</p>
        <div className="space-y-px">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-canvas border border-hairline p-8"
            >
              <h3 className="text-base font-bold text-ink mb-3">
                [+] {service.title}
              </h3>
              <p className="text-sm text-body leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

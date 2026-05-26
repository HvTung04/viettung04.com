import prisma from '@/lib/db';
import { getTranslations } from 'next-intl/server';

export default async function Services({ locale }: { locale: string }) {
  const t = await getTranslations('Services');
  
  const services = await prisma.service.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { order: 'asc' },
    take: 3,
    include: { translations: true },
  });

  // Resolve translations
  const resolvedServices = services.map((service) => {
    const translation = service.translations.find((tr) => tr.locale === locale);
    return {
      id: service.id,
      title: translation?.title || service.title,
      description: translation?.description || service.description,
      tags: service.tags,
    };
  });

  return (
    <section className="py-24" id="services">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-base font-bold mb-4">{t('title')}</h2>
        <p className="text-body max-w-2xl mb-12 text-sm">{t('subtitle')}</p>
        
        {resolvedServices.length > 0 ? (
          <div className="space-y-px">
            {resolvedServices.map((service) => (
              <div
                key={service.id}
                className="bg-canvas border border-hairline p-8"
              >
                <h3 className="text-base font-bold text-ink mb-3">
                  [+] {service.title}
                </h3>
                <p className="text-sm text-body leading-relaxed">
                  {service.description}
                </p>
                {service.tags && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.tags.split(',').map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-mute bg-surface-soft px-2 py-1 rounded"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-mute text-sm py-8">
            No services configured yet.
          </div>
        )}
      </div>
    </section>
  );
}

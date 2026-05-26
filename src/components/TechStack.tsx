import prisma from '@/lib/db';
import { getTranslations } from 'next-intl/server';

export default async function TechStack({ locale }: { locale: string }) {
  const t = await getTranslations('TechStack');
  
  const technologies = await prisma.technology.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { order: 'asc' },
    include: { translations: true },
  });

  // Resolve translations
  const resolvedTechs = technologies.map((tech) => {
    const translation = tech.translations.find((tr) => tr.locale === locale);
    return {
      id: tech.id,
      name: translation?.name || tech.name,
      category: tech.category,
    };
  });

  // Group by category
  const categories = resolvedTechs.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof resolvedTechs>);

  return (
    <section className="py-24 border-t border-hairline">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-base font-bold mb-12">{t('title')}</h2>
        {Object.keys(categories).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(categories).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-bold text-ink mb-4 border-b border-hairline pb-2">
                  [+] {category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {items.map((tech) => (
                    <div
                      key={tech.id}
                      className="font-mono text-xs text-body bg-surface-card px-3 py-2 rounded"
                    >
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-mute text-sm">
            No technologies configured yet.
          </div>
        )}
      </div>
    </section>
  );
}

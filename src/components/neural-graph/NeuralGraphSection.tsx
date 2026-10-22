import { getTranslations } from 'next-intl/server';
import prisma from '@/lib/db';
import { buildGraphData } from './layout';
import NeuralGraphClient from './NeuralGraphClient';

export default async function NeuralGraphSection({ locale }: { locale: string }) {
  const [t, technologies, projects] = await Promise.all([
    getTranslations({ locale, namespace: 'NeuralGraph' }),
    prisma.technology.findMany({
      where: { status: 'ACTIVE' },
      select: { id: true, name: true, category: true },
      orderBy: { order: 'asc' },
    }),
    prisma.project.findMany({
      where: { status: 'ACTIVE', visibility: 'PUBLIC' },
      select: {
        id: true,
        slug: true,
        title: true,
        techStack: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
  ]);

  const data = buildGraphData(technologies, projects);

  if (data.nodes.length < 3) return null;

  return (
    <section id="neural-stack" className="py-24 border-t border-hairline">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2 block">
              [ {t('badge')} ]
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-ink tracking-tight mb-3">
              {t('title')}
            </h2>
            <p className="text-body text-sm leading-relaxed">{t('subtitle')}</p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-mute whitespace-nowrap">
            {t('hint')}
          </span>
        </div>

        <div className="relative border border-hairline h-[420px] md:h-[520px] overflow-hidden">
          <NeuralGraphClient
            data={data}
            hud={{
              system: t('hud.system'),
              nodes: t('hud.nodes'),
              links: t('hud.links'),
              packets: t('hud.packets'),
              signal: t('hud.signal'),
              map: t('hud.map'),
              mapped: t('hud.mapped'),
              hoverProjects: t('hud.hoverProjects'),
              drag: t('hud.drag'),
            }}
          />
        </div>

        {/* Screen-reader and no-WebGL fallback: the same graph as plain text. */}
        <ul className="sr-only">
          {data.nodes
            .filter((node) => node.kind !== 'core')
            .map((node) => (
              <li key={node.id}>
                {node.kind === 'project' ? t('legendProject') : t('legendTech')}: {node.label}
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

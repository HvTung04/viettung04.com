import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('AboutPage');
  return {
    title: 'About | AI Engineer Portfolio',
    description: t('description'),
    keywords: ['AI Engineer', 'Machine Learning Engineer', 'About', 'Career', 'Skills'],
  };
}

export default async function AboutPage() {
  const t = await getTranslations('AboutPage');

  const timeline = [
    {
      role: t('timeline.senior.role'),
      period: t('timeline.senior.period'),
      company: t('timeline.senior.company'),
      points: [t('timeline.senior.point1'), t('timeline.senior.point2')],
      active: true,
    },
    {
      role: t('timeline.research.role'),
      period: t('timeline.research.period'),
      company: t('timeline.research.company'),
      points: [t('timeline.research.point1'), t('timeline.research.point2')],
      active: false,
    },
    {
      role: t('timeline.data.role'),
      period: t('timeline.data.period'),
      company: t('timeline.data.company'),
      points: [t('timeline.data.point1')],
      active: false,
    },
  ];

  const skillGroups = [
    {
      title: t('skills.coreTitle'),
      items: ['PyTorch', 'TensorFlow', 'Transformers', 'Scikit-Learn', 'XGBoost', 'LangChain'],
    },
    {
      title: t('skills.opsTitle'),
      items: ['Docker', 'Kubernetes', 'AWS SageMaker', 'MLflow', 'CI/CD'],
    },
    {
      title: t('skills.languagesTitle'),
      items: ['Python', 'C++', 'SQL', 'Rust', 'Bash'],
    },
  ];

  return (
    <div className="bg-canvas text-ink min-h-screen flex flex-col font-mono">
      <Navbar />

      <main className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 flex-1">
        <section className="mb-24 pt-6 lg:pt-8">
          <div className="mb-4">
            <span className="inline-block bg-surface-dark text-canvas text-[11px] font-mono px-2 py-0.5 rounded">
              {t('availableBadge')}
            </span>
          </div>

          <h1 className="text-[38px] lg:text-[44px] font-bold leading-tight mb-6">
            {t('titlePart1')}
            <br />
            <span className="text-accent">{t('titleHighlight')}</span>
            <br />
            {t('titlePart2')}
          </h1>

          <p className="text-base text-body max-w-2xl leading-relaxed mb-8">
            {t('description')}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/projects" className="bg-ink text-canvas hover:bg-ink-deep px-5 py-1.5 rounded text-sm font-mono font-medium transition-colors">
              {t('viewProjects')}
            </Link>
            <Link href="/contact" className="bg-canvas text-ink border border-hairline-strong hover:border-ink px-5 py-1.5 rounded text-sm font-mono font-medium transition-colors">
              {t('contactBtn')}
            </Link>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-base font-bold mb-8">
            [+] {t('philosophy.title')}
          </h2>
          <div className="space-y-px">
            <div className="bg-canvas border border-hairline p-8">
              <h3 className="text-base font-bold text-ink mb-3">[+] {t('philosophy.data.title')}</h3>
              <p className="text-sm text-body leading-relaxed">{t('philosophy.data.desc')}</p>
            </div>
            <div className="bg-canvas border border-hairline p-8">
              <h3 className="text-base font-bold text-ink mb-3">[+] {t('philosophy.scale.title')}</h3>
              <p className="text-sm text-body leading-relaxed">{t('philosophy.scale.desc')}</p>
            </div>
            <div className="bg-canvas border border-hairline p-8">
              <h3 className="text-base font-bold text-ink mb-3">[+] {t('philosophy.ethics.title')}</h3>
              <p className="text-sm text-body leading-relaxed">{t('philosophy.ethics.desc')}</p>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-base font-bold mb-8">
            [+] {t('timeline.title')}
          </h2>

          <div className="space-y-0">
            {timeline.map((item, index) => (
              <div key={item.role} className={`border-l border-hairline pl-6 ${index < timeline.length - 1 ? 'pb-12' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-base font-bold text-ink">{item.role}</h3>
                  <span className={`font-mono text-xs font-medium px-2 py-0.5 rounded ${item.active ? 'text-accent bg-accent/10' : 'text-mute bg-surface-card'}`}>
                    {item.period}
                  </span>
                </div>

                <p className="text-body font-medium mb-4 text-sm">{item.company}</p>
                <ul className="space-y-2 text-sm text-body">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-ink font-mono">→</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-base font-bold mb-8">
            [+] {t('skills.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <h4 className="font-mono text-xs font-bold uppercase text-mute tracking-widest border-b border-hairline pb-2">
                  {group.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="px-2 py-0.5 bg-surface-card text-body rounded text-xs font-mono">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="border border-hairline bg-surface-soft rounded-sm p-8">
            <h3 className="text-sm font-bold text-ink mb-2 uppercase tracking-widest">
              [ Download Resume ]
            </h3>
            <p className="text-body text-sm mb-6">
              Available in PDF format. Updated January 2026.
            </p>
            <a
              href="/resume.pdf"
              download
              className="inline-block bg-ink text-canvas hover:bg-ink-deep px-5 py-2 rounded-sm text-sm font-mono font-medium transition-colors"
            >
              Download CV [PDF]
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

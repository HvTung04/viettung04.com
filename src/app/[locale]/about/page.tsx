import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import {
  MdAutoGraph,
  MdHub,
  MdMemory,
  MdPsychology,
  MdVerifiedUser,
  MdHistoryEdu,
  MdChevronRight,
  MdConstruction,
} from 'react-icons/md';

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
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12 lg:py-20">
        <section className="mb-24 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {t('availableBadge')}
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              {t('titlePart1')}
              <br />
              <span className="text-primary">{t('titleHighlight')}</span>
              <br />
              {t('titlePart2')}
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {t('description')}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/projects" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all">
                {t('viewProjects')}
              </Link>
              <Link href="/contact" className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-5 py-2 rounded-lg text-sm font-bold transition-all">
                {t('contactBtn')}
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/3 aspect-square relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-2xl group-hover:bg-primary/30 transition-all"></div>
            <div className="relative bg-slate-200 dark:bg-surface-container rounded-2xl h-full border border-slate-300 dark:border-slate-700 flex items-center justify-center">
              <MdMemory className="text-8xl text-primary/40" />
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
            <MdPsychology className="text-primary text-3xl" />
            {t('philosophy.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-xl bg-white dark:bg-surface-container border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all">
              <MdAutoGraph className="text-primary mb-4 text-3xl" />
              <h3 className="text-xl font-bold mb-3">{t('philosophy.data.title')}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t('philosophy.data.desc')}</p>
            </div>
            <div className="p-8 rounded-xl bg-white dark:bg-surface-container border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all">
              <MdHub className="text-primary mb-4 text-3xl" />
              <h3 className="text-xl font-bold mb-3">{t('philosophy.scale.title')}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t('philosophy.scale.desc')}</p>
            </div>
            <div className="p-8 rounded-xl bg-white dark:bg-surface-container border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all">
              <MdVerifiedUser className="text-primary mb-4 text-3xl" />
              <h3 className="text-xl font-bold mb-3">{t('philosophy.ethics.title')}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{t('philosophy.ethics.desc')}</p>
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
            <MdHistoryEdu className="text-primary text-3xl" />
            {t('timeline.title')}
          </h2>

          <div className="space-y-0 border-l-2 border-slate-200 dark:border-slate-800 ml-4">
            {timeline.map((item, index) => (
              <div key={item.role} className={`relative pl-10 ${index < timeline.length - 1 ? 'pb-12' : ''}`}>
                <div className={`absolute -left-2.25 top-0 w-4 h-4 rounded-full border-4 border-background-light dark:border-background-dark ${item.active ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}></div>

                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.role}</h3>
                  <span className={`font-mono text-sm font-medium px-3 py-1 rounded ${item.active ? 'text-primary bg-primary/10' : 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'}`}>
                    {item.period}
                  </span>
                </div>

                <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">{item.company}</p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <MdChevronRight className="text-primary mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
            <MdConstruction className="text-primary text-3xl" />
            {t('skills.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillGroups.map((group) => (
              <div key={group.title} className="space-y-4">
                <h4 className="font-mono text-xs font-bold uppercase text-slate-500 tracking-widest border-b border-slate-200 dark:border-slate-800 pb-2">
                  {group.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded text-xs font-mono">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

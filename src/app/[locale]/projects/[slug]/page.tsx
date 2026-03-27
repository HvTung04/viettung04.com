import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {MdPsychology, MdCode, MdPlayCircle, MdHub, MdVideocam, MdMemory, MdNotificationsActive, MdTerminal, MdQueryStats, MdChevronRight, MdMail, MdPerson} from 'react-icons/md';
import {Link} from '@/i18n/routing';

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{locale: string, slug: string}>
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  // Map allowed project slugs.
  const validSlugs = ['project1', 'project2', 'project3', 'neural-surveillance'];
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  // Fallback to project1 translations since it's the only fully prototyped content
  const tData = await getTranslations(`ProjectDetail.project1`);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0B0F19] text-slate-100 antialiased font-display" 
         style={{ backgroundImage: 'radial-gradient(at 0% 0%, rgba(60, 131, 246, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(60, 131, 246, 0.1) 0px, transparent 50%)' }}>
      
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-primary/10 bg-[#0B0F19]/80 backdrop-blur-md px-6 md:px-20 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <MdPsychology className="text-white text-xl" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100">{tData('hero.titleHighlight')}</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">{tData('header.overview')}</a>
          <a href="#challenge" className="text-sm font-medium hover:text-primary transition-colors">{tData('header.challenge')}</a>
          <a href="#architecture" className="text-sm font-medium hover:text-primary transition-colors">{tData('header.architecture')}</a>
          <a href="#results" className="text-sm font-medium hover:text-primary transition-colors">{tData('header.impact')}</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/#contact" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40">
            {tData('header.hireMe')}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-20 py-12">
        {/* Hero */}
        <section className="mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                {tData('hero.subtitle')}
              </span>
              <h2 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
                {tData('hero.titlePart1')} <span className="text-primary">{tData('hero.titleHighlight')}</span> {tData('hero.titlePart2')}
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
                {tData('hero.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-sm">
                  <MdCode className="text-xl" />
                  {tData('hero.github')}
                </button>
                <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40">
                  <MdPlayCircle className="text-xl" />
                  {tData('hero.demo')}
                </button>
              </div>
            </div>
            {/* Image Frame */}
            <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-primary/20 bg-slate-900 group shadow-2xl shadow-primary/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tData('hero.image')} alt="System Visualization" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-[#0B0F19]/60 backdrop-blur-md border border-white/5">
                <div className="flex justify-between items-center font-mono text-xs text-primary mb-2">
                  <span>{tData('hero.status')}</span>
                  <span>{tData('hero.fps')}</span>
                </div>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge */}
        <section id="challenge" className="mb-24 scroll-mt-24">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <MdPsychology className="text-primary text-3xl" />
              {tData('challenge.title')}
            </h3>
            <div className="space-y-4 text-slate-300 leading-relaxed text-lg">
              <p>{tData('challenge.p1')}</p>
              <p>{tData('challenge.p2')}</p>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section id="architecture" className="mb-24 scroll-mt-24">
          <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
            <MdHub className="text-primary text-3xl" />
            {tData('architecture.title')}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-primary/10 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-slate-900/80 transition-colors shadow-xl">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <MdVideocam className="text-primary text-2xl" />
              </div>
              <span className="font-mono text-xs text-primary mb-2">{tData('architecture.cards.0.layer')}</span>
              <h4 className="font-bold text-lg mb-3">{tData('architecture.cards.0.title')}</h4>
              <p className="text-sm text-slate-400">{tData('architecture.cards.0.desc')}</p>
            </div>
            
            <div className="bg-slate-900/50 border border-primary/10 p-8 rounded-2xl flex flex-col items-center text-center relative hover:bg-slate-900/80 transition-colors shadow-xl">
              <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 text-primary/30">
                <MdChevronRight className="text-4xl" />
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <MdMemory className="text-primary text-2xl" />
              </div>
              <span className="font-mono text-xs text-primary mb-2">{tData('architecture.cards.1.layer')}</span>
              <h4 className="font-bold text-lg mb-3">{tData('architecture.cards.1.title')}</h4>
              <p className="text-sm text-slate-400">{tData('architecture.cards.1.desc')}</p>
              <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-primary/30">
                <MdChevronRight className="text-4xl" />
              </div>
            </div>

            <div className="bg-slate-900/50 border border-primary/10 p-8 rounded-2xl flex flex-col items-center text-center hover:bg-slate-900/80 transition-colors shadow-xl">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <MdNotificationsActive className="text-primary text-2xl" />
              </div>
              <span className="font-mono text-xs text-primary mb-2">{tData('architecture.cards.2.layer')}</span>
              <h4 className="font-bold text-lg mb-3">{tData('architecture.cards.2.title')}</h4>
              <p className="text-sm text-slate-400">{tData('architecture.cards.2.desc')}</p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech-stack" className="mb-24">
          <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
            <MdTerminal className="text-primary text-3xl" />
            {tData('techStack.title')}
          </h3>
          <div className="flex flex-wrap gap-3">
            {['PyTorch', 'OpenCV', 'NVIDIA TensorRT', 'CUDA', 'Docker', 'Redis', 'FastAPI'].map(tech => (
              <div key={tech} className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-3 hover:border-primary/50 transition-colors shadow-sm cursor-default">
                <span className="font-mono text-sm font-semibold">{tech}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Results */}
        <section id="results" className="mb-12 scroll-mt-24">
          <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
            <MdQueryStats className="text-primary text-3xl" />
            {tData('results.title')}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="p-6 bg-primary/5 border border-primary/20 rounded-2xl hover:bg-primary/10 transition-colors shadow-sm">
                <p className="font-mono text-primary text-4xl font-black mb-2">{tData(`results.items.${i}.value`)}</p>
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">{tData(`results.items.${i}.label`)}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-12 px-6 md:px-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold text-white mb-2">{tData('footer.title')}</h4>
            <p className="text-slate-400">{tData('footer.subtitle')}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:contact@example.com" className="p-3 bg-slate-800 rounded-full hover:bg-primary transition-colors text-white" aria-label="Email">
              <MdMail className="text-xl" />
            </a>
            <a href="/#about" className="p-3 bg-slate-800 rounded-full hover:bg-primary transition-colors text-white" aria-label="About">
              <MdPerson className="text-xl" />
            </a>
            <Link href="/#contact" className="bg-primary px-8 py-3 rounded-xl font-bold text-white hover:shadow-[0_0_20px_rgba(60,131,246,0.4)] transition-all">
              {tData('footer.contact')}
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-mono">{tData('footer.copyright')}</p>
          <div className="flex gap-6 text-xs text-slate-500 font-mono uppercase tracking-tighter">
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

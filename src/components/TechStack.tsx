import {useTranslations} from 'next-intl';
import {MdPsychology, MdStorage, MdCode} from 'react-icons/md';

export default function TechStack() {
  const t = useTranslations('TechStack');

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-center relative inline-block left-1/2 -translate-x-1/2">
          {t('title')}
          <div className="absolute -bottom-3 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
        </h2>
        <div className="grid md:grid-cols-3 gap-12 mt-16">
          <div className="space-y-6 group">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <MdPsychology className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold">{t('aiTitle')}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 glass-card bg-white/50 dark:bg-slate-800/50 rounded-xl text-center font-mono text-xs hover:border-primary/40 hover:-translate-y-1 transition-all shadow-sm">PyTorch</div>
              <div className="p-4 glass-card bg-white/50 dark:bg-slate-800/50 rounded-xl text-center font-mono text-xs hover:border-primary/40 hover:-translate-y-1 transition-all shadow-sm">Scikit-learn</div>
              <div className="p-4 glass-card bg-white/50 dark:bg-slate-800/50 rounded-xl text-center font-mono text-xs hover:border-primary/40 hover:-translate-y-1 transition-all shadow-sm">HuggingFace</div>
              <div className="p-4 glass-card bg-white/50 dark:bg-slate-800/50 rounded-xl text-center font-mono text-xs hover:border-primary/40 hover:-translate-y-1 transition-all shadow-sm">TensorFlow</div>
            </div>
          </div>
          
          <div className="space-y-6 group">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <MdStorage className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold">{t('dataTitle')}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 glass-card bg-white/50 dark:bg-slate-800/50 rounded-xl text-center font-mono text-xs hover:border-primary/40 hover:-translate-y-1 transition-all shadow-sm">Apache Spark</div>
              <div className="p-4 glass-card bg-white/50 dark:bg-slate-800/50 rounded-xl text-center font-mono text-xs hover:border-primary/40 hover:-translate-y-1 transition-all shadow-sm">Airflow</div>
              <div className="p-4 glass-card bg-white/50 dark:bg-slate-800/50 rounded-xl text-center font-mono text-xs hover:border-primary/40 hover:-translate-y-1 transition-all shadow-sm">PostgreSQL</div>
              <div className="p-4 glass-card bg-white/50 dark:bg-slate-800/50 rounded-xl text-center font-mono text-xs hover:border-primary/40 hover:-translate-y-1 transition-all shadow-sm">Snowflake</div>
            </div>
          </div>
          
          <div className="space-y-6 group">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <MdCode className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold">{t('backendTitle')}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 glass-card bg-white/50 dark:bg-slate-800/50 rounded-xl text-center font-mono text-xs hover:border-primary/40 hover:-translate-y-1 transition-all shadow-sm">FastAPI</div>
              <div className="p-4 glass-card bg-white/50 dark:bg-slate-800/50 rounded-xl text-center font-mono text-xs hover:border-primary/40 hover:-translate-y-1 transition-all shadow-sm">Docker</div>
              <div className="p-4 glass-card bg-white/50 dark:bg-slate-800/50 rounded-xl text-center font-mono text-xs hover:border-primary/40 hover:-translate-y-1 transition-all shadow-sm">Kubernetes</div>
              <div className="p-4 glass-card bg-white/50 dark:bg-slate-800/50 rounded-xl text-center font-mono text-xs hover:border-primary/40 hover:-translate-y-1 transition-all shadow-sm">Go / Python</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

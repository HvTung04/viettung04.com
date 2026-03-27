import {useTranslations} from 'next-intl';
import {MdArrowForward} from 'react-icons/md';
import {Link} from '@/i18n/routing';

export default function ProjectGrid() {
  const t = useTranslations('ProjectListPage.projects');

  const projects = [
    {
      id: 'project1',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVYMH8FKTB0Dw4FpPKzVMhyT4k4T2WIQ-t3YhDA5tZl6HvRgg8YCKSi5QqEeqrWiUNCBF8nWGwGSOu9L4IJm29WJ7cjGn9rT8kuXFCeTU3CwBIkWntw2HoYmNtG_fW6P5Xm6ROR9Xidvwkz_sv_AD7CMygCKsLOhTDJtA9iUA6KuEQq-D_iwVZi6WlNK4tf4kahFB52_T-rpsvWQMNMvnB4FfQJo_ieO97wuUL9xS9uQKE8f_IXLQduByAhqxFfz3XhbeyNYdmm4A9",
      tags: ['PyTorch', 'OpenCV', 'C++', 'NVIDIA TensorRT'],
      m1Label: t('project1.metrics.inference'), m1Val: t('project1.metrics.inferenceValue'),
      m2Label: t('project1.metrics.precision'), m2Val: t('project1.metrics.precisionValue')
    },
    {
      id: 'project2',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQUGtN5f1Iw8EA5QlZ4KNdwSwCS8TIWp1lTZOsp2jGd5ItzPc1EU1W9icq-R_FR5jUw4KpdV3cj7ba5iHeDRAEMcz3G9KFD4iSUaTgvxv7QTDHz9dkw5m9GCdobIEwNUK6pW9yXeYfb54_Kcnrm32NrTq8sI3S-7Lrlce7Q-Gt9L1vHwvQ2IvjYQUZqITO57sjT7VhlMvO_XIOfwwauDHhr1uvYF07mr6J5s7l_0cqHlUcFSmHORVq2GaPcEk9TCaKiXoHaEV5AhgS",
      tags: ['LangChain', 'HuggingFace', 'FastAPI', 'PostgreSQL'],
      m1Label: t('project2.metrics.f1'), m1Val: t('project2.metrics.f1Value'),
      m2Label: t('project2.metrics.efficiency'), m2Val: t('project2.metrics.efficiencyValue')
    },
    {
      id: 'project3',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWGj816ig1kOYOdmLZvnFk7qnAjjcwrBB1JYyH7KS2ebi3x70txeLdVt-FDt5Dffm3qUwZtpaafZHytzuukJUsqygLjdUi6nxHXKw58l0xCEfGFspGzms0UJEhg7A6t1iV-JCSxUHSoZsxzP45SegB_VRYwKba4iTKI2e22rg7-0QiOR54EwN2zvkuj93g4q62flo_x21_rWfxq3_Nzv0fMUzbDwia_v6iwHczjI4mTyxqWgN01eWXFO5GZiV-UhuH91Cz57QKvkcS",
      tags: ['Apache Kafka', 'Spark', 'Kubernetes', 'AWS'],
      m1Label: t('project3.metrics.throughput'), m1Val: t('project3.metrics.throughputValue'),
      m2Label: t('project3.metrics.uptime'), m2Val: t('project3.metrics.uptimeValue')
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
      {projects.map((p) => (
        <div key={p.id} className="group flex flex-col bg-white dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="relative aspect-video w-full overflow-hidden">
            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={t(`${p.id}.title`)} src={p.image}/>
            <div className="absolute top-4 right-4 z-20">
              <span className="bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">{t(`${p.id}.badge`)}</span>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-4 flex-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{t(`${p.id}.title`)}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1">
                {t(`${p.id}.description`)}
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {p.tags.map(tag => (
                <span key={tag} className="font-mono text-[11px] px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">{tag}</span>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center mt-auto">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">{p.m1Label}</span>
                <span className="text-primary font-bold">{p.m1Val}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest">{p.m2Label}</span>
                <span className="text-primary font-bold">{p.m2Val}</span>
              </div>
              <Link href={`/projects/${p.id}`} className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all cursor-pointer">
                <MdArrowForward className="text-base" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

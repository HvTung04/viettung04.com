'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { createProject } from '@/app/admin/actions';

export default function AdminProjectEditor() {
  const [isPending, startTransition] = useTransition();

  const [techStack, setTechStack] = useState<string[]>(['PYTORCH', 'CUDA 12.1']);
  const [techInput, setTechInput] = useState('');

  const [metrics, setMetrics] = useState<{key: string, value: string}[]>([
    { key: 'Inference Time', value: '12ms' },
    { key: 'VRAM Usage', value: '4.2 GB' },
  ]);
  const [metricKey, setMetricKey] = useState('');
  const [metricVal, setMetricVal] = useState('');

  const handleAddTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim().toUpperCase())) {
      setTechStack([...techStack, techInput.trim().toUpperCase()]);
      setTechInput('');
    }
  };

  const handleAddMetric = () => {
    if (metricKey.trim() && metricVal.trim()) {
      setMetrics([...metrics, { key: metricKey.trim(), value: metricVal.trim() }]);
      setMetricKey('');
      setMetricVal('');
    }
  };

  const handleSubmit = (formData: FormData) => {
    // Append JSON representations of the arrays
    formData.append('techStack', JSON.stringify(techStack));
    formData.append('metrics', JSON.stringify(metrics));
    startTransition(() => {
      createProject(formData);
    });
  };

  return (
    <main className="ml-72 pt-16 min-h-screen bg-surface-container-lowest text-on-background pb-24">
      <div className="max-w-6xl mx-auto px-10 py-12">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary bg-primary/10 px-2 py-1 rounded">Project Registry</span>
            <span className="material-symbols-outlined text-slate-700 text-xs" data-icon="chevron_right">chevron_right</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">NEW_ENTITY</span>
          </div>
          <h2 className="text-5xl font-black tracking-tighter text-slate-100">Configure Project Entity</h2>
          <p className="text-slate-400 mt-4 max-w-2xl leading-relaxed">Modify the parameters and technical specifications for the AI-driven deployment. Ensure all metadata aligns with system architecture protocols.</p>
        </div>

        <form action={handleSubmit} className="space-y-8">
          {/* Grid Layout for Core Fields */}
          <div className="grid grid-cols-12 gap-8">
            
            {/* Left Column: Core Identity */}
            <div className="col-span-12 lg:col-span-7 space-y-8">
              <section className="bg-surface-container rounded-xl p-8 border border-outline shadow-sm">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" data-icon="fingerprint">fingerprint</span>
                  Core Identity
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-2">Project Title</label>
                    <input name="title" required className="w-full bg-surface-container-low border border-outline rounded-lg px-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" type="text" placeholder="Neural Synthesis Engine" />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-2">Project Slug</label>
                    <input name="slug" required className="w-full bg-surface-container-low border border-outline rounded-lg px-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-mono" type="text" placeholder="neural-synthesis" />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-2">Short Description</label>
                    <textarea name="description" required className="w-full bg-surface-container-low border border-outline rounded-lg px-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none resize-none" rows={3} placeholder="Next-generation latency reduction framework..."></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-2">Category</label>
                      <select name="category" className="w-full bg-surface-container-low border border-outline rounded-lg px-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none appearance-none">
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Generative AI">Generative AI</option>
                        <option value="Computer Vision">Computer Vision</option>
                        <option value="Systems Architecture">Systems Architecture</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-2">Visibility</label>
                      <select name="visibility" className="w-full bg-surface-container-low border border-outline rounded-lg px-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none appearance-none">
                        <option value="PUBLIC">Public</option>
                        <option value="INTERNAL">Internal</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-surface-container rounded-xl p-8 border border-outline shadow-sm">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" data-icon="description">description</span>
                  Technical Breakdown
                </h3>
                <div className="bg-surface-container-low border border-outline rounded-lg overflow-hidden">
                  <div className="flex items-center gap-4 px-4 py-2 border-b border-outline bg-surface-container-high/50">
                    <button className="text-slate-400 hover:text-primary transition-colors" type="button"><span className="material-symbols-outlined text-lg" data-icon="format_bold">format_bold</span></button>
                    <button className="text-slate-400 hover:text-primary transition-colors" type="button"><span className="material-symbols-outlined text-lg" data-icon="format_italic">format_italic</span></button>
                    <button className="text-slate-400 hover:text-primary transition-colors" type="button"><span className="material-symbols-outlined text-lg" data-icon="format_list_bulleted">format_list_bulleted</span></button>
                    <button className="text-slate-400 hover:text-primary transition-colors" type="button"><span className="material-symbols-outlined text-lg" data-icon="code">code</span></button>
                    <div className="h-4 w-px bg-slate-800 ml-auto"></div>
                    <span className="font-mono text-[10px] text-slate-600 uppercase">Markdown Enabled</span>
                  </div>
                  <textarea name="content" className="w-full bg-transparent border-none focus:ring-0 px-4 py-4 text-slate-300 font-mono text-sm leading-relaxed outline-none" placeholder="Enter technical implementation details..." rows={8}></textarea>
                </div>
              </section>
            </div>

            {/* Right Column: Meta & Links */}
            <div className="col-span-12 lg:col-span-5 space-y-8">
              <section className="bg-surface-container rounded-xl p-8 border border-outline shadow-sm">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" data-icon="link">link</span>
                  Deployment Assets
                </h3>
                <div className="space-y-4">
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-600">GH/</span>
                    <input name="githubUrl" className="w-full bg-surface-container-low border border-outline rounded-lg pl-12 pr-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="username/repository" type="text" />
                  </div>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-600">WWW/</span>
                    <input name="demoUrl" className="w-full bg-surface-container-low border border-outline rounded-lg pl-14 pr-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" placeholder="https://demo.neural.ai" type="text" />
                  </div>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-600">IMG/</span>
                    <input name="imageUrl" className="w-full bg-surface-container-low border border-outline rounded-lg pl-14 pr-4 py-3 text-slate-100 focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none font-mono text-xs" placeholder="https://lh3.googleusercontent.com/..." type="text" />
                  </div>
                </div>
              </section>

              <section className="bg-surface-container rounded-xl p-8 border border-outline shadow-sm">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm" data-icon="memory">memory</span>
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-[10px] font-mono flex items-center gap-2">
                      {tech}
                      <button onClick={() => setTechStack(techStack.filter(t => t !== tech))} className="hover:text-error transition-colors" type="button"><span className="material-symbols-outlined text-[12px]" data-icon="close">close</span></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())} className="w-full bg-surface-container-low border border-outline rounded-lg px-4 py-3 text-slate-100 font-mono text-[10px] uppercase tracking-widest focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="ADD TECHNOLOGY..." type="text" />
                  <button type="button" onClick={handleAddTech} className="px-4 bg-slate-800 text-white rounded-lg hover:bg-primary transition-colors">Add</button>
                </div>
              </section>

              <section className="bg-surface-container rounded-xl p-8 border border-outline shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <span className="material-symbols-outlined text-6xl" data-icon="monitoring">monitoring</span>
                </div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500 mb-6 flex items-center gap-2 relative z-10">
                  <span className="material-symbols-outlined text-sm" data-icon="analytics">analytics</span>
                  Performance Metrics
                </h3>
                <div className="space-y-4 mb-6 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    {metrics.map((m, idx) => (
                      <div key={idx} className="p-3 bg-surface-container-low border border-outline rounded-lg relative group">
                        <button type="button" onClick={() => setMetrics(metrics.filter((_, i) => i !== idx))} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-error transition-all">
                          <span className="material-symbols-outlined text-xs" data-icon="close">close</span>
                        </button>
                        <p className="font-mono text-[9px] text-slate-600 uppercase mb-1 truncate">{m.key}</p>
                        <p className="text-slate-100 font-bold max-w-[90%] truncate" title={m.value}>{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 relative z-10">
                  <input value={metricKey} onChange={e => setMetricKey(e.target.value)} className="w-1/2 bg-surface-container-low border border-outline rounded-lg px-3 py-2 text-slate-100 font-mono text-[10px] uppercase outline-none" placeholder="KEY" type="text" />
                  <input value={metricVal} onChange={e => setMetricVal(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMetric())} className="w-1/2 bg-surface-container-low border border-outline rounded-lg px-3 py-2 text-slate-100 font-mono text-[10px] uppercase outline-none" placeholder="VALUE" type="text" />
                </div>
                <button onClick={handleAddMetric} className="w-full mt-3 py-2 border border-dashed border-slate-800 text-slate-500 text-[10px] font-mono uppercase tracking-widest hover:bg-slate-900/50 hover:text-slate-300 transition-all rounded-lg relative z-10" type="button">
                  + Append Metric
                </button>
              </section>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="fixed bottom-0 left-72 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-900 p-6 flex justify-between items-center z-40">
            <div className="flex items-center gap-4 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-tertiary"></span> System Ready</span>
              <span className="h-3 w-px bg-slate-800"></span>
              <span>Auto-save active</span>
            </div>
            <div className="flex gap-4">
              <Link href="/admin/projects" className="px-8 py-3 bg-slate-900 text-slate-400 font-bold text-sm tracking-wide uppercase rounded-lg border border-slate-800 hover:text-slate-200 transition-all active:scale-95 text-center">
                Cancel
              </Link>
              <button disabled={isPending} className="px-10 py-3 bg-primary text-white font-bold text-sm tracking-wide uppercase rounded-lg shadow-xl shadow-primary/20 hover:brightness-110 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50" type="submit">
                <span className="material-symbols-outlined text-sm" data-icon="save">save</span>
                {isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
        
        {/* Bottom Margin for Scroll Space */}
        <div className="h-32"></div>
      </div>
    </main>
  );
}

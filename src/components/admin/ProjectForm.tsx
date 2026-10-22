'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { createProject, updateProject } from '@/app/admin/actions';
import { useRouter } from 'next/navigation';

export type ProjectFormData = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  visibility: string;
  content: string;
  githubUrl: string;
  demoUrl: string;
  imageUrl: string;
  techStack: { name: string }[];
  metrics: { key: string; value: string }[];
  viTitle: string;
  viDescription: string;
  viContent: string;
  // Case study fields
  challenge?: string;
  solution?: string;
  impact?: string;
  clientName?: string;
  timeline?: string;
  budgetRange?: string;
};

export default function ProjectForm({ initialData }: { initialData?: ProjectFormData }) {
  const router = useRouter();
  const isEditing = !!initialData?.id;
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<'en' | 'vi'>('en');

  const [techStack, setTechStack] = useState<string[]>(
    initialData?.techStack.map((t) => t.name) || ['PYTORCH', 'CUDA 12.1']
  );
  const [techInput, setTechInput] = useState('');

  const [metrics, setMetrics] = useState<{key: string, value: string}[]>(
    initialData?.metrics.map((m) => ({ key: m.key, value: m.value })) || [
      { key: 'Inference Time', value: '12ms' },
      { key: 'VRAM Usage', value: '4.2 GB' },
    ]
  );
  const [metricKey, setMetricKey] = useState('');
  const [metricVal, setMetricVal] = useState('');

  const [enTitle, setEnTitle] = useState(initialData?.title || '');
  const [enDesc, setEnDesc] = useState(initialData?.description || '');
  const [enContent, setEnContent] = useState(initialData?.content || '');
  const [viTitle, setViTitle] = useState(initialData?.viTitle || '');
  const [viDesc, setViDesc] = useState(initialData?.viDescription || '');
  const [viContent, setViContent] = useState(initialData?.viContent || '');

  // Case study fields
  const [challenge, setChallenge] = useState(initialData?.challenge ?? '');
  const [solution, setSolution] = useState(initialData?.solution ?? '');
  const [impact, setImpact] = useState(initialData?.impact ?? '');
  const [clientName, setClientName] = useState(initialData?.clientName ?? '');
  const [timeline, setTimeline] = useState(initialData?.timeline ?? '');
  const [budgetRange, setBudgetRange] = useState(initialData?.budgetRange ?? '');

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
    formData.append('techStack', JSON.stringify(techStack));
    formData.append('metrics', JSON.stringify(metrics));
    formData.set('title', enTitle);
    formData.set('description', enDesc);
    formData.set('content', enContent);
    formData.set('viTitle', viTitle);
    formData.set('viDescription', viDesc);
    formData.set('viContent', viContent);
    
    // Case study fields
    formData.set('challenge', challenge);
    formData.set('solution', solution);
    formData.set('impact', impact);
    formData.set('clientName', clientName);
    formData.set('timeline', timeline);
    formData.set('budgetRange', budgetRange);

    startTransition(() => {
      if (isEditing) {
        updateProject(initialData.id!, formData).then(() => router.push('/admin/projects'));
      } else {
        createProject(formData);
      }
    });
  };

  return (
    <main className="min-h-screen bg-surface-dark text-canvas font-mono pb-24">
      <div className="max-w-5xl mx-auto px-8 py-12">
        
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-[10px] text-mute">[+]</span>
            <span className="font-mono text-[10px] text-mute uppercase tracking-widest">PROJECT REGISTRY</span>
            <span className="text-mute">→</span>
            <span className="font-mono text-[10px] text-mute uppercase tracking-widest">{isEditing ? 'EDIT' : 'NEW'}</span>
          </div>
          <h2 className="text-sm font-bold text-ink-deep">{isEditing ? 'Modify Project' : 'Configure Project'}</h2>
          <p className="text-xs text-mute mt-2">Enter project specifications and metadata.</p>
        </div>

        <form action={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-12 gap-8">
            
            <div className="col-span-12 lg:col-span-7 space-y-8">
              
              <section className="bg-surface-soft border border-hairline rounded-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-mono text-[10px] text-mute uppercase tracking-widest">[1] Core Identity</h3>
                  <div className="flex bg-surface-card rounded-sm border border-hairline">
                    <button type="button" onClick={() => setActiveTab('en')} className={`px-4 py-1.5 text-xs font-bold font-mono rounded-sm transition-colors ${activeTab === 'en' ? 'bg-ink-deep text-canvas' : 'text-mute hover:text-body'}`}>ENG</button>
                    <button type="button" onClick={() => setActiveTab('vi')} className={`px-4 py-1.5 text-xs font-bold font-mono rounded-sm transition-colors ${activeTab === 'vi' ? 'bg-ink-deep text-canvas' : 'text-mute hover:text-body'}`}>VIE</button>
                  </div>
                </div>

                <div className="space-y-6">
                  {activeTab === 'en' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">Project Title (EN)</label>
                        <input value={enTitle} onChange={e => setEnTitle(e.target.value)} required className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none" type="text" placeholder="Neural Synthesis Engine" />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">Short Description (EN)</label>
                        <textarea value={enDesc} onChange={e => setEnDesc(e.target.value)} required className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none resize-none" rows={3} placeholder="Next-generation latency reduction framework..."></textarea>
                      </div>
                    </div>
                  )}

                  {activeTab === 'vi' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">Project Title (VI)</label>
                        <input value={viTitle} onChange={e => setViTitle(e.target.value)} className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none" type="text" placeholder="Tiêu đề tiếng Việt" />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">Short Description (VI)</label>
                        <textarea value={viDesc} onChange={e => setViDesc(e.target.value)} className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none resize-none" rows={3} placeholder="Mô tả dự án..."></textarea>
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-hairline space-y-6">
                    <div>
                      <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">Project Slug</label>
                      <input name="slug" defaultValue={initialData?.slug} required className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none font-mono" type="text" placeholder="neural-synthesis" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">Category</label>
                        <select name="category" defaultValue={initialData?.category || 'Machine Learning'} className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none">
                          <option value="Machine Learning">Machine Learning</option>
                          <option value="Generative AI">Generative AI</option>
                          <option value="Computer Vision">Computer Vision</option>
                          <option value="Systems Architecture">Systems Architecture</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">Visibility</label>
                        <select name="visibility" defaultValue={initialData?.visibility || 'PUBLIC'} className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none">
                          <option value="PUBLIC">Public</option>
                          <option value="INTERNAL">Internal</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-surface-soft border border-hairline rounded-sm p-6">
                <h3 className="font-mono text-[10px] text-mute uppercase tracking-widest mb-6">[2] Technical Breakdown ({activeTab === 'en' ? 'EN' : 'VI'})</h3>
                <textarea 
                  value={activeTab === 'en' ? enContent : viContent} 
                  onChange={e => activeTab === 'en' ? setEnContent(e.target.value) : setViContent(e.target.value)} 
                  className="w-full bg-canvas border border-hairline rounded-sm px-4 py-3 text-xs text-body focus:border-ink focus:outline-none resize-none font-mono" 
                  placeholder="Enter technical implementation details..." 
                  rows={8}
                />
              </section>

              <section className="bg-surface-soft border border-hairline rounded-sm p-6">
                <h3 className="font-mono text-[10px] text-mute uppercase tracking-widest mb-6">[3] Case Study Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">Client Name</label>
                    <input value={clientName} onChange={e => setClientName(e.target.value)} className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none" type="text" placeholder="Acme Corp (optional)" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">Timeline</label>
                      <input value={timeline} onChange={e => setTimeline(e.target.value)} className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none" type="text" placeholder="8 weeks" />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">Budget Range</label>
                      <input value={budgetRange} onChange={e => setBudgetRange(e.target.value)} className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none" type="text" placeholder="$50K - $75K" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">The Challenge</label>
                    <textarea value={challenge} onChange={e => setChallenge(e.target.value)} className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none resize-none" rows={3} placeholder="What problem did the client face?"></textarea>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">The Solution</label>
                    <textarea value={solution} onChange={e => setSolution(e.target.value)} className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none resize-none" rows={4} placeholder="How did you approach and solve it?"></textarea>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">The Impact</label>
                    <textarea value={impact} onChange={e => setImpact(e.target.value)} className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none resize-none" rows={3} placeholder="What measurable results were achieved?"></textarea>
                  </div>
                </div>
              </section>
            </div>

            <div className="col-span-12 lg:col-span-5 space-y-8">
              <section className="bg-surface-soft border border-hairline rounded-sm p-6">
                <h3 className="font-mono text-[10px] text-mute uppercase tracking-widest mb-6">[4] Deployment Assets</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">GitHub URL</label>
                    <input name="githubUrl" defaultValue={initialData?.githubUrl} className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none font-mono" placeholder="username/repository" type="text" />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">Demo URL</label>
                    <input name="demoUrl" defaultValue={initialData?.demoUrl} className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none font-mono" placeholder="https://demo.neural.ai" type="text" />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">Image URL</label>
                    <input name="imageUrl" defaultValue={initialData?.imageUrl} className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none font-mono" placeholder="https://..." type="text" />
                  </div>
                </div>
              </section>

              <section className="bg-surface-soft border border-hairline rounded-sm p-6">
                <h3 className="font-mono text-[10px] text-mute uppercase tracking-widest mb-6">[5] Tech Stack</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {techStack.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-surface-card border border-hairline text-body rounded-sm text-[10px] font-mono flex items-center gap-2">
                      {tech}
                      <button onClick={() => setTechStack(techStack.filter(t => t !== tech))} className="text-mute hover:text-danger transition-colors" type="button">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())} className="w-full bg-canvas border border-hairline rounded-sm px-3 py-2 text-xs text-body focus:border-ink focus:outline-none font-mono uppercase" placeholder="ADD TECHNOLOGY..." type="text" />
                  <button type="button" onClick={handleAddTech} className="px-4 bg-ink-deep text-canvas font-bold rounded-sm text-xs hover:bg-ink transition-colors border border-hairline">Add</button>
                </div>
              </section>

              <section className="bg-surface-soft border border-hairline rounded-sm p-6">
                <h3 className="font-mono text-[10px] text-mute uppercase tracking-widest mb-6">[6] Performance Metrics</h3>
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    {metrics.map((m, idx) => (
                      <div key={idx} className="p-3 bg-surface-card border border-hairline rounded-sm relative group">
                        <button type="button" onClick={() => setMetrics(metrics.filter((_, i) => i !== idx))} className="absolute top-1 right-1 text-mute hover:text-danger transition-colors">×</button>
                        <p className="font-mono text-[9px] text-mute uppercase mb-1 truncate">{m.key}</p>
                        <p className="text-body font-bold text-xs">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <input value={metricKey} onChange={e => setMetricKey(e.target.value)} className="w-1/2 bg-canvas border border-hairline rounded-sm px-3 py-2 text-xs text-body focus:border-ink focus:outline-none font-mono uppercase" placeholder="KEY" type="text" />
                  <input value={metricVal} onChange={e => setMetricVal(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMetric())} className="w-1/2 bg-canvas border border-hairline rounded-sm px-3 py-2 text-xs text-body focus:border-ink focus:outline-none font-mono uppercase" placeholder="VALUE" type="text" />
                </div>
              </section>
            </div>
          </div>

          <div className="fixed bottom-0 left-72 right-0 bg-surface-dark/90 backdrop-blur-md border-t border-hairline p-6 flex justify-between items-center z-40">
            <div className="flex items-center gap-4 text-mute font-mono text-[10px] uppercase tracking-widest">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-success"></div> System Ready</span>
              <span className="h-3 w-px bg-hairline"></span>
              <span>Auto-save active</span>
            </div>
            <div className="flex gap-4">
              <Link href="/admin/projects" className="px-8 py-2.5 bg-surface-card text-body font-bold text-xs uppercase rounded-sm border border-hairline hover:text-ink transition-colors">
                Cancel
              </Link>
              <button disabled={isPending} className="px-10 py-2.5 bg-ink-deep text-canvas font-bold text-xs uppercase rounded-sm border border-hairline hover:bg-ink transition-colors flex items-center gap-2 disabled:opacity-50" type="submit">
                {isPending ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
        
        <div className="h-32"></div>
      </div>
    </main>
  );
}
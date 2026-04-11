'use client';

import { useState } from 'react';
import { 
  MdFormatBold, MdFormatItalic, MdFormatListBulleted,
  MdLink, MdImage, MdCode, MdCloudUpload, MdDelete, 
  MdPublic, MdSchedule, MdSell, MdPreview, MdDeleteForever
} from 'react-icons/md';
import { createBlog, updateBlog } from '@/app/admin/actions';

export default function BlogForm({ initialData }: { initialData?: any }) {
  const [title, setTitle] = useState(initialData?.translations?.[0]?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [status, setStatus] = useState(initialData?.status || 'DRAFT');

  // Basic slug auto-generator
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!initialData) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleSubmit = (formData: FormData) => {
    formData.append('status', status);
    if (initialData) {
      updateBlog(initialData.id, formData);
    } else {
      createBlog(formData);
    }
  };

  return (
    <main className="ml-72 pt-16 min-h-screen">
      <form action={handleSubmit} className="p-10 max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-blue-500 text-[11px] uppercase tracking-[0.2em] mb-2">
              {initialData ? 'Editor Phase / Edit Mode' : 'Editor Phase / Create Mode'}
            </p>
            <h2 className="text-4xl font-black text-slate-100 tracking-tighter">
              {initialData ? 'Edit Engineered Post' : 'New Engineered Post'}
            </h2>
          </div>
          <div className="flex gap-3">
            <button 
              type="submit"
              onClick={() => setStatus('DRAFT')}
              className="px-6 py-3 border border-slate-800 text-slate-300 font-mono text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-colors rounded-xl"
            >
              Save Draft
            </button>
            <button 
              type="submit"
              onClick={() => setStatus('PUBLISHED')}
              className="px-8 py-3 bg-gradient-to-r from-primary to-blue-700 text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20 active:scale-95 transition-all rounded-xl"
            >
              Publish Content
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Form Column */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* Title & Meta */}
            <section className="bg-slate-900/30 p-8 rounded-xl border border-slate-900/50 shadow-sm">
              <div className="space-y-6">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-2">Post Title</label>
                  <input 
                    name="title" 
                    value={title} 
                    onChange={handleTitleChange}
                    required
                    className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-0 rounded-xl px-4 py-4 text-xl font-bold text-slate-100 placeholder:text-slate-700 transition-colors" 
                    placeholder="Enter high-impact headline..." 
                    type="text"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-2">Slug</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-mono text-xs">/blog/</span>
                      <input 
                        name="slug" 
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        required
                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-0 rounded-xl pl-[60px] pr-4 py-3 font-mono text-xs text-blue-400 placeholder:text-slate-700 transition-colors" 
                        type="text"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-2">Category</label>
                    <select 
                      name="category"
                      defaultValue={initialData?.category || ''}
                      required
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-0 rounded-xl px-4 py-3 font-mono text-xs text-slate-300 transition-colors appearance-none"
                    >
                      <option value="" disabled>Select Classification</option>
                      <option value="Intelligence">Intelligence</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Finance">Finance</option>
                      <option value="Ethics">Ethics</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Rich Text Editor Placeholder */}
            <section className="bg-slate-900/30 rounded-xl border border-slate-900/50 overflow-hidden shadow-sm">
              <div className="bg-slate-900 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button type="button" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"><MdFormatBold className="text-lg" /></button>
                  <button type="button" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"><MdFormatItalic className="text-lg" /></button>
                  <button type="button" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"><MdFormatListBulleted className="text-lg" /></button>
                  <div className="w-px h-4 bg-slate-800 mx-2"></div>
                  <button type="button" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"><MdLink className="text-lg" /></button>
                  <button type="button" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"><MdImage className="text-lg" /></button>
                  <button type="button" className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"><MdCode className="text-lg" /></button>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 hidden sm:inline-block">Rich Text Matrix</span>
              </div>
              <div className="p-0">
                <textarea 
                  name="content"
                  defaultValue={initialData?.translations?.[0]?.content || ''}
                  className="w-full bg-slate-950/50 border-none focus:ring-0 p-8 text-slate-300 font-body leading-relaxed resize-none placeholder:text-slate-800" 
                  placeholder="Begin the narrative sequence..." 
                  rows={20}
                ></textarea>
              </div>
              <div className="bg-slate-950 px-6 py-2 border-t border-slate-900 flex justify-between items-center">
                <p className="font-mono text-[9px] text-slate-600">CHAR_COUNT: AUTO</p>
                <p className="font-mono text-[9px] text-slate-600">LIVE_MODE</p>
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            
            {/* Cover Image Placeholder */}
            <section className="bg-slate-900/30 p-6 rounded-xl border border-slate-900/50 shadow-sm">
              <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-4">Cover Asset</label>
              
              <div className="relative group cursor-pointer border-2 border-dashed border-slate-800 hover:border-blue-500 transition-colors rounded-xl overflow-hidden aspect-video bg-slate-950 flex flex-col items-center justify-center gap-4 text-center p-6">
                <MdCloudUpload className="text-4xl text-slate-700 group-hover:text-blue-500 transition-colors" />
                <div>
                  <p className="font-mono text-[10px] text-slate-400 font-bold mb-1">IMAGE URL</p>
                  <p className="font-mono text-[9px] text-slate-600">DIRECT LINK TO FILE</p>
                </div>
              </div>
              
              <div className="mt-4">
                <input 
                  type="text" 
                  name="imageUrl"
                  defaultValue={initialData?.imageUrl || ''}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-0 rounded-xl px-4 py-2 font-mono text-xs text-slate-300 transition-colors"
                />
              </div>
            </section>
            
            {/* Summary / Excerpt */}
            <section className="bg-slate-900/30 p-6 rounded-xl border border-slate-900/50 shadow-sm">
              <label className="block font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-4">Post Summary</label>
              <textarea 
                name="description"
                required
                defaultValue={initialData?.translations?.[0]?.description || ''}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-0 rounded-xl px-4 py-3 font-mono text-xs text-slate-400 transition-colors resize-none leading-relaxed" 
                placeholder="Brief technical abstract..." 
                rows={5}
              ></textarea>
              <p className="mt-2 font-mono text-[8px] sm:text-[9px] text-slate-600 uppercase tracking-widest">Used for card previews and SEO meta description.</p>
            </section>

            {/* Publishing Settings */}
            <section className="bg-slate-950 p-6 rounded-xl border border-slate-900 shadow-sm">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-slate-300 mb-6">Execution Parameters</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/30 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <MdPublic className="text-slate-500 text-lg" />
                    <span className="font-mono text-[10px] text-slate-300">Visibility</span>
                  </div>
                  <select name="visibility" defaultValue={initialData?.visibility || 'PUBLIC'} className="bg-transparent text-blue-500 font-bold text-[10px] uppercase focus:ring-0 border-none appearance-none font-mono text-right p-0">
                    <option value="PUBLIC" className="bg-slate-900">PUBLIC</option>
                    <option value="PRIVATE" className="bg-slate-900">PRIVATE</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border border-transparent">
                  <div className="flex items-center gap-3">
                    <MdSchedule className="text-slate-500 text-lg" />
                    <span className="font-mono text-[10px] text-slate-300">Schedule</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500 font-bold uppercase">Immediate</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border border-transparent">
                  <div className="flex items-center gap-3">
                    <MdSell className="text-slate-500 text-lg" />
                    <span className="font-mono text-[10px] text-slate-300">Indexability</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <span className="font-mono text-[10px] text-tertiary font-bold">OPTIMIZED</span>
                  </div>
                </div>
              </div>
              
              {initialData && (
                <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col gap-3">
                  <button type="button" className="w-full flex items-center justify-center gap-2 font-mono text-[10px] text-slate-500 hover:text-slate-300 py-2 transition-colors">
                    <MdPreview className="text-sm" />
                    LIVE PREVIEW SYSTEM
                  </button>
                  <button type="button" className="w-full flex items-center justify-center gap-2 font-mono text-[10px] text-error/60 hover:text-error py-2 transition-colors">
                    <MdDeleteForever className="text-sm" />
                    DISCARD SEQUENCE
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </form>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { createBlog, updateBlog } from '@/app/admin/actions';

export type BlogFormData = {
  id?: string;
  slug: string;
  status: string;
  category: string;
  visibility: string;
  content?: string;
  imageUrl: string | null;
  translations?: { locale: string; title: string; description: string; content: string | null }[];
};

export default function BlogForm({ initialData }: { initialData?: BlogFormData }) {
  const [title, setTitle] = useState(initialData?.translations?.[0]?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [status, setStatus] = useState(initialData?.status || 'DRAFT');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!initialData) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleSubmit = (formData: FormData) => {
    formData.append('status', status);
    if (initialData?.id) {
      updateBlog(initialData.id, formData);
    } else {
      createBlog(formData);
    }
  };

  return (
    <main className="min-h-screen bg-surface-dark text-canvas font-mono">
      <form action={handleSubmit} className="p-8 max-w-5xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] text-mute uppercase tracking-widest mb-2">
              {initialData ? '[+] EDIT MODE' : '[+] CREATE MODE'}
            </p>
            <h2 className="text-sm font-bold text-ink-deep">
              {initialData ? 'Edit Blog Post' : 'New Blog Post'}
            </h2>
          </div>
          <div className="flex gap-3">
            <button type="submit" onClick={() => setStatus('DRAFT')} className="px-6 py-2.5 border border-hairline text-body font-mono text-xs uppercase tracking-widest rounded-sm hover:bg-surface-card transition-colors">
              Save Draft
            </button>
            <button type="submit" onClick={() => setStatus('PUBLISHED')} className="px-8 py-2.5 bg-ink-deep text-canvas font-bold text-xs uppercase tracking-widest rounded-sm border border-hairline hover:bg-ink transition-colors">
              Publish
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            <section className="bg-surface-soft border border-hairline rounded-sm p-6">
              <div className="space-y-6">
                <div>
                  <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">Post Title</label>
                  <input name="title" value={title} onChange={handleTitleChange} required className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 text-xs text-body focus:border-ink focus:outline-none" type="text" placeholder="Enter headline..." />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">Slug</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-mute font-mono text-xs">/blog/</span>
                      <input name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required className="w-full bg-canvas border border-hairline rounded-sm pl-16 pr-4 py-2.5 font-mono text-xs text-body focus:border-ink focus:outline-none" type="text" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-2">Category</label>
                    <select name="category" defaultValue={initialData?.category || ''} required className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 font-mono text-xs text-body focus:border-ink focus:outline-none">
                      <option value="" disabled>Select Category</option>
                      <option value="Intelligence">Intelligence</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Finance">Finance</option>
                      <option value="Ethics">Ethics</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-surface-soft border border-hairline rounded-sm p-6">
              <h3 className="font-mono text-[10px] text-mute uppercase tracking-widest mb-6">[+] Content</h3>
              <textarea name="content" defaultValue={initialData?.translations?.[0]?.content || ''} className="w-full bg-canvas border border-hairline rounded-sm px-4 py-3 text-xs text-body focus:border-ink focus:outline-none resize-none font-mono" placeholder="Begin writing..." rows={16}></textarea>
            </section>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-8">
            <section className="bg-surface-soft border border-hairline rounded-sm p-6">
              <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-4">Cover Image URL</label>
              <input type="text" name="imageUrl" defaultValue={initialData?.imageUrl || ''} placeholder="https://..." className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 font-mono text-xs text-body focus:border-ink focus:outline-none" />
            </section>
            
            <section className="bg-surface-soft border border-hairline rounded-sm p-6">
              <label className="block font-mono text-[10px] text-mute uppercase tracking-widest mb-4">Post Summary</label>
              <textarea name="description" required defaultValue={initialData?.translations?.[0]?.description || ''} className="w-full bg-canvas border border-hairline rounded-sm px-4 py-2.5 font-mono text-xs text-body focus:border-ink focus:outline-none resize-none" placeholder="Brief abstract..." rows={5}></textarea>
              <p className="mt-2 font-mono text-[8px] text-mute uppercase tracking-widest">Used for card previews and SEO.</p>
            </section>

            <section className="bg-surface-soft border border-hairline rounded-sm p-6">
              <h4 className="font-mono text-[10px] text-mute uppercase tracking-widest mb-6">[+] Settings</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-sm bg-surface-card border border-hairline">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-body">Visibility</span>
                  </div>
                  <select name="visibility" defaultValue={initialData?.visibility || 'PUBLIC'} className="bg-transparent text-body font-mono text-xs uppercase focus:outline-none border-none">
                    <option value="PUBLIC" className="bg-surface-dark">PUBLIC</option>
                    <option value="PRIVATE" className="bg-surface-dark">PRIVATE</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-body">Schedule</span>
                  </div>
                  <span className="font-mono text-[10px] text-mute uppercase">Immediate</span>
                </div>
              </div>
              
              {initialData && (
                <div className="mt-6 pt-6 border-t border-hairline">
                  <button type="button" className="w-full font-mono text-[10px] text-mute hover:text-ink py-2 transition-colors uppercase">
                    Preview
                  </button>
                  <button type="button" className="w-full font-mono text-[10px] text-danger hover:text-danger py-2 transition-colors uppercase">
                    Delete Post
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
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import prisma from '@/lib/db';
import type { Project } from '@prisma/client';
import { deleteProject } from '@/app/admin/actions';

export const dynamic = 'force-dynamic';

export default async function AdminProjectList() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const activeCount = projects.filter((p: Project) => p.status === 'ACTIVE').length;

  return (
    <main className="ml-72 pt-16 p-8 min-h-screen bg-surface text-on-surface">
      {/* Hero Header */}
      <div className="flex justify-between items-end mb-12 pt-8">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-500 mb-2">Portfolio Management</div>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase leading-none">AI Intelligence Assets</h2>
        </div>
        <Link href="/admin/projects/new" className="flex items-center gap-2 bg-primary px-6 py-3 rounded-lg text-white font-bold text-sm hover:shadow-[0_0_20px_rgba(60,131,246,0.3)] transition-all active:scale-95">
          <span className="material-symbols-outlined text-lg" data-icon="add_circle">add_circle</span>
          Add New Project
        </Link>
      </div>

      {/* Stats Bento (Quick Metrics) */}
      <div className="grid grid-cols-4 gap-6 mb-12">
        <div className="bg-surface-container p-6 rounded-xl border border-slate-800 flex flex-col justify-between h-32">
          <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">Total Projects</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white mono-data">{projects.length}</span>
          </div>
        </div>
        <div className="bg-surface-container p-6 rounded-xl border border-slate-800 flex flex-col justify-between h-32">
          <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">Active Nodes</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white mono-data">{activeCount}</span>
            <span className="text-blue-500 text-[10px] font-bold">STABLE</span>
          </div>
        </div>
        <div className="bg-surface-container p-6 rounded-xl border border-slate-800 flex flex-col justify-between h-32">
          <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">Resource Load</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white mono-data">64%</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden ml-4">
              <div className="bg-blue-500 h-full w-[64%]"></div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container p-6 rounded-xl border border-slate-800 flex flex-col justify-between h-32">
          <span className="font-mono text-[10px] text-slate-500 tracking-widest uppercase">System Uptime</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white mono-data">99.9</span>
            <span className="text-slate-500 text-xs font-mono uppercase tracking-tighter">ms</span>
          </div>
        </div>
      </div>

      {/* Project Listing Table Container */}
      <div className="bg-surface-container-low rounded-xl border border-slate-800 overflow-hidden">
        <div className="px-8 py-4 border-b border-slate-800 flex justify-between items-center">
          <div className="flex gap-4">
            <button className="text-[11px] font-mono font-bold text-blue-400 tracking-widest uppercase border-b border-blue-500 pb-1">All Projects</button>
            <button className="text-[11px] font-mono font-bold text-slate-500 tracking-widest uppercase pb-1 hover:text-slate-300 transition-colors">Drafts</button>
            <button className="text-[11px] font-mono font-bold text-slate-500 tracking-widest uppercase pb-1 hover:text-slate-300 transition-colors">Archived</button>
          </div>
          <button className="text-slate-500 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-xl" data-icon="filter_list">filter_list</span>
          </button>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 border-b border-slate-900 bg-surface-container/30">
              <th className="px-8 py-5 font-medium">Project Name & ID</th>
              <th className="px-8 py-5 font-medium">Category</th>
              <th className="px-8 py-5 font-medium">Date Added</th>
              <th className="px-8 py-5 font-medium">Status</th>
              <th className="px-8 py-5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-slate-500 font-mono text-sm uppercase tracking-widest">
                  No projects found.
                </td>
              </tr>
            ) : projects.map((p: Project) => (
              <tr key={p.id} className="group hover:bg-slate-900/40 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700">
                      {p.imageUrl ? (
                        <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" src={p.imageUrl} alt={p.title}/>
                      ) : (
                        <span className="material-symbols-outlined text-slate-600">image</span>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-slate-200">{p.title}</div>
                      <div className="text-[10px] font-mono text-blue-500/60 uppercase mt-0.5">UID-{p.id.substring(0, 8)}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-[11px] font-mono font-bold bg-slate-800/50 text-slate-300 px-3 py-1 rounded-full uppercase tracking-wider border border-slate-700/50">{p.category}</span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-xs font-mono text-slate-400 uppercase">{p.createdAt.toLocaleDateString()}</span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    {p.status === 'ACTIVE' ? (
                      <>
                        <div className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        <span className="text-[10px] font-mono font-black text-tertiary uppercase tracking-widest">Active</span>
                      </>
                    ) : (
                      <>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                        <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">{p.status.toLowerCase()}</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/projects/${p.slug}`} target="_blank" className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-blue-500 hover:text-white rounded transition-all text-slate-400" title="View Public Page">
                      <span className="material-symbols-outlined text-sm" data-icon="visibility">visibility</span>
                    </Link>
                    <Link href={`/admin/projects/${p.id}`} className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-blue-500 hover:text-white rounded transition-all text-slate-400" title="Edit">
                      <span className="material-symbols-outlined text-sm" data-icon="edit">edit</span>
                    </Link>
                    <form action={deleteProject.bind(null, p.id)}>
                      <button type="submit" className="w-8 h-8 flex items-center justify-center bg-slate-800 hover:bg-error hover:text-white rounded transition-all text-slate-400" title="Delete">
                        <span className="material-symbols-outlined text-sm" data-icon="delete">delete</span>
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Table Footer / Pagination */}
        <div className="px-8 py-4 bg-slate-950/50 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-slate-500 border-t border-slate-800">
          <div>Showing {projects.length} Projects</div>
          <div className="flex gap-4 items-center">
            <button className="hover:text-white transition-colors disabled:opacity-30" disabled>
              <span className="material-symbols-outlined text-sm" data-icon="chevron_left">chevron_left</span>
            </button>
            <span className="text-blue-500 font-black">Page 01</span>
            <button className="hover:text-white transition-colors disabled:opacity-30" disabled>
              <span className="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed bottom-0 right-0 p-8 pointer-events-none opacity-[0.03]">
        <div className="text-[150px] font-black text-white leading-none select-none">COBALT</div>
      </div>
    </main>
  );
}

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
    <main className="p-8">
      <div className="mb-12 pt-8">
        <h1 className="text-sm font-bold text-on-dark mb-1">[+] PROJECTS</h1>
        <p className="text-xs text-on-dark-muted">Manage project entries</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-dark-elevated border border-hairline rounded-sm p-6">
          <div className="text-xs text-on-dark-muted mb-2">[P] Total Projects</div>
          <div className="text-2xl font-bold text-on-dark">{projects.length}</div>
        </div>
        <div className="bg-surface-dark-elevated border border-hairline rounded-sm p-6">
          <div className="text-xs text-on-dark-muted mb-2">[A] Active Nodes</div>
          <div className="text-2xl font-bold text-on-dark">{activeCount}</div>
        </div>
        <div className="bg-surface-dark-elevated border border-hairline rounded-sm p-6">
          <div className="text-xs text-on-dark-muted mb-2">[~] Resource Load</div>
          <div className="text-2xl font-bold text-on-dark">64%</div>
        </div>
        <div className="bg-surface-dark-elevated border border-hairline rounded-sm p-6">
          <div className="text-xs text-on-dark-muted mb-2">[U] Uptime</div>
          <div className="text-2xl font-bold text-on-dark">99.9ms</div>
        </div>
      </div>

      <div className="bg-surface-dark-elevated border border-hairline rounded-sm overflow-hidden mb-8">
        <div className="px-6 py-3 border-b border-hairline flex justify-between items-center">
          <div className="flex gap-4">
            <button className="text-xs font-bold text-on-dark border-b border-on-dark pb-0.5">All Projects</button>
            <button className="text-xs font-bold text-on-dark-muted border-b border-transparent pb-0.5 hover:text-on-dark">Drafts</button>
            <button className="text-xs font-bold text-on-dark-muted border-b border-transparent pb-0.5 hover:text-on-dark">Archived</button>
          </div>
          <button className="text-on-dark-muted hover:text-on-dark transition-colors text-xs">[filter]</button>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] text-on-dark-muted border-b border-hairline">
              <th className="px-6 py-3 font-bold">Project Name</th>
              <th className="px-6 py-3 font-bold">Category</th>
              <th className="px-6 py-3 font-bold">Date</th>
              <th className="px-6 py-3 font-bold">Status</th>
              <th className="px-6 py-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-on-dark-muted text-xs">
                  No projects found.
                </td>
              </tr>
            ) : projects.map((p: Project) => (
              <tr key={p.id} className="group hover:bg-surface-dark transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-sm bg-surface-dark border border-hairline flex items-center justify-center overflow-hidden">
                      {p.imageUrl ? (
                        <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" src={p.imageUrl} alt={p.title}/>
                      ) : (
                        <span className="text-on-dark-muted text-xs">[img]</span>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-on-dark text-xs">{p.title}</div>
                      <div className="text-[10px] text-on-dark-muted mt-0.5">ID: {p.id.substring(0, 8)}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-mono bg-surface-dark text-on-dark px-2 py-0.5 rounded-sm border border-hairline">{p.category}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-on-dark-muted">{p.createdAt.toLocaleDateString()}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {p.status === 'ACTIVE' ? (
                      <>
                        <div className="w-1.5 h-1.5 rounded-sm bg-success"></div>
                        <span className="text-[10px] font-bold text-success">ACTIVE</span>
                      </>
                    ) : (
                      <>
                        <div className="w-1.5 h-1.5 rounded-sm bg-on-dark-muted"></div>
                        <span className="text-[10px] font-bold text-on-dark-muted">{p.status.toLowerCase()}</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/projects/${p.slug}`} target="_blank" className="text-on-dark-muted hover:text-on-dark transition-colors text-xs" title="View">
                      [view]
                    </Link>
                    <Link href={`/admin/projects/${p.id}`} className="text-on-dark-muted hover:text-on-dark transition-colors text-xs" title="Edit">
                      [edit]
                    </Link>
                    <form action={deleteProject.bind(null, p.id)}>
                      <button type="submit" className="text-on-dark-muted hover:text-danger transition-colors text-xs" title="Delete">
                        [del]
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-3 bg-surface-dark flex justify-between items-center text-[10px] text-on-dark-muted border-t border-hairline">
          <div>Showing {projects.length} projects</div>
          <div className="flex gap-4 items-center">
            <button className="hover:text-on-dark transition-colors disabled:opacity-30" disabled>[&lt;]</button>
            <span className="text-on-dark font-bold">01</span>
            <button className="hover:text-on-dark transition-colors disabled:opacity-30" disabled>[&gt;]</button>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Link href="/admin/projects/new" className="bg-ink-deep text-canvas font-bold py-2 px-4 rounded-sm text-xs hover:bg-ink transition-colors border border-hairline">
          [+] New Project
        </Link>
      </div>
    </main>
  );
}
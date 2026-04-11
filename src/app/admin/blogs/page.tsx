import Link from 'next/link';
import prisma from '@/lib/db';
import { 
  MdFilterList, MdRocketLaunch, MdBolt, MdArchitecture, 
  MdToken, MdMemory, MdVisibility, MdEditNote, MdDeleteSweep,
  MdArrowBack, MdArrowForward
} from 'react-icons/md';
import { deleteBlog } from '@/app/admin/actions';

export const dynamic = 'force-dynamic';

export default async function AdminBlogList() {
  const blogs = await prisma.blog.findMany({
    include: { translations: true },
    orderBy: { createdAt: 'desc' }
  });

  const publishedCount = blogs.filter(b => b.status === 'PUBLISHED').length;
  const draftCount = blogs.filter(b => b.status === 'DRAFT').length;
  const totalViews = blogs.reduce((acc, b) => acc + (b.views || 0), 0);
  
  const formatViews = (views: number) => {
    if (views === 0) return '0';
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'k';
    return views.toString();
  };

  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'intelligence': return <MdBolt className="text-xl" />;
      case 'engineering': return <MdArchitecture className="text-xl" />;
      case 'finance': return <MdToken className="text-xl" />;
      case 'ethics': return <MdMemory className="text-xl" />;
      default: return <MdBolt className="text-xl" />;
    }
  };

  return (
    <main className="ml-72 pt-16 min-h-screen">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="font-black text-4xl tracking-tight text-white mb-2">Engineered Posts</h1>
            <p className="text-slate-400 font-body">Manage and deploy neural-generated content assets across the system nodes.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-slate-200 rounded-xl font-bold text-sm active:scale-95 hover:bg-slate-700 transition-all border border-slate-700">
              <MdFilterList className="text-lg" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-bold text-sm active:scale-95 shadow-lg shadow-blue-500/20 transition-all">
              <MdRocketLaunch className="text-lg" />
              Deploy Changes
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-surface-container p-6 rounded-xl border border-slate-800/50 shadow-sm">
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-4">Total Assets</div>
            <div className="text-3xl font-black text-blue-500">{blogs.length}</div>
            <div className="mt-2 text-[10px] font-mono text-tertiary">+12.4% vs last cycle</div>
          </div>
          <div className="bg-surface-container p-6 rounded-xl border border-slate-800/50 shadow-sm">
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-4">Live Nodes</div>
            <div className="text-3xl font-black text-white">{publishedCount}</div>
            <div className="mt-2 text-[10px] font-mono text-slate-400">{((publishedCount / Math.max(blogs.length, 1)) * 100).toFixed(1)}% Distribution</div>
          </div>
          <div className="bg-surface-container p-6 rounded-xl border border-slate-800/50 shadow-sm">
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-4">Draft Fragments</div>
            <div className="text-3xl font-black text-white">{draftCount}</div>
            <div className="mt-2 text-[10px] font-mono text-slate-400">Awaiting validation</div>
          </div>
          <div className="bg-surface-container p-6 rounded-xl border border-slate-800/50 shadow-sm">
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500 mb-4">System Views</div>
            <div className="text-3xl font-black text-white">{formatViews(totalViews)}</div>
            <div className="mt-2 text-[10px] font-mono text-tertiary">+4.1% performance</div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-surface-container-low rounded-xl border border-slate-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50">
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-900">Title & Core Logic</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-900">Category</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-900">Status</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-900">Last Sync</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-900">Engagement</th>
                  <th className="px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-900 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-500 font-mono text-sm uppercase tracking-widest">
                      No blog assets found.
                    </td>
                  </tr>
                ) : blogs.map(b => {
                  const title = b.translations?.[0]?.title || b.slug;
                  return (
                    <tr key={b.id} className="hover:bg-slate-800/20 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center ${b.status === 'PUBLISHED' ? 'text-blue-500' : 'text-slate-500'}`}>
                            {getCategoryIcon(b.category)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{title}</div>
                            <div className="text-xs text-slate-500 font-mono mt-0.5">ID: {b.id.substring(0, 9)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-2 py-1 bg-slate-800 text-slate-400 font-mono text-[10px] uppercase tracking-wider rounded">{b.category}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          {b.status === 'PUBLISHED' ? (
                            <>
                              <div className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></div>
                              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-tertiary">Published</span>
                            </>
                          ) : (
                            <>
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-slate-500">Draft</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className={`text-sm font-mono ${b.status === 'PUBLISHED' ? 'text-slate-400' : 'text-slate-600'}`}>
                          {b.status === 'PUBLISHED' ? b.createdAt.toISOString().slice(0, 10).replace(/-/g, '.') : 'Pending Sync'}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className={`text-sm font-bold ${b.status === 'PUBLISHED' ? 'text-slate-200' : 'text-slate-600'}`}>{formatViews(b.views || 0)} <span className="text-slate-600 font-normal">views</span></div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/blog/${b.slug}`} target="_blank" className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all" title="View">
                            <MdVisibility className="text-lg" />
                          </Link>
                          <Link href={`/admin/blogs/${b.id}`} className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all" title="Edit">
                            <MdEditNote className="text-lg" />
                          </Link>
                          <form action={deleteBlog.bind(null, b.id)}>
                            <button type="submit" className="p-2 text-slate-500 hover:text-error hover:bg-error/10 rounded-lg transition-all" title="Delete">
                              <MdDeleteSweep className="text-lg" />
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/30 border-t border-slate-900">
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Showing 1-{blogs.length} of {blogs.length} assets</div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-500 hover:text-slate-200 bg-slate-900 rounded-lg border border-slate-800 active:scale-95 transition-all disabled:opacity-30" disabled>
                <MdArrowBack />
              </button>
              <button className="px-4 py-2 bg-slate-800 text-blue-400 font-mono text-[10px] rounded-lg border border-blue-500/30">01</button>
              <button className="p-2 text-slate-500 hover:text-slate-200 bg-slate-900 rounded-lg border border-slate-800 active:scale-95 transition-all disabled:opacity-30" disabled>
                <MdArrowForward />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-12 flex items-center justify-between text-slate-600 font-mono text-[9px] uppercase tracking-[0.2em]">
          <div>Last Global Sync: 14:02:11 GMT+0</div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-blue-500"></span> Primary Core Stable</span>
            <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-tertiary"></span> API Up-time 99.98%</span>
          </div>
        </div>
      </div>
    </main>
  );
}

import Link from 'next/link';
import prisma from '@/lib/db';
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

  return (
    <main className="p-8">
      <div className="mb-12 pt-8">
        <h1 className="text-sm font-bold text-on-dark mb-1">[+] BLOGS</h1>
        <p className="text-xs text-on-dark-muted">Manage blog posts</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-dark-elevated border border-hairline rounded-sm p-6">
          <div className="text-xs text-on-dark-muted mb-2">[T] Total Assets</div>
          <div className="text-2xl font-bold text-on-dark">{blogs.length}</div>
        </div>
        <div className="bg-surface-dark-elevated border border-hairline rounded-sm p-6">
          <div className="text-xs text-on-dark-muted mb-2">[L] Live Nodes</div>
          <div className="text-2xl font-bold text-on-dark">{publishedCount}</div>
        </div>
        <div className="bg-surface-dark-elevated border border-hairline rounded-sm p-6">
          <div className="text-xs text-on-dark-muted mb-2">[D] Drafts</div>
          <div className="text-2xl font-bold text-on-dark">{draftCount}</div>
        </div>
        <div className="bg-surface-dark-elevated border border-hairline rounded-sm p-6">
          <div className="text-xs text-on-dark-muted mb-2">[V] Total Views</div>
          <div className="text-2xl font-bold text-on-dark">{formatViews(totalViews)}</div>
        </div>
      </div>

      <div className="bg-surface-dark-elevated border border-hairline rounded-sm overflow-hidden mb-8">
        <div className="px-6 py-3 border-b border-hairline flex justify-between items-center">
          <div className="flex gap-4">
            <button className="text-xs font-bold text-on-dark border-b border-on-dark pb-0.5">All Posts</button>
            <button className="text-xs font-bold text-on-dark-muted border-b border-transparent pb-0.5 hover:text-on-dark">Published</button>
            <button className="text-xs font-bold text-on-dark-muted border-b border-transparent pb-0.5 hover:text-on-dark">Drafts</button>
          </div>
          <button className="text-on-dark-muted hover:text-on-dark transition-colors text-xs">[filter]</button>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] text-on-dark-muted border-b border-hairline">
              <th className="px-6 py-3 font-bold">Title</th>
              <th className="px-6 py-3 font-bold">Category</th>
              <th className="px-6 py-3 font-bold">Status</th>
              <th className="px-6 py-3 font-bold">Date</th>
              <th className="px-6 py-3 font-bold">Views</th>
              <th className="px-6 py-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline">
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-on-dark-muted text-xs">
                  No blog posts found.
                </td>
              </tr>
            ) : blogs.map(b => {
              const title = b.translations?.[0]?.title || b.slug;
              return (
                <tr key={b.id} className="group hover:bg-surface-dark transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-bold text-on-dark text-xs">{title}</div>
                      <div className="text-[10px] text-on-dark-muted mt-0.5">ID: {b.id.substring(0, 8)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-mono bg-surface-dark text-on-dark px-2 py-0.5 rounded-sm border border-hairline">{b.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {b.status === 'PUBLISHED' ? (
                        <>
                          <div className="w-1.5 h-1.5 rounded-sm bg-success"></div>
                          <span className="text-[10px] font-bold text-success">PUBLISHED</span>
                        </>
                      ) : (
                        <>
                          <div className="w-1.5 h-1.5 rounded-sm bg-on-dark-muted"></div>
                          <span className="text-[10px] font-bold text-on-dark-muted">DRAFT</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-on-dark-muted">{b.createdAt.toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-on-dark">{formatViews(b.views || 0)}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/blog/${b.slug}`} target="_blank" className="text-on-dark-muted hover:text-on-dark transition-colors text-xs" title="View">
                        [view]
                      </Link>
                      <Link href={`/admin/blogs/${b.id}`} className="text-on-dark-muted hover:text-on-dark transition-colors text-xs" title="Edit">
                        [edit]
                      </Link>
                      <form action={deleteBlog.bind(null, b.id)}>
                        <button type="submit" className="text-on-dark-muted hover:text-danger transition-colors text-xs" title="Delete">
                          [del]
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="px-6 py-3 bg-surface-dark flex justify-between items-center text-[10px] text-on-dark-muted border-t border-hairline">
          <div>Showing 1-{blogs.length} of {blogs.length} posts</div>
          <div className="flex gap-4 items-center">
            <button className="hover:text-on-dark transition-colors disabled:opacity-30" disabled>[&lt;]</button>
            <span className="text-on-dark font-bold">01</span>
            <button className="hover:text-on-dark transition-colors disabled:opacity-30" disabled>[&gt;]</button>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Link href="/admin/blogs/new" className="bg-ink-deep text-canvas font-bold py-2 px-4 rounded-sm text-xs hover:bg-ink transition-colors border border-hairline">
          [+] New Post
        </Link>
      </div>
    </main>
  );
}
import prisma from '@/lib/db';

export default async function AdminPage() {
  const [projectCount, blogCount, submissionCount, testimonialCount, subscriberCount] = await Promise.all([
    prisma.project.count(),
    prisma.blog.count(),
    prisma.contactSubmission.count(),
    prisma.testimonial.count(),
    prisma.newsletterSubscription.count(),
  ]);

  return (
    <div className="px-8 pb-8 min-h-screen">
      <div className="mb-12">
        <h1 className="text-sm font-bold text-on-dark mb-1">[+] DASHBOARD</h1>
        <p className="text-xs text-on-dark-muted">System overview and quick actions</p>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-surface-dark-elevated border border-hairline rounded-sm p-6">
          <div className="text-xs text-on-dark-muted mb-2">[P] Projects</div>
          <div className="text-2xl font-bold text-on-dark">{projectCount}</div>
          <div className="text-xs text-on-dark-muted mt-1">Total deployed</div>
        </div>
        <div className="bg-surface-dark-elevated border border-hairline rounded-sm p-6">
          <div className="text-xs text-on-dark-muted mb-2">[B] Blogs</div>
          <div className="text-2xl font-bold text-on-dark">{blogCount}</div>
          <div className="text-xs text-on-dark-muted mt-1">Published drafts</div>
        </div>
        <div className="bg-surface-dark-elevated border border-hairline rounded-sm p-6">
          <div className="text-xs text-on-dark-muted mb-2">[S] Submissions</div>
          <div className="text-2xl font-bold text-on-dark">{submissionCount}</div>
          <div className="text-xs text-on-dark-muted mt-1">New inquiries</div>
        </div>
        <div className="bg-surface-dark-elevated border border-hairline rounded-sm p-6">
          <div className="text-xs text-on-dark-muted mb-2">[T] Testimonials</div>
          <div className="text-2xl font-bold text-on-dark">{testimonialCount}</div>
          <div className="text-xs text-on-dark-muted mt-1">Client stories</div>
        </div>
        <div className="bg-surface-dark-elevated border border-hairline rounded-sm p-6">
          <div className="text-xs text-on-dark-muted mb-2">[N] Subscribers</div>
          <div className="text-2xl font-bold text-on-dark">{subscriberCount}</div>
          <div className="text-xs text-on-dark-muted mt-1">Newsletter</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <a href="/admin/projects" className="group bg-surface-dark-elevated border border-hairline hover:border-on-dark rounded-sm p-6 transition-colors">
          <div className="text-xs font-bold text-on-dark group-hover:text-on-dark transition-colors">[+] Manage Projects</div>
          <div className="text-xs text-on-dark-muted mt-1">View, edit and create project entries</div>
        </a>
        <a href="/admin/blogs" className="group bg-surface-dark-elevated border border-hairline hover:border-on-dark rounded-sm p-6 transition-colors">
          <div className="text-xs font-bold text-on-dark group-hover:text-on-dark transition-colors">[+] Manage Blogs</div>
          <div className="text-xs text-on-dark-muted mt-1">View, edit and create blog posts</div>
        </a>
        <a href="/admin/submissions" className="group bg-surface-dark-elevated border border-hairline hover:border-on-dark rounded-sm p-6 transition-colors">
          <div className="text-xs font-bold text-on-dark group-hover:text-on-dark transition-colors">[+] View Submissions</div>
          <div className="text-xs text-on-dark-muted mt-1">Review contact form inquiries</div>
        </a>
        <a href="/admin/testimonials" className="group bg-surface-dark-elevated border border-hairline hover:border-on-dark rounded-sm p-6 transition-colors">
          <div className="text-xs font-bold text-on-dark group-hover:text-on-dark transition-colors">[+] Manage Testimonials</div>
          <div className="text-xs text-on-dark-muted mt-1">Client success stories</div>
        </a>
        <a href="/admin/newsletter" className="group bg-surface-dark-elevated border border-hairline hover:border-on-dark rounded-sm p-6 transition-colors">
          <div className="text-xs font-bold text-on-dark group-hover:text-on-dark transition-colors">[+] Newsletter</div>
          <div className="text-xs text-on-dark-muted mt-1">Manage subscribers</div>
        </a>
      </div>
    </div>
  );
}
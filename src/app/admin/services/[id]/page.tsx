import { notFound } from 'next/navigation';
import { getService, updateService } from '../actions';

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await getService(id);

  if (!service) {
    notFound();
  }

  const viTranslation = service.translations.find((t) => t.locale === 'vi');

  return (
    <div className="px-8 pb-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-sm font-bold text-on-dark mb-1">[+] EDIT SERVICE</h1>
        <p className="text-xs text-on-dark-muted">Update service details</p>
      </div>

      <form action={updateService.bind(null, id)} className="space-y-6">
        {/* English (Default) */}
        <div className="border border-hairline rounded-sm p-4">
          <h3 className="text-xs font-bold text-on-dark mb-4 uppercase tracking-widest">English (Default)</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Title</label>
              <input
                name="title"
                type="text"
                required
                defaultValue={service.title}
                className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Description</label>
              <textarea
                name="description"
                required
                rows={3}
                defaultValue={service.description}
                className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Vietnamese */}
        <div className="border border-hairline rounded-sm p-4">
          <h3 className="text-xs font-bold text-on-dark mb-4 uppercase tracking-widest">Vietnamese</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Title (VI)</label>
              <input
                name="viTitle"
                type="text"
                defaultValue={viTranslation?.title || ''}
                className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Description (VI)</label>
              <textarea
                name="viDescription"
                rows={3}
                defaultValue={viTranslation?.description || ''}
                className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Category</label>
            <input
              name="category"
              type="text"
              required
              defaultValue={service.category}
              className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Icon</label>
            <input
              name="icon"
              type="text"
              defaultValue={service.icon || ''}
              className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Tags (comma-separated)</label>
          <input
            name="tags"
            type="text"
            defaultValue={service.tags || ''}
            className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Order</label>
            <input
              name="order"
              type="number"
              defaultValue={service.order}
              className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Status</label>
            <select
              name="status"
              defaultValue={service.status}
              className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="bg-accent text-canvas px-6 py-2 rounded-sm text-xs font-bold hover:bg-accent-hover transition-colors"
          >
            [+] Update Service
          </button>
          <a
            href="/admin/services"
            className="bg-surface-dark-elevated text-on-dark px-6 py-2 rounded-sm text-xs font-bold hover:bg-surface-dark border border-hairline transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

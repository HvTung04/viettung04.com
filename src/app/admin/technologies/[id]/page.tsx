import { notFound } from 'next/navigation';
import { getTechnology, updateTechnology } from '../actions';

export default async function EditTechnologyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const technology = await getTechnology(id);

  if (!technology) {
    notFound();
  }

  const viTranslation = technology.translations.find((t) => t.locale === 'vi');

  return (
    <div className="px-8 pb-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-sm font-bold text-on-dark mb-1">[+] EDIT TECHNOLOGY</h1>
        <p className="text-xs text-on-dark-muted">Update technology details</p>
      </div>

      <form action={updateTechnology.bind(null, id)} className="space-y-6">
        {/* English (Default) */}
        <div className="border border-hairline rounded-sm p-4">
          <h3 className="text-xs font-bold text-on-dark mb-4 uppercase tracking-widest">English (Default)</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Name</label>
              <input
                name="name"
                type="text"
                required
                defaultValue={technology.name}
                className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Description</label>
              <input
                name="description"
                type="text"
                defaultValue={technology.description || ''}
                className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Vietnamese */}
        <div className="border border-hairline rounded-sm p-4">
          <h3 className="text-xs font-bold text-on-dark mb-4 uppercase tracking-widest">Vietnamese</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Name (VI)</label>
              <input
                name="viName"
                type="text"
                defaultValue={viTranslation?.name || ''}
                className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Description (VI)</label>
              <input
                name="viDescription"
                type="text"
                defaultValue={viTranslation?.description || ''}
                className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Category</label>
          <select
            name="category"
            required
            defaultValue={technology.category}
            className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
          >
            <option value="ML Frameworks">ML Frameworks</option>
            <option value="Data Engineering">Data Engineering</option>
            <option value="DevOps">DevOps</option>
            <option value="Languages">Languages</option>
            <option value="Cloud">Cloud</option>
            <option value="Databases">Databases</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Icon URL</label>
          <input
            name="iconUrl"
            type="url"
            defaultValue={technology.iconUrl || ''}
            className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Order</label>
            <input
              name="order"
              type="number"
              defaultValue={technology.order}
              className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Status</label>
            <select
              name="status"
              defaultValue={technology.status}
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
            [+] Update Technology
          </button>
          <a
            href="/admin/technologies"
            className="bg-surface-dark-elevated text-on-dark px-6 py-2 rounded-sm text-xs font-bold hover:bg-surface-dark border border-hairline transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

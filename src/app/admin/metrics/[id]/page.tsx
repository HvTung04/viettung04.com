import { notFound } from 'next/navigation';
import { getMetric, updateMetric } from '../actions';

export default async function EditMetricPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const metric = await getMetric(id);

  if (!metric) {
    notFound();
  }

  const viTranslation = metric.translations.find((t) => t.locale === 'vi');

  return (
    <div className="px-8 pb-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-sm font-bold text-on-dark mb-1">[+] EDIT METRIC</h1>
        <p className="text-xs text-on-dark-muted">Update metric details</p>
      </div>

      <form action={updateMetric.bind(null, id)} className="space-y-6">
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Label</label>
          <input
            name="label"
            type="text"
            required
            defaultValue={metric.label}
            className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
          />
        </div>

        <div className="border border-hairline rounded-sm p-4">
          <h3 className="text-xs font-bold text-on-dark mb-4 uppercase tracking-widest">Vietnamese</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Label (VI)</label>
              <input
                name="viLabel"
                type="text"
                defaultValue={viTranslation?.label || ''}
                className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Description (VI)</label>
              <textarea
                name="viDescription"
                rows={2}
                defaultValue={viTranslation?.description || ''}
                className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Value</label>
            <input
              name="value"
              type="text"
              required
              defaultValue={metric.value}
              className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Suffix</label>
            <input
              name="suffix"
              type="text"
              defaultValue={metric.suffix || ''}
              className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Description</label>
          <input
            name="description"
            type="text"
            defaultValue={metric.description || ''}
            className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Order</label>
            <input
              name="order"
              type="number"
              defaultValue={metric.order}
              className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Status</label>
            <select
              name="status"
              defaultValue={metric.status}
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
            [+] Update Metric
          </button>
          <a
            href="/admin/metrics"
            className="bg-surface-dark-elevated text-on-dark px-6 py-2 rounded-sm text-xs font-bold hover:bg-surface-dark border border-hairline transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

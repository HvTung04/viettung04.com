import Link from 'next/link';
import { getServices, deleteService } from './actions';

export default async function ServicesAdminPage() {
  const services = await getServices();

  return (
    <div className="px-8 pb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-sm font-bold text-on-dark mb-1">[+] SERVICES</h1>
          <p className="text-xs text-on-dark-muted">Manage service offerings</p>
        </div>
        <Link
          href="/admin/services/new"
          className="bg-ink-deep text-canvas px-4 py-2 rounded-sm text-xs font-bold hover:bg-ink transition-colors"
        >
          [+] New Service
        </Link>
      </div>

      <div className="bg-surface-dark-elevated border border-hairline rounded-sm overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-hairline text-on-dark-muted">
              <th className="text-left px-4 py-3 font-mono">Order</th>
              <th className="text-left px-4 py-3 font-mono">Title</th>
              <th className="text-left px-4 py-3 font-mono">Category</th>
              <th className="text-left px-4 py-3 font-mono">Status</th>
              <th className="text-right px-4 py-3 font-mono">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b border-hairline/50 hover:bg-surface-dark/50 transition-colors">
                <td className="px-4 py-3 text-on-dark">{service.order}</td>
                <td className="px-4 py-3 text-on-dark">{service.title}</td>
                <td className="px-4 py-3 text-on-dark">{service.category}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 text-[10px] border rounded ${
                    service.status === 'ACTIVE' 
                      ? 'bg-success/20 text-success border-success' 
                      : 'bg-warning/20 text-warning border-warning'
                  }`}>
                    [{service.status}]
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/services/${service.id}`}
                      className="text-accent hover:text-accent-hover transition-colors"
                    >
                      [Edit]
                    </Link>
                    <form action={deleteService.bind(null, service.id)}>
                      <button
                        type="submit"
                        className="text-danger hover:text-danger-hover transition-colors"
                      >
                        [Delete]
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {services.length === 0 && (
          <div className="px-4 py-8 text-center text-on-dark-muted text-xs">
            No services found. Create your first service.
          </div>
        )}
      </div>
    </div>
  );
}

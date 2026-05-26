import Link from 'next/link';
import { getClients, deleteClient } from './actions';

export default async function ClientsAdminPage() {
  const clients = await getClients();

  return (
    <div className="px-8 pb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-sm font-bold text-on-dark mb-1">[+] CLIENTS</h1>
          <p className="text-xs text-on-dark-muted">Manage client logos and partners</p>
        </div>
        <Link
          href="/admin/clients/new"
          className="bg-ink-deep text-canvas px-4 py-2 rounded-sm text-xs font-bold hover:bg-ink transition-colors"
        >
          [+] New Client
        </Link>
      </div>

      <div className="bg-surface-dark-elevated border border-hairline rounded-sm overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-hairline text-on-dark-muted">
              <th className="text-left px-4 py-3 font-mono">Order</th>
              <th className="text-left px-4 py-3 font-mono">Name</th>
              <th className="text-left px-4 py-3 font-mono">Website</th>
              <th className="text-left px-4 py-3 font-mono">Status</th>
              <th className="text-right px-4 py-3 font-mono">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b border-hairline/50 hover:bg-surface-dark/50 transition-colors">
                <td className="px-4 py-3 text-on-dark">{client.order}</td>
                <td className="px-4 py-3 text-on-dark">{client.name}</td>
                <td className="px-4 py-3 text-on-dark">{client.websiteUrl || '-'}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 text-[10px] border rounded ${
                    client.status === 'ACTIVE' 
                      ? 'bg-success/20 text-success border-success' 
                      : 'bg-warning/20 text-warning border-warning'
                  }`}>
                    [{client.status}]
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/clients/${client.id}`}
                      className="text-accent hover:text-accent-hover transition-colors"
                    >
                      [Edit]
                    </Link>
                    <form action={deleteClient.bind(null, client.id)}>
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
        {clients.length === 0 && (
          <div className="px-4 py-8 text-center text-on-dark-muted text-xs">
            No clients found. Add your first client.
          </div>
        )}
      </div>
    </div>
  );
}

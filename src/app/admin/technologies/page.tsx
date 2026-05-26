import Link from 'next/link';
import { getTechnologies, deleteTechnology } from './actions';

export default async function TechnologiesAdminPage() {
  const technologies = await getTechnologies();

  return (
    <div className="px-8 pb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-sm font-bold text-on-dark mb-1">[+] TECH STACK</h1>
          <p className="text-xs text-on-dark-muted">Manage technologies and tools</p>
        </div>
        <Link
          href="/admin/technologies/new"
          className="bg-ink-deep text-canvas px-4 py-2 rounded-sm text-xs font-bold hover:bg-ink transition-colors"
        >
          [+] New Technology
        </Link>
      </div>

      <div className="bg-surface-dark-elevated border border-hairline rounded-sm overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-hairline text-on-dark-muted">
              <th className="text-left px-4 py-3 font-mono">Order</th>
              <th className="text-left px-4 py-3 font-mono">Name</th>
              <th className="text-left px-4 py-3 font-mono">Category</th>
              <th className="text-left px-4 py-3 font-mono">Status</th>
              <th className="text-right px-4 py-3 font-mono">Actions</th>
            </tr>
          </thead>
          <tbody>
            {technologies.map((tech) => (
              <tr key={tech.id} className="border-b border-hairline/50 hover:bg-surface-dark/50 transition-colors">
                <td className="px-4 py-3 text-on-dark">{tech.order}</td>
                <td className="px-4 py-3 text-on-dark">{tech.name}</td>
                <td className="px-4 py-3 text-on-dark">{tech.category}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 text-[10px] border rounded ${
                    tech.status === 'ACTIVE' 
                      ? 'bg-success/20 text-success border-success' 
                      : 'bg-warning/20 text-warning border-warning'
                  }`}>
                    [{tech.status}]
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/technologies/${tech.id}`}
                      className="text-accent hover:text-accent-hover transition-colors"
                    >
                      [Edit]
                    </Link>
                    <form action={deleteTechnology.bind(null, tech.id)}>
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
        {technologies.length === 0 && (
          <div className="px-4 py-8 text-center text-on-dark-muted text-xs">
            No technologies found. Add your first technology.
          </div>
        )}
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import prisma from '@/lib/db';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Contact Submissions | Admin',
};

export default async function SubmissionsPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="p-8">
          <div className="mb-8">
            <h1 className="text-xl font-bold uppercase tracking-widest mb-2">
              Contact Submissions
            </h1>
            <p className="text-on-dark-muted text-sm">
              Manage inbound project inquiries
            </p>
          </div>

          {submissions.length === 0 ? (
            <div className="border border-hairline bg-surface-dark-elevated p-8 text-center">
              <p className="text-on-dark-muted">No submissions yet</p>
            </div>
          ) : (
            <div className="border border-hairline bg-surface-dark-elevated">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-hairline bg-surface-dark text-on-dark-muted uppercase tracking-widest text-xs">
                  <tr>
                    <th className="p-4">Status</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4">Message</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className="border-b border-hairline last:border-b-0 hover:bg-surface-dark"
                    >
                      <td className="p-4">
                        <StatusBadge status={submission.status} />
                      </td>
                      <td className="p-4 text-on-dark">{submission.name}</td>
                      <td className="p-4 text-on-dark-muted">{submission.email}</td>
                      <td className="p-4 text-on-dark-muted">
                        {submission.budget || 'N/A'}
                      </td>
                      <td className="p-4 text-on-dark-muted max-w-xs truncate">
                        {submission.description}
                      </td>
                      <td className="p-4 text-on-dark-muted">
                        {format(new Date(submission.createdAt), 'MMM d, yyyy HH:mm')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    NEW: 'bg-accent/20 text-accent border-accent',
    CONTACTED: 'bg-warning/20 text-warning border-warning',
    CLOSED: 'bg-mute/20 text-mute border-mute',
  };

  const style = styles[status as keyof typeof styles] || styles.NEW;

  return (
    <span className={`inline-block px-2 py-1 text-xs border rounded ${style}`}>
      [{status}]
    </span>
  );
}

import { Metadata } from 'next';
import prisma from '@/lib/db';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Newsletter Subscribers | Admin',
};

export default async function NewsletterPage() {
  const subscribers = await prisma.newsletterSubscription.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="p-8">
          <div className="mb-8">
            <h1 className="text-xl font-bold uppercase tracking-widest mb-2">
              Newsletter Subscribers
            </h1>
            <p className="text-on-dark-muted text-sm">
              Manage email subscribers
            </p>
          </div>

          {subscribers.length === 0 ? (
            <div className="border border-hairline bg-surface-dark-elevated p-8 text-center">
              <p className="text-on-dark-muted">No subscribers yet</p>
            </div>
          ) : (
            <div className="border border-hairline bg-surface-dark-elevated">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-hairline bg-surface-dark text-on-dark-muted uppercase tracking-widest text-xs">
                  <tr>
                    <th className="p-4">Email</th>
                    <th className="p-4">Subscribed</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber) => (
                    <tr
                      key={subscriber.id}
                      className="border-b border-hairline last:border-b-0 hover:bg-surface-dark"
                    >
                      <td className="p-4 text-on-dark">{subscriber.email}</td>
                      <td className="p-4 text-on-dark-muted">
                        {format(new Date(subscriber.createdAt), 'MMM d, yyyy')}
                      </td>
                      <td className="p-4">
                        <form
                          action={async () => {
                            'use server';
                            await prisma.newsletterSubscription.delete({
                              where: { id: subscriber.id },
                            });
                          }}
                          className="inline"
                        >
                          <button
                            type="submit"
                            className="text-danger hover:text-danger-hover text-xs"
                          >
                            [Remove]
                          </button>
                        </form>
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

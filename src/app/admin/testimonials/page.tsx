import { Metadata } from 'next';
import prisma from '@/lib/db';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Testimonials | Admin',
};

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <main className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold uppercase tracking-widest mb-2">
                Testimonials
              </h1>
              <p className="text-on-dark-muted text-sm">
                Manage client success stories
              </p>
            </div>
            <Link
              href="/admin/testimonials/new"
              className="bg-ink-deep text-canvas font-bold py-2 px-4 rounded-sm flex items-center gap-2 hover:bg-ink transition-colors border border-hairline"
            >
              <span className="text-xs">[+]</span>
              <span className="text-xs">Add Testimonial</span>
            </Link>
          </div>

          {testimonials.length === 0 ? (
            <div className="border border-hairline bg-surface-dark-elevated p-8 text-center">
              <p className="text-on-dark-muted">No testimonials yet</p>
            </div>
          ) : (
            <div className="border border-hairline bg-surface-dark-elevated">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-hairline bg-surface-dark text-on-dark-muted uppercase tracking-widest text-xs">
                  <tr>
                    <th className="p-4">Order</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((testimonial) => (
                    <tr
                      key={testimonial.id}
                      className="border-b border-hairline last:border-b-0 hover:bg-surface-dark"
                    >
                      <td className="p-4 text-on-dark-muted">{testimonial.order}</td>
                      <td className="p-4 text-on-dark">{testimonial.name}</td>
                      <td className="p-4 text-on-dark-muted">{testimonial.role}</td>
                      <td className="p-4 text-on-dark-muted">
                        {testimonial.company || 'N/A'}
                      </td>
                      <td className="p-4">
                        {testimonial.featured ? (
                          <span className="text-accent text-xs">[YES]</span>
                        ) : (
                          <span className="text-stone text-xs">[NO]</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/testimonials/${testimonial.id}`}
                            className="text-accent hover:text-canvas text-xs"
                          >
                            [Edit]
                          </Link>
                          <form
                            action={async () => {
                              'use server';
                              await prisma.testimonial.delete({
                                where: { id: testimonial.id },
                              });
                            }}
                            className="inline"
                          >
                            <button
                              type="submit"
                              className="text-danger hover:text-danger-hover text-xs"
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
            </div>
          )}
        </main>
  );
}

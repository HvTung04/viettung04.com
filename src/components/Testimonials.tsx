import prisma from '@/lib/db';

export default async function Testimonials() {
  const testimonials = await prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: { order: 'asc' },
  });

  if (testimonials.length === 0) {
    return null;
  }

  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-24 border-t border-b border-hairline overflow-hidden">
      <div className="max-w-[960px] mx-auto px-6 mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-mute mb-3">
          [Client Feedback]
        </p>
        <h2 className="text-2xl font-bold text-ink font-mono uppercase tracking-widest">
          Trusted by Industry Leaders
        </h2>
      </div>

      <div className="relative">
        <div className="flex gap-6 animate-marquee" style={{ width: 'max-content' }}>
          {doubled.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-[380px] border border-hairline bg-surface-soft p-6 rounded-sm"
            >
              <div className="mb-3">
                <div className="flex gap-1 text-accent text-sm">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
              <p className="text-body text-sm mb-5 leading-relaxed line-clamp-4">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {testimonial.avatarUrl && (
                  <div className="w-9 h-9 rounded-sm bg-surface-dark border border-hairline overflow-hidden flex-shrink-0">
                    <img
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-ink text-xs font-bold font-mono uppercase tracking-widest truncate">
                    {testimonial.name}
                  </p>
                  <p className="text-stone text-[11px] font-mono truncate">
                    {testimonial.role}
                    {testimonial.company && <span> &middot; {testimonial.company}</span>}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

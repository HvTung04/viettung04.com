import prisma from '@/lib/db';
import { getTranslations } from 'next-intl/server';

export default async function FAQ() {
  const t = await getTranslations('ServicesPage');
  
  const faqs = await prisma.faq.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { order: 'asc' },
  });

  return (
    <section className="py-20 md:py-32 border-t border-hairline">
      <div className="max-w-[960px] mx-auto px-4 sm:px-8">
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2 block">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight">
            Common Questions
          </h2>
        </div>

        {faqs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="border border-hairline bg-surface-soft rounded-sm p-6">
                <h3 className="text-sm font-bold text-ink mb-3 font-mono uppercase tracking-widest">
                  [{String(index + 1).padStart(2, '0')}] {faq.question}
                </h3>
                <p className="text-body text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-mute text-sm text-center py-8">
            No FAQs configured yet.
          </div>
        )}
      </div>
    </section>
  );
}

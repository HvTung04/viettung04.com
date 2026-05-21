import { getTranslations } from 'next-intl/server';

const faqs = [
  {
    question: 'What is your typical project timeline?',
    answer: 'Most AI projects range from 6-16 weeks depending on complexity. A typical computer vision system takes 8-12 weeks, while LLM-powered applications may take 10-16 weeks including fine-tuning and evaluation.',
  },
  {
    question: 'Do you work with existing teams or independently?',
    answer: 'Both. I can integrate with your existing engineering team as a technical lead, or work independently to deliver end-to-end solutions. I prioritize clear communication and regular progress updates either way.',
  },
  {
    question: 'What industries do you specialize in?',
    answer: 'Primary focus on healthcare, logistics, manufacturing, and fintech. Each domain has unique regulatory and technical requirements that I have experience navigating.',
  },
  {
    question: 'How do you handle data privacy and security?',
    answer: 'All projects follow industry-standard security practices. For regulated industries (healthcare, finance), I ensure HIPAA/GDPR compliance with proper data handling, encryption, and audit trails.',
  },
  {
    question: 'What is your pricing structure?',
    answer: 'Projects are typically fixed-price based on scope, ranging from $25K-$150K. For longer engagements, I offer monthly retainer arrangements. Contact me for a detailed quote based on your requirements.',
  },
  {
    question: 'Do you provide post-deployment support?',
    answer: 'Yes. All projects include 30 days of post-deployment support. Ongoing maintenance, monitoring, and model retraining are available via monthly retainer agreements.',
  },
];

export default async function FAQ() {
  const t = await getTranslations('ServicesPage');

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-hairline bg-surface-soft rounded-sm p-6">
              <h3 className="text-sm font-bold text-ink mb-3 font-mono uppercase tracking-widest">
                [{String(index + 1).padStart(2, '0')}] {faq.question}
              </h3>
              <p className="text-body text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

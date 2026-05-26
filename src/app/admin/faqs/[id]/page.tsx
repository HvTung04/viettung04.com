import { notFound } from 'next/navigation';
import { getFaq, updateFaq } from '../actions';

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = await getFaq(id);

  if (!faq) {
    notFound();
  }

  return (
    <div className="px-8 pb-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-sm font-bold text-on-dark mb-1">[+] EDIT FAQ</h1>
        <p className="text-xs text-on-dark-muted">Update question and answer</p>
      </div>

      <form action={updateFaq.bind(null, id)} className="space-y-6">
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Question</label>
          <input
            name="question"
            type="text"
            required
            defaultValue={faq.question}
            className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Answer</label>
          <textarea
            name="answer"
            required
            rows={6}
            defaultValue={faq.answer}
            className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Category</label>
            <input
              name="category"
              type="text"
              defaultValue={faq.category || ''}
              className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Locale</label>
            <select
              name="locale"
              defaultValue={faq.locale}
              className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
            >
              <option value="en">English</option>
              <option value="vi">Vietnamese</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Order</label>
            <input
              name="order"
              type="number"
              defaultValue={faq.order}
              className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 text-on-dark text-sm font-mono outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">Status</label>
            <select
              name="status"
              defaultValue={faq.status}
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
            [+] Update FAQ
          </button>
          <a
            href="/admin/faqs"
            className="bg-surface-dark-elevated text-on-dark px-6 py-2 rounded-sm text-xs font-bold hover:bg-surface-dark border border-hairline transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

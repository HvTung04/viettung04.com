'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateTestimonial } from '../new/actions';
import { Testimonial } from '@prisma/client';

interface EditTestimonialFormProps {
  testimonial: Testimonial;
}

export default function EditTestimonialForm({ testimonial }: EditTestimonialFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append('id', testimonial.id);
    const result = await updateTestimonial(formData);

    if (result.success) {
      router.push('/admin/testimonials');
    } else {
      alert('Failed to update testimonial');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">
          Name *
        </label>
        <input
          name="name"
          required
          defaultValue={testimonial.name}
          className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 focus:border-accent focus:bg-surface-dark text-on-dark text-sm font-mono outline-none transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">
          Role *
        </label>
        <input
          name="role"
          required
          defaultValue={testimonial.role}
          className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 focus:border-accent focus:bg-surface-dark text-on-dark text-sm font-mono outline-none transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">
          Company
        </label>
        <input
          name="company"
          defaultValue={testimonial.company || ''}
          className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 focus:border-accent focus:bg-surface-dark text-on-dark text-sm font-mono outline-none transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">
          Content *
        </label>
        <textarea
          name="content"
          required
          rows={5}
          defaultValue={testimonial.content}
          className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 focus:border-accent focus:bg-surface-dark text-on-dark text-sm font-mono outline-none transition-colors resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">
          Avatar URL
        </label>
        <input
          name="avatarUrl"
          defaultValue={testimonial.avatarUrl || ''}
          className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 focus:border-accent focus:bg-surface-dark text-on-dark text-sm font-mono outline-none transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">
          Logo URL
        </label>
        <input
          name="logoUrl"
          defaultValue={testimonial.logoUrl || ''}
          className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 focus:border-accent focus:bg-surface-dark text-on-dark text-sm font-mono outline-none transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            name="featured"
            type="checkbox"
            defaultChecked={testimonial.featured}
            className="rounded-sm bg-surface-dark-elevated border border-hairline text-accent focus:ring-accent"
          />
          <span className="text-xs uppercase tracking-widest text-on-dark-muted">
            Featured (show on homepage)
          </span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="font-mono text-xs uppercase tracking-widest text-on-dark-muted">
          Display Order
        </label>
        <input
          name="order"
          type="number"
          defaultValue={testimonial.order}
          className="w-full bg-surface-dark-elevated border border-hairline rounded-sm py-3 px-3 focus:border-accent focus:bg-surface-dark text-on-dark text-sm font-mono outline-none transition-colors"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-accent text-canvas font-bold py-3 px-6 rounded-sm hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
        <a
          href="/admin/testimonials"
          className="bg-surface-dark-elevated text-on-dark font-bold py-3 px-6 rounded-sm hover:bg-surface-dark transition-colors border border-hairline"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}

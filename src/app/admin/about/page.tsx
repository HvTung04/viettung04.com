import {
  ABOUT_GROUPS,
  fieldsForGroup,
  formFieldName,
} from '@/lib/about-fields';
import { getAboutDefaults } from '@/lib/about-content';
import { getAboutFields, restoreAboutGroup, saveAboutGroup } from './actions';

const inputClass =
  'w-full bg-surface-dark-elevated border border-hairline rounded-sm py-2 px-3 text-on-dark text-xs font-mono outline-none focus:border-accent transition-colors';

export default async function AboutAdminPage() {
  const overrides = await getAboutFields();
  const defaults = getAboutDefaults();

  return (
    <div className="px-8 pb-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-sm font-bold text-on-dark mb-1">[+] ABOUT PAGE</h1>
        <p className="text-xs text-on-dark-muted">
          Edit every piece of copy on the public About page. English and Vietnamese
          side by side. Empty fields fall back to the i18n defaults.
        </p>
      </div>

      <div className="space-y-6">
        {ABOUT_GROUPS.map((group) => {
          const fields = fieldsForGroup(group.id);

          return (
            <section
              key={group.id}
              className="bg-surface-dark-elevated border border-hairline rounded-sm"
            >
              <header className="px-4 py-3 border-b border-hairline flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-bold text-on-dark uppercase tracking-widest">
                    {group.title}
                  </h2>
                  <p className="text-[10px] text-on-dark-muted mt-1">
                    {group.description}
                  </p>
                </div>
                <form action={restoreAboutGroup.bind(null, group.id)}>
                  <button
                    type="submit"
                    className="text-[10px] text-on-dark-muted hover:text-on-dark transition-colors"
                    title="Reset this section back to the values in messages/*.json"
                  >
                    [ Restore defaults ]
                  </button>
                </form>
              </header>

              <form action={saveAboutGroup.bind(null, group.id)}>
                <div className="divide-y divide-hairline/50">
                  {fields.map((field) => {
                    const enValue =
                      overrides.get(formFieldName(field.key, 'en')) ??
                      defaults.en[field.key] ??
                      '';
                    const viValue =
                      overrides.get(formFieldName(field.key, 'vi')) ??
                      defaults.vi[field.key] ??
                      '';
                    const overridden = overrides.has(formFieldName(field.key, 'en'));

                    const renderInput = (locale: 'en' | 'vi', value: string) =>
                      field.type === 'text' ? (
                        <input
                          name={formFieldName(field.key, locale)}
                          type="text"
                          defaultValue={value}
                          className={inputClass}
                        />
                      ) : (
                        <textarea
                          name={formFieldName(field.key, locale)}
                          rows={field.type === 'lines' ? 5 : 3}
                          defaultValue={value}
                          className={`${inputClass} resize-y`}
                        />
                      );

                    return (
                      <div key={field.key} className="px-4 py-3">
                        <div className="flex items-center gap-2 mb-2">
                          <label className="text-[10px] uppercase tracking-widest text-on-dark-muted">
                            {field.label}
                          </label>
                          {overridden && (
                            <span className="text-[9px] px-1.5 py-0.5 border border-accent/40 text-accent rounded">
                              [DB]
                            </span>
                          )}
                          <code className="text-[9px] text-on-dark-muted/60 ml-auto">
                            {field.key}
                          </code>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase tracking-widest text-on-dark-muted/70">
                              EN
                            </span>
                            {renderInput('en', enValue)}
                          </div>
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase tracking-widest text-on-dark-muted/70">
                              VI
                            </span>
                            {renderInput('vi', viValue)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="px-4 py-3 border-t border-hairline">
                  <button
                    type="submit"
                    className="bg-accent text-canvas px-4 py-2 rounded-sm text-xs font-bold hover:bg-accent-hover transition-colors"
                  >
                    [+] Save {group.title}
                  </button>
                </div>
              </form>
            </section>
          );
        })}
      </div>

      <p className="mt-6 text-[10px] text-on-dark-muted">
        [DB] marks a field that overrides the i18n default. Removing a field&apos;s value
        falls back to messages/en.json and messages/vi.json.
      </p>
    </div>
  );
}

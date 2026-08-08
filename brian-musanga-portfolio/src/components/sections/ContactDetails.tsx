import { contact } from "@/lib/data/site-content";

export function ContactDetails() {
  return (
    <section
      className="mx-auto w-full max-w-5xl px-6 pb-24 sm:pb-32"
      aria-label="Contact details"
    >
      <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-12">
        {contact.groups.map((group) => (
          <div key={group.title} className="lg:col-span-4">
            <h2 className="font-sans text-2xl font-medium text-foreground">
              {group.title}
            </h2>

            <dl className="mt-6 border-t border-border">
              {group.rows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-3 items-baseline gap-4 border-b border-border py-3"
                >
                  <dt className="label">{row.label}</dt>
                  <dd className="col-span-2 text-sm text-foreground">
                    {row.href ? (
                      <a
                        href={row.href}
                        target={
                          row.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          row.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="link-invert"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}

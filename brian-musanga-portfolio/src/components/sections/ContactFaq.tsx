import { faq } from "@/lib/data/site-content";

export function ContactFaq() {
  return (
    <section
      className="mx-auto w-full max-w-5xl px-6 pb-24 sm:pb-32"
      aria-labelledby="contact-faq-heading"
    >
      <h2
        id="contact-faq-heading"
        className="font-sans text-2xl font-medium text-foreground"
      >
        Common questions
      </h2>

      <dl className="mt-6 border-t border-border">
        {faq.map((item) => (
          <div
            key={item.question}
            className="grid grid-cols-1 gap-2 border-b border-border py-6 sm:grid-cols-12 sm:gap-8"
          >
            <dt className="font-display text-base leading-snug text-foreground sm:col-span-5">
              {item.question}
            </dt>
            <dd className="max-w-[60ch] text-body text-muted-foreground sm:col-span-7">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

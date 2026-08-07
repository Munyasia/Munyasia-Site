import Link from "next/link";
import { NotFoundCode } from "@/components/ui/NotFoundCode";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { navLinks, personal } from "@/lib/data/site-content";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="grid-lines pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[70svh] w-full max-w-5xl flex-col justify-center px-6 py-20 sm:py-28">
        <SectionLabel index="Error">Page not found</SectionLabel>

        <p className="mt-8 select-none font-display uppercase leading-[0.8] tracking-tighter text-[clamp(4.5rem,20vw,11rem)] text-foreground">
          <NotFoundCode />
        </p>

        <div className="rule-in mt-6 h-px w-full bg-accent" aria-hidden="true" />

        <h1 className="mt-10 max-w-[20ch] font-display text-display leading-none tracking-tight text-foreground">
          Nothing lives at this address.
        </h1>

        <p className="mt-5 max-w-[52ch] text-body text-muted-foreground">
          The link is either wrong or I moved something. Everything on this site
          is one of these four.
        </p>

        <nav aria-label="Site" className="mt-12">
          <ul className="divide-y divide-border border-y border-border">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-baseline gap-5 py-4 transition-colors duration-150 ease-out hover:bg-foreground hover:text-background sm:px-2"
                >
                  <span className="label text-accent group-hover:text-background">
                    {link.index}
                  </span>
                  <span className="font-display text-2xl tracking-tight sm:text-[1.75rem]">
                    {link.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-lg opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/" className="btn-cta">
            Back to home
          </Link>
          <a
            href={personal.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="link-invert inline-flex items-center gap-1.5 text-foreground"
          >
            Tell me what you were looking for
            <span className="font-sans" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

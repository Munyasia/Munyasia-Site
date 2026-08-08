"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { home } from "@/lib/data/site-content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HowIHelp() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const asideRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-pillar]");

      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: ({ isActive }) => {
            if (isActive) setActive(i);
          },
        });
      });

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(asideRef.current, { y: 20, opacity: 0 });
        gsap.set(panels, { y: 28, opacity: 0, filter: "blur(10px)" });

        gsap.to(asideRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });

        panels.forEach((panel) => {
          gsap.to(panel, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 88%", once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="how-i-help-heading"
      className="relative border-t border-border"
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-24 sm:py-32 lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div
          ref={asideRef}
          className="lg:col-span-4 lg:sticky lg:top-[calc(var(--nav-h)+3rem)] lg:self-start"
        >
          <SectionLabel index="01">How I help</SectionLabel>

          <h2
            id="how-i-help-heading"
            className="mt-8 max-w-[14ch] font-display text-h2 leading-none tracking-tight text-foreground"
          >
            {home.pillarsHeading}
          </h2>

          <p className="mt-5 max-w-[38ch] text-body text-muted-foreground">
            {home.pillarsBody}
          </p>

          <ol className="mt-10 hidden lg:flex lg:flex-col lg:gap-3.5" aria-hidden="true">
            {home.pillars.map((pillar, i) => (
              <li key={pillar.index} className="flex items-center gap-3">
                <span
                  className={`h-px transition-all duration-500 ease-out ${
                    i === active ? "w-10 bg-accent" : "w-4 bg-border"
                  }`}
                />
                <span
                  className={`label transition-colors duration-300 ease-out ${
                    i === active ? "text-foreground" : ""
                  }`}
                >
                  {pillar.index} / {pillar.short}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <ol className="mt-14 lg:col-span-7 lg:col-start-6 lg:mt-0">
          {home.pillars.map((pillar) => (
            <li
              key={pillar.index}
              data-pillar
              className="group border-t border-border last:border-b"
            >
              <article className="flex flex-col gap-4 py-10 sm:py-14">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border font-mono text-label text-muted-foreground transition-colors duration-300 ease-out group-hover:border-accent group-hover:text-accent"
                  >
                    {pillar.index}
                  </span>
                  <span className="label">{pillar.short}</span>
                </div>

                <h3 className="max-w-[18ch] font-display text-h2 leading-none tracking-tight text-foreground">
                  {pillar.title}
                </h3>

                <p className="max-w-[52ch] text-body text-muted-foreground">
                  {pillar.body}
                </p>

                <ul className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
                  {pillar.proof.map((item) => (
                    <li key={item} className="label flex items-center gap-2.5">
                      <span
                        className="h-1 w-1 shrink-0 bg-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

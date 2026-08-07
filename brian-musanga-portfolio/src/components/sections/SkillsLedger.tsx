"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { skills } from "@/lib/data/site-content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SkillsLedger() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rules = gsap.utils.toArray<HTMLElement>("[data-ledger-rule]");
        const entries = gsap.utils.toArray<HTMLElement>("[data-ledger-entry]");

        gsap.set(rules, { scaleX: 0 });
        gsap.set(entries, { y: 14, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });

        /* The rules get ruled onto the page first, left to right, then the
           entries land on them. A ledger being written, not a list fading in. */
        tl.to(rules, {
          scaleX: 1,
          duration: 0.7,
          stagger: 0.09,
          ease: "power2.inOut",
        }).to(
          entries,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: "power3.out",
          },
          "-=0.85",
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-toolkit"
      className="border-t border-border"
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24">
        <SectionLabel index="03">
          <span id="about-toolkit">Toolkit</span>
        </SectionLabel>

        <dl className="mt-12">
          {skills.map((group) => (
            /* dl's content model allows div wrappers holding dt + dd and
               nothing else, so the animated rule rides inside dt (positioned
               against this row) rather than sitting beside them. */
            <div
              key={group.category}
              className="relative grid grid-cols-1 gap-2 py-7 sm:grid-cols-12 sm:gap-8"
            >
              <dt className="label sm:col-span-3">
                <span
                  data-ledger-rule
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left bg-border"
                />
                <span data-ledger-entry className="inline-block">
                  {group.category}
                </span>
              </dt>
              {/* Flex-wrapped, not inline text: the separators carry no
                  whitespace, so as inline content the whole run was one
                  unbreakable word and overflowed the viewport on mobile. Each
                  dot trails its own item so a wrapped line never opens on one. */}
              <dd
                data-ledger-entry
                className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-sm leading-relaxed text-foreground sm:col-span-9"
              >
                {group.items.map((item, i) => (
                  <span key={item}>
                    {item}
                    {i < group.items.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="pl-2 text-muted-foreground"
                      >
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>

        {/* Closes the ledger. Outside the dl, since a bare span inside one is
            not valid, and it draws in with the rest rather than shipping as a
            static border. */}
        <div className="relative h-px">
          <span
            data-ledger-rule
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px origin-left bg-border"
          />
        </div>
      </div>
    </section>
  );
}

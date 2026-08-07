"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { experience } from "@/lib/data/site-content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function WorkHistory() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const entries = gsap.utils.toArray<HTMLElement>("[data-job]");

        gsap.set("[data-spine]", { scaleY: 0 });
        gsap.set(entries, { y: 18, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });

        /* The spine runs down first, then each entry lands on it. */
        tl.to("[data-spine]", {
          scaleY: 1,
          duration: 0.9,
          ease: "power2.inOut",
        }).to(
          entries,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.6",
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-experience"
      className="border-t border-border"
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24 lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-3">
          <SectionLabel index="02">
            <span id="about-experience">Experience</span>
          </SectionLabel>
        </div>

        <div className="mt-10 lg:col-span-8 lg:col-start-5 lg:mt-0">
          <ol className="relative">
            {/* The spine is its own element rather than a border, so it can be
                drawn on. 1px hairline, not a colored side stripe. */}
            <span
              data-spine
              aria-hidden="true"
              className="absolute left-0 top-1 bottom-2 w-px origin-top bg-border"
            />

            {experience.map((job) => (
              <li key={`${job.org}-${job.role}`} data-job className="relative pl-8 pb-12 last:pb-0">
                {/* Square node, matching SectionLabel's marker. Circles are
                    reserved for the hero portrait. */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[0.3rem] h-1.5 w-1.5 -translate-x-1/2 bg-foreground"
                />

                <p className="label">{job.period}</p>

                <h3 className="mt-3 max-w-[26ch] font-display text-xl leading-tight tracking-tight text-foreground sm:text-2xl">
                  {job.role}
                </h3>

                <p className="mt-1.5 text-sm text-muted-foreground">
                  {job.org}
                </p>

                <p className="mt-4 max-w-[58ch] text-body text-muted-foreground">
                  {job.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

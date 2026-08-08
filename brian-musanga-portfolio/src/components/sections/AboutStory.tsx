"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { about } from "@/lib/data/site-content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AboutStory() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-story]");
        gsap.set(items, { y: 20, opacity: 0 });

        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const [lead, ...rest] = about.paragraphs;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-background"
      className="border-t border-border"
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24 lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-3">
          <SectionLabel index="01">
            <span id="about-background">Background</span>
          </SectionLabel>
        </div>

        <div className="mt-10 lg:col-span-8 lg:col-start-5 lg:mt-0">
          <p
            data-story
            className="max-w-[54ch] text-lg leading-relaxed text-foreground sm:text-xl"
          >
            {lead}
          </p>

          {rest.map((paragraph) => (
            <p
              key={paragraph}
              data-story
              className="mt-6 max-w-[62ch] text-body text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

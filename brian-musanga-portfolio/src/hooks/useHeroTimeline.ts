"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { RefObject } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

type HeroRefs = {
  section: RefObject<HTMLElement | null>;
  portrait: RefObject<HTMLDivElement | null>;
  caption: RefObject<HTMLParagraphElement | null>;
  headline: RefObject<HTMLHeadingElement | null>;
  subline: RefObject<HTMLParagraphElement | null>;
  cta: RefObject<HTMLDivElement | null>;
  grid: RefObject<HTMLDivElement | null>;
};

export function useHeroTimeline(refs: HeroRefs) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!refs.headline.current) return;

        const split = SplitText.create(refs.headline.current, {
          type: "lines",
          mask: "lines",
        });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          refs.portrait.current,
          { clipPath: "inset(50% round 9999px)" },
          {
            clipPath: "inset(0% round 9999px)",
            duration: 1,
            ease: "power2.inOut",
          }
        )
          .from(refs.caption.current, { y: 8, opacity: 0, duration: 0.5 }, "-=0.6")
          .from(
            split.lines,
            {
              yPercent: 40,
              opacity: 0,
              filter: "blur(14px)",
              duration: 1,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.5"
          )
          .from(refs.subline.current, { y: 14, opacity: 0, duration: 0.6 }, "-=0.5")
          .from(
            refs.cta.current ? refs.cta.current.children : [],
            { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 },
            "-=0.4"
          );

        if (refs.section.current) {
          gsap.to(refs.portrait.current, {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: refs.section.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.to(refs.grid.current, {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: refs.section.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: refs.section }
  );
}

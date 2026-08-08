"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef, type RefObject } from "react";
import { useIntro } from "@/components/providers/IntroProvider";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

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
  const { introDone } = useIntro();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const release = () => refs.section.current?.classList.remove("hero-pending");

      mm.add("(prefers-reduced-motion: reduce)", () => {
        release();
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!refs.headline.current) return;

        release();

        const split = SplitText.create(refs.headline.current, {
          type: "lines",
          mask: "lines",
        });

        const ctaItems = refs.cta.current ? refs.cta.current.children : [];

        gsap.set(refs.portrait.current, {
          clipPath: "inset(50% round 9999px)",
        });
        gsap.set(refs.caption.current, { y: 8, opacity: 0 });
        gsap.set(refs.subline.current, { y: 14, opacity: 0 });
        gsap.set(ctaItems, { y: 14, opacity: 0 });
        gsap.set(split.lines, {
          yPercent: 40,
          opacity: 0,
          filter: "blur(14px)",
        });
        gsap.set(refs.headline.current, { opacity: 1 });

        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });

        tl.to(refs.portrait.current, {
          clipPath: "inset(0% round 9999px)",
          duration: 1,
          ease: "power2.inOut",
        })
          .to(
            refs.caption.current,
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.6",
          )
          .to(
            split.lines,
            {
              yPercent: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.5",
          )
          .to(
            refs.subline.current,
            { y: 0, opacity: 1, duration: 0.6 },
            "-=0.5",
          )
          .to(
            ctaItems,
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
            "-=0.4",
          );

        timelineRef.current = tl;

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

        return () => {
          timelineRef.current = null;
          split.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: refs.section },
  );

  useGSAP(
    () => {
      if (introDone) timelineRef.current?.play();
    },
    { dependencies: [introDone] },
  );
}

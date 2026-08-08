"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AnimatedEllipsis({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const dots = gsap.utils.toArray<HTMLElement>("[data-dot]");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(dots, { opacity: 0.22, y: 0 });

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 0.5,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });

        tl.to(dots, {
          opacity: 1,
          y: "-0.08em",
          duration: 0.3,
          stagger: 0.16,
          ease: "power2.out",
        }).to(
          dots,
          {
            opacity: 0.22,
            y: 0,
            duration: 0.45,
            stagger: 0.16,
            ease: "power2.in",
          },
          "-=0.25",
        );
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <span
      ref={rootRef}
      aria-hidden="true"
      className={`inline-flex align-baseline ${className}`}
    >
      {[0, 1, 2].map((i) => (
        <span key={i} data-dot className="inline-block">
          .
        </span>
      ))}
    </span>
  );
}

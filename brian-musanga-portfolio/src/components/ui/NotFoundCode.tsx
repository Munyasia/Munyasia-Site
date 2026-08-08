"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useRef } from "react";

gsap.registerPlugin(ScrambleTextPlugin, useGSAP);

export function NotFoundCode() {
  const ref = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(ref.current, {
          duration: 1.3,
          ease: "none",
          scrambleText: {
            text: "404",
            chars: "01",
            speed: 0.55,
            revealDelay: 0.4,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <span ref={ref} aria-label="404">
      404
    </span>
  );
}

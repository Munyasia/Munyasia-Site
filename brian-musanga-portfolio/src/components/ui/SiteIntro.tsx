"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useIntro } from "@/components/providers/IntroProvider";
import {
  LOGO_MARK_BOUNDS,
  LOGO_MARK_VIEWBOX,
  LogoMarkPaths,
} from "./LogoMarkPaths";

gsap.registerPlugin(useGSAP);

const { x, y, width, height } = LOGO_MARK_BOUNDS;

export function SiteIntro() {
  const { markIntroDone } = useIntro();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<SVGRectElement | null>(null);

  useGSAP(
    () => {
      /* Already hidden by the pre-paint script (repeat visit, or reduced
         motion). IntroProvider has flipped introDone; nothing to play. */
      if (document.documentElement.classList.contains("intro-seen")) return;

      const tl = gsap.timeline({ onComplete: markIntroDone });

      tl.to(fillRef.current, {
        attr: { y, height },
        duration: 0.9,
        ease: "power2.inOut",
      })
        .to(
          rootRef.current,
          { yPercent: -100, duration: 0.6, ease: "power3.inOut" },
          "+=0.15",
        )
        .set(rootRef.current, { display: "none" });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      data-site-intro
      aria-hidden="true"
      className="fixed inset-0 z-[100] grid place-items-center bg-background"
    >
      <svg viewBox={LOGO_MARK_VIEWBOX} className="h-40 w-auto sm:h-48">
        <defs>
          {/* Rises from the baseline to the cap, so the mark reads as a
              vessel filling rather than a shape fading in. */}
          <clipPath id="intro-fill">
            <rect
              ref={fillRef}
              x={x}
              y={y + height}
              width={width}
              height={0}
            />
          </clipPath>
        </defs>

        <g className="text-foreground" opacity={0.18}>
          <LogoMarkPaths />
        </g>

        <g className="text-foreground" clipPath="url(#intro-fill)">
          <LogoMarkPaths />
        </g>
      </svg>
    </div>
  );
}

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    /* Lenis caches its scroll limit and only recomputes it when its autoResize
       observer fires. That observer watches documentElement, which the root
       layout pins to h-full, so its box is always exactly the viewport and the
       observer never fires no matter how much content grows. The limit then
       stays at whatever the page measured on mount: navigate from a short page
       to a tall one and scrolling stops dead at the short page's height.
       Watching body instead catches route changes and late-loading media. */
    let lastHeight = 0;
    const observer = new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (height === lastHeight) return;
      lastHeight = height;
      lenis.resize();
      ScrollTrigger.refresh();
    });
    observer.observe(document.body);

    return () => {
      observer.disconnect();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

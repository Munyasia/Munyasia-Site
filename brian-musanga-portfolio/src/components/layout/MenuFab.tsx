"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { navLinks } from "@/lib/data/site-content";

gsap.registerPlugin(useGSAP);

export function MenuFab() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const topBarRef = useRef<HTMLSpanElement | null>(null);
  const midBarRef = useRef<HTMLSpanElement | null>(null);
  const lowBarRef = useRef<HTMLSpanElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  /* One paused timeline describes the open state; the toggle below plays it
     forward or in reverse, so close is the exact inverse of open. */
  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const scale = reduced ? 0 : 1;
      const items = gsap.utils.toArray<HTMLElement>("[data-menu-item]");

      gsap.set(panelRef.current, { autoAlpha: 0, y: 16, scale: 0.96 });
      gsap.set(items, { autoAlpha: 0, y: 12 });

      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.32 * scale, ease: "power3.out" },
      });

      tl.to(topBarRef.current, { y: 8, rotate: 45 }, 0)
        .to(midBarRef.current, { autoAlpha: 0, scaleX: 0.3 }, 0)
        .to(lowBarRef.current, { y: -8, rotate: -45 }, 0)
        .to(
          panelRef.current,
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.36 * scale },
          0.04,
        )
        .to(
          items,
          { autoAlpha: 1, y: 0, duration: 0.3 * scale, stagger: 0.05 * scale },
          0.12,
        );

      timelineRef.current = tl;
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      const tl = timelineRef.current;
      if (!tl) return;
      if (open) tl.play();
      else tl.reverse();
    },
    { dependencies: [open] },
  );

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4"
    >
      <nav
        id="fab-menu"
        aria-label="Main"
        ref={panelRef}
        inert={!open}
        /* `invisible opacity-0` carries the closed state through SSR and the
           pre-hydration window. `inert` blocks interaction but paints nothing,
           and the gsap.set below only runs once JS boots, so without these the
           panel flashes on every load. GSAP's autoAlpha writes the same two
           properties inline from then on. */
        className="invisible w-[min(84vw,340px)] origin-bottom-right rounded-[3px] border border-border bg-background/95 opacity-0 backdrop-blur-sm"
      >
        <p className="label border-b border-border px-6 py-4">Menu</p>
        <ul className="flex flex-col py-2">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} data-menu-item>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-baseline gap-4 px-6 py-3.5 transition-colors duration-150 ease-out hover:bg-foreground hover:text-background ${
                    active ? "text-foreground" : "text-foreground/70"
                  }`}
                >
                  <span className="label text-accent group-hover:text-background">
                    {link.index}
                  </span>
                  <span className="font-display text-2xl tracking-tight">
                    {link.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-lg opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="fab-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex h-16 w-16 items-center justify-center rounded-[3px] border border-accent bg-background text-foreground transition-colors duration-150 ease-out hover:bg-accent hover:text-background"
      >
        {/* Three bars GSAP folds into an X, rather than swapping icons, so the
            open and close states are one continuous motion. */}
        <span aria-hidden="true" className="relative h-[18px] w-7">
          <span
            ref={topBarRef}
            className="absolute left-0 top-0 h-[2px] w-full bg-current"
          />
          <span
            ref={midBarRef}
            className="absolute left-0 top-2 h-[2px] w-full bg-current"
          />
          <span
            ref={lowBarRef}
            className="absolute left-0 top-4 h-[2px] w-full bg-current"
          />
        </span>
      </button>
    </div>
  );
}

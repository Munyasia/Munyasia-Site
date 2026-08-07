"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { navLinks } from "@/lib/data/site-content";

export function MenuFab() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      <nav
        id="fab-menu"
        aria-label="Main"
        hidden={!open}
        className="min-w-[180px] rounded-[3px] border border-border bg-background/95 backdrop-blur-sm"
      >
        <ul className="flex flex-col py-2">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`label flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 ease-out hover:bg-foreground hover:text-background ${
                    active ? "text-foreground" : "text-foreground/70"
                  }`}
                >
                  <span className="text-accent">{link.index}</span>
                  {link.label}
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
        className="inline-flex h-12 w-12 items-center justify-center rounded-[3px] border border-accent bg-background text-foreground transition-colors duration-150 ease-out hover:bg-accent hover:text-background"
      >
        {open ? (
          <X className="h-5 w-5" weight="light" aria-hidden="true" />
        ) : (
          <List className="h-5 w-5" weight="light" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { EmphasisText } from "@/components/ui/EmphasisText";
import { useHeroTimeline } from "@/hooks/useHeroTimeline";
import { backgroundVideo, home, personal } from "@/lib/data/site-content";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLParagraphElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const sublineRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useHeroTimeline({
    section: sectionRef,
    portrait: portraitRef,
    caption: captionRef,
    headline: headlineRef,
    subline: sublineRef,
    cta: ctaRef,
    grid: gridRef,
  });

  return (
    <section
      ref={sectionRef}
      className="hero-pending relative isolate -mt-[var(--nav-h)] flex flex-col overflow-hidden pt-[var(--nav-h)] lg:min-h-screen"
    >
      <AmbientVideo
        src={backgroundVideo.hero}
        poster={backgroundVideo.heroPoster}
        graded={false}
        className="absolute inset-0 -z-10"
      />

      <div
        ref={gridRef}
        className="grid-lines pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col px-6">
        <div className="flex flex-1 flex-col items-center justify-center gap-6 py-16 text-center lg:py-24">
          <div className="relative mx-auto flex flex-col items-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[100px] sm:h-80 sm:w-80 lg:h-96 lg:w-96"
            />

            <h1
              ref={headlineRef}
              data-hero-fade
              className="relative z-0 select-none font-display uppercase leading-[0.8] tracking-tighter text-[clamp(3.5rem,15vw,13.125rem)]"
            >
              <span className="block text-foreground">Brian</span>
              <span className="block text-accent">Musanga</span>
            </h1>

            <div
              ref={portraitRef}
              data-hero-portrait
              className="absolute left-1/2 top-1/2 z-10 w-[65px] h-[110px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-border sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px]"
            >
              <Image
                src={personal.photoUrl}
                alt={personal.name}
                fill
                sizes="129px"
                className="object-cover"
                style={{ filter: "url(#hero-duotone)" }}
                priority
              />
            </div>
          </div>

          <p ref={captionRef} data-hero-fade className="label">
            {personal.role}
          </p>

          <div
            ref={sublineRef}
            data-hero-fade
            className="flex flex-col items-center gap-3"
          >
            <p className="font-display text-display max-w-[42ch] text-foreground">
              <EmphasisText
                text={home.heroHeading.join(" ")}
                emphasis={home.heroEmphasis}
              />
            </p>
            <p className="max-w-[55ch] text-body text-muted-foreground">
              {home.heroSubline}
            </p>
          </div>

          <div
            ref={ctaRef}
            data-hero-fade-children
            className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            <Link href="/work" className="btn-invert">
              View work
            </Link>
            <Link
              href="/contact"
              className="link-invert inline-flex items-center gap-1.5 text-foreground"
            >
              Let&rsquo;s talk
              <span className="font-sans" aria-hidden="true">
                ↗
              </span>
            </Link>
          </div>
        </div>

        <div className="border-t border-border" />
        <div className="flex justify-end py-6">
          <span className="label">{home.scrollHint} / 01</span>
        </div>
      </div>
    </section>
  );
}

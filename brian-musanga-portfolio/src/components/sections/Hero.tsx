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
        <div className="flex flex-1 flex-col items-start justify-center gap-6 pt-8 pb-12 text-left min-[426px]:items-center min-[426px]:text-center lg:py-24">
          {/* Below lg the portrait is taller than the two-line name, so it sits
              beside it in flow. From lg the name outgrows it and the pill can
              go back through the middle. Above 425px the row shrinks to its
              content so the parent's centering can take hold; at 425px and
              below it stays full-width and left-aligned. */}
          <div className="relative flex w-full items-center gap-5 sm:gap-7 min-[426px]:w-auto lg:mx-auto lg:block lg:w-auto">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[100px] sm:h-80 sm:w-80 lg:h-96 lg:w-96"
            />

            <h1
              ref={headlineRef}
              data-hero-fade
              className="relative z-0 select-none font-display uppercase leading-[0.8] tracking-tighter text-[clamp(2.5rem,13vw,13.125rem)] lg:text-[clamp(3.5rem,15vw,13.125rem)]"
            >
              <span className="block text-foreground">Brian</span>
              <span className="block text-accent">Musanga</span>
            </h1>

            {/* order-first puts the pill left of the name without moving the
                h1 down the DOM. The centering lives on this slot, not on the
                animated pill, so GSAP's inline transform never has a translate
                to fight with. */}
            <div className="order-first shrink-0 -translate-y-2 sm:-translate-y-3 lg:pointer-events-none lg:absolute lg:inset-0 lg:z-10 lg:grid lg:translate-x-0 lg:translate-y-0 lg:place-items-center">
              <div
                ref={portraitRef}
                data-hero-portrait
                className="relative w-[65px] h-[110px] overflow-hidden rounded-full border border-border sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px]"
              >
                <Image
                  src={personal.photoUrl}
                  alt={personal.name}
                  fill
                  sizes="(min-width: 1024px) 129px, (min-width: 768px) 110px, (min-width: 640px) 90px, 65px"
                  className="object-cover"
                  style={{ filter: "url(#hero-duotone)" }}
                  priority
                />
              </div>
            </div>
          </div>

          <p ref={captionRef} data-hero-fade className="label">
            {personal.role}
          </p>

          <div
            ref={sublineRef}
            data-hero-fade
            className="flex flex-col items-start gap-3 min-[426px]:items-center"
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
            className="mt-4 flex flex-wrap items-center justify-start gap-x-8 gap-y-4 min-[426px]:justify-center"
          >
            <Link href="/work" className="btn-invert">
              View portfolio
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

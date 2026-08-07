"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EmphasisText } from "@/components/ui/EmphasisText";
import { useIntro } from "@/components/providers/IntroProvider";
import { about, personal } from "@/lib/data/site-content";

gsap.registerPlugin(useGSAP);

export function AboutIntro() {
  const { introDone } = useIntro();
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* Start values live in .about-pending (globals.css) so they survive SSR.
         Dropping the class hands the elements to GSAP's inline styles. */
      const release = () =>
        sectionRef.current?.classList.remove("about-pending");

      mm.add("(prefers-reduced-motion: reduce)", () => {
        release();
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        release();

        const fades = gsap.utils.toArray<HTMLElement>("[data-about-fade]");
        /* Selector strings, not refs: useGSAP scopes them to the section. */
        const plate = "[data-about-plate]";
        const photo = "[data-about-photo]";

        gsap.set(fades, { y: 16, opacity: 0 });
        gsap.set(plate, { clipPath: "inset(0 0 100% 0)" });
        gsap.set(photo, { scale: 1.08 });

        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });

        /* The plate wipes open top-down while the photo inside settles out of
           an overscale. Deliberately a different axis from the hero portrait's
           rounded-inset reveal, so the two pages don't repeat one gesture. */
        tl.to(plate, {
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "power2.inOut",
        })
          .to(photo, { scale: 1, duration: 1.5, ease: "power2.out" }, "<")
          .to(
            fades,
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
            "-=0.75",
          );

        timelineRef.current = tl;

        return () => {
          timelineRef.current = null;
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  // Held until the intro overlay lifts, so the two never play at once.
  useGSAP(
    () => {
      if (introDone) timelineRef.current?.play();
    },
    { dependencies: [introDone] },
  );

  return (
    <section
      ref={sectionRef}
      className="about-pending relative"
      aria-labelledby="about-statement"
    >
      <div className="mx-auto w-full max-w-5xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-7">
          <div data-about-fade>
            <SectionLabel index="About">{personal.role}</SectionLabel>
          </div>

          <h1
            id="about-statement"
            data-about-fade
            className="mt-8 max-w-[22ch] font-display text-display text-foreground"
          >
            <EmphasisText
              text={about.statement}
              emphasis={about.statementEmphasis}
            />
          </h1>

          <p
            data-about-fade
            className="mt-6 max-w-[52ch] text-body text-muted-foreground"
          >
            {about.intro}
          </p>
        </div>

        <div className="mt-14 lg:col-span-4 lg:col-start-9 lg:mt-0">
          {/* Sharp corners by design: DESIGN.md reserves the fully-rounded
              shape for the hero portrait, so the same face gets a structural
              frame here rather than a second emblem. Ungraded on purpose, like
              the hero's video layer: this is the one place a visitor sees
              Brian as he actually looks. */}
          <div
            data-about-plate
            className="relative aspect-[3/4] w-full overflow-hidden border border-border"
          >
            <Image
              data-about-photo
              src={about.portrait.src}
              alt={about.portrait.alt}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 60vw, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <dl data-about-fade className="mt-6 border-t border-border">
            {about.record.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 items-baseline gap-4 border-b border-border py-3"
              >
                <dt className="label">{row.label}</dt>
                <dd className="col-span-2 text-sm text-foreground">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

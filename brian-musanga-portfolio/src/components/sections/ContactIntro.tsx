"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SocialActions } from "@/components/ui/SocialActions";
import { useIntro } from "@/components/providers/IntroProvider";
import { contact, personal } from "@/lib/data/site-content";

gsap.registerPlugin(useGSAP);

export function ContactIntro() {
  const { introDone } = useIntro();
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* Start values live in .contact-pending (globals.css) so they survive
         SSR. Dropping the class hands the elements to GSAP's inline styles. */
      const release = () =>
        sectionRef.current?.classList.remove("contact-pending");

      mm.add("(prefers-reduced-motion: reduce)", () => {
        release();
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        release();

        /* Selector strings, not refs: useGSAP scopes them to the section. */
        const eyebrow = "[data-contact-eyebrow]";
        const lines = "[data-contact-line]";
        const sign = "[data-contact-sign]";
        const tail = "[data-contact-tail]";

        gsap.set(lines, { yPercent: 110 });
        gsap.set(sign, { clipPath: "inset(0 100% 0 0)" });
        gsap.set(tail, { y: 16, opacity: 0 });

        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power3.out" },
        });

        /* Each heading line rides up out of its own overflow-hidden mask, a
           third gesture on top of the hero's rounded inset and the about
           page's top-down plate, so no two pages open the same way. The
           signature then wipes left to right at a slower, evener rate, which
           is what sells it as being written rather than faded in. */
        tl.to(eyebrow, { opacity: 1, duration: 0.5 })
          .to(
            lines,
            { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "power4.out" },
            "-=0.3",
          )
          .to(
            sign,
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.1,
              ease: "power2.inOut",
            },
            "-=0.5",
          )
          .to(
            tail,
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
            "-=0.85",
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
      className="contact-pending relative"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto w-full max-w-5xl px-6 pt-16 pb-16 sm:pt-28 sm:pb-24">
        <div data-contact-eyebrow>
          <SectionLabel index="Contact">{personal.location}</SectionLabel>
        </div>

        <h1
          id="contact-heading"
          className="mt-10 font-display text-mega uppercase text-foreground sm:mt-16"
        >
          {contact.headingLines.map((line, i) => (
            /* --text-mega runs a 0.95 line-height, so ink sits outside the
               line box the mask crops to. The padding gives the mask that
               room and the matching negative margin takes the space back, so
               nothing is shaved and the lines keep their 0.95 spacing. */
            <span
              key={line}
              className="block -mb-[0.15em] overflow-hidden"
              style={{ paddingLeft: i === 0 ? undefined : "18%" }}
            >
              <span data-contact-line className="block pb-[0.15em]">
                {line}
              </span>
            </span>
          ))}
        </h1>

        {/* Pulled up into the heading's baseline gap so the two overlap the way
            a signature sits under a written line. The negative margin is in em
            of the script size, so it tracks the clamp at every breakpoint. */}
        <p className="-mt-[0.15em] pl-[30%] text-[clamp(4rem,15vw,11rem)] leading-[0.85]">
          <span
            data-contact-sign
            className="font-script inline-block text-accent"
          >
            {contact.signature}
          </span>
        </p>

        <p
          data-contact-tail
          className="mt-10 max-w-[46ch] text-body text-muted-foreground"
        >
          {contact.subline}
        </p>

        <div data-contact-tail className="mt-8">
          <SocialActions />
        </div>
      </div>
    </section>
  );
}

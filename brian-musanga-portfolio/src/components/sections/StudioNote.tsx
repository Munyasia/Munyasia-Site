"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { personal, projects, studio } from "@/lib/data/site-content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function StudioNote() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-studio]");
        gsap.set(items, { y: 20, opacity: 0 });

        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const clientBuilds = projects.filter(
    (project) => project.type === "Client Project",
  ).length;

  const record = [
    { label: "Role", value: studio.role },
    { label: "Client builds", value: String(clientBuilds) },
    { label: "Based in", value: personal.location },
  ];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-studio"
      className="border-t border-border"
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24 lg:grid lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-3">
          <SectionLabel index="02">
            <span id="about-studio">Studio</span>
          </SectionLabel>
        </div>

        <div className="mt-10 lg:col-span-8 lg:col-start-5 lg:mt-0">
          <div data-studio className="border border-border p-6 sm:p-8">
            <Image
              src={studio.logo}
              alt={studio.name}
              width={800}
              height={282}
              sizes="(min-width: 640px) 320px, 240px"
              className="h-auto w-[240px] max-w-full sm:w-[320px]"
            />
          </div>

          <h3
            data-studio
            className="mt-8 max-w-[26ch] font-display text-h2 leading-none tracking-tight text-foreground"
          >
            {studio.heading}
          </h3>

          <p
            data-studio
            className="mt-6 max-w-[58ch] text-body text-muted-foreground"
          >
            {studio.body}
          </p>

          <p
            data-studio
            className="mt-4 max-w-[58ch] text-body text-muted-foreground"
          >
            {studio.aside}
          </p>

          <dl data-studio className="mt-8 border-t border-border">
            {record.map((row) => (
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

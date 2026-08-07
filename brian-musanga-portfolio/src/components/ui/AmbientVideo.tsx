"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// Graded footage runs through the site's duotone filter so it can never
// introduce a fifth hue (see DESIGN.md Four-Color Rule). The hero opts out
// and plays its footage in full color as a named exception, so it only needs
// a light scrim to keep the name lockup and CTAs legible.
const SCRIM = {
  graded:
    "linear-gradient(to bottom, rgba(10,14,20,0.35) 0%, rgba(10,14,20,0.55) 60%, rgba(10,14,20,0.9) 100%)",
  ungraded:
    "linear-gradient(to bottom, rgba(10,14,20,0.15) 0%, rgba(10,14,20,0.3) 55%, rgba(10,14,20,0.7) 100%)",
};

export function AmbientVideo({
  src,
  poster,
  className = "",
  graded = true,
}: {
  src: string;
  poster?: string;
  className?: string;
  graded?: boolean;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <video
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        poster={poster}
        className="h-full w-full object-cover"
        style={
          graded
            ? { filter: "url(#hero-duotone) brightness(0.55)" }
            : undefined
        }
      >
        <source src={src} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{ background: graded ? SCRIM.graded : SCRIM.ungraded }}
      />
    </div>
  );
}

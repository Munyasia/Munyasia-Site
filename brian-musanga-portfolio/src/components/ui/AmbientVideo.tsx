"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

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

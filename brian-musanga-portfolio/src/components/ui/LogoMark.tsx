import { LOGO_MARK_VIEWBOX, LogoMarkPaths } from "./LogoMarkPaths";

export function LogoMark({
  className,
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox={LOGO_MARK_VIEWBOX}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "Brian Musanga logo"}
      className={className}
    >
      <LogoMarkPaths />
    </svg>
  );
}

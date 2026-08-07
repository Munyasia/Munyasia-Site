import { LOGO_MARK_VIEWBOX, LogoMarkPaths } from "./LogoMarkPaths";

/* `decorative` drops the label when the mark sits beside the name in text —
   otherwise screen readers announce "Brian Musanga" twice. */
export function LogoMark({
  className,
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <svg
      /* Cropped to the stroke bounds rather than the 512 square the app icon
         uses — inline beside text, the square's empty right half opened a gap
         and shrank the glyph. Size callers by height; width follows. */
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

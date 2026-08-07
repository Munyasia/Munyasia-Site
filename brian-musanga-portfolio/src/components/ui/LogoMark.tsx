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
      viewBox="154 74 187 364"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "Brian Musanga logo"}
      className={className}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={52}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M180 100L180 412" />
        <path d="M180 100A78 78 0 0 1 180 256" />
        <path d="M180 256A78 78 0 0 1 180 412" />
      </g>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={22}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.5}
      >
        <path d="M246 284L246 384" />
        <path d="M330 284L330 384" />
        <path d="M246 284L288 334L330 284" />
      </g>
    </svg>
  );
}

/* opengraph-image.tsx keeps a third copy of these paths as a raw string.
   Satori renders a CSS subset rather than React SVG, so it can't import this
   one. Change the geometry here and you have to change it there too. */
export function LogoMarkPaths() {
  return (
    <>
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
    </>
  );
}

export const LOGO_MARK_VIEWBOX = "154 74 187 364";
export const LOGO_MARK_BOUNDS = { x: 154, y: 74, width: 187, height: 364 };

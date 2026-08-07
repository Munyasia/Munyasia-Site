export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      role="img"
      aria-label="Brian Musanga logo"
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

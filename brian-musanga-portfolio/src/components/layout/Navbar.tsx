import Link from "next/link";
import { personal } from "@/lib/data/site-content";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="mx-auto flex h-[var(--nav-h)] max-w-5xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-foreground sm:text-base"
        >
          {personal.name}
        </Link>

        <div className="flex items-center gap-6">
          <span className="label hidden md:inline">{personal.location}</span>
          <a
            href={personal.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-invert"
          >
            Talk to me
          </a>
        </div>
      </nav>
    </header>
  );
}

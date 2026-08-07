import Link from "next/link";
import { personal } from "@/lib/data/site-content";
import { LogoMark } from "@/components/ui/LogoMark";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="mx-auto flex h-[var(--nav-h)] max-w-5xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 font-mono text-sm tracking-tight text-foreground sm:gap-3 sm:text-base"
        >
          <LogoMark
            decorative
            className="h-6 w-auto shrink-0 text-foreground transition-colors duration-150 ease-out group-hover:text-accent sm:h-7"
          />
          {/* Full name wraps past one line on narrow screens, so it forks
              short below sm rather than truncating mid-name. */}
          <span className="truncate sm:hidden">Brian Munyasia</span>
          <span className="hidden truncate sm:inline">{personal.name}</span>
        </Link>

        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <span className="label hidden md:inline">{personal.location}</span>
          <a
            href={personal.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta whitespace-nowrap"
          >
            Talk to me
          </a>
        </div>
      </nav>
    </header>
  );
}

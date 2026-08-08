import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { personal, studio } from "@/lib/data/site-content";
import { LogoMark } from "@/components/ui/LogoMark";

const iconLinks = [
  {
    href: personal.github,
    label: "GitHub",
    icon: SiGithub,
    iconProps: {},
  },
  {
    href: `mailto:${personal.email}`,
    label: "Email",
    icon: EnvelopeSimple,
    iconProps: { weight: "light" as const },
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <LogoMark
            decorative
            className="h-8 w-auto shrink-0 text-foreground/80"
          />
          <ul className="label flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>{personal.location}</li>
            <li>{personal.email}</li>
            <li>&copy; {year} {personal.name}</li>
            <li>
              Designed by{" "}
              <Link href="/about" className="link-invert text-foreground">
                {studio.name}
              </Link>
            </li>
          </ul>
        </div>

        <ul className="flex items-center gap-4">
          {iconLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={link.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-[3px] border border-border text-foreground/80 transition-colors duration-150 ease-out hover:bg-foreground hover:text-background"
              >
                <link.icon
                  className="h-4 w-4"
                  aria-hidden="true"
                  {...link.iconProps}
                />
              </a>
            </li>
          ))}
          <li>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="label link-invert text-foreground/80 transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

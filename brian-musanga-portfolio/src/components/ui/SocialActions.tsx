import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { SiGithub, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { personal } from "@/lib/data/site-content";

type Action = {
  href: string;
  label: string;
  /* Named a fifth and sixth hue past the Four-Color Rule on purpose, as a
     logo exception alongside the hero video and project screenshots. */
  brand: string;
  primary?: boolean;
};

/* GitHub's registered hex is #181717, which is invisible against this
   background. Their own dark-surface guidance is the white mark, so the
   foreground token is the accurate logo colour here, not a substitution.
   LinkedIn was pulled from Simple Icons upstream, so it rides as a
   typographic "in" in LinkedIn blue. Email is nobody's brand and stays
   floral white. */
const actions: Action[] = [
  {
    href: personal.whatsapp,
    label: "WhatsApp",
    brand: "#25D366",
    primary: true,
  },
  { href: `mailto:${personal.email}`, label: "Email", brand: "#fefaef" },
  { href: personal.linkedin, label: "LinkedIn", brand: "#0A66C2" },
  { href: personal.github, label: "GitHub", brand: "#fefaef" },
];

function ActionGlyph({ label }: { label: string }) {
  if (label === "WhatsApp") {
    return <SiWhatsapp className="h-4 w-4" aria-hidden="true" />;
  }
  if (label === "GitHub") {
    return <SiGithub className="h-4 w-4" aria-hidden="true" />;
  }
  if (label === "Email") {
    return (
      <EnvelopeSimple className="h-4 w-4" weight="light" aria-hidden="true" />
    );
  }
  return (
    <span aria-hidden="true" className="font-display text-sm leading-none">
      in
    </span>
  );
}

export function SocialActions() {
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {actions.map((action) => {
        const external = action.href.startsWith("http");

        return (
          <li key={action.label}>
            <a
              href={action.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              data-primary={action.primary ? "" : undefined}
              className="social-cta"
              style={{ "--brand": action.brand } as React.CSSProperties}
            >
              <span style={{ color: "var(--brand)" }} className="inline-flex">
                <ActionGlyph label={action.label} />
              </span>
              {action.label}
              {external ? (
                <span aria-hidden="true" className="text-muted-foreground">
                  ↗
                </span>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

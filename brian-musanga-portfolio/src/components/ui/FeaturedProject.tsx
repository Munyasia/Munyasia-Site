import Image from "next/image";
import type { Project } from "@/lib/data/site-content";

export function FeaturedProject({
  project,
  reverse = false,
  priority = false,
}: {
  project: Project;
  reverse?: boolean;
  priority?: boolean;
}) {
  const { title, type, year, description, outcome, stack, image, liveUrl } =
    project;

  return (
    <article className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-none border border-border lg:col-span-7 ${
          reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <Image
          src={image}
          alt={`Screenshot of ${title}`}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
          priority={priority}
        />
      </div>

      <div
        className={`flex flex-col gap-4 lg:col-span-5 ${
          reverse ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <p className="label">
          {type} &middot; {year}
        </p>
        <h3 className="font-display text-h2 leading-none tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-lg font-medium text-foreground sm:text-xl">
          {outcome}
        </p>
        <p className="max-w-[55ch] text-body text-muted-foreground">
          {description}
        </p>

        <ul className="flex flex-wrap gap-2 pt-1">
          {stack.map((item) => (
            <li key={item} className="label rounded-[3px] border border-border px-2.5 py-0.5">
              {item}
            </li>
          ))}
        </ul>

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-invert mt-2 inline-flex w-fit items-center gap-1 text-sm font-medium text-foreground"
          >
            Visit site
            <span className="font-sans" aria-hidden="true">
              ↗
            </span>
          </a>
        )}
      </div>
    </article>
  );
}

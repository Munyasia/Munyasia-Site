import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FeaturedProject } from "@/components/ui/FeaturedProject";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ContactCta } from "@/components/sections/ContactCta";
import { projects, work } from "@/lib/data/site-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, workCollectionSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Portfolio",
  description: work.intro,
  alternates: { canonical: "/work" },
  openGraph: {
    type: "website",
    title: "Portfolio",
    description: work.intro,
    url: "/work",
  },
};

export default function Work() {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);
  const total = String(projects.length).padStart(2, "0");

  return (
    <>
      <JsonLd data={workCollectionSchema} />
      <JsonLd data={breadcrumbSchema("Portfolio", "/work")} />

      <header className="mx-auto w-full max-w-5xl px-6 pt-16 pb-4 sm:pt-24">
        <SectionLabel index="Portfolio">{total} projects</SectionLabel>

        <h1 className="mt-8 max-w-[14ch] font-display text-h1 leading-none tracking-tight text-foreground">
          {work.heading}
        </h1>

        <p className="mt-6 max-w-[55ch] text-body text-muted-foreground">
          {work.intro}
        </p>
      </header>

      <section
        aria-labelledby="featured-heading"
        className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-24"
      >
        <SectionLabel index="01">
          <span id="featured-heading">Featured</span>
        </SectionLabel>

        <div className="mt-16 flex flex-col gap-24 sm:gap-32">
          {featured.map((project, i) => (
            <FeaturedProject
              key={project.slug}
              project={project}
              reverse={i % 2 === 1}
              priority={i === 0}
            />
          ))}
        </div>
      </section>

      <section
        aria-labelledby="more-work-heading"
        className="mx-auto w-full max-w-5xl border-t border-border px-6 py-20 sm:py-24"
      >
        <SectionLabel index="02">
          <span id="more-work-heading">More projects</span>
        </SectionLabel>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <ContactCta index="03" />
    </>
  );
}

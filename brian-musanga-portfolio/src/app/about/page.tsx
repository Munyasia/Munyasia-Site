import type { Metadata } from "next";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { AboutStory } from "@/components/sections/AboutStory";
import { WorkHistory } from "@/components/sections/WorkHistory";
import { SkillsLedger } from "@/components/sections/SkillsLedger";
import { ContactCta } from "@/components/sections/ContactCta";
import { about } from "@/lib/data/site-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, profilePageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: "About",
    description: about.intro,
    url: "/about",
  },
};

export default function About() {
  return (
    <>
      <JsonLd data={profilePageSchema} />
      <JsonLd data={breadcrumbSchema("About", "/about")} />
      <AboutIntro />
      <AboutStory />
      <WorkHistory />
      <SkillsLedger />
      <ContactCta index="04" />
    </>
  );
}

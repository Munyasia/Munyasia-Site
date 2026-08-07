import type { Metadata } from "next";
import { AboutIntro } from "@/components/sections/AboutIntro";
import { AboutStory } from "@/components/sections/AboutStory";
import { WorkHistory } from "@/components/sections/WorkHistory";
import { SkillsLedger } from "@/components/sections/SkillsLedger";
import { ContactCta } from "@/components/sections/ContactCta";
import { about } from "@/lib/data/site-content";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
};

export default function About() {
  return (
    <>
      <AboutIntro />
      <AboutStory />
      <WorkHistory />
      <SkillsLedger />
      <ContactCta index="04" />
    </>
  );
}

import type { Metadata } from "next";
import { ContactIntro } from "@/components/sections/ContactIntro";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { personal } from "@/lib/data/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Email or WhatsApp me directly. I work from ${personal.location} and I am open to client work and full-time roles.`,
};

export default function Contact() {
  return (
    <>
      <ContactIntro />
      <ContactDetails />
    </>
  );
}

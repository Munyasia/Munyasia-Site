import type { Metadata } from "next";
import { ContactIntro } from "@/components/sections/ContactIntro";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { personal } from "@/lib/data/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Email or WhatsApp me directly. I work from ${personal.location} and I am open to client work and full-time roles.`,
};

/* No ContactCta here: the other pages point at this one, and repeating the
   call to action on its own destination would be a loop. */
export default function Contact() {
  return (
    <>
      <ContactIntro />
      <ContactDetails />
    </>
  );
}

import type { Metadata } from "next";
import { ContactIntro } from "@/components/sections/ContactIntro";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { ContactFaq } from "@/components/sections/ContactFaq";
import { personal } from "@/lib/data/site-content";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, contactPageSchema, faqSchema } from "@/lib/seo";

const description = `Email or WhatsApp me directly. I work from ${personal.location} and I am open to client work and full-time roles.`;

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: "Contact",
    description,
    url: "/contact",
  },
};

export default function Contact() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema("Contact", "/contact")} />
      <ContactIntro />
      <ContactDetails />
      <ContactFaq />
    </>
  );
}

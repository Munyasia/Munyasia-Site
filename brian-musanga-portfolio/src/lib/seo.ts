import {
  about,
  contact,
  experience,
  faq,
  home,
  personal,
  projects,
  skills,
  studio,
  work,
} from "@/lib/data/site-content";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

const PERSON_ID = `${siteUrl}/#person`;
const WEBSITE_ID = `${siteUrl}/#website`;
const STUDIO_ID = `${siteUrl}/#studio`;

const alumniOf = {
  "@type": "CollegeOrUniversity",
  name: "Maasai Mara University",
} as const;

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: personal.name,
  givenName: "Brian",
  familyName: "Musanga",
  jobTitle: personal.role,
  description: personal.headline,
  url: siteUrl,
  image: absoluteUrl(personal.photoUrl),
  email: `mailto:${personal.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  sameAs: [personal.github, personal.linkedin],
  knowsAbout: skills.flatMap((group) => group.items),
  alumniOf,
  hasOccupation: {
    "@type": "Occupation",
    name: personal.role,
    occupationLocation: {
      "@type": "City",
      name: "Nairobi",
    },
  },
  worksFor: { "@id": STUDIO_ID },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": STUDIO_ID,
  name: studio.name,
  description: studio.body,
  url: absoluteUrl("/about"),
  logo: absoluteUrl(studio.logo),
  image: absoluteUrl(studio.logo),
  founder: { "@id": PERSON_ID },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: siteUrl,
  name: personal.name,
  description: personal.headline,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
};

export function breadcrumbSchema(name: string, pathname: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: absoluteUrl(pathname),
      },
    ],
  };
}

export const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: absoluteUrl("/about"),
  name: `About ${personal.name}`,
  description: about.intro,
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: { "@id": PERSON_ID },
};

export const workCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  url: absoluteUrl("/work"),
  name: work.heading,
  description: work.intro,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": PERSON_ID },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: projects.length,
    itemListElement: projects.map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        image: absoluteUrl(project.image),
        dateCreated: project.year,
        keywords: project.stack.join(", "),
        creator: {
          "@id":
            project.type === "Client Project" ? STUDIO_ID : PERSON_ID,
        },
        ...(project.liveUrl ? { url: project.liveUrl } : {}),
      },
    })),
  },
};

export const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: absoluteUrl("/contact"),
  name: contact.headingLines.join(" "),
  description: contact.subline,
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: { "@id": PERSON_ID },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${absoluteUrl("/contact")}#faq`,
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function buildLlmsTxt() {
  const lines: string[] = [
    `# ${personal.name}`,
    "",
    `> ${personal.headline} Based in ${personal.location}.`,
    "",
    about.statement,
    "",
    "## Studio",
    "",
    `${studio.name}, founded by ${personal.name}. ${studio.body}`,
    "",
    studio.aside,
    "",
    "## Pages",
    "",
    `- [Home](${siteUrl}): ${home.heroSubline}`,
    `- [About](${absoluteUrl("/about")}): ${about.intro}`,
    `- [Portfolio](${absoluteUrl("/work")}): ${work.intro}`,
    `- [Contact](${absoluteUrl("/contact")}): Email and WhatsApp, plus working hours in ${personal.location}.`,
    "",
    "## What Brian is hired to build",
    "",
  ];

  for (const pillar of home.pillars) {
    lines.push(`### ${pillar.title}`, "", pillar.body, "");
    for (const proof of pillar.proof) {
      lines.push(`- ${proof}`);
    }
    lines.push("");
  }

  lines.push("## Projects", "");
  for (const project of projects) {
    const url = project.liveUrl ? ` Live at ${project.liveUrl}.` : "";
    lines.push(
      `### ${project.title} (${project.type}, ${project.year})`,
      "",
      `${project.description}${url}`,
      "",
      `Outcome: ${project.outcome}`,
      "",
      `Stack: ${project.stack.join(", ")}`,
      "",
    );
  }

  lines.push("## Background", "");
  for (const paragraph of about.paragraphs) {
    lines.push(paragraph, "");
  }

  lines.push("## Experience", "");
  for (const job of experience) {
    lines.push(`### ${job.role}, ${job.org} (${job.period})`, "", job.detail, "");
  }

  lines.push("## Skills", "");
  for (const group of skills) {
    lines.push(`- ${group.category}: ${group.items.join(", ")}`);
  }

  lines.push("", "## Common questions", "");
  for (const item of faq) {
    lines.push(`### ${item.question}`, "", item.answer, "");
  }

  lines.push(
    "## Contact",
    "",
    `- Email: ${personal.email}`,
    `- WhatsApp: ${personal.whatsapp}`,
    `- GitHub: ${personal.github}`,
    `- LinkedIn: ${personal.linkedin}`,
    `- Location: ${personal.location}`,
    "",
  );

  return lines.join("\n");
}

export type Personal = {
  name: string;
  role: string;
  headline: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  photoUrl: string;
};

export type ProjectType = "Client Project" | "Independent Project";

export type Project = {
  slug: string;
  title: string;
  type: ProjectType;
  year: string;
  stack: string[];
  description: string;
  outcome: string;
  highlights: string[];
  featured: boolean;
  image: string;
  liveUrl: string | null;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Pillar = {
  index: string;
  /* One word for the sticky index and the panel eyebrow. */
  short: string;
  title: string;
  body: string;
  /* Concrete things shipped under this pillar, pulled from real projects. */
  proof: string[];
};

export type Home = {
  heroHeading: string[];
  heroEmphasis: string;
  heroSubline: string;
  scrollHint: string;
  pillarsHeading: string;
  pillarsBody: string;
  pillars: Pillar[];
  ctaHeading: string;
  ctaEmphasis: string;
  ctaBody: string;
};

export const personal: Personal = {
  name: "Brian Munyasia Musanga",
  role: "Full-Stack & Cybersecurity Analyst",
  headline:
    "I build production web apps and embed AI into real products, with a security-first mindset.",
  location: "Nairobi, Kenya",
  email: "brianmuse624@gmail.com",
  github: "https://github.com/Munyasia",
  linkedin: "https://www.linkedin.com/in/brian-munyasia-bm5777",
  whatsapp: "https://wa.me/254719358135",
  photoUrl: "/hero-photo.jpg",
};

export const navLinks = [
  { index: "01", href: "/", label: "Home" },
  { index: "02", href: "/about", label: "About" },
  { index: "03", href: "/work", label: "Portfolio" },
  { index: "04", href: "/contact", label: "Contact" },
];

/* Transforms are width-capped: uncapped f_auto,q_auto was shipping the full
   master, which left the background blank until it arrived. Posters are frame
   0 of the same asset (so_0 + .jpg), so they always match the footage. The
   site copy runs smaller because it sits under a duotone filter and a scrim. */
export const backgroundVideo = {
  hero: "https://res.cloudinary.com/dmvb8o8z2/video/upload/f_auto,q_auto,w_1920,c_limit/v1781510952/bg_c8giyo.mp4",
  heroPoster:
    "https://res.cloudinary.com/dmvb8o8z2/video/upload/so_0,f_auto,q_auto,w_1920,c_limit/v1781510952/bg_c8giyo.jpg",
  site: "https://res.cloudinary.com/dmvb8o8z2/video/upload/f_auto,q_auto,w_1280,c_limit/v1781518297/bg-1_k2mbbu.mp4",
  sitePoster:
    "https://res.cloudinary.com/dmvb8o8z2/video/upload/so_0,f_auto,q_auto,w_1280,c_limit/v1781518297/bg-1_k2mbbu.jpg",
};

export const projects: Project[] = [
  {
    slug: "lirason",
    title: "Lirason Investments",
    type: "Client Project",
    year: "2026",
    stack: [
      "Next.js App Router",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Auth.js",
      "Paystack",
      "Cloudinary",
    ],
    description:
      "Production e-commerce platform built for the Kenyan market, with a full order pipeline from catalog to checkout to seller fulfillment.",
    outcome:
      "Revenue infrastructure for a Kenyan business: full online checkout, secure payments, found on Google.",
    highlights: [
      "REST APIs for cart, checkout, catalog, and orders",
      "Google OAuth with JWT sessions and account lockout",
      "HMAC-SHA512 verified Paystack webhook",
      "Role-gated seller dashboard",
      "Full SEO with dynamic sitemap and JSON-LD",
    ],
    featured: true,
    image: "/projects/lirason.jpg",
    liveUrl: "https://lirasoninvestments.vercel.app",
  },
  {
    slug: "heardback",
    title: "HeardBack",
    type: "Independent Project",
    year: "2026",
    stack: [
      "Next.js PWA",
      "Gmail API OAuth",
      "Neon",
      "Prisma",
      "Gemini Flash",
      "Claude Haiku",
      "web-push",
    ],
    description:
      "AI-powered job application tracker that reads a Gmail inbox and surfaces status updates without exposing full email content to any model.",
    outcome:
      "AI email triage engineered to near-zero cost: only 1-3 of ~50 daily emails ever reach the model.",
    highlights: [
      "Three-layer email funnel sends only 1-3 of ~50 daily emails to the LLM, near-zero AI cost",
      "Strict data minimization: sender, subject, and truncated snippet only",
      "Read-only Gmail OAuth with a cron-driven serverless watcher",
    ],
    featured: true,
    image: "/projects/heardback.jpg",
    liveUrl: "https://getheardback.vercel.app",
  },
  {
    slug: "beliways",
    title: "Beliways Adventures",
    type: "Client Project",
    year: "2026",
    stack: ["Next.js 15", "React 19", "Tailwind v4", "Motion", "nuqs"],
    description:
      "Travel and safari platform front end built to put destinations in front of people and turn browsing into inquiries.",
    outcome:
      "A safari brand's browsing experience rebuilt to turn visitors into inquiries.",
    highlights: [
      "Mega-menu navigation",
      "Auto-scrolling destination carousels",
      "Video hero",
      "Testimonial widgets",
      "Type-safe URL filter state with nuqs",
    ],
    featured: true,
    image: "/projects/beliways.jpg",
    liveUrl: "https://beliwaysadventures.vercel.app",
  },
  {
    slug: "maahir",
    title: "Maahir Graphics",
    type: "Client Project",
    year: "2026",
    stack: ["Next.js 15", "React 19", "Tailwind v4", "Motion", "nuqs"],
    description:
      "Portfolio site for the Maahir Graphics design business, built so their client work has somewhere worth sending people.",
    outcome:
      "A design studio's client work given a portfolio worth linking to.",
    highlights: [
      "Responsive component-driven build",
      "Motion-enhanced UI",
    ],
    featured: false,
    image: "/projects/maahir.jpg",
    liveUrl: "https://maahirgraphics.netlify.app",
  },
  {
    slug: "panama",
    title: "Panama General Agencies",
    type: "Client Project",
    year: "2025",
    stack: ["HTML5", "CSS", "JavaScript", "PostgreSQL", "Firestore"],
    description:
      "Corporate website for an insurance agency, backed by a hybrid database setup for business records and client engagement.",
    outcome:
      "A corporate front end backed by real infrastructure for records and client engagement.",
    highlights: [
      "Hybrid PostgreSQL and Firestore backend for business records and client engagement",
    ],
    featured: false,
    image: "/projects/panama.jpg",
    liveUrl: "https://panamageneralagencies.com",
  },
  {
    slug: "jadi",
    title: "Jadi",
    type: "Independent Project",
    year: "2024-2025",
    stack: [
      "Next.js",
      "Tailwind",
      "Python OCR",
      "Google Gemini",
      "LangChain",
      "Firestore",
      "PostgreSQL",
    ],
    description:
      "AI platform that categorizes academic documents automatically, turning unsorted PDFs and DOCX files into a searchable, organized library.",
    outcome:
      "Cut document sorting time by ~90%, putting learning material one search away for students.",
    highlights: [
      "OCR ingestion of PDF and DOCX files",
      "Automated categorization and semantic search via Gemini and LangChain",
      "Cut manual sorting time by roughly 90 percent",
    ],
    featured: false,
    image: "/projects/jadi.jpg",
    liveUrl: null,
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "Vue",
      "TypeScript",
      "Tailwind CSS",
      "HTML5/CSS",
    ],
  },
  {
    category: "Backend & Data",
    items: [
      "REST API Design",
      "Next.js Route Handlers",
      "Database Schema Design",
      "PostgreSQL",
      "SQL",
      "Prisma",
      "Firestore",
      "Data Modeling",
      "Serverless Functions & Cron Jobs",
      "Third-Party API Integration",
      "Cloudinary Media Pipeline",
      "Python",
      "Django",
      "Java",
    ],
  },
  /* Security is the differentiator, so it stands on its own rather than
     sharing a row with Git and Vercel, and every entry names a specific
     control or discipline. Vague lines like "Cybersecurity Fundamentals"
     read as a course title to a recruiter scanning for keywords. */
  {
    category: "Security",
    items: [
      "OAuth 2.0 & Auth.js",
      "JWT Sessions & Account Lockout",
      "HMAC-SHA512 Webhook Verification",
      "Role-Based Access Control",
      "Data Minimization by Design",
      "Data Protection Act 2019",
      "SOC/NOC Tier 1",
      "Threat Intelligence (CTI)",
      "Log Analysis & IOC Identification",
      "Malware Detection",
      "Blue Team Exercises",
      "Vulnerability Identification",
      "Linux & Networking Fundamentals",
    ],
  },
  {
    category: "AI",
    items: ["Gemini", "Claude", "LangChain", "Prompt Engineering", "AI Pipelines"],
  },
  {
    category: "Platform & Payments",
    items: [
      "Git",
      "Vercel",
      "Neon",
      "Environment & Deployment Config",
      "Paystack",
      "M-Pesa Daraja",
    ],
  },
];

export type AboutRecord = { label: string; value: string };

export type Job = {
  period: string;
  role: string;
  org: string;
  detail: string;
};

/* Reverse chronological. TryHackMe sits on the CV under work experience but
   is training, not a job, so it stays in the background prose instead of
   padding this list. */
export const experience: Job[] = [
  {
    period: "Apr 2026",
    role: "Technical Support & Data Operations Assistant",
    org: "IEBC, voter registration exercise",
    detail:
      "Kept KIEMS biometric kits running through the registration exercise, fixing hardware and software faults on the spot. Handled voter data under the Data Protection Act 2019 and trained the clerks who used the system.",
  },
  {
    period: "Jun to Aug 2024",
    role: "ICT Attachment Trainee",
    org: "Narok County Government, Dept. of ICT and E-Government",
    detail:
      "Installed and configured hardware and operating systems, and cleared the network and system faults that were keeping staff from working.",
  },
  {
    period: "May to Aug 2023",
    role: "Customer Service Assistant",
    org: "Supermarket counter",
    detail:
      "High volume transactions and the complaints that came with them. This is where I learned to stay calm with someone who is already annoyed.",
  },
  {
    period: "2022 to 2023",
    role: "Graphic Designer, Photo and Video Editor",
    org: "Freelance",
    detail:
      "Social media graphics and video campaigns in Photoshop and Premiere Pro. Audience interaction rose about 40% for one client, and event turnout about 25% for a non-profit.",
  },
];

/* Written first person. The rest of the site speaks as Brian, and this is the
   page where third-person CV voice would read as someone else's summary. */
export const about = {
  statement:
    "I build software that people actually rely on. Then, I do my absolute best to break it into pieces before anyone else can.",
  statementEmphasis: "break it into pieces",
  intro:
    "I work with business owners who need something that sells, and with teams who need someone to own a feature end to end.",
  portrait: {
    src: "https://res.cloudinary.com/dmvb8o8z2/image/upload/v1786135065/brian-headshot_z1gp8s.jpg",
    alt: "Brian Munyasia Musanga",
  },
  record: [
    { label: "Based in", value: "Nairobi, Kenya" },
    {
      label: "Studied",
      value: "BSc Computer Science, Maasai Mara University",
    },
    {
      label: "Certified",
      value: "Cybersecurity Bootcamp, Moringa School",
    },
    {
      label: "In progress",
      value: "CCNA at Kabarak University, ISC2 candidate",
    },
    { label: "Available", value: "Client work and full-time roles" },
  ] satisfies AboutRecord[],
  paragraphs: [
    "Computer Science at Maasai Mara University, then straight into shipping. I take work from an empty schema to a deployed UI without handing it off halfway.",
    "I put language models into products where they earn their place. What I send them matters more than which one I picked, so I spend the time on the filtering and the prompts rather than shopping for a bigger model.",
    "The security habit came from TryHackMe, CyberDefenders blue team exercises, an ISC2 candidacy and the Moringa bootcamp, where the work was log analysis, malware detection and picking indicators of compromise out of noise. It means I build assuming someone will try the front door.",
    "I led a student tech work group and ran sessions with GDSC, which is where I learned to explain a system to people who did not build it.",
  ],
};

export type ContactRow = {
  label: string;
  value: string;
  /* Absent means the value is a fact, not somewhere to go. */
  href?: string;
};

export type ContactGroup = { title: string; rows: ContactRow[] };

export type Contact = {
  headingLines: string[];
  signature: string;
  subline: string;
  groups: ContactGroup[];
};

/* Heading ships in sentence case and is uppercased in CSS, so a screen reader
   and a copy-paste both get "Let's work together" rather than shouting.
   Split into two lines by hand because the mask reveal animates one element
   per line, and letting the browser choose the break would desync them.
   Line two is the shorter of the pair: the layout indents it, so a longer
   second line would push past the container. Check --text-mega if this
   copy changes. */
export const contact: Contact = {
  headingLines: ["Let's work", "together"],
  /* The one word set in the script face, sitting under the heading in accent
     gold so the page opens with a hand-written note rather than a form. */
  signature: "Contact",
  subline:
    "Or what's already broken. Either one is a good place to start.",
  groups: [
    {
      title: "Direct",
      rows: [
        {
          label: "Email",
          value: personal.email,
          href: `mailto:${personal.email}`,
        },
        {
          label: "WhatsApp",
          value: "+254 719 358 135",
          href: personal.whatsapp,
        },
      ],
    },
    {
      title: "Availability",
      rows: [
        { label: "Based in", value: "Nairobi, Kenya (UTC+3)" },
        { label: "Hours", value: "Monday to Saturday, 9:00 to 18:00" },
        { label: "Open to", value: "Client work and full-time roles" },
      ],
    },
  ],
};

export const work = {
  heading: "Portfolio",
  intro:
    "Client builds that had to earn their keep, and independent projects where I wanted to understand something well enough to ship it.",
};

export const home: Home = {
  heroHeading: [
    "I help businesses launch secure web apps and AI tools that actually get customers.",
  ],
  heroEmphasis: "get customers",
  heroSubline: "Let's take your product from an idea to shipped code.",
  scrollHint: "Scroll",
  pillarsHeading: "What I get hired to build",
  pillarsBody:
    "Most of what comes my way falls into one of these. Everything listed here is running in something I have already shipped.",
  pillars: [
    {
      index: "A",
      short: "Revenue",
      title: "Ship products that generate revenue",
      body: "E-commerce, payments and SEO engineered so customers find you and buy. From catalog to checkout to the payment webhook, built to convert and built to be found.",
      proof: [
        "Paystack checkout",
        "Catalog to fulfillment pipeline",
        "Dynamic sitemap and JSON-LD",
      ],
    },
    {
      index: "B",
      short: "Automation",
      title: "Automate what wastes your time",
      body: "Some jobs are worth handing to a machine, plenty aren't, and I'll say which is which before we build anything. When AI is the right tool I keep it on a short leash: filter the work first, then send it only what it needs. Heavy workloads cost real money, and you'll hear that from me, not from the invoice.",
      proof: [
        "Only 1 to 3 of 50 emails reach the model",
        "Sender, subject and a snippet, nothing more",
        "OCR into a searchable library",
      ],
    },
    {
      index: "C",
      short: "Security",
      title: "Security from day one",
      body: "Authentication, verified payments, protected data. Systems built by someone trained in how attackers think, so problems are prevented instead of patched.",
      proof: [
        "OAuth with JWT sessions",
        "HMAC-verified webhooks",
        "Account lockout and role gates",
      ],
    },
  ],
  /* No trailing period: ContactCta renders an animated ellipsis in its place. */
  ctaHeading: "Tell me what your business needs",
  ctaEmphasis: "business needs",
  ctaBody:
    "I design, build and secure web products end to end. Start with whatever is slowing you down and I will work out the rest.",
};

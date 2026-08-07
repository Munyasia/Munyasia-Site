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
  title: string;
  body: string;
};

export type Home = {
  heroHeading: string[];
  heroEmphasis: string;
  heroSubline: string;
  scrollHint: string;
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
  { index: "03", href: "/work", label: "Work" },
  { index: "04", href: "/contact", label: "Contact" },
];

export const backgroundVideo = {
  hero: "https://res.cloudinary.com/dmvb8o8z2/video/upload/f_auto,q_auto/v1781510952/bg_c8giyo.mp4",
  site: "https://res.cloudinary.com/dmvb8o8z2/video/upload/f_auto,q_auto/v1781518297/bg-1_k2mbbu.mp4",
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
    featured: true,
    image: "/projects/jadi.jpg",
    liveUrl: null,
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
      "Travel and safari platform front end designed to showcase destinations and convert browsing into inquiries.",
    outcome:
      "A safari brand's browsing experience rebuilt to turn visitors into inquiries.",
    highlights: [
      "Mega-menu navigation",
      "Auto-scrolling destination carousels",
      "Video hero",
      "Testimonial widgets",
      "Type-safe URL filter state with nuqs",
    ],
    featured: false,
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
      "Portfolio site for the Maahir Graphics design business, built as a responsive, motion-enhanced showcase of client work.",
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
];

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS"],
  },
  {
    category: "Backend & Data",
    items: [
      "REST API Design",
      "PostgreSQL",
      "Prisma",
      "Firestore",
      "Python",
      "Java",
    ],
  },
  {
    category: "AI",
    items: ["Gemini", "Claude", "LangChain", "Prompt Engineering", "AI Pipelines"],
  },
  {
    category: "Security & Ops",
    items: [
      "Auth.js/OAuth",
      "Cybersecurity Fundamentals",
      "SOC Tier 1",
      "CTI",
      "Git",
      "Vercel",
      "Neon",
      "Paystack/Mpesa",
    ],
  },
];

export const about = {
  paragraphs: [
    "Computer Science graduate from Maasai Mara University who ships full-stack apps end to end, from database schema to deployed UI.",
    "Integrates LLMs into real products with a focus on prompt engineering and data minimization, not novelty AI features.",
    "Builds with a secure-by-design mindset, shaped by TryHackMe, CyberDefenders blue team exercises, ISC2 candidacy, and the Moringa bootcamp.",
    "Brings leadership experience through GDSC and leading a student tech work group.",
  ],
};

export const home: Home = {
  heroHeading: [
    "I help businesses launch secure web apps and AI tools that actually get customers.",
  ],
  heroEmphasis: "get customers",
  heroSubline: "Let's take your product from an idea to shipped code.",
  scrollHint: "Scroll",
  pillars: [
    {
      index: "A",
      title: "Ship products that generate revenue",
      body: "E-commerce, payments and SEO engineered so customers find you and buy. From catalog to checkout to the payment webhook, built to convert and built to be found.",
    },
    {
      index: "B",
      title: "Automate with AI, without burning money",
      body: "AI that pays for itself: pipelines designed for cost-awareness, sending only what matters to the model. Automation that saves hours of manual work, with strict data minimization by default.",
    },
    {
      index: "C",
      title: "Security from day one",
      body: "Authentication, verified payments, protected data. Systems built by someone trained in how attackers think, so problems are prevented instead of patched.",
    },
  ],
  ctaHeading: "Have a problem worth solving?",
  ctaEmphasis: "solving",
  ctaBody:
    "I design, build and secure web products end to end. Tell me what is slowing your business down.",
};

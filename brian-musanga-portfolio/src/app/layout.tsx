import type { Metadata, Viewport } from "next";
import { Allura, Fira_Code, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { AmbientVideo } from "@/components/ui/AmbientVideo";
import { SiteIntro } from "@/components/ui/SiteIntro";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import {
  INTRO_SEEN_KEY,
  IntroProvider,
} from "@/components/providers/IntroProvider";
import { Navbar } from "@/components/layout/Navbar";
import { MenuFab } from "@/components/layout/MenuFab";
import { Footer } from "@/components/layout/Footer";
import { backgroundVideo, personal } from "@/lib/data/site-content";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const generalSans = localFont({
  variable: "--font-general-sans",
  src: [
    {
      path: "../fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});

/* Loaded site-wide because the variable lives on <html>, but only the contact
   signature ever paints it. One weight, one word. */
const allura = Allura({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/* OG tags need absolute URLs. Vercel injects VERCEL_PROJECT_PRODUCTION_URL on
   every deploy, so previews and production resolve without a hardcoded domain.
   Set NEXT_PUBLIC_SITE_URL (with protocol) once a custom domain is attached. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: personal.name,
    template: `%s · ${personal.name}`,
  },
  description: personal.headline,
  openGraph: {
    type: "website",
    siteName: personal.name,
    title: personal.name,
    description: personal.headline,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: personal.name,
    description: personal.headline,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e14",
};

/* Runs synchronously before the overlay below is parsed, so a repeat visitor
   never sees a frame of intro before hydration removes it. Same trick as the
   classic theme-flash guard. */
const introGuard = `try{if(sessionStorage.getItem(${JSON.stringify(
  INTRO_SEEN_KEY,
)})||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("intro-seen")}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${firaCode.variable} ${generalSans.variable} ${jetbrainsMono.variable} ${allura.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: introGuard }} />
        <svg width="0" height="0" aria-hidden="true" className="absolute">
          <defs>
            <filter id="hero-duotone" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="0.2126 0.7152 0.0722 0 0
                        0.2126 0.7152 0.0722 0 0
                        0.2126 0.7152 0.0722 0 0
                        0       0      0      1 0"
              />
              <feComponentTransfer>
                <feFuncR type="table" tableValues="0.039 0.996" />
                <feFuncG type="table" tableValues="0.055 0.980" />
                <feFuncB type="table" tableValues="0.078 0.937" />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>
        <AmbientVideo
          src={backgroundVideo.site}
          poster={backgroundVideo.sitePoster}
          className="fixed inset-0 -z-10"
        />
        <IntroProvider>
          <SiteIntro />
          <SmoothScrollProvider>
            <Navbar />
            <main className="flex-1 pt-[var(--nav-h)]">{children}</main>
            <Footer />
            <MenuFab />
          </SmoothScrollProvider>
        </IntroProvider>
      </body>
    </html>
  );
}

import { chromium } from "playwright-core";
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectsDir = path.join(__dirname, "..", "public", "projects");

/* Each site is captured at the aspect ratio of the card it lands in, so the
   shot fills its frame without object-cover throwing away a third of it.
   Featured rows are 4:3 (FeaturedProject), the grid cards are 16:10
   (ProjectCard). Both viewports sit above the 1024px desktop breakpoint.

   panama is omitted: the domain resolves but refuses connections. jadi has no
   public URL. Both keep the placeholder generate-placeholders.mjs wrote. */
const RATIOS = {
  featured: { width: 1280, height: 960 },
  card: { width: 1440, height: 900 },
};

const shots = [
  {
    slug: "lirason",
    url: "https://lirasoninvestments.vercel.app",
    ratio: "featured",
  },
  {
    slug: "heardback",
    url: "https://getheardback.vercel.app",
    ratio: "featured",
  },
  {
    slug: "beliways",
    url: "https://beliwaysadventures.vercel.app",
    ratio: "featured",
  },
  {
    slug: "maahir",
    url: "https://maahirgraphics.netlify.app",
    ratio: "card",
  },
];

const OUTPUT_WIDTH = 1600;
const SETTLE_MS = 2500;

async function capture(browser, shot) {
  const viewport = RATIOS[shot.ratio];

  /* reducedMotion is what makes these shots usable. Every one of these sites
     gates its intro overlay and scroll reveals behind prefers-reduced-motion,
     so the page lands on its final state instead of being caught mid fade. */
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });

  const page = await context.newPage();

  try {
    await page.goto(shot.url, { waitUntil: "networkidle", timeout: 60_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(SETTLE_MS);

    // No scrolling: it would fire ScrollTrigger and leave the hero half gone.
    const raw = await page.screenshot({ type: "png" });

    const outPath = path.join(projectsDir, `${shot.slug}.jpg`);
    await sharp(raw)
      .resize({ width: OUTPUT_WIDTH })
      .jpeg({ quality: 82 })
      .toFile(outPath);

    console.log(
      `wrote ${outPath} (${viewport.width}x${viewport.height} @2x)`,
    );
    return true;
  } finally {
    await context.close();
  }
}

async function main() {
  // channel: "chrome" borrows the installed Google Chrome, so this never needs
  // playwright's 130MB browser download. Falls back to a bundled chromium if
  // one has been installed via `pnpm dlx playwright install chromium`.
  let browser;
  try {
    browser = await chromium.launch({ channel: "chrome" });
  } catch {
    console.warn("system chrome unavailable, trying bundled chromium");
    browser = await chromium.launch();
  }

  const failed = [];

  try {
    for (const shot of shots) {
      // Per site, so one dead host leaves the other placeholders intact
      // rather than aborting the run.
      try {
        await capture(browser, shot);
      } catch (error) {
        failed.push(shot.slug);
        console.error(`${shot.slug} failed: ${error.message}`);
      }
    }
  } finally {
    await browser.close();
  }

  if (failed.length > 0) {
    console.error(`\n${failed.length} failed: ${failed.join(", ")}`);
    console.error("their existing images were left untouched");
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

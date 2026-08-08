import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..", "..");
const rawPath = path.join(rootDir, "hero-pipeline", "raw", "museNew.jpg");
const outputPath = path.join(rootDir, "public", "hero-bg.jpg");

const crop = { left: 260, top: 700, width: 1650, height: 2900 };
const OUTPUT_WIDTH = 1800;
const OUTPUT_HEIGHT = Math.round(
  (OUTPUT_WIDTH / crop.width) * crop.height
);

const vignetteSvg = `
<svg width="${OUTPUT_WIDTH}" height="${OUTPUT_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="v" cx="62%" cy="38%" r="75%">
      <stop offset="45%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.75"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#v)"/>
</svg>`;

const fadeSvg = `
<svg width="${OUTPUT_WIDTH}" height="${OUTPUT_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1">
      <stop offset="55%" stop-color="#0a0e14" stop-opacity="0"/>
      <stop offset="100%" stop-color="#0a0e14" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="left" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a0e14" stop-opacity="0.85"/>
      <stop offset="45%" stop-color="#0a0e14" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#left)"/>
  <rect width="100%" height="100%" fill="url(#bottom)"/>
</svg>`;

async function makeGrain(width, height) {
  const noise = Buffer.alloc(width * height * 3);
  for (let i = 0; i < noise.length; i++) {
    noise[i] = 128 + Math.floor((Math.random() - 0.5) * 255);
  }
  return sharp(noise, { raw: { width, height, channels: 3 } })
    .blur(0.4)
    .ensureAlpha(0.18)
    .png()
    .toBuffer();
}

async function main() {
  const base = await sharp(rawPath)
    .extract(crop)
    .resize(OUTPUT_WIDTH, OUTPUT_HEIGHT)
    .grayscale()
    .linear(1.28, -(128 * 0.28))
    .toBuffer();

  const grain = await makeGrain(OUTPUT_WIDTH, OUTPUT_HEIGHT);

  await sharp(base)
    .composite([
      { input: grain, blend: "soft-light" },
      { input: Buffer.from(vignetteSvg), blend: "multiply" },
      { input: Buffer.from(fadeSvg), blend: "over" },
    ])
    .jpeg({ quality: 82 })
    .toFile(outputPath);

  console.log(`wrote ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..", "..");
const pipelineDir = path.join(rootDir, "hero-pipeline");

const cutoutPath = path.join(pipelineDir, "cutout.png");
const outputPath = path.join(rootDir, "public", "hero-photo.jpg");

// #0A0E14 (--background), so the cutout blends into the page instead of
// showing a mismatched edge inside the pill mask.
const BACKDROP = { r: 10, g: 14, b: 20 };

// Largest rendered slot is 129x218 (lg breakpoint); object-cover crops this
// square down to that aspect, so 600 leaves headroom for retina without
// shipping a needlessly large file.
const OUTPUT_SIZE = 600;

const foreground = await sharp(cutoutPath).resize(OUTPUT_SIZE, OUTPUT_SIZE).toBuffer();

await sharp({
  create: {
    width: OUTPUT_SIZE,
    height: OUTPUT_SIZE,
    channels: 3,
    background: BACKDROP,
  },
})
  .composite([{ input: foreground }])
  .jpeg({ quality: 88 })
  .toFile(outputPath);

console.log(`wrote ${outputPath}`);

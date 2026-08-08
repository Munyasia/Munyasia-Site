import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

const sourcePath = process.argv[2] ?? path.join(rootDir, "brand", "pxum-logo-raw.png");
const outputPath = path.join(rootDir, "public", "pxum-studio.png");

const OUTPUT_WIDTH = 800;

/* Alpha is the max of R/G/B, not luminance. The mark is bright blue, and blue
   contributes 0.07 to luminance, so a brightness mask renders it around 40%
   transparent. Max channel is 255 across the mark and 0 on the black ground.
   Done in one raw pass so the pixel data and its dimensions can never drift
   apart, which is what sheared the first attempt at this. */
const { data, info } = await sharp(sourcePath)
  .trim({ threshold: 12 })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += info.channels) {
  data[i + 3] = Math.max(data[i], data[i + 1], data[i + 2]);
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .resize({ width: OUTPUT_WIDTH })
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

const out = await sharp(outputPath).metadata();
console.log(
  `wrote ${outputPath} (${out.width}x${out.height}, trimmed from ${info.width}x${info.height}, alpha: ${out.hasAlpha})`,
);

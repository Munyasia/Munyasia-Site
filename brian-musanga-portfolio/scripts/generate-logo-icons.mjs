import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

const BADGE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="#0a0e14" />
  <g fill="none" stroke="#fefaef" stroke-width="52" stroke-linecap="round" stroke-linejoin="round">
    <path d="M180 100L180 412" />
    <path d="M180 100A78 78 0 0 1 180 256" />
    <path d="M180 256A78 78 0 0 1 180 412" />
  </g>
  <g fill="none" stroke="#fefaef" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" opacity="0.55">
    <path d="M246 284L246 384" />
    <path d="M330 284L330 384" />
    <path d="M246 284L288 334L330 284" />
  </g>
</svg>`;

const targets = [
  { file: "apple-touch-icon.png", size: 180 },
  { file: "icon-512.png", size: 512 },
];

async function main() {
  await mkdir(publicDir, { recursive: true });

  for (const { file, size } of targets) {
    const outPath = path.join(publicDir, file);
    await sharp(Buffer.from(BADGE_SVG), { density: 384 })
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`wrote ${outPath}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import sharp from "sharp";
import { mkdir, rename } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..", "..");
const pipelineDir = path.join(rootDir, "hero-pipeline");
const rawDir = path.join(pipelineDir, "raw");

const sourcePath = path.join(rootDir, "museNew.jpg");
const rawPath = path.join(rawDir, "museNew.jpg");
const cropPath = path.join(pipelineDir, "crop.jpg");

const crop = { left: 480, top: 1450, width: 1200, height: 1200 };

await mkdir(rawDir, { recursive: true });
await rename(sourcePath, rawPath).catch((error) => {
  if (error.code !== "ENOENT") throw error;
});

await sharp(rawPath)
  .extract(crop)
  .resize(1400, 1400)
  .jpeg({ quality: 92 })
  .toFile(cropPath);

console.log(`wrote ${cropPath}`);

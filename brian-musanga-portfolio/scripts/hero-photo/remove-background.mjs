import { removeBackground } from "@imgly/background-removal-node";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Never import sharp in this file. @imgly bundles its own sharp (~0.32.4) and
// loading two libvips builds in one Node process segfaults, which is also why
// prepare-hero-photo.mjs runs each step as a separate process.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..", "..");
const pipelineDir = path.join(rootDir, "hero-pipeline");

const cropPath = path.join(pipelineDir, "crop.jpg");
const cutoutPath = path.join(pipelineDir, "cutout.png");

const cropBuffer = await readFile(cropPath);
const cutoutBlob = await removeBackground(
  new Blob([cropBuffer], { type: "image/jpeg" })
);
const cutoutBuffer = Buffer.from(await cutoutBlob.arrayBuffer());
await writeFile(cutoutPath, cutoutBuffer);

console.log(`wrote ${cutoutPath}`);

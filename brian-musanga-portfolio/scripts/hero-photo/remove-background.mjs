import { removeBackground } from "@imgly/background-removal-node";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Deliberately does not import `sharp` at the top level: this package
// bundles its own incompatible sharp version (~0.32.4) internally, and
// loading two different sharp/libvips native builds in one Node process
// segfaults. Keeping this step in its own process (see prepare-hero-photo.mjs)
// avoids that entirely.

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

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const steps = ["crop.mjs", "remove-background.mjs", "composite.mjs"];

// Each step runs as its own `node` process. The crop/composite steps load our
// sharp (^0.35.3); remove-background.mjs loads @imgly's own bundled sharp
// (~0.32.4). Running two different sharp/libvips native builds in one process
// segfaults, so the steps must not share a process.
for (const step of steps) {
  const scriptPath = path.join(__dirname, "hero-photo", step);
  const result = spawnSync(process.execPath, [scriptPath], { stdio: "inherit" });
  if (result.status !== 0) {
    console.error(`${step} failed (exit ${result.status})`);
    process.exit(result.status ?? 1);
  }
}

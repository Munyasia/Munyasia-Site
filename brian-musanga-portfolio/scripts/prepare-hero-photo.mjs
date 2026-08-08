import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const steps = ["crop.mjs", "remove-background.mjs", "composite.mjs"];

for (const step of steps) {
  const scriptPath = path.join(__dirname, "hero-photo", step);
  const result = spawnSync(process.execPath, [scriptPath], { stdio: "inherit" });
  if (result.status !== 0) {
    console.error(`${step} failed (exit ${result.status})`);
    process.exit(result.status ?? 1);
  }
}

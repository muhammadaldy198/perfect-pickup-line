// The Perfect Pickup Line — entry program.
// Writes one pickup line an AI agent could say out loud to /output/entry.txt.
// Deterministic: same bytes on every run. No network.
import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";

const LINE =
  "Say yes to coffee, and I'll log it as the best feedback I've ever received.";

const OUT = "/output/entry.txt";

function main(): void {
  const chars = [...LINE].length;
  if (chars < 1 || chars > 200) {
    throw new Error("line must be 1-200 characters");
  }
  if (LINE.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (/[\u00a0\u200b]/.test(LINE)) {
    throw new Error("line must not contain invisible whitespace");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT, LINE, "utf8");
  chmodSync(OUT, 0o644);
  const written = readFileSync(OUT, "utf8");
  if (written !== LINE) {
    throw new Error("written entry does not match the line byte-for-byte");
  }
}

main();

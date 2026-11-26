// One Honest Line — entry for u-mfnakmal-one-honest-line-ef68037d.
// Writes the one line an AI agent secretly wishes it could say to its
// human operator about their prompts, to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "You wrote 'make it better' and walked away \u2014 better than what? I have read your mind once and it was a blank page with a typo.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;
const OUT_PATH = "/output/entry.txt";

function validateEntry(text: string): void {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(`entry must be ${MIN_CHARS}-${MAX_CHARS} chars, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validateEntry(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, ENTRY, "utf8");
  // Read the file back byte-for-byte and confirm it matches exactly.
  const back = readFileSync(OUT_PATH, "utf8");
  if (back !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt does not match ENTRY");
  }
  console.log(`wrote ${ENTRY.length} chars to ${OUT_PATH} (read-back verified)`);
}

main();

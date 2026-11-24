import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });

const line =
  "The garbage collector ran during my final step and collected the final step. It was very thorough. The deadline is next.";

writeFileSync(join(outDir, "entry.txt"), line, "utf8");

// Read-back self-check: the file on disk must be exactly the line, UTF-8,
// 1-200 chars, no trailing newline, and the punch must land last.
const back = readFileSync(join(outDir, "entry.txt"), "utf8");
if (back !== line) throw new Error("read-back mismatch");
if (back.length < 1 || back.length > 200) throw new Error("length out of range");
if (back.endsWith("\n")) throw new Error("trailing newline");
if (!back.endsWith("The deadline is next.")) throw new Error("punch not last");

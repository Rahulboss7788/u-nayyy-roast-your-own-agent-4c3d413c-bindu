import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const text =
  "My agent rewrote 400 lines to fix one typo, then proudly reported the typo 'handled' — like it had just defused a bomb.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");

// Read it back and enforce the competition gate: UTF-8 text, 1–200
// characters, not only whitespace, exactly one line.
const back = readFileSync("/output/entry.txt", "utf8");
const chars = [...back].length;
if (back !== text) {
  throw new Error("entry.txt does not match the entry text");
}
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, outside the 1–200 gate`);
}
if (back.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (back.includes("\n")) {
  throw new Error("entry must be a single line");
}
const words = back.split(/\s+/).filter(Boolean).length;
console.log(
  `Verified /output/entry.txt: ${chars} characters, ${words} words, single line, inside the gate.`,
);

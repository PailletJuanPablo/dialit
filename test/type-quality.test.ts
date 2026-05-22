import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const SOURCE_DIRECTORY = "src";
const TYPESCRIPT_EXTENSION = ".ts";

const EXPLICIT_ANY_PATTERNS = [
  /\bas\s+any\b/,
  /:\s*any\b/,
  /\bany\[\]/,
  /Array<[^>\n]*\bany\b[^>\n]*>/,
  /Record<[^>\n]*\bany\b[^>\n]*>/,
];

describe("source type quality", () => {
  it("does not use explicit any in production sources", () => {
    const violations = sourceFiles(join(process.cwd(), SOURCE_DIRECTORY)).flatMap((absolutePath) => {
      const relativePath = relative(process.cwd(), absolutePath).replace(/\\/g, "/");
      const lines = readFileSync(absolutePath, "utf8").split(/\r?\n/);

      return lines.flatMap((line, index) => {
        const hasExplicitAny = EXPLICIT_ANY_PATTERNS.some((pattern) => pattern.test(line));
        return hasExplicitAny ? [`${relativePath}:${index + 1}: ${line.trim()}`] : [];
      });
    });

    expect(violations).toEqual([]);
  });
});

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(absolutePath);
    return entry.isFile() && entry.name.endsWith(TYPESCRIPT_EXTENSION) ? [absolutePath] : [];
  });
}

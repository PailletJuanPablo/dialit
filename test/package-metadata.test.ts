import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

interface PackageManifest {
  readonly name: string;
  readonly version: string;
  readonly description?: string;
  readonly type?: string;
  readonly main?: string;
  readonly module?: string;
  readonly types?: string;
  readonly files?: readonly string[];
  readonly exports?: PackageExports;
  readonly sideEffects?: boolean;
  readonly scripts?: Record<string, string>;
}

interface PackageExports {
  readonly ".": PackageExportTarget;
  readonly "./runtime-support": PackageExportTarget;
  readonly "./package.json": string;
}

interface PackageExportTarget {
  readonly types: string;
  readonly import: string;
}

const manifest = JSON.parse(readFileSync("package.json", "utf8")) as PackageManifest;

describe("package metadata", () => {
  it("exposes a stable ESM package entry with TypeScript declarations", () => {
    expect(manifest.type).toBe("module");
    expect(manifest.main).toBe("./dist/index.js");
    expect(manifest.module).toBe("./dist/index.js");
    expect(manifest.types).toBe("./dist/index.d.ts");
    expect(manifest.exports).toEqual({
      ".": {
        types: "./dist/index.d.ts",
        import: "./dist/index.js",
      },
      "./runtime-support": {
        types: "./dist/runtime-support.d.ts",
        import: "./dist/runtime-support.js",
      },
      "./package.json": "./package.json",
    });
    expect(manifest.sideEffects).toBe(false);
  });

  it("packages built code and human-readable integration documentation", () => {
    expect(manifest.files).toEqual([
      "dist",
      "README.md",
      "docs/api-integration.md",
      "docs/flow-authoring.md",
      "docs/web-chatbot-demo.md",
    ]);
  });

  it("has scripts for package verification and dry-run packing", () => {
    expect(manifest.scripts).toMatchObject({
      "test:package": "node scripts/package-smoke-test.mjs",
      "pack:dry-run": "npm pack --dry-run",
      prepack: "npm run build",
    });
  });
});

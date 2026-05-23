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
  readonly repository?: {
    readonly type: string;
    readonly url: string;
  };
  readonly bugs?: {
    readonly url: string;
  };
  readonly homepage?: string;
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
    expect(manifest.repository).toEqual({
      type: "git",
      url: "git+https://github.com/PailletJuanPablo/dialit.git",
    });
    expect(manifest.bugs).toEqual({
      url: "https://github.com/PailletJuanPablo/dialit/issues",
    });
    expect(manifest.homepage).toBe("https://dialit.netlify.app/");
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

  it("packages only built code and the README", () => {
    expect(manifest.files).toEqual([
      "dist",
      "README.md",
    ]);
  });

  it("has scripts for package verification and dry-run packing", () => {
    expect(manifest.scripts).toMatchObject({
      "test:package": "node scripts/package-smoke-test.mjs",
      "pack:dry-run": "npm pack --dry-run",
      prepack: "npm run build",
    });
    expect(Object.keys(manifest.scripts ?? {})).not.toContain("demo:web");
    expect(Object.keys(manifest.scripts ?? {})).not.toContain("demo:web:build");
    expect(Object.keys(manifest.scripts ?? {})).not.toContain("demo:web:test");
  });
});

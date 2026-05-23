import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

interface PackageManifest {
  readonly name: string;
  readonly private?: boolean;
  readonly homepage?: string;
}

function readRequiredFile(path: string) {
  expect(existsSync(path), `${path} should exist`).toBe(true);
  return readFileSync(path, "utf8");
}

function expectFileMissing(path: string) {
  expect(existsSync(path), `${path} should not exist`).toBe(false);
}

const manifest = JSON.parse(readFileSync("package.json", "utf8")) as PackageManifest;

describe("public release configuration", () => {
  it("identifies the public npm package and install command", () => {
    const readme = readRequiredFile("README.md");

    expect(manifest.name).toBe("dialit");
    expect(manifest.private).not.toBe(true);
    expect(manifest.homepage).toBe("https://dialit.netlify.app/");
    expect(readme).toContain("npm install dialit");
  });

  it("builds the Vite site for a root-hosted static deployment", () => {
    const viteConfig = readRequiredFile("site/vite.config.ts");
    const routerSource = readRequiredFile("site/src/router.ts");
    const siteManifest = readRequiredFile("site/package.json");

    expect(viteConfig).toContain('base: "/"');
    expect(routerSource).toContain("createWebHistory(import.meta.env.BASE_URL)");
    expect(siteManifest).toContain('"build": "vue-tsc --noEmit && vite build"');
    expect(siteManifest).not.toContain("copy-pages-spa-fallback");
  });

  it("defines the Netlify static site deployment", () => {
    const config = readRequiredFile("netlify.toml");

    expectFileMissing(".github/workflows/deploy-site.yml");
    expect(config).toContain('[build]');
    expect(config).toContain('command = "npm ci --prefix site && npm run site:build"');
    expect(config).toContain('publish = "site/dist"');
    expect(config).toContain('[build.environment]');
    expect(config).toContain('NODE_VERSION = "20"');
    expect(config).toContain('[[redirects]]');
    expect(config).toContain('from = "/*"');
    expect(config).toContain('to = "/index.html"');
    expect(config).toContain('status = 200');
  });

  it("defines the npm publication workflow", () => {
    const workflow = readRequiredFile(".github/workflows/publish-npm.yml");

    expect(workflow).toContain("name: Publish package to npm");
    expect(workflow).toContain("types: [published]");
    expect(workflow).toContain("registry-url: https://registry.npmjs.org");
    expect(workflow).toContain("package-manager-cache: false");
    expect(workflow).toContain("npm run typecheck:tests");
    expect(workflow).toContain("npm run test:package");
    expect(workflow).toContain("npm publish --provenance --access public");
    expect(workflow).toContain("NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}");
    expect(workflow).toContain("id-token: write");
  });
});

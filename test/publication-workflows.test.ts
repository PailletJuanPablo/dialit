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

const manifest = JSON.parse(readFileSync("package.json", "utf8")) as PackageManifest;

describe("public release configuration", () => {
  it("identifies the public npm package and install command", () => {
    const readme = readRequiredFile("README.md");

    expect(manifest.name).toBe("dialit");
    expect(manifest.private).not.toBe(true);
    expect(manifest.homepage).toBe("https://pailletjuanpablo.github.io/dialit/");
    expect(readme).toContain("npm install dialit");
  });

  it("builds the Vite site for the GitHub Pages project path", () => {
    const viteConfig = readRequiredFile("site/vite.config.ts");
    const routerSource = readRequiredFile("site/src/router.ts");
    const siteManifest = readRequiredFile("site/package.json");

    expect(viteConfig).toContain('base: "/dialit/"');
    expect(routerSource).toContain("createWebHistory(import.meta.env.BASE_URL)");
    expect(siteManifest).toContain('"build": "vue-tsc --noEmit && vite build && node scripts/copy-pages-spa-fallback.mjs"');
  });

  it("defines the GitHub Pages deployment workflow", () => {
    const workflow = readRequiredFile(".github/workflows/deploy-site.yml");

    expect(workflow).toContain("name: Deploy site to GitHub Pages");
    expect(workflow).toContain("branches: [master]");
    expect(workflow).toContain("uses: actions/configure-pages@v5");
    expect(workflow).toContain("uses: actions/upload-pages-artifact@v4");
    expect(workflow).toContain("path: site/dist");
    expect(workflow).toContain("uses: actions/deploy-pages@v4");
    expect(workflow).toContain("pages: write");
    expect(workflow).toContain("id-token: write");
    expect(workflow).toContain("npm ci --prefix site");
    expect(workflow).toContain("npm run site:build");
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

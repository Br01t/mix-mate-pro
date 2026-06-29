import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

if (process.env.GITHUB_ACTIONS === "true") {
  process.env.LOVABLE_SANDBOX = "false";
  delete process.env.DEV_SERVER__PROJECT_PATH;
}

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBase = "/mix-mate-pro/";

/**
 * Nitro emits the SSR worker as `<outputDir>/server/index.mjs`, but the TanStack
 * Start preview-server plugin tries to import `dist/server/<entry>.js` (or
 * `.output/server/<entry>.js` depending on preset) where <entry> matches our
 * `tanstackStart.server.entry`. That filename mismatch makes the prerender
 * preview server return 500 on every page and the build fails. We drop a tiny
 * ESM shim at the expected paths so the preview plugin can load our worker entry.
 */
function serverEntryShim() {
  const ensure = (root: string) => {
    const distDir = join(root, "dist/server");
    const outputDir = join(root, ".output/server");

    const distSrc = join(distDir, "index.mjs");
    const outputSrc = join(outputDir, "index.mjs");

    // Case 1: Nitro output in dist/server
    if (existsSync(distSrc)) {
      const dest = join(distDir, "server.js");
      if (!existsSync(dest)) {
        writeFileSync(
          dest,
          "// Auto-generated shim — see vite.config.ts (serverEntryShim)\nexport { default } from './index.mjs';\n",
        );
      }
    }

    // Case 2: Nitro output in .output/server (e.g. preset: "static" / GitHub Pages)
    if (existsSync(outputSrc)) {
      // Write shim to .output/server/server.js
      const outputDest = join(outputDir, "server.js");
      if (!existsSync(outputDest)) {
        writeFileSync(
          outputDest,
          "// Auto-generated shim — see vite.config.ts (serverEntryShim)\nexport { default } from './index.mjs';\n",
        );
      }

      // Also write shim to dist/server/server.js just in case the preview server looks there
      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true });
      }
      const distDest = join(distDir, "server.js");
      if (!existsSync(distDest)) {
        writeFileSync(
          distDest,
          "// Auto-generated shim — see vite.config.ts (serverEntryShim)\nexport { default } from '../../.output/server/index.mjs';\n",
        );
      }
    }
  };
  return {
    name: "mixcore:server-entry-shim",
    apply: "build" as const,
    closeBundle() {
      ensure(process.cwd());
    },
    configurePreviewServer(server: { config: { root: string } }) {
      ensure(server.config.root);
    },
  };
}

export default defineConfig({
  nitro: false,
  vite: {
    base: isGithubPages ? repoBase : "/",
    plugins: [serverEntryShim()],
  },
  tanstackStart: {
    server: {
      entry: "server",
      preset: isGithubPages ? "static" : undefined, // ← chiave
    },
    prerender: {
      enabled: true,
      crawlLinks: false,
      routes: ["/"],
      autoStaticPathsDiscovery: false,
      failOnError: true,
    },
  },
});
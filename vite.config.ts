import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoBase = "/mix-mate-pro/";

/**
 * Nitro emits the SSR worker as `dist/server/index.mjs`, but the TanStack
 * Start preview-server plugin tries to import `dist/server/<entry>.js`
 * (where <entry> matches our `tanstackStart.server.entry`). That filename
 * mismatch makes the prerender preview server return 500 on every page and
 * the build fails. We drop a tiny ESM shim at the expected path so the
 * preview plugin can load our worker entry.
 */
function serverEntryShim() {
  const ensure = (root: string) => {
    const dir = join(root, "dist/server");
    const src = join(dir, "index.mjs");
    const dest = join(dir, "server.js");
    if (existsSync(src) && !existsSync(dest)) {
      writeFileSync(
        dest,
        "// Auto-generated shim — see vite.config.ts (serverEntryShim)\nexport { default } from './index.mjs';\n",
      );
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
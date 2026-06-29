import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

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
    // GitHub Pages serves project sites from /repo-name/
    base: process.env.GITHUB_PAGES === "true" ? repoBase : "/",
    plugins: [serverEntryShim()],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: true,
      autoStaticPathsDiscovery: true,
      failOnError: true,
    },
  },
});

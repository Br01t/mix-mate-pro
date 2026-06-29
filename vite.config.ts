import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const repoBase = "/mix-mate-pro/";

export default defineConfig({
  vite: {
    // GitHub Pages serves project sites from /repo-name/
    base: process.env.GITHUB_PAGES === "true" ? repoBase : "/",
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
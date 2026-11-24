/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

/**
 * cubing.js generates scrambles in a module web worker that it locates with
 * `import.meta.resolve("./search-worker-entry.js")`. Vite does not rewrite
 * that, and its fallbacks break once Vite merges cubing's chunks with the
 * app's. Rewrite it to a `?worker&url` import so Vite builds the worker as
 * its own self-contained bundle.
 */
const cubingSearchWorker = (): Plugin => {
  const needle = 'import.meta.resolve("./search-worker-entry.js")';
  return {
    name: "cubing-search-worker",
    enforce: "pre",
    transform(code, id) {
      if (!id.includes("/node_modules/cubing/") || !code.includes(needle)) {
        return;
      }
      return (
        'import __cubingSearchWorkerUrl from "./search-worker-entry.js?worker&url";\n' +
        code.replace(needle, "__cubingSearchWorkerUrl")
      );
    },
  };
};

// https://vite.dev/config/
export default defineConfig({
  // Served from https://campos20.github.io/fmc-ranks/
  base: "/fmc-ranks/",
  plugins: [react(), cubingSearchWorker()],
  // Pre-bundling would skip the plugin above in dev.
  optimizeDeps: {
    exclude: ["cubing", "scramble-display"],
  },
  worker: {
    // The worker lazy-loads its solvers, which needs ES module output.
    format: "es",
  },
  build: {
    // cubing.js lazy-loads large chunks: its scramble solver (~670 kB, in a
    // web worker) and its 3D renderer (~500 kB, only used for 3D images).
    chunkSizeWarningLimit: 700,
  },
  test: {
    environment: "node",
  },
});

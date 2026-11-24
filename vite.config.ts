/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // Served from https://campos20.github.io/fmc-ranks/
  base: "/fmc-ranks/",
  plugins: [react()],
  build: {
    // cubing.js lazy-loads its 3D renderer (~500 kB), only used for 3D images
    chunkSizeWarningLimit: 600,
  },
  test: {
    environment: "node",
  },
});

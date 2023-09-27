import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: resolve("src"),
  publicDir: resolve("public"),
  build: {
    outDir: resolve("dist"),
    emptyOutDir: true,
    assetsInlineLimit: 0,
  },
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
});

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "",
  root: resolve("src"),
  publicDir: resolve("public"),
  build: {
    outDir: resolve("dist"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  preview: {
    port: 3000,
    host: true,
    open: true,
  },
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
});

/* eslint-env node */
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    solidPlugin(), 
    visualizer()
  ],
  build: {
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "3D Mockup",
      fileName: "three-d-mockup",
    },
  },
});

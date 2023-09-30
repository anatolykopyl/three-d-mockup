/* eslint-env node */
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import alias from '@rollup/plugin-alias';

export default defineConfig({
  plugins: [
    threeMinifier(),
    solidPlugin(),
    visualizer(),
    alias({
      entries: [
        {
          find: 'three',
          replacement: __dirname + '/node_modules/three/src/Three'
        }
      ],
    })
  ],
  build: {
    target: "esnext",
    rollupOptions: {
      treeshake: { moduleSideEffects: false }
    },
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "3D Mockup",
      fileName: "three-d-mockup",
    }
  },
});

import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/**/*.ts"],
    format: ["esm"],
    minify: false,
    dts: true,
    unbundle: true,
    fixedExtension: false,
    deps: {
      onlyBundle: false as const,
    },
    outDir: "esm",
    sourcemap: true,
    clean: true,
  },
  {
    entry: ["src/index.ts"],
    format: ["umd"],
    minify: true,
    deps: {
      alwaysBundle: [
        "d3-zoom",
        "d3-selection",
        "bezier-js",
        "d3-color",
        "events",
        "tiny-typed-emitter",
        "graphology",
        "d3-force",
        "@tweenjs/tween.js",
        "d3-drag",
      ],
      neverBundle: ["pixi.js"],
    },
    alias: {
      events: "events/events.js",
    },
    globalName: "Graph",
    outDir: "dist",
    sourcemap: true,
    outputOptions: {
      entryFileNames: "graph-vis.min.js",
      globals: {
        "pixi.js": "PIXI",
      },
    },
  },
]);

import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "/graph-vis/examples/",
  server: {
    fs: {
      allow: [".."],
    },
  },
  build: {
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        node: resolve(import.meta.dirname, "element/node/index.html"),
        node_circle: resolve(import.meta.dirname, "element/node/circle/index.html"),
        node_polygon: resolve(import.meta.dirname, "element/node/polygon/index.html"),
        node_star: resolve(import.meta.dirname, "element/node/star/index.html"),
        node_rect: resolve(import.meta.dirname, "element/node/rect/index.html"),
        node_ellipse: resolve(import.meta.dirname, "element/node/ellipse/index.html"),
        node_text: resolve(import.meta.dirname, "element/node/text/index.html"),
        node_bitmap_text: resolve(import.meta.dirname, "element/node/bitmap-text/index.html"),
        node_image: resolve(import.meta.dirname, "element/node/image/index.html"),
        node_custom: resolve(import.meta.dirname, "element/node/custom/index.html"),
        edge: resolve(import.meta.dirname, "element/edge/index.html"),
        edge_quadratic: resolve(import.meta.dirname, "element/edge/quadratic/index.html"),
        edge_cubic: resolve(import.meta.dirname, "element/edge/cubic/index.html"),
        edge_selfloop: resolve(import.meta.dirname, "element/edge/selfloop/index.html"),
        link: resolve(import.meta.dirname, "element/link/index.html"),
        layout: resolve(import.meta.dirname, "layout/index.html"),
        layout_random: resolve(import.meta.dirname, "layout/random/index.html"),
        layout_d3_force: resolve(import.meta.dirname, "layout/d3-force/index.html"),
        theme: resolve(import.meta.dirname, "theme/index.html"),
        performance_5000: resolve(import.meta.dirname, "performance/5000/index.html"),
        performance_20000: resolve(import.meta.dirname, "performance/20000/index.html"),
        performance_60000: resolve(import.meta.dirname, "performance/60000/index.html"),
        interactions: resolve(import.meta.dirname, "interactions/index.html"),
        interactions_zoom: resolve(import.meta.dirname, "interactions/zoom/index.html"),
        interactions_drag: resolve(import.meta.dirname, "interactions/drag/index.html"),
      },
    },
  },
});

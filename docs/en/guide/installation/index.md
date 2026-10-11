# Installation

## 1. Install Dependencies

Install PixiJS and GraphVis using your package manager:

::: code-group

```sh [npm]
npm install pixi.js @zjfcool/graph-vis
```

```sh [pnpm]
pnpm add pixi.js @zjfcool/graph-vis
```

```sh [yarn]
yarn add pixi.js @zjfcool/graph-vis
```

```sh [bun]
bun add pixi.js @zjfcool/graph-vis
```

:::

## 2. Basic Usage

Prepare a container and initialize the graph instance in your entry file.

```html
<!-- index.html -->
<div id="container" style="width: 500px; height: 500px"></div>
```

```js
// main.js
import { GraphVis } from "@zjfcool/graph-vis";

async function init() {
  const graph = new GraphVis({
    container: "#container",
    data, // Default: { edges: [], nodes: [] }
    width: container.clientWidth,
    height: container.clientHeight,
  });
  await graph.init();
}

init();
```

## Notes

- **Install dependencies**: `pixi.js` is a peer dependency and must be installed together with `@zjfcool/graph-vis`.
- **Container**: `container` accepts a selector string (e.g., `'#container'`) or a DOM element.
- **Data**: `data` is the raw graph data, containing two arrays, `nodes` and `edges`, both empty by default.
- **Size**: `width` / `height` are usually taken from the actual dimensions of the container, but you can also pass in fixed values directly.
- **Async initialization**: `graph.init()` returns a `Promise`, so you need to use `await` to wait for completion before performing further operations.

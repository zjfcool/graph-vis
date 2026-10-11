# 安装使用

## 1. 安装依赖

使用包管理器安装 PixiJS 与 GraphVis：

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

## 2. 基本使用

准备一个容器，并在入口文件中初始化图实例。

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
    data, // 默认: { edges: [], nodes: [] }
    width: container.clientWidth,
    height: container.clientHeight,
  });
  await graph.init();
}

init();
```

## 说明

- **安装依赖**：`pixi.js` 为对等依赖，需与 `@zjfcool/graph-vis` 一同安装。
- **容器**：`container` 支持传入选择器字符串（如 `'#container'`）或 DOM 元素。
- **数据**：`data` 为图的原始数据，包含 `nodes` 与 `edges` 两个数组，默认均为空。
- **尺寸**：`width` / `height` 通常取自容器的实际尺寸，也可直接传入固定数值。
- **异步初始化**：`graph.init()` 返回 `Promise`，需使用 `await` 等待完成后再进行后续操作。

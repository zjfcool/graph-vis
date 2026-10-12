中文 | [English](https://github.com/zjfcool/graph-vis/blob/main/README.md) 

# GraphVis

基于 [PixiJS](https://github.com/pixijs/pixijs) 的高性能图可视化库，支持上万节点与边的流畅渲染。

<p align="center">
  <img width="83%" src="https://zjfcool.github.io/graph-vis/preview/preview.gif" alt="项目预览">
</p>

<p align="center">
  <img width="40%" src="https://zjfcool.github.io/graph-vis/preview/element.png" alt="元素示意图">
  &nbsp;&nbsp;
  <img width="40%" src="https://zjfcool.github.io/graph-vis/preview/20000.png" alt="20000 数据图">
</p>

<p align="center">
  <a href="https://zjfcool.github.io/graph-vis/guide/introduction/">指南</a> •
  <a href="https://zjfcool.github.io/graph-vis/api/graph/">API</a> •
  <a href="https://zjfcool.github.io/graph-vis/demos/">示例</a>
</p>

## 特性

- **高性能**：基于 PixiJS 渲染，轻松支持上万节点与边。
- **数据驱动**：属性支持函数动态生成，样式随数据实时变化。
- **可扩展**：支持自定义节点、边、布局与主题。
- **交互丰富**：内置缩放、平移、拖拽、连线及完整事件系统。
- **多种布局**：内置 d3-force 与 random，支持自定义扩展。
- **多种绘制**：节点与边支持 Graphics 与 Sprite 两种绘制方式。
- **多种节点**：内置圆形、椭圆、矩形、多边形、星形、图片、文本等。

## 快速开始

### 安装

```bash
npm install pixi.js @zjfcool/graph-vis
```

### 基本使用

1. 在 HTML 中准备一个容器：

```html
<div id="container" style="width: 500px; height: 500px;"></div>
```

2. 在 JavaScript 中初始化 GraphVis：

```javascript
import { GraphVis } from "@zjfcool/graph-vis";

const data = {
  nodes: [
    // 节点数据
  ],
  edges: [
    // 边数据
  ],
};

async function init() {
  const container = document.querySelector("#container");
  const graph = new GraphVis({
    container,
    data, // 默认: { nodes: [], edges: [] }
    width: container.clientWidth,
    height: container.clientHeight,
  });
  await graph.init();
}

init();
```

## 许可证

[MIT](LICENSE)
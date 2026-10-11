# 快速开始

通过 CDN 引入 PixiJS 与 GraphVis，无需构建工具即可在浏览器中运行。

::: tip CDN 选择
GraphVis 在 unpkg 与 jsDelivr 上均可获取，二者任选其一即可。
:::

```html
<!-- 准备一个容器 -->
<div id="container" style="width: 500px; height: 500px"></div>

<!-- 引入 PixiJS -->
<script src="https://cdn.jsdelivr.net/npm/pixi.js"></script>

<!-- 引入 GraphVis（二选一） -->
<!-- unpkg -->
<script src="https://unpkg.com/@zjfcool/graph-vis"></script>
<!-- jsDelivr -->
<!-- <script src="https://cdn.jsdelivr.net/npm/@zjfcool/graph-vis"></script> -->

<script>
  const { GraphVis } = Graph;

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
</script>
```

## 说明

- `container` 支持传入选择器字符串（如 `'#container'`）或 DOM 元素。
- `data` 为图的原始数据，包含 `nodes` 与 `edges` 两个数组，默认均为空。
- `width` / `height` 通常取自容器的实际尺寸。
- 初始化是异步的，需 `await graph.init()` 等待完成。

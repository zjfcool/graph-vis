# 图 GraphVis

使用 `@zjfcool/graph-vis` 并不需要完全了解 `PixiJS`，只需了解必要的配置，按照配置说明即可实现图的可视化。

## 图生命周期

1. **创建图实例**

```js
const graph = new GraphVis(options);
```

2. **初始化**

调用异步的 init 方法完成初始化。在此之前，图的一些方法（如布局、绘制相关的方法）尚不可用，但可以通过 `.on` 提前进行事件监听。

```js
await graph.init();
```

3. **渲染**

内部自动渲染；修改节点 / 边数据后，会在下一帧自动刷新画布。

4. **更新**

初始化完成后，调用实例提供的各类 API 对图数据、样式进行动态操作。

5. **销毁图实例**

`destroy` 用于彻底销毁图实例，释放相关资源。销毁后实例不可再使用。

```js
graph.destroy();
```

## 图配置项(GraphVisOptions)

`GraphVisOptions` 继承 [ApplicationOptions](https://pixijs.download/release/docs/app.ApplicationOptions.html)，以下是主要属性。

| 属性               | 类型                              | 默认值                    | 描述                                                                          |
| :----------------- | :-------------------------------- | :------------------------ | :---------------------------------------------------------------------------- |
| container          | `string` \| `HTMLElement`         | `document.body`           | 图容器，css selector 或者 HTMLElement                                         |
| width              | `number`                          | `500`                     | 图的宽度                                                                      |
| height             | `number`                          | `500`                     | 图的高度                                                                      |
| type               | `GraphologyType`                  | `mixed`                   | 图的类型                                                                      |
| multi              | `boolean`                         | `true`                    | 图是否允许多条边                                                              |
| allowSelfLoops     | `boolean`                         | `true`                    | 图是否允许有自循环边                                                          |
| background         | `ColorSource`                     | `#F8F9FB`                 | 图背景色，[详情](https://pixijs.download/release/docs/color.ColorSource.html) |
| resolution         | `number`                          | `window.devicePixelRatio` | 设备像素比                                                                    |
| data               | `GraphAttributes`                 | `{nodes:[],edges:[]}`     | 图数据                                                                        |
| interactable       | `boolean`                         | `true`                    | 是否允许图的交互行为                                                          |
| resizeTo           | `HTMLElement` \| `Window`         | -                         | 用一个元素自动调整图的位置与大小。                                            |
| resizeDebounceTime | `number`                          | `500`                     | resize 事件触发时监听函数延时执行时间，单位 ms                                |
| layout             | [`LayoutOptions`](/guide/layout/) | -                         | 图的布局配置项                                                                |
| node               | [`NodeOptions`](/guide/node/)     | -                         | 图节点的配置项                                                                |
| edge               | [`EdgeOptions`](/guide/edge/)     | -                         | 图边的配置项                                                                  |
| link               | [`LinkOptions`](/guide/link/)     | -                         | 图在进行边的编辑时，那条动态连接边的配置项                                    |
| zoom               | [`ZoomOptions`](/guide/zoom/)     | -                         | 图缩放平移功能的相关配置项                                                    |
| drag               | [`DragOptions`](/guide/drag/)     | -                         | 图节点拖拽功能的相关配置项                                                    |
| theme              | `string`                          | `light`                   | 图主题的相关配置                                                              |

::: info
它的配置项非常灵活：`node`、`edge`、`link` 等配置中，既可以直接使用原始数据，也可以传入函数来动态生成对应属性。
:::

**静态值：**

```js
new GraphVis({
  node: {
    style: {
      fill: "red",
    },
  },
});
```

**函数动态生成：**

```js
new GraphVis({
  node: {
    style: {
      fill: (d) => (d.category === "important" ? "#ff4d4f" : "#409eff"),
    },
  },
});
```

`d` 为原始节点数据。`d.category` 并非节点内置属性，需要你的数据中确实存在 `category` 字段才能这样使用。

::: tip
更多属性请查看：[ApplicationOptions](https://pixijs.download/release/docs/app.ApplicationOptions.html)
:::

## 完整示例

以下示例综合了节点动态样式、力导向布局、事件监听与主题切换：

```js
import { GraphVis } from "@zjfcool/graph-vis";

async function init() {
  const container = document.getElementById("container");

  const graph = new GraphVis({
    container: container,
    width: container.clientWidth,
    height: container.clientHeight,
    background: "#f5f7fa",
    data: {
      nodes: [
        { id: "a", label: "节点 A", category: "person", weight: 3 },
        { id: "b", label: "节点 B", category: "company", weight: 5 },
        { id: "c", label: "节点 C", category: "person", weight: 1 },
        { id: "d", label: "节点 D", category: "location", weight: 2 },
      ],
      edges: [
        { source: "a", target: "b", weight: 2 },
        { source: "b", target: "c", weight: 1 },
        { source: "c", target: "d", weight: 3 },
        { source: "d", target: "a", weight: 1 },
      ],
    },

    // 节点动态样式
    node: {
      type: "circle",
      size: (d) => d.weight * 8 + 20,
      style: {
        fill: (d) => {
          const colorMap = {
            person: "#409eff",
            company: "#67c23a",
            location: "#e6a23c",
          };
          return colorMap[d.category] || "#909399";
        },
        stroke: "#ffffff",
      },
      labelConfig: {
        style: {
          visible: true,
          color: "#303133",
          fontSize: 12,
        },
      },
    },

    // 边样式
    edge: {
      type: "line",
      style: {
        stroke: {
          color: "#c0c4cc",
          width: (d) => d.weight || 1,
        },
      },
      arrowConfig: {
        style: {
          visible: true,
          size: [8, 6],
        },
      },
    },

    // 力导向布局
    layout: {
      type: "d3-force",
      warmTicks: 0,
      cooldownTicks: Infinity,
      cooldownTime: 1500,
      collide: {
        radius: 20,
        strength: 0.1,
      },
      link: {
        id: (d) => d.id,
        distance: 90,
        strength: 0.2,
      },
      manyBody: {
        strength: -20,
      },
      alphaDecay: 0.01,
    },
    // 缩放与拖拽
    zoom: {
      enable: true,
    },
    drag: {
      enable: true,
    },
    theme: "light",
  });

  // 初始化之前即可监听
  graph.on("layout:end", () => {
    console.log("布局完成");
    // 布局完成后调整视图
    graph.zoomToFit();
  });

  await graph.init();
}

init();
```

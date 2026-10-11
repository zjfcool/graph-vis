# 缩放配置项 (ZoomOptions)

`ZoomOptions` 用于配置图的缩放与平移交互。它通常作为 `GraphVisOptions` 的 `zoom` 属性传入。GraphVis 的缩放功能基于 [d3-zoom](https://d3js.org/d3-zoom) 实现，因此部分配置项与 d3-zoom 的 API 一一对应。

## 1. 配置项速查表

| 属性                 | 类型                                   | 默认值  | 描述                                                                                     |
| :------------------- | :------------------------------------- | :------ | :--------------------------------------------------------------------------------------- |
| `enable`             | `boolean`                              | `true`  | 是否开启缩放功能                                                                         |
| `wheelDelta`         | `(event: any) => number`               | -       | 详情请参考 [d3-zoom zoom.wheelDelta](https://d3js.org/d3-zoom#zoom_wheelDelta)           |
| `extent`             | `[[number, number], [number, number]]` | -       | 详情请参考 [d3-zoom zoom.extent](https://d3js.org/d3-zoom#zoom_extent)                   |
| `scaleExtent`        | `[number, number]`                     | -       | 详情请参考 [d3-zoom zoom.scaleExtent](https://d3js.org/d3-zoom#zoom_scaleExtent)         |
| `translateExtent`    | `[[number, number], [number, number]]` | -       | 详情请参考 [d3-zoom zoom.translateExtent](https://d3js.org/d3-zoom#zoom_translateExtent) |
| `clickDistance`      | `number`                               | -       | 详情请参考 [d3-zoom zoom.clickDistance](https://d3js.org/d3-zoom#zoom_clickDistance)     |
| `tapDistance`        | `number`                               | -       | 详情请参考 [d3-zoom zoom.tapDistance](https://d3js.org/d3-zoom#zoom_tapDistance)         |
| `enableDblclickZoom` | `boolean`                              | `false` | 是否开启鼠标双击交互缩放的功能                                                           |
| `enableWheelZoom`    | `boolean`                              | `true`  | 是否开启滑轮交互缩放功能                                                                 |
| `filter`             | `(event: any) => boolean`              | -       | 详情请参考 [d3-zoom zoom.filter](https://d3js.org/d3-zoom#zoom_filter)                   |

## 2. 重点配置说明

### 2.1 开启缩放 (enable)

`enable` 控制整个缩放功能是否启用。设为 `false` 时，所有缩放与平移交互都会被禁用。

```js
zoom: {
  enable: true,
}
```

### 2.2 滑轮缩放 (enableWheelZoom)

`enableWheelZoom` 控制是否允许通过鼠标滚轮进行缩放。默认开启。

```js
zoom: {
  enableWheelZoom: true,
}
```

### 2.3 双击缩放 (enableDblclickZoom)

`enableDblclickZoom` 控制是否允许通过鼠标双击进行缩放。默认关闭。

```js
zoom: {
  enableDblclickZoom: true,
}
```

### 2.4 缩放范围 (scaleExtent)

`scaleExtent` 用于限制缩放的最小和最大倍数，格式为 `[min, max]`。例如：

```js
zoom: {
  scaleExtent: [0.5, 4],
}
```

表示允许缩小到 0.5 倍，放大到 4 倍。

### 2.5 平移范围 (translateExtent)

`translateExtent` 用于限制平移的范围，格式为 `[[x0, y0], [x1, y1]]`，表示可平移的矩形区域。

```js
zoom: {
  translateExtent: [[0, 0], [1000, 800]],
}
```

### 2.6 交互区域 (extent)

`extent` 用于指定缩放交互的监听区域，格式为 `[[x0, y0], [x1, y1]]`。

```js
zoom: {
  extent: [[0, 0], [800, 600]],
}
```

### 2.7 过滤器 (filter)

`filter` 是一个函数，用于决定哪些事件可以触发缩放。返回 `true` 表示允许，`false` 表示阻止。

```js
zoom: {
  filter: (event) => !event.ctrlKey,
}
```

### 2.8 滚轮增量 (wheelDelta)

`wheelDelta` 是一个函数，用于自定义滚轮缩放的速度。

```js
zoom: {
  wheelDelta: (event) => -event.deltaY * 0.01,
}
```

### 2.9 点击与触摸距离 (clickDistance / tapDistance)

`clickDistance` 和 `tapDistance` 分别用于设置鼠标点击和触摸点击允许移动的最大距离，超过该距离则视为拖拽而非点击。

```js
zoom: {
  clickDistance: 5,
  tapDistance: 10,
}
```

## 3. 完整示例

以下示例展示了常用的缩放配置：

```js
import { GraphVis } from "@zjfcool/graph-vis";

new GraphVis({
  // ... 其他配置
  zoom: {
    enable: true,
    enableWheelZoom: true,
    enableDblclickZoom: false,
    scaleExtent: [0.5, 4],
    translateExtent: [
      [0, 0],
      [1000, 800],
    ],
  },
});
```

## 4. 注意事项

1. **属性名称**：开启缩放使用 `enable`，而不是 `enabled`。
2. **d3-zoom 对应**：`wheelDelta`、`extent`、`scaleExtent`、`translateExtent`、`clickDistance`、`tapDistance`、`filter` 等属性直接透传给 d3-zoom，具体行为请参考 [d3-zoom 文档](https://d3js.org/d3-zoom)。
3. **动态更新**：初始化后，可以通过 `graph.setZoomOptions()` 动态更新缩放配置。
4. **与其他交互的配合**：缩放与拖拽、连线等交互可以同时使用，但需要注意事件冲突，必要时通过 `filter` 进行过滤。
5. **移动端支持**：`tapDistance` 用于触摸设备，`clickDistance` 用于鼠标设备。

通过以上配置，你可以灵活地控制图的缩放与平移行为，提升交互体验。

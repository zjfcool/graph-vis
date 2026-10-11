# 拖拽配置项 (DragOptions)

`DragOptions` 用于配置图中节点的拖拽交互。它通常作为 `GraphVisOptions` 的 `drag` 属性传入。GraphVis 的拖拽功能基于 [d3-drag](https://d3js.org/d3-drag) 实现，因此部分配置项与 d3-drag 的 API 一一对应。

## 1. 配置项速查表

| 属性            | 类型                              | 默认值 | 描述                                                                                 |
| :-------------- | :-------------------------------- | :----- | :----------------------------------------------------------------------------------- |
| `enable`        | `boolean`                         | `true` | 开启节点拖拽功能                                                                     |
| `filter`        | `(event: any) => boolean`         | -      | 详情请参考 [d3-drag drag.filter](https://d3js.org/d3-drag#drag_filter)               |
| `touchable`     | `(event: any, d: any) => boolean` | -      | 详情请参考 [d3-drag drag.touchable](https://d3js.org/d3-drag#drag_touchable)         |
| `clickDistance` | `number`                          | -      | 详情请参考 [d3-drag drag.clickDistance](https://d3js.org/d3-drag#drag_clickDistance) |

## 2. 重点配置说明

### 2.1 开启拖拽 (enable)

`enable` 控制是否允许拖拽节点。设为 `false` 时，节点将无法被拖动。

```js
drag: {
  enable: true,
}
```

### 2.2 过滤器 (filter)

`filter` 是一个函数，用于决定哪些事件可以触发拖拽。返回 `true` 表示允许，`false` 表示阻止。常用于排除某些按键或鼠标按钮。

```js
drag: {
  filter: (event) => !event.ctrlKey && event.button === 0,
}
```

### 2.3 触摸判定 (touchable)

`touchable` 是一个函数，用于决定触摸事件在哪些节点上可以触发拖拽。返回 `true` 表示允许，`false` 表示阻止。参数 `event` 为触摸事件，`d` 为节点数据。

```js
drag: {
  touchable: (event, d) => d.draggable !== false,
}
```

### 2.4 点击距离 (clickDistance)

`clickDistance` 用于设置拖拽开始前允许移动的最大距离。超过该距离才会被视为拖拽，否则视为点击。

```js
drag: {
  clickDistance: 5,
}
```

## 3. 完整示例

以下示例展示了常用的拖拽配置：

```js
import { GraphVis } from "@zjfcool/graph-vis";

new GraphVis({
  // ... 其他配置
  drag: {
    enable: true,
    filter: (event) => event.button === 0,
    touchable: (event, d) => d.draggable !== false,
    clickDistance: 5,
  },
});
```

## 4. 注意事项

1. **属性名称**：开启拖拽使用 `enable`，而不是 `enabled`。
2. **d3-drag 对应**：`filter`、`touchable`、`clickDistance` 等属性直接透传给 d3-drag，具体行为请参考 [d3-drag 文档](https://d3js.org/d3-drag)。
3. **动态更新**：初始化后，可以通过 `graph.setDragOptions()` 动态更新拖拽配置。
4. **与布局的配合**：当布局为 `d3-force` 时，拖拽节点会暂时锁定节点位置，拖拽结束后节点会重新参与布局迭代。可以将节点的 `locked` 属性设为 `true` 来永久锁定位置。
5. **移动端支持**：`touchable` 用于触摸设备，`clickDistance` 同时适用于鼠标与触摸设备。

通过以上配置，你可以灵活地控制节点的拖拽行为，提升交互体验。

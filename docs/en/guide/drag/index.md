# Drag Options (DragOptions)

`DragOptions` is used to configure the drag interaction for nodes in the graph. It is typically passed as the `drag` property of `GraphVisOptions`. GraphVis's drag functionality is built on top of [d3-drag](https://d3js.org/d3-drag), so some options correspond one-to-one with the d3-drag API.

## 1. Options Quick Reference

| Property        | Type                              | Default | Description                                                                               |
| :-------------- | :-------------------------------- | :------ | :---------------------------------------------------------------------------------------- |
| `enable`        | `boolean`                         | `true`  | Enable node drag functionality                                                            |
| `filter`        | `(event: any) => boolean`         | -       | See [d3-drag drag.filter](https://d3js.org/d3-drag#drag_filter) for details               |
| `touchable`     | `(event: any, d: any) => boolean` | -       | See [d3-drag drag.touchable](https://d3js.org/d3-drag#drag_touchable) for details         |
| `clickDistance` | `number`                          | -       | See [d3-drag drag.clickDistance](https://d3js.org/d3-drag#drag_clickDistance) for details |

## 2. Key Options

### 2.1 Enable Drag (enable)

`enable` controls whether nodes can be dragged. When set to `false`, nodes cannot be dragged.

```js
drag: {
  enable: true,
}
```

### 2.2 Filter (filter)

`filter` is a function that decides which events can trigger dragging. Returning `true` allows the event, while `false` prevents it. It is commonly used to exclude certain keys or mouse buttons.

```js
drag: {
  filter: (event) => !event.ctrlKey && event.button === 0,
}
```

### 2.3 Touch Detection (touchable)

`touchable` is a function that decides on which nodes touch events can trigger dragging. Returning `true` allows it, while `false` prevents it. The `event` parameter is the touch event, and `d` is the node data.

```js
drag: {
  touchable: (event, d) => d.draggable !== false,
}
```

### 2.4 Click Distance (clickDistance)

`clickDistance` sets the maximum distance the pointer is allowed to move before dragging starts. Beyond this distance, the gesture is treated as a drag; otherwise, it is treated as a click.

```js
drag: {
  clickDistance: 5,
}
```

## 3. Complete Example

The following example shows commonly used drag configurations:

```js
import { GraphVis } from "@zjfcool/graph-vis";

new GraphVis({
  // ... other options
  drag: {
    enable: true,
    filter: (event) => event.button === 0,
    touchable: (event, d) => d.draggable !== false,
    clickDistance: 5,
  },
});
```

## 4. Notes

1. **Property name**: Use `enable` to turn on dragging, not `enabled`.
2. **d3-drag correspondence**: Properties such as `filter`, `touchable`, and `clickDistance` are passed through directly to d3-drag. For specific behavior, see the [d3-drag documentation](https://d3js.org/d3-drag).
3. **Dynamic updates**: After initialization, you can dynamically update the drag options via `graph.setDragOptions()`.
4. **Coordination with layout**: When the layout is `d3-force`, dragging a node temporarily locks its position, and the node re-joins the layout iterations after dragging ends. You can permanently lock a node's position by setting its `locked` property to `true`.
5. **Mobile support**: `touchable` is for touch devices, while `clickDistance` applies to both mouse and touch devices.

With the options above, you can flexibly control the drag behavior of nodes to improve the interaction experience.

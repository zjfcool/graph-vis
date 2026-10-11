# Zoom Options (ZoomOptions)

`ZoomOptions` is used to configure the zoom and pan interactions of the graph. It is typically passed as the `zoom` property of `GraphVisOptions`. GraphVis's zoom functionality is built on top of [d3-zoom](https://d3js.org/d3-zoom), so some options correspond one-to-one with the d3-zoom API.

## 1. Options Quick Reference

| Property             | Type                                   | Default | Description                                                                                   |
| :------------------- | :------------------------------------- | :------ | :-------------------------------------------------------------------------------------------- |
| `enable`             | `boolean`                              | `true`  | Whether to enable the zoom functionality                                                      |
| `wheelDelta`         | `(event: any) => number`               | -       | See [d3-zoom zoom.wheelDelta](https://d3js.org/d3-zoom#zoom_wheelDelta) for details           |
| `extent`             | `[[number, number], [number, number]]` | -       | See [d3-zoom zoom.extent](https://d3js.org/d3-zoom#zoom_extent) for details                   |
| `scaleExtent`        | `[number, number]`                     | -       | See [d3-zoom zoom.scaleExtent](https://d3js.org/d3-zoom#zoom_scaleExtent) for details         |
| `translateExtent`    | `[[number, number], [number, number]]` | -       | See [d3-zoom zoom.translateExtent](https://d3js.org/d3-zoom#zoom_translateExtent) for details |
| `clickDistance`      | `number`                               | -       | See [d3-zoom zoom.clickDistance](https://d3js.org/d3-zoom#zoom_clickDistance) for details     |
| `tapDistance`        | `number`                               | -       | See [d3-zoom zoom.tapDistance](https://d3js.org/d3-zoom#zoom_tapDistance) for details         |
| `enableDblclickZoom` | `boolean`                              | `false` | Whether to enable zooming via double-click                                                    |
| `enableWheelZoom`    | `boolean`                              | `true`  | Whether to enable zooming via the mouse wheel                                                 |
| `filter`             | `(event: any) => boolean`              | -       | See [d3-zoom zoom.filter](https://d3js.org/d3-zoom#zoom_filter) for details                   |

## 2. Key Options

### 2.1 Enable Zoom (enable)

`enable` controls whether the entire zoom functionality is enabled. When set to `false`, all zoom and pan interactions are disabled.

```js
zoom: {
  enable: true,
}
```

### 2.2 Wheel Zoom (enableWheelZoom)

`enableWheelZoom` controls whether zooming via the mouse wheel is allowed. Enabled by default.

```js
zoom: {
  enableWheelZoom: true,
}
```

### 2.3 Double-Click Zoom (enableDblclickZoom)

`enableDblclickZoom` controls whether zooming via double-click is allowed. Disabled by default.

```js
zoom: {
  enableDblclickZoom: true,
}
```

### 2.4 Zoom Range (scaleExtent)

`scaleExtent` limits the minimum and maximum zoom factors, in the format `[min, max]`. For example:

```js
zoom: {
  scaleExtent: [0.5, 4],
}
```

This means zooming out is allowed down to 0.5x and zooming in up to 4x.

### 2.5 Pan Range (translateExtent)

`translateExtent` limits the panning range, in the format `[[x0, y0], [x1, y1]]`, representing the rectangular area within which panning is allowed.

```js
zoom: {
  translateExtent: [[0, 0], [1000, 800]],
}
```

### 2.6 Interaction Area (extent)

`extent` specifies the listening area for zoom interactions, in the format `[[x0, y0], [x1, y1]]`.

```js
zoom: {
  extent: [[0, 0], [800, 600]],
}
```

### 2.7 Filter (filter)

`filter` is a function that decides which events can trigger zooming. Returning `true` allows the event, while `false` prevents it.

```js
zoom: {
  filter: (event) => !event.ctrlKey,
}
```

### 2.8 Wheel Delta (wheelDelta)

`wheelDelta` is a function used to customize the speed of wheel-based zooming.

```js
zoom: {
  wheelDelta: (event) => -event.deltaY * 0.01,
}
```

### 2.9 Click and Tap Distance (clickDistance / tapDistance)

`clickDistance` and `tapDistance` set the maximum distance the pointer is allowed to move for a mouse click or touch tap, respectively. Beyond this distance, the gesture is treated as a drag rather than a click.

```js
zoom: {
  clickDistance: 5,
  tapDistance: 10,
}
```

## 3. Complete Example

The following example shows commonly used zoom configurations:

```js
import { GraphVis } from "@zjfcool/graph-vis";

new GraphVis({
  // ... other options
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

## 4. Notes

1. **Property name**: Use `enable` to turn on zooming, not `enabled`.
2. **d3-zoom correspondence**: Properties such as `wheelDelta`, `extent`, `scaleExtent`, `translateExtent`, `clickDistance`, `tapDistance`, and `filter` are passed through directly to d3-zoom. For specific behavior, see the [d3-zoom documentation](https://d3js.org/d3-zoom).
3. **Dynamic updates**: After initialization, you can dynamically update the zoom options via `graph.setZoomOptions()`.
4. **Coordination with other interactions**: Zooming can be used together with dragging, linking, and other interactions, but watch out for event conflicts. Use `filter` to filter events when necessary.
5. **Mobile support**: `tapDistance` is for touch devices, while `clickDistance` is for mouse devices.

With the options above, you can flexibly control the zoom and pan behavior of the graph to improve the interaction experience.

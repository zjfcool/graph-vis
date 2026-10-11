# Edge Options (EdgeOptions)

`EdgeOptions` is used to configure the type, drawing method, state, style, arrow, and label of edges in the graph. It is typically passed as the `edge` property of `GraphVisOptions`. Its options support both static values and dynamically generated functions, where the function parameter `d` is the raw edge data.

## 1. Options Quick Reference

| Property      | Type                                                                               | Default    | Description                                                          |
| :------------ | :--------------------------------------------------------------------------------- | :--------- | :------------------------------------------------------------------- |
| `type`        | [`AttrType`](/en/guide/types/#attrtype)&lt;string&gt;                              | `auto`     | Edge type; built-in options are `auto`, `line`, `quadratic`, `cubic` |
| `id`          | `string`                                                                           | `id`       | The key in the edge data that corresponds to the edge ID             |
| `source`      | `string`                                                                           | `source`   | The key in the edge data that corresponds to the edge source         |
| `target`      | `string`                                                                           | `target`   | The key in the edge data that corresponds to the edge target         |
| `drawBy`      | [`AttrType`](/en/guide/types/#attrtype)&lt;[`DrawBy`](/en/guide/types/#drawby)&gt; | `graphics` | Drawing method, `graphics` or `sprite`                               |
| `state`       | [`EdgeStateOptions`](#edgestateoptions)                                            | -          | Edge state style options                                             |
| `style`       | [`EdgeStyleOptions`](#edgestyleoptions)                                            | -          | Edge style options                                                   |
| `arrowConfig` | [`EdgeArrowConfigOptions`](#edgearrowconfigoptions)                                | -          | Edge arrow options                                                   |
| `labelConfig` | [`EdgeLabelConfigOptions`](#edgelabelconfigoptions)                                | -          | Edge label options                                                   |

> For more properties, see the [EdgeOptions documentation](#).

## 2. Key Options

### 2.1 Edge Type (`type`)

Built-in edge types:

- `auto`: Adaptive; automatically selects the appropriate type based on the edge's connection relationship
- `line`: Straight line
- `quadratic`: Quadratic Bezier curve
- `cubic`: Cubic Bezier curve

Supports returning the type dynamically based on data via a function:

```js
type: (d) => (d.weight > 5 ? "cubic" : "line");
```

### 2.2 Drawing Method (`drawBy`)

The drawing method type is [`DrawBy`](/en/guide/types/#drawby):

- `graphics`: Draw using PixiJS Graphics (default)
- `sprite`: Draw using Sprite

Some style properties only take effect under a specific drawing method. See the `drawBy` column in the [`EdgeStyleOptions`](#edgestyleoptions) table for details.

### 2.3 Data Field Mapping (id / source / target)

Used to specify which field in the edge data corresponds to the edge's ID, source node ID, and target node ID. By default, `id`, `source`, and `target` are used, but you can customize them if your data uses different field names:

```js
edge: {
  id: 'edgeId',
  source: 'from',
  target: 'to',
}
```

### 2.4 State (`state`)

You can define different states for edges, and each state can override styles in `style`, `arrowConfig`, and `labelConfig`. By default, three states are included: `active`, `selected`, and `inactive`, but you can add your own.

```js
state: {
  active: { halo: true, haloSpacing: 3 },
  selected: { halo: true, width: 2 },
  inactive: { halo: false },
}
```

For detailed configuration, see [`EdgeStateOptions`](#edgestateoptions).

### 2.5 Style (`style`)

Controls the edge's stroke, halo, curve shape, etc. See [`EdgeStyleOptions`](#edgestyleoptions) below for details.

### 2.6 Arrow Configuration (`arrowConfig`)

Controls the visibility, position, size, and style of the edge arrow. See [`EdgeArrowConfigOptions`](#edgearrowconfigoptions) below for details.

### 2.7 Label Configuration (`labelConfig`)

Controls the edge label's text, position, style, etc. See [`EdgeLabelConfigOptions`](#edgelabelconfigoptions) below for details.

## 3. Edge Style Options (EdgeStyleOptions) {#edgestyleoptions}

| Property            | Type                                                                                                                        | Default | Description                                                                                                                    | drawBy   |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------- | :------- |
| `visible`           | [`AttrType`](/en/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `false` | Whether the edge is visible or hidden                                                                                          | -        |
| `smoothness`        | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0.75`  | The smoothness of a curved edge; larger values are smoother                                                                    | -        |
| `quadraticAlongT`   | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0.5`   | The position of the quadratic Bezier control point along the edge; 0 is the start, 1 is the end, 0.5 is the middle             | -        |
| `quadraticRotation` | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`     | The direction of the quadratic Bezier control point vector; positive values rotate clockwise, negative values counterclockwise | -        |
| `quadraticSpacing`  | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `40`    | The spacing of the quadratic Bezier control point                                                                              | -        |
| `cubicAlongT`       | [`AttrType`](/en/guide/types/#attrtype)&lt;number \| [number, number]&gt;                                                   | -       | The positions of the two control points of the cubic Bezier curve along the edge                                               | -        |
| `cubicRotation`     | [`AttrType`](/en/guide/types/#attrtype)&lt;number \| [number, number]&gt;                                                   | -       | The directions of the two control point vectors of the cubic Bezier curve                                                      | -        |
| `cubicSpacing`      | [`AttrType`](/en/guide/types/#attrtype)&lt;number \| [number, number]&gt;                                                   | -       | The spacing between the two control points of the cubic Bezier curve                                                           | -        |
| `stroke`            | [`GStrokeStyle`](/en/guide/types/#gstrokestyle)                                                                             | -       | Edge stroke style                                                                                                              | graphics |
| `halo`              | [`AttrType`](/en/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `false` | Whether the edge background is visible or hidden                                                                               | -        |
| `haloStroke`        | [`GStrokeStyle`](/en/guide/types/#gstrokestyle)                                                                             | -       | Edge background stroke style                                                                                                   | graphics |
| `haloSpacing`       | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `3`     | Spacing between the edge background and the edge                                                                               | -        |
| `haloTint`          | [`AttrType`](/en/guide/types/#attrtype)&lt;[`ColorSource`](https://pixijs.download/release/docs/color.ColorSource.html)&gt; | -       | Takes effect when `drawBy` is `sprite`; the edge background color                                                              | sprite   |
| `haloAlpha`         | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0.55`  | Takes effect when `drawBy` is `sprite`; the edge background opacity                                                            | sprite   |
| `tint`              | [`AttrType`](/en/guide/types/#attrtype)&lt;[`ColorSource`](https://pixijs.download/release/docs/color.ColorSource.html)&gt; | -       | Takes effect when `drawBy` is `sprite`; the edge color                                                                         | sprite   |
| `width`             | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `1`     | Takes effect when `drawBy` is `sprite`; the edge width                                                                         | sprite   |
| `alpha`             | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `1`     | Takes effect when `drawBy` is `sprite`; the edge opacity                                                                       | sprite   |

::: tip
Building a Bezier curve requires determining the position of its control points: `quadraticAlongT` / `cubicAlongT` determines where along the edge the control point is, `quadraticRotation` / `cubicRotation` determines which direction the control point is offset toward, and `quadraticSpacing` / `cubicSpacing` determines the offset distance along that position and direction, ultimately fixing the control point's position and thereby shaping the curve.
:::

## 4. Edge Arrow Options (EdgeArrowConfigOptions) {#edgearrowconfigoptions}

| Property | Type                                              | Default | Description              |
| :------- | :------------------------------------------------ | :------ | :----------------------- |
| `style`  | [`EdgeArrowStyleOptions`](#edgearrowstyleoptions) | -       | Edge arrow style options |

### Edge Arrow Style Options (EdgeArrowStyleOptions) {#edgearrowstyleoptions}

| Property            | Type                                                              | Default  | Description                                                                                    |
| :------------------ | :---------------------------------------------------------------- | :------- | :--------------------------------------------------------------------------------------------- |
| `visible`           | [`AttrType`](/en/guide/types/#attrtype)&lt;boolean&gt;            | `true`   | Whether the edge arrow is visible or hidden                                                    |
| `tailMidpointRatio` | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;             | `0.2`    | The ratio of the arrow tail's midpoint to the arrow's length; the recommended range is `[0,1)` |
| `size`              | [`AttrType`](/en/guide/types/#attrtype)&lt;number \| number[]&gt; | `[6, 4]` | The width and height of the edge arrow                                                         |
| `alongT`            | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;             | `1`      | The arrow's position along the edge; 0 is the start of the edge, 1 is the end                  |
| `fill`              | [`GFillStyle`](/en/guide/types/#gfillstyle)                       | -        | Edge arrow fill style                                                                          |
| `stroke`            | [`GStrokeStyle`](/en/guide/types/#gstrokestyle)                   | -        | Edge arrow stroke style                                                                        |

## 5. Edge Label Options (EdgeLabelConfigOptions) {#edgelabelconfigoptions}

| Property    | Type                                                                                     | Default          | Description                                           |
| :---------- | :--------------------------------------------------------------------------------------- | :--------------- | :---------------------------------------------------- |
| `type`      | [`AttrType`](/en/guide/types/#attrtype)&lt;[`LabelType`](/en/guide/types/#labeltype)&gt; | `text`           | Edge label type                                       |
| `drawBy`    | [`AttrType`](/en/guide/types/#attrtype)&lt;[`DrawBy`](/en/guide/types/#drawby)&gt;       | -                | Label drawing method; defaults to the edge's `drawBy` |
| `labelText` | [`AttrType`](/en/guide/types/#attrtype)&lt;[`TextType`](/en/guide/types/#texttype)&gt;   | `(d) => d.label` | Edge label text content                               |
| `style`     | [`EdgeLabelStyleOptions`](#edgelabelstyleoptions)                                        | -                | Edge label style options                              |

### Edge Label Style Options (EdgeLabelStyleOptions) {#edgelabelstyleoptions}

| Property             | Type                                                                                                                        | Default | Description                                                                                      | drawBy   |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------- | :------ | :----------------------------------------------------------------------------------------------- | :------- |
| `visible`            | [`AttrType`](/en/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `true`  | Whether the edge label is visible or hidden                                                      | -        |
| `alongT`             | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0.5`   | The label's position along the edge; 0 is the start of the edge, 1 is the end, 0.5 is the middle | -        |
| `offsetX`            | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`     | Label offset along the X-axis                                                                    | -        |
| `offsetY`            | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`     | Label offset along the Y-axis                                                                    | -        |
| `alongTPositionMode` | [`EdgeLabelPositionMode`](/en/guide/types/#edgelabelpositionmode)                                                           | `local` | The coordinate system corresponding to the `alongT` property                                     | -        |
| `offsetPositionMode` | [`EdgeLabelPositionMode`](/en/guide/types/#edgelabelpositionmode)                                                           | `local` | The coordinate system corresponding to the `offsetX` / `offsetY` properties                      | -        |
| `halo`               | [`AttrType`](/en/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `false` | Whether the edge label background is visible or hidden                                           | -        |
| `haloFill`           | [`GFillStyle`](/en/guide/types/#gfillstyle)                                                                                 | -       | Edge label background fill style                                                                 | graphics |
| `haloStroke`         | [`GStrokeStyle`](/en/guide/types/#gstrokestyle)                                                                             | -       | Edge label background stroke style                                                               | graphics |
| `haloSpacing`        | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`     | Spacing between the edge label background and the label edge                                     | -        |
| `haloRadius`         | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`     | Corner radius of the label background                                                            | graphics |
| `haloTint`           | [`AttrType`](/en/guide/types/#attrtype)&lt;[`ColorSource`](https://pixijs.download/release/docs/color.ColorSource.html)&gt; | -       | Takes effect when `drawBy` is `sprite`; the label background color                               | sprite   |
| `haloAlpha`          | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | -       | Takes effect when `drawBy` is `sprite`; the label background opacity                             | sprite   |

> Other label text properties come from [TextStyleOptions](https://pixijs.download/release/docs/text.TextStyleOptions.html), and all support dynamic generation via functions.

## 6. Edge State Options (EdgeStateOptions) {#edgestateoptions}

Edge states include three default options: `active`, `selected`, and `inactive`. The key type is `string`. You can add more edge state options as needed.

| Property        | Type                                              | Default | Description                                          |
| :-------------- | :------------------------------------------------ | :------ | :--------------------------------------------------- |
| `[key: string]` | [`EdgeStateStyleOptions`](#edgestatestyleoptions) | -       | Each state corresponds to an edge state style option |

### Edge State Style Options (EdgeStateStyleOptions) {#edgestatestyleoptions}

`EdgeStateStyleOptions` extends [`EdgeStyleOptions`](#edgestyleoptions) and adds the following properties:

| Property     | Type                                              | Default | Description                                       |
| :----------- | :------------------------------------------------ | :------ | :------------------------------------------------ |
| `labelStyle` | [`EdgeLabelStyleOptions`](#edgelabelstyleoptions) | -       | Style options for the edge label under this state |
| `arrowStyle` | [`EdgeArrowStyleOptions`](#edgearrowstyleoptions) | -       | Style options for the edge arrow under this state |

## 7. Complete Example

The following example shows dynamic edge styles, state configuration, arrow configuration, and label configuration:

```js
import { GraphVis } from "@zjfcool/graph-vis";

new GraphVis({
  // ... other options
  edge: {
    type: "auto",
    state: {
      active: {
        halo: true,
        haloSpacing: 3,
        haloAlpha: 0.55,
      },
      selected: {
        stroke: {
          width: (d) => (d.id > 100 ? 2 : 1),
        },
        halo: true,
        width: 2,
        haloSpacing: 3,
        haloAlpha: 0.55,
      },
      inactive: {
        halo: false,
      },
    },
    style: {
      visible: (d) => d.id % 2 === 0,
      smoothness: 0.75,
      halo: false,
      haloSpacing: 3,
      alpha: 1,
      stroke: {
        width: 1,
        color: (d) => (d.weight > 5 ? "#ff4d4f" : "#c0c4cc"),
      },
      width: 1,
    },
    arrowConfig: {
      style: {
        visible: true,
        size: [6, 4],
        tailMidpointRatio: 0.2,
        alongT: 1,
      },
    },
    labelConfig: {
      labelText: (d) => d.label,
      style: {
        visible: true,
        alongT: (d) => 0.5,
        alongTPositionMode: "local",
        offsetPositionMode: "local",
        offsetX: 0,
        offsetY: 0,
        fontSize: 12,
        halo: false,
        haloSpacing: 0,
        haloRadius: 2,
        haloAlpha: 0.55,
      },
    },
  },
});
```

## 8. Notes

1. **Dynamic generation via functions**: Most properties in `EdgeOptions` support passing a function, where the function parameter `d` is the raw edge data. This lets you decide edge styles dynamically based on data.
2. **Impact of `drawBy`**: The `graphics` and `sprite` drawing methods support different style properties. Please refer to the `drawBy` column in the tables.
3. **Choosing the edge type**: `auto` selects automatically based on the connection relationship. If you need precise control over the curve shape, it is recommended to explicitly specify `line`, `quadratic`, or `cubic`.
4. **State priority**: When an edge is in a certain state, the styles of that state override the base styles. If a property is not defined in the state, the base style continues to be used.
5. **Arrow configuration**: `arrowConfig.style.alongT` controls the arrow's position along the edge, and `tailMidpointRatio` affects the arrow's shape.
6. **Label configuration**: `labelConfig.labelText` defaults to `d.label`, `alongT` controls the label's position along the edge, and `alongTPositionMode` and `offsetPositionMode` control the coordinate systems.

With the options above, you can flexibly control the appearance, arrow, label, and interaction state of edges.

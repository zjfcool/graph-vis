# Node Options (NodeOptions)

`NodeOptions` is used to configure the type, drawing method, state, text, style, and labels of nodes in the graph. It is typically passed as the `node` property of `GraphVisOptions`. Its options support both static values and dynamically generated functions, where the function parameter `d` is the raw node data.

## 1. Options Quick Reference

| Property      | Type                                                                                   | Default    | Description                                                                                                              |
| :------------ | :------------------------------------------------------------------------------------- | :--------- | :----------------------------------------------------------------------------------------------------------------------- |
| `type`        | [`AttrType`](/en/guide/types/#attrtype)&lt;[`NodeType`](/en/guide/types/#nodetype)&gt; | `circle`   | Node type; built-in options include `circle`, `ellipse`, `image`, `polygon`, `rect`, `text`, `bitmap-text`, `star`, etc. |
| `drawBy`      | [`AttrType`](/en/guide/types/#attrtype)&lt;[`DrawBy`](/en/guide/types/#drawby)&gt;     | `graphics` | Drawing method, `graphics` or `sprite`                                                                                   |
| `state`       | [`NodeStateOptions`](#nodestateoptions)                                                | -          | Node state options, such as `active`, `selected`, `inactive`                                                             |
| `textValue`   | [`AttrType`](/en/guide/types/#attrtype)&lt;[`TextType`](/en/guide/types/#texttype)&gt; | -          | Takes effect when the node type is `text` or `bitmap-text`; returns the text content                                     |
| `style`       | [`NodeStyleOptions`](#nodestyleoptions)                                                | -          | Node style options                                                                                                       |
| `labelConfig` | [`NodeLabelConfigOptions`](#nodelabelconfigoptions)                                    | -          | Node label options                                                                                                       |

## 2. Key Options

### 2.1 Node Type (`type`)

Built-in node types:

- `circle`: Circle
- `ellipse`: Ellipse
- `rect`: Rectangle (supports rounded corners)
- `polygon`: Polygon
- `star`: Star
- `image`: Image
- `text`: Text
- `bitmap-text`: Bitmap text

The type is defined as [`NodeType`](/en/guide/types/#nodetype), and supports returning the type dynamically based on data via a function:

```js
type: (d) => (d.category === "person" ? "circle" : "rect");
```

### 2.2 Drawing Method (`drawBy`)

The drawing method type is [`DrawBy`](/en/guide/types/#drawby):

- `graphics`: Draw using PixiJS Graphics (default)
- `sprite`: Draw using Sprite

Some style properties only take effect under a specific drawing method. See the `drawBy` column in the [`NodeStyleOptions`](#nodestyleoptions) table for details.

### 2.3 State (`state`)

You can define different states for nodes, and each state can override styles in `style` and `labelConfig`. By default, three states are included: `active`, `selected`, and `inactive`, but you can add your own.

```js
state: {
  active: { halo: true, haloSpacing: 3 },
  selected: { halo: true, haloSpacing: 3 },
  inactive: { halo: false },
}
```

For detailed configuration, see [`NodeStateOptions`](#nodestateoptions).

### 2.4 Text Value (`textValue`)

Takes effect only when `type` is `text` or `bitmap-text`, and is used to return the text content to be rendered. Its type is [`TextType`](/en/guide/types/#texttype), which can be a string, a number, or any object that implements a `toString` method.

```js
textValue: (d) => d.label;
```

### 2.5 Style (`style`)

Controls the node's fill, stroke, halo, size, etc. See [`NodeStyleOptions`](#nodestyleoptions) below for details.

### 2.6 Label Configuration (`labelConfig`)

Controls the node label's text, position, style, etc. See [`NodeLabelConfigOptions`](#nodelabelconfigoptions) below for details.

## 3. Node Style Options (NodeStyleOptions) {#nodestyleoptions}

| Property      | Type                                                                                                                        | Default   | Description                                                                                 | drawBy   |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------- | :-------- | :------------------------------------------------------------------------------------------ | :------- |
| `visible`     | [`AttrType`](/en/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `true`    | Whether the node is visible or hidden                                                       | -        |
| `x`           | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`       | Node x-coordinate                                                                           | -        |
| `y`           | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`       | Node y-coordinate                                                                           | -        |
| `size`        | [`AttrType`](/en/guide/types/#attrtype)&lt;number \| [number, number] \| number[]&gt;                                       | `20`      | Node size                                                                                   | -        |
| `pointNum`    | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | -         | Takes effect when the type is `star` or `polygon`; represents the number of points or sides | -        |
| `rotation`    | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`       | Node rotation angle                                                                         | -        |
| `imgUrl`      | [`AttrType`](/en/guide/types/#attrtype)&lt;string&gt;                                                                       | -         | Takes effect when the type is `image`; the image URL                                        | -        |
| `radius`      | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`       | Takes effect when the type is `rect`; the corner radius                                     | graphics |
| `fill`        | [`GFillStyle`](/en/guide/types/#gfillstyle)                                                                                 | -         | Node fill style                                                                             | graphics |
| `stroke`      | [`GStrokeStyle`](/en/guide/types/#gstrokestyle)                                                                             | -         | Node stroke style                                                                           | graphics |
| `halo`        | [`AttrType`](/en/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `false`   | Whether the node background is visible or hidden                                            | graphics |
| `haloFill`    | [`GFillStyle`](/en/guide/types/#gfillstyle)                                                                                 | -         | Node background fill style                                                                  | graphics |
| `haloStroke`  | [`GStrokeStyle`](/en/guide/types/#gstrokestyle)                                                                             | -         | Node background stroke style                                                                | graphics |
| `haloSpacing` | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `3`       | Spacing between the node background and the node edge                                       | -        |
| `haloRadius`  | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`       | When the type is `rect`, the corner radius of the node background                           | graphics |
| `haloTint`    | [`AttrType`](/en/guide/types/#attrtype)&lt;[`ColorSource`](https://pixijs.download/release/docs/color.ColorSource.html)&gt; | `#F8F9FB` | Takes effect when `drawBy` is `sprite`; the node background fill color                      | sprite   |
| `haloAlpha`   | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0.55`    | Takes effect when `drawBy` is `sprite`; the node background opacity                         | sprite   |
| `tint`        | [`AttrType`](/en/guide/types/#attrtype)&lt;[`ColorSource`](https://pixijs.download/release/docs/color.ColorSource.html)&gt; | `#F8F9FB` | Takes effect when `drawBy` is `sprite`; the node color                                      | sprite   |
| `alpha`       | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `1`       | Takes effect when `drawBy` is `sprite`; the node opacity                                    | sprite   |

> When the node type is `text` or `bitmap-text`, properties from [TextStyleOptions](https://pixijs.download/release/docs/text.TextStyleOptions.html) are also supported, and these properties likewise support dynamic generation via functions.

## 4. Node Label Options (NodeLabelConfigOptions) {#nodelabelconfigoptions}

| Property    | Type                                                                                   | Default          | Description                                                   |
| :---------- | :------------------------------------------------------------------------------------- | :--------------- | :------------------------------------------------------------ |
| `type`      | [`AttrType`](/en/guide/types/#attrtype)&lt;`LabelType`&gt;                             | `text`           | Label type, `text` or `bitmap-text`                           |
| `drawBy`    | [`AttrType`](/en/guide/types/#attrtype)&lt;[`DrawBy`](/en/guide/types/#drawby)&gt;     | -                | Label drawing method; inherits the node's `drawBy` by default |
| `labelText` | [`AttrType`](/en/guide/types/#attrtype)&lt;[`TextType`](/en/guide/types/#texttype)&gt; | `(d) => d.label` | Label text content                                            |
| `style`     | [`NodeLabelStyleOptions`](#nodelabelstyleoptions)                                      | -                | Label style options                                           |

### Node Label Style Options (NodeLabelStyleOptions) {#nodelabelstyleoptions}

| Property      | Type                                                                                                                        | Default                     | Description                                                            | drawBy   |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------- | :-------------------------- | :--------------------------------------------------------------------- | :------- |
| `visible`     | [`AttrType`](/en/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `false`                     | Whether the label is visible or hidden                                 | -        |
| `placement`   | [`Placement`](/en/guide/types/#placement)                                                                                   | `right`                     | Label position; options are `center`, `left`, `right`, `top`, `bottom` | -        |
| `offsetX`     | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`                         | Label X-axis offset                                                    | -        |
| `offsetY`     | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`                         | Label Y-axis offset                                                    | -        |
| `halo`        | [`AttrType`](/en/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `false`                     | Whether the label background is visible or hidden                      | -        |
| `haloFill`    | [`GFillStyle`](/en/guide/types/#gfillstyle)                                                                                 | -                           | Label background fill style                                            | graphics |
| `haloStroke`  | [`GStrokeStyle`](/en/guide/types/#gstrokestyle)                                                                             | -                           | Label background stroke style                                          | graphics |
| `haloSpacing` | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`                         | Spacing between the label background and the label edge                | -        |
| `haloRadius`  | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`                         | Corner radius of the label background                                  | graphics |
| `haloTint`    | [`AttrType`](/en/guide/types/#attrtype)&lt;[`ColorSource`](https://pixijs.download/release/docs/color.ColorSource.html)&gt; | Node label background color | Takes effect when `drawBy` is `sprite`                                 | sprite   |
| `haloAlpha`   | [`AttrType`](/en/guide/types/#attrtype)&lt;number&gt;                                                                       | `0.55`                      | Takes effect when `drawBy` is `sprite`; the label background opacity   | sprite   |

> Other properties come from [TextStyleOptions](https://pixijs.download/release/docs/text.TextStyleOptions.html) and all support dynamic generation via functions.

## 5. Node State Options (NodeStateOptions) {#nodestateoptions}

By default, three states are included: `active`, `selected`, and `inactive`. You can add more states as needed.

| Property        | Type                                              | Default | Description                               |
| :-------------- | :------------------------------------------------ | :------ | :---------------------------------------- |
| `[key: string]` | [`NodeStateStyleOptions`](#nodestatestyleoptions) | -       | Style options for the corresponding state |

### Node State Style Options (NodeStateStyleOptions) {#nodestatestyleoptions}

`NodeStateStyleOptions` extends [`NodeStyleOptions`](#nodestyleoptions) and adds the following property:

| Property     | Type                                              | Default | Description                                       |
| :----------- | :------------------------------------------------ | :------ | :------------------------------------------------ |
| `labelStyle` | [`NodeLabelStyleOptions`](#nodelabelstyleoptions) | -       | Style options for the node label under this state |

## 6. Complete Example

The following example shows dynamic node styles, state configuration, and label configuration:

```js
import { GraphVis } from "@zjfcool/graph-vis";

new GraphVis({
  // ... other options
  node: {
    type: "circle",
    state: {
      active: {
        halo: true,
        haloSpacing: 3,
      },
      selected: {
        halo: true,
        haloSpacing: 3,
      },
      inactive: {
        halo: false,
      },
    },
    style: {
      visible: true,
      size: (d) => d.weight * 5 + 10,
      pointNum: 5,
      rotation: 0,
      radius: 0,
      haloRadius: 0,
      halo: false,
      haloSpacing: 3,
      alpha: 1,
      haloAlpha: 0.55,
      fill: (d) => (d.category === "important" ? "#ff4d4f" : "#409eff"),
    },
    labelConfig: {
      labelText: (d) => d.label,
      style: {
        visible: true,
        placement: (d) => (d.id % 2 === 0 ? "right" : "left"),
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

## 7. Notes

1. **Dynamic generation via functions**: Most properties in `NodeOptions` support passing a function, where the function parameter `d` is the raw node data. This lets you decide node styles dynamically based on data.
2. **Impact of `drawBy`**: The `graphics` and `sprite` drawing methods support different style properties. Please refer to the `drawBy` column in the tables.
3. **State priority**: When a node is in a certain state, the styles of that state override the base styles. If a property is not defined in the state, the base style continues to be used.
4. **Text nodes**: When `type` is `text` or `bitmap-text`, `textValue` is used to set the text content, and all properties from `TextStyleOptions` can be used in `style`.
5. **Label configuration**: `labelConfig.labelText` defaults to `d.label`, and you can customize it based on your data.

With the options above, you can flexibly control the appearance, labels, and interaction states of nodes.

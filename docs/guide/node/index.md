# 节点配置 (NodeOptions)

`NodeOptions` 用于配置图中节点的类型、绘制方式、状态、文本、样式和标签等。它通常作为 `GraphVisOptions` 的 `node` 属性传入。其配置项支持静态值和函数动态生成两种形式，函数参数 `d` 为节点的原始数据。

## 1. 配置项速查表

| 属性          | 类型                                                                             | 默认值     | 描述                                                                                             |
| :------------ | :------------------------------------------------------------------------------- | :--------- | :----------------------------------------------------------------------------------------------- |
| `type`        | [`AttrType`](/guide/types/#attrtype)&lt;[`NodeType`](/guide/types/#nodetype)&gt; | `circle`   | 节点类型，内置 `circle`、`ellipse`、`image`、`polygon`、`rect`、`text`、`bitmap-text`、`star` 等 |
| `drawBy`      | [`AttrType`](/guide/types/#attrtype)&lt;[`DrawBy`](/guide/types/#drawby)&gt;     | `graphics` | 绘制方式，`graphics` 或 `sprite`                                                                 |
| `state`       | [`NodeStateOptions`](#nodestateoptions)                                          | -          | 节点状态配置项，如 `active`、`selected`、`inactive`                                              |
| `textValue`   | [`AttrType`](/guide/types/#attrtype)&lt;[`TextType`](/guide/types/#texttype)&gt; | -          | 当节点类型为 `text` 或 `bitmap-text` 时生效，返回文本内容                                        |
| `style`       | [`NodeStyleOptions`](#nodestyleoptions)                                          | -          | 节点样式配置项                                                                                   |
| `labelConfig` | [`NodeLabelConfigOptions`](#nodelabelconfigoptions)                              | -          | 节点标签配置项                                                                                   |

## 2. 重点配置说明

### 2.1 节点类型 (`type`)

内置节点类型：

- `circle`：圆形
- `ellipse`：椭圆
- `rect`：矩形（支持圆角）
- `polygon`：多边形
- `star`：多角星
- `image`：图片
- `text`：文本
- `bitmap-text`：位图文本

类型定义为 [`NodeType`](/guide/types/#nodetype)，支持通过函数根据数据动态返回类型：

```js
type: (d) => (d.category === "person" ? "circle" : "rect");
```

### 2.2 绘制方式 (`drawBy`)

绘制方式类型为 [`DrawBy`](/guide/types/#drawby)：

- `graphics`：使用 PixiJS Graphics 绘制（默认）
- `sprite`：使用 Sprite 绘制

部分样式属性仅在特定绘制方式下生效，详见 [`NodeStyleOptions`](#nodestyleoptions) 表格中的 `drawBy` 列。

### 2.3 状态 (`state`)

可以为节点定义不同的状态，每个状态可以覆盖 `style` 和 `labelConfig` 中的样式。默认包含 `active`、`selected`、`inactive` 三个状态，你也可以自行添加。

```js
state: {
  active: { halo: true, haloSpacing: 3 },
  selected: { halo: true, haloSpacing: 3 },
  inactive: { halo: false },
}
```

详细配置见 [`NodeStateOptions`](#nodestateoptions)。

### 2.4 文本值 (`textValue`)

仅当 `type` 为 `text` 或 `bitmap-text` 时生效，用于返回要渲染的文本内容。类型为 [`TextType`](/guide/types/#texttype)，可以是字符串、数字或任何实现了 `toString` 方法的对象。

```js
textValue: (d) => d.label;
```

### 2.5 样式 (`style`)

控制节点的填充、描边、光晕、尺寸等，详见下方 [`NodeStyleOptions`](#nodestyleoptions)。

### 2.6 标签配置 (`labelConfig`)

控制节点标签的文本、位置、样式等，详见下方 [`NodeLabelConfigOptions`](#nodelabelconfigoptions)。

## 3. 节点样式配置项 (NodeStyleOptions) {#nodestyleoptions}

| 属性          | 类型                                                                                                                     | 默认值    | 描述                                                | drawBy   |
| :------------ | :----------------------------------------------------------------------------------------------------------------------- | :-------- | :-------------------------------------------------- | :------- |
| `visible`     | [`AttrType`](/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `true`    | 节点显示或隐藏                                      | -        |
| `x`           | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`       | 节点 x 坐标                                         | -        |
| `y`           | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`       | 节点 y 坐标                                         | -        |
| `size`        | [`AttrType`](/guide/types/#attrtype)&lt;number \| [number, number] \| number[]&gt;                                       | `20`      | 节点大小尺寸                                        | -        |
| `pointNum`    | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | -         | 当类型为 `star` 或 `polygon` 时生效，表示角数或边数 | -        |
| `rotation`    | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`       | 节点旋转角度                                        | -        |
| `imgUrl`      | [`AttrType`](/guide/types/#attrtype)&lt;string&gt;                                                                       | -         | 当类型为 `image` 时生效，图片地址                   | -        |
| `radius`      | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`       | 当类型为 `rect` 时生效，圆角值                      | graphics |
| `fill`        | [`GFillStyle`](/guide/types/#gfillstyle)                                                                                 | -         | 节点填充样式                                        | graphics |
| `stroke`      | [`GStrokeStyle`](/guide/types/#gstrokestyle)                                                                             | -         | 节点描边样式                                        | graphics |
| `halo`        | [`AttrType`](/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `false`   | 节点背景显示或隐藏                                  | graphics |
| `haloFill`    | [`GFillStyle`](/guide/types/#gfillstyle)                                                                                 | -         | 节点背景填充样式                                    | graphics |
| `haloStroke`  | [`GStrokeStyle`](/guide/types/#gstrokestyle)                                                                             | -         | 节点背景描边样式                                    | graphics |
| `haloSpacing` | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `3`       | 节点背景与节点边的间距                              | -        |
| `haloRadius`  | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`       | 当类型为 `rect` 时，节点背景圆角值                  | graphics |
| `haloTint`    | [`AttrType`](/guide/types/#attrtype)&lt;[`ColorSource`](https://pixijs.download/release/docs/color.ColorSource.html)&gt; | `#F8F9FB` | 当 drawBy 为 `sprite` 时生效，节点背景填充色        | sprite   |
| `haloAlpha`   | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0.55`    | 当 drawBy 为 `sprite` 时生效，节点背景透明度        | sprite   |
| `tint`        | [`AttrType`](/guide/types/#attrtype)&lt;[`ColorSource`](https://pixijs.download/release/docs/color.ColorSource.html)&gt; | `#F8F9FB` | 当 drawBy 为 `sprite` 时生效，节点颜色              | sprite   |
| `alpha`       | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `1`       | 当 drawBy 为 `sprite` 时生效，节点透明度            | sprite   |

> 当节点类型为 `text` 或 `bitmap-text` 时，还会支持 [TextStyleOptions](https://pixijs.download/release/docs/text.TextStyleOptions.html) 中的属性，这些属性同样支持函数动态生成。

## 4. 节点标签配置项 (NodeLabelConfigOptions) {#nodelabelconfigoptions}

| 属性        | 类型                                                                             | 默认值           | 描述                                  |
| :---------- | :------------------------------------------------------------------------------- | :--------------- | :------------------------------------ |
| `type`      | [`AttrType`](/guide/types/#attrtype)&lt;`LabelType`&gt;                          | `text`           | 标签类型，`text` 或 `bitmap-text`     |
| `drawBy`    | [`AttrType`](/guide/types/#attrtype)&lt;[`DrawBy`](/guide/types/#drawby)&gt;     | -                | 标签绘制方式，默认继承节点的 `drawBy` |
| `labelText` | [`AttrType`](/guide/types/#attrtype)&lt;[`TextType`](/guide/types/#texttype)&gt; | `(d) => d.label` | 标签文本内容                          |
| `style`     | [`NodeLabelStyleOptions`](#nodelabelstyleoptions)                                | -                | 标签样式配置项                        |

### 节点标签样式配置项 (NodeLabelStyleOptions) {#nodelabelstyleoptions}

| 属性          | 类型                                                                                                                     | 默认值           | 描述                                                      | drawBy   |
| :------------ | :----------------------------------------------------------------------------------------------------------------------- | :--------------- | :-------------------------------------------------------- | :------- |
| `visible`     | [`AttrType`](/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `false`          | 标签显示或隐藏                                            | -        |
| `placement`   | [`Placement`](/guide/types/#placement)                                                                                   | `right`          | 标签位置，可选 `center`、`left`、`right`、`top`、`bottom` | -        |
| `offsetX`     | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`              | 标签 X 轴偏移量                                           | -        |
| `offsetY`     | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`              | 标签 Y 轴偏移量                                           | -        |
| `halo`        | [`AttrType`](/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `false`          | 标签背景显示或隐藏                                        | -        |
| `haloFill`    | [`GFillStyle`](/guide/types/#gfillstyle)                                                                                 | -                | 标签背景填充样式                                          | graphics |
| `haloStroke`  | [`GStrokeStyle`](/guide/types/#gstrokestyle)                                                                             | -                | 标签背景描边样式                                          | graphics |
| `haloSpacing` | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`              | 标签背景与标签边的间距                                    | -        |
| `haloRadius`  | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`              | 标签背景圆角值                                            | graphics |
| `haloTint`    | [`AttrType`](/guide/types/#attrtype)&lt;[`ColorSource`](https://pixijs.download/release/docs/color.ColorSource.html)&gt; | 节点标签背景颜色 | 当 drawBy 为 `sprite` 时生效                              | sprite   |
| `haloAlpha`   | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0.55`           | 当 drawBy 为 `sprite` 时生效，标签背景透明度              | sprite   |

> 其他属性为 [TextStyleOptions](https://pixijs.download/release/docs/text.TextStyleOptions.html) 中的属性，均支持函数动态生成。

## 5. 节点状态配置项 (NodeStateOptions) {#nodestateoptions}

默认包含 `active`、`selected`、`inactive` 三个状态，你可以自行添加更多状态。

| 属性            | 类型                                              | 默认值 | 描述                 |
| :-------------- | :------------------------------------------------ | :----- | :------------------- |
| `[key: string]` | [`NodeStateStyleOptions`](#nodestatestyleoptions) | -      | 对应状态的样式配置项 |

### 节点状态样式配置项 (NodeStateStyleOptions) {#nodestatestyleoptions}

`NodeStateStyleOptions` 继承 [`NodeStyleOptions`](#nodestyleoptions)，并扩展以下属性：

| 属性         | 类型                                              | 默认值 | 描述                         |
| :----------- | :------------------------------------------------ | :----- | :--------------------------- |
| `labelStyle` | [`NodeLabelStyleOptions`](#nodelabelstyleoptions) | -      | 该状态下节点标签的样式配置项 |

## 6. 完整示例

以下示例展示了节点动态样式、状态配置和标签配置：

```js
import { GraphVis } from "@zjfcool/graph-vis";

new GraphVis({
  // ... 其他配置
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

## 7. 注意事项

1. **函数动态生成**：`NodeOptions` 中的大部分属性都支持传入函数，函数参数 `d` 为节点的原始数据。这使得你可以根据数据动态决定节点样式。
2. **drawBy 的影响**：`graphics` 和 `sprite` 两种绘制方式支持的样式属性不同，请参考表格中的 `drawBy` 列。
3. **状态优先级**：当节点处于某个状态时，该状态下的样式会覆盖基础样式。如果状态中未定义的属性，会继续使用基础样式。
4. **文本节点**：当 `type` 为 `text` 或 `bitmap-text` 时，`textValue` 用于设置文本内容，同时 `style` 中可以使用 `TextStyleOptions` 的所有属性。
5. **标签配置**：`labelConfig.labelText` 默认取 `d.label`，你可以根据数据自定义。

通过以上配置，你可以灵活地控制节点的外观、标签和交互状态。

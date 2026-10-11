# 边配置 (EdgeOptions)

`EdgeOptions` 用于配置图中边的类型、绘制方式、状态、样式、箭头和标签等。它通常作为 `GraphVisOptions` 的 `edge` 属性传入。其配置项支持静态值和函数动态生成两种形式，函数参数 `d` 为边的原始数据。

## 1. 配置项速查表

| 属性          | 类型                                                                         | 默认值     | 描述                                                   |
| :------------ | :--------------------------------------------------------------------------- | :--------- | :----------------------------------------------------- |
| `type`        | [`AttrType`](/guide/types/#attrtype)&lt;string&gt;                           | `auto`     | 边类型，内置 `auto`、`line`、`quadratic`、`cubic` 四种 |
| `id`          | `string`                                                                     | `id`       | 边 ID 对应的 key                                       |
| `source`      | `string`                                                                     | `source`   | 边 source 对应的 key                                   |
| `target`      | `string`                                                                     | `target`   | 边 target 对应的 key                                   |
| `drawBy`      | [`AttrType`](/guide/types/#attrtype)&lt;[`DrawBy`](/guide/types/#drawby)&gt; | `graphics` | 绘制方式，`graphics` 或 `sprite`                       |
| `state`       | [`EdgeStateOptions`](#edgestateoptions)                                      | -          | 边状态样式配置项                                       |
| `style`       | [`EdgeStyleOptions`](#edgestyleoptions)                                      | -          | 边样式配置项                                           |
| `arrowConfig` | [`EdgeArrowConfigOptions`](#edgearrowconfigoptions)                          | -          | 边箭头配置项                                           |
| `labelConfig` | [`EdgeLabelConfigOptions`](#edgelabelconfigoptions)                          | -          | 边标签配置项                                           |

> 更多属性请参考 [EdgeOptions 详细文档](#)。

## 2. 重点配置说明

### 2.1 边类型 (type)

内置边类型：

- `auto`：自适应，根据边的连接关系自动选择合适的类型
- `line`：直线
- `quadratic`：二次贝塞尔曲线
- `cubic`：三次贝塞尔曲线

支持通过函数根据数据动态返回类型：

```js
type: (d) => (d.weight > 5 ? "cubic" : "line");
```

### 2.2 绘制方式 (drawBy)

绘制方式类型为 [`DrawBy`](/guide/types/#drawby)：

- `graphics`：使用 PixiJS Graphics 绘制（默认）
- `sprite`：使用 Sprite 绘制

部分样式属性仅在特定绘制方式下生效，详见 [`EdgeStyleOptions`](#edgestyleoptions) 表格中的 `drawBy` 列。

### 2.3 数据字段映射 (id / source / target)

用于指定边数据中哪个字段对应边的 ID、源节点 ID 和目标节点 ID。默认使用 `id`、`source`、`target`，如果你的数据字段名不同，可以自定义：

```js
edge: {
  id: 'edgeId',
  source: 'from',
  target: 'to',
}
```

### 2.4 状态 (state)

可以为边定义不同的状态，每个状态可以覆盖 `style`、`arrowConfig` 和 `labelConfig` 中的样式。默认包含 `active`、`selected`、`inactive` 三个状态，你也可以自行添加。

```js
state: {
  active: { halo: true, haloSpacing: 3 },
  selected: { halo: true, width: 2 },
  inactive: { halo: false },
}
```

详细配置见 [`EdgeStateOptions`](#edgestateoptions)。

### 2.5 样式 (style)

控制边的描边、光晕、曲线形状等，详见下方 [`EdgeStyleOptions`](#edgestyleoptions)。

### 2.6 箭头配置 (arrowConfig)

控制边箭头的显示、位置、尺寸和样式，详见下方 [`EdgeArrowConfigOptions`](#edgearrowconfigoptions)。

### 2.7 标签配置 (labelConfig)

控制边标签的文本、位置、样式等，详见下方 [`EdgeLabelConfigOptions`](#edgelabelconfigoptions)。

## 3. 边样式配置项 (EdgeStyleOptions) {#edgestyleoptions}

| 属性                | 类型                                                                                                                     | 默认值  | 描述                                                               | drawBy   |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------- | :------ | :----------------------------------------------------------------- | :------- |
| `visible`           | [`AttrType`](/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `false` | 边的显示与隐藏                                                     | -        |
| `smoothness`        | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0.75`  | 曲线边的柔和度，值越大越顺滑                                       | -        |
| `quadraticAlongT`   | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0.5`   | 二次贝塞尔曲线控制点在边上的位置，0 为起点，1 为终点，0.5 为中间   | -        |
| `quadraticRotation` | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`     | 二次贝塞尔曲线控制点向量的方向，正值为顺时针旋转，负值为逆时针旋转 | -        |
| `quadraticSpacing`  | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `40`    | 二次贝塞尔曲线控制点的间距                                         | -        |
| `cubicAlongT`       | [`AttrType`](/guide/types/#attrtype)&lt;number \| [number, number]&gt;                                                   | -       | 三次贝塞尔曲线两个控制点在边上的位置                               | -        |
| `cubicRotation`     | [`AttrType`](/guide/types/#attrtype)&lt;number \| [number, number]&gt;                                                   | -       | 三次贝塞尔曲线两个控制点向量的方向                                 | -        |
| `cubicSpacing`      | [`AttrType`](/guide/types/#attrtype)&lt;number \| [number, number]&gt;                                                   | -       | 三次贝塞尔曲线两个控制点之间的间距                                 | -        |
| `stroke`            | [`GStrokeStyle`](/guide/types/#gstrokestyle)                                                                             | -       | 边的描边样式                                                       | graphics |
| `halo`              | [`AttrType`](/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `false` | 边背景的显示与隐藏                                                 | -        |
| `haloStroke`        | [`GStrokeStyle`](/guide/types/#gstrokestyle)                                                                             | -       | 边背景描边样式                                                     | graphics |
| `haloSpacing`       | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `3`     | 边背景与边的间距                                                   | -        |
| `haloTint`          | [`AttrType`](/guide/types/#attrtype)&lt;[`ColorSource`](https://pixijs.download/release/docs/color.ColorSource.html)&gt; | -       | 当 drawBy 为 `sprite` 时生效，边背景的颜色                         | sprite   |
| `haloAlpha`         | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0.55`  | 当 drawBy 为 `sprite` 时生效，边背景透明度                         | sprite   |
| `tint`              | [`AttrType`](/guide/types/#attrtype)&lt;[`ColorSource`](https://pixijs.download/release/docs/color.ColorSource.html)&gt; | -       | 当 drawBy 为 `sprite` 时生效，边的颜色                             | sprite   |
| `width`             | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `1`     | 当 drawBy 为 `sprite` 时生效，边的宽度                             | sprite   |
| `alpha`             | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `1`     | 当 drawBy 为 `sprite` 时生效，边的透明度                           | sprite   |

::: tip
构建一条贝塞尔曲线需要确定控制点的位置：`quadraticAlongT` / `cubicAlongT` 确定在边的哪个位置，`quadraticRotation` / `cubicRotation` 确定控制点沿着哪个方向偏移，`quadraticSpacing` / `cubicSpacing` 确定沿着既定位置和方向偏移的距离，最终确定控制点的位置，进而调整曲线的形状。
:::

## 4. 边箭头配置项 (EdgeArrowConfigOptions) {#edgearrowconfigoptions}

| 属性    | 类型                                              | 默认值 | 描述             |
| :------ | :------------------------------------------------ | :----- | :--------------- |
| `style` | [`EdgeArrowStyleOptions`](#edgearrowstyleoptions) | -      | 边箭头样式配置项 |

### 边箭头样式配置项 (EdgeArrowStyleOptions) {#edgearrowstyleoptions}

| 属性                | 类型                                                           | 默认值   | 描述                                                 |
| :------------------ | :------------------------------------------------------------- | :------- | :--------------------------------------------------- |
| `visible`           | [`AttrType`](/guide/types/#attrtype)&lt;boolean&gt;            | `true`   | 边箭头显示与隐藏                                     |
| `tailMidpointRatio` | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;             | `0.2`    | 边箭头尾部中间点占箭头长度的比例，推荐值为 `[0,1)`   |
| `size`              | [`AttrType`](/guide/types/#attrtype)&lt;number \| number[]&gt; | `[6, 4]` | 边箭头的宽高值                                       |
| `alongT`            | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;             | `1`      | 箭头沿着边方向的位置，0 为边的起始位置，1 为边的末尾 |
| `fill`              | [`GFillStyle`](/guide/types/#gfillstyle)                       | -        | 边箭头填充样式                                       |
| `stroke`            | [`GStrokeStyle`](/guide/types/#gstrokestyle)                   | -        | 边箭头描边样式                                       |

## 5. 边标签配置项 (EdgeLabelConfigOptions) {#edgelabelconfigoptions}

| 属性        | 类型                                                                               | 默认值           | 描述                                   |
| :---------- | :--------------------------------------------------------------------------------- | :--------------- | :------------------------------------- |
| `type`      | [`AttrType`](/guide/types/#attrtype)&lt;[`LabelType`](/guide/types/#labeltype)&gt; | `text`           | 边标签类型                             |
| `drawBy`    | [`AttrType`](/guide/types/#attrtype)&lt;[`DrawBy`](/guide/types/#drawby)&gt;       | -                | 标签绘制方式，默认与边的 `drawBy` 一致 |
| `labelText` | [`AttrType`](/guide/types/#attrtype)&lt;[`TextType`](/guide/types/#texttype)&gt;   | `(d) => d.label` | 边标签文本内容                         |
| `style`     | [`EdgeLabelStyleOptions`](#edgelabelstyleoptions)                                  | -                | 边标签样式配置项                       |

### 边标签样式配置项 (EdgeLabelStyleOptions) {#edgelabelstyleoptions}

| 属性                 | 类型                                                                                                                     | 默认值  | 描述                                                             | drawBy   |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------- | :------ | :--------------------------------------------------------------- | :------- |
| `visible`            | [`AttrType`](/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `true`  | 边标签的显示与隐藏                                               | -        |
| `alongT`             | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0.5`   | 标签在边上的位置，0 为边的起始位置，1 为边的末尾，0.5 为边的中间 | -        |
| `offsetX`            | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`     | 标签 X 轴方向偏移量                                              | -        |
| `offsetY`            | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`     | 标签 Y 轴方向偏移量                                              | -        |
| `alongTPositionMode` | [`EdgeLabelPositionMode`](/guide/types/#edgelabelpositionmode)                                                           | `local` | `alongT` 属性对应的坐标系统                                      | -        |
| `offsetPositionMode` | [`EdgeLabelPositionMode`](/guide/types/#edgelabelpositionmode)                                                           | `local` | `offsetX` / `offsetY` 属性对应的坐标系统                         | -        |
| `halo`               | [`AttrType`](/guide/types/#attrtype)&lt;boolean&gt;                                                                      | `false` | 边标签背景显示与隐藏                                             | -        |
| `haloFill`           | [`GFillStyle`](/guide/types/#gfillstyle)                                                                                 | -       | 边标签背景填充样式                                               | graphics |
| `haloStroke`         | [`GStrokeStyle`](/guide/types/#gstrokestyle)                                                                             | -       | 边标签背景描边样式                                               | graphics |
| `haloSpacing`        | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`     | 边标签背景与标签边的间距                                         | -        |
| `haloRadius`         | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | `0`     | 标签背景圆角值                                                   | graphics |
| `haloTint`           | [`AttrType`](/guide/types/#attrtype)&lt;[`ColorSource`](https://pixijs.download/release/docs/color.ColorSource.html)&gt; | -       | 当 drawBy 为 `sprite` 时生效，标签背景颜色                       | sprite   |
| `haloAlpha`          | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                                                                       | -       | 当 drawBy 为 `sprite` 时生效，标签背景透明度                     | sprite   |

> 其他标签文本属性为 [TextStyleOptions](https://pixijs.download/release/docs/text.TextStyleOptions.html) 中的属性，均支持函数动态生成。

## 6. 边状态配置项 (EdgeStateOptions) {#edgestateoptions}

边状态默认有 `active`、`selected`、`inactive` 三个配置项，key 的类型为 `string`。你可以自行添加更多的边状态配置项。

| 属性            | 类型                                              | 默认值 | 描述                             |
| :-------------- | :------------------------------------------------ | :----- | :------------------------------- |
| `[key: string]` | [`EdgeStateStyleOptions`](#edgestatestyleoptions) | -      | 一个状态对应一个边状态样式配置项 |

### 边状态样式配置项 (EdgeStateStyleOptions) {#edgestatestyleoptions}

`EdgeStateStyleOptions` 继承 [`EdgeStyleOptions`](#edgestyleoptions)，并扩展以下属性：

| 属性         | 类型                                              | 默认值 | 描述                       |
| :----------- | :------------------------------------------------ | :----- | :------------------------- |
| `labelStyle` | [`EdgeLabelStyleOptions`](#edgelabelstyleoptions) | -      | 该状态下边标签的样式配置项 |
| `arrowStyle` | [`EdgeArrowStyleOptions`](#edgearrowstyleoptions) | -      | 该状态下边箭头的样式配置项 |

## 7. 完整示例

以下示例展示了边动态样式、状态配置、箭头配置和标签配置：

```js
import { GraphVis } from "@zjfcool/graph-vis";

new GraphVis({
  // ... 其他配置
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

## 8. 注意事项

1. **函数动态生成**：`EdgeOptions` 中的大部分属性都支持传入函数，函数参数 `d` 为边的原始数据。这使得你可以根据数据动态决定边样式。
2. **drawBy 的影响**：`graphics` 和 `sprite` 两种绘制方式支持的样式属性不同，请参考表格中的 `drawBy` 列。
3. **边类型的选择**：`auto` 会根据连接关系自动选择，若需要精确控制曲线形状，建议显式指定 `line`、`quadratic` 或 `cubic`。
4. **状态优先级**：当边处于某个状态时，该状态下的样式会覆盖基础样式。如果状态中未定义的属性，会继续使用基础样式。
5. **箭头配置**：`arrowConfig.style.alongT` 控制箭头在边上的位置，`tailMidpointRatio` 影响箭头的形状。
6. **标签配置**：`labelConfig.labelText` 默认取 `d.label`，`alongT` 控制标签在边上的位置，`alongTPositionMode` 和 `offsetPositionMode` 控制坐标系。

通过以上配置，你可以灵活地控制边的外观、箭头、标签和交互状态。

# 连接配置 (LinkOptions)

`LinkOptions` 用于配置图在进行边的编辑操作时，那条跟随鼠标移动的动态连接边的样式。它通常作为 `GraphVisOptions` 的 `link` 属性传入。

`LinkOptions` 默认继承 [`EdgeOptions`](/guide/edge/) 中的 `type`、`style`、`state`、`arrowConfig`、`labelConfig` 属性的配置项，如果 `link` 另行配置将覆盖这些配置。

```ts
type LinkOptions<D = any> = Omit<EdgeOptions<D>, "source" | "target" | "drawBy" | "id">;
```

> 相比 [`EdgeOptions`](/guide/edge/)，`LinkOptions` 去掉了 `source`、`target`、`drawBy`、`id` 这四个属性。因为动态连接边在交互过程中由用户操作生成，其源节点与目标节点不固定，且绘制方式固定为 `graphics`。

## 1. 配置项速查表

| 属性          | 类型                                                            | 默认值 | 描述                                                   |
| :------------ | :-------------------------------------------------------------- | :----- | :----------------------------------------------------- |
| `type`        | [`AttrType`](/guide/types/#attrtype)&lt;string&gt;              | `auto` | 边类型，内置 `auto`、`line`、`quadratic`、`cubic` 四种 |
| `state`       | [`EdgeStateOptions`](/guide/edge/#edgestateoptions)             | -      | 边状态样式配置项                                       |
| `style`       | [`EdgeStyleOptions`](#linkstyleoptions)                         | -      | 边样式配置项                                           |
| `arrowConfig` | [`EdgeArrowConfigOptions`](/guide/edge/#edgearrowconfigoptions) | -      | 边箭头配置项                                           |
| `labelConfig` | [`EdgeLabelConfigOptions`](/guide/edge/#edgelabelconfigoptions) | -      | 边标签配置项                                           |

> 更多属性请参考 [`EdgeOptions`](/guide/edge/)。

## 2. 重点配置说明

### 2.1 边类型 (type)

`LinkOptions` 继承了 [`EdgeOptions`](/guide/edge/) 的 `type` 属性，用于指定动态连接边的类型。

内置边类型：

- `auto`：自适应，根据边的连接关系自动选择合适的类型
- `line`：直线
- `quadratic`：二次贝塞尔曲线
- `cubic`：三次贝塞尔曲线

```js
link: {
  type: 'line',
}
```

### 2.2 样式 (style)

控制动态连接边的描边、光晕、曲线形状等，详见下方 [`LinkStyleOptions`](#linkstyleoptions)。

```js
link: {
  style: {
    stroke: {
      width: 3,
      color: '#000',
    },
  },
}
```

### 2.3 箭头配置 (arrowConfig)

控制动态连接边箭头的显示、位置、尺寸和样式。

```js
link: {
  arrowConfig: {
    style: {
      visible: true,
      size: [8, 6],
    },
  },
}
```

### 2.4 标签配置 (labelConfig)

控制动态连接边标签的文本、位置、样式等。

```js
link: {
  labelConfig: {
    labelText: () => '新连接',
    style: {
      visible: true,
      fontSize: 12,
    },
  },
}
```

### 2.5 状态 (state)

可以为动态连接边定义不同的状态。默认继承 `EdgeOptions` 的 `state` 配置项。

```js
link: {
  state: {
    active: { halo: true, haloSpacing: 3 },
  },
}
```

## 3. 连接样式配置项 (LinkStyleOptions) {#linkstyleoptions}

`LinkStyleOptions` 与 [`EdgeStyleOptions`](/guide/edge/#edgestyleoptions) 完全一致。由于动态连接边的 `drawBy` 固定为 `graphics`，因此只有 `graphics` 相关的属性生效。

| 属性                | 类型                                                                   | 默认值  | 描述                                                               | drawBy   |
| :------------------ | :--------------------------------------------------------------------- | :------ | :----------------------------------------------------------------- | :------- |
| `visible`           | [`AttrType`](/guide/types/#attrtype)&lt;boolean&gt;                    | `false` | 边的显示与隐藏                                                     | -        |
| `smoothness`        | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                     | `0.75`  | 曲线边的柔和度，值越大越顺滑                                       | -        |
| `quadraticAlongT`   | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                     | `0.5`   | 二次贝塞尔曲线控制点在边上的位置，0 为起点，1 为终点，0.5 为中间   | -        |
| `quadraticRotation` | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                     | `0`     | 二次贝塞尔曲线控制点向量的方向，正值为顺时针旋转，负值为逆时针旋转 | -        |
| `quadraticSpacing`  | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                     | `40`    | 二次贝塞尔曲线控制点的间距                                         | -        |
| `cubicAlongT`       | [`AttrType`](/guide/types/#attrtype)&lt;number \| [number, number]&gt; | -       | 三次贝塞尔曲线两个控制点在边上的位置                               | -        |
| `cubicRotation`     | [`AttrType`](/guide/types/#attrtype)&lt;number \| [number, number]&gt; | -       | 三次贝塞尔曲线两个控制点向量的方向                                 | -        |
| `cubicSpacing`      | [`AttrType`](/guide/types/#attrtype)&lt;number \| [number, number]&gt; | -       | 三次贝塞尔曲线两个控制点之间的间距                                 | -        |
| `stroke`            | [`GStrokeStyle`](/guide/types/#gstrokestyle)                           | -       | 边的描边样式                                                       | graphics |
| `halo`              | [`AttrType`](/guide/types/#attrtype)&lt;boolean&gt;                    | `false` | 边背景的显示与隐藏                                                 | -        |
| `haloStroke`        | [`GStrokeStyle`](/guide/types/#gstrokestyle)                           | -       | 边背景描边样式                                                     | graphics |
| `haloSpacing`       | [`AttrType`](/guide/types/#attrtype)&lt;number&gt;                     | `3`     | 边背景与边的间距                                                   | -        |

## 4. 完整示例

以下示例展示了如何配置动态连接边的样式：

```js
import { GraphVis } from "@zjfcool/graph-vis";

new GraphVis({
  // ... 其他配置
  link: {
    type: "line",
    style: {
      stroke: {
        width: 3,
        color: "#000",
      },
    },
    arrowConfig: {
      style: {
        visible: true,
        size: [8, 6],
      },
    },
    labelConfig: {
      labelText: () => "新连接",
      style: {
        visible: true,
        fontSize: 12,
      },
    },
  },
});
```

## 5. 注意事项

1. **继承关系**：`LinkOptions` 继承自 [`EdgeOptions`](/guide/edge/)，如果 `link` 未配置某属性，则会使用 `edge` 中对应的配置。
2. **不可配置的属性**：`source`、`target`、`drawBy`、`id` 这四个属性在 `LinkOptions` 中不可配置。
3. **绘制方式固定**：动态连接边的绘制方式固定为 `graphics`，因此仅 `graphics` 相关的属性生效。
4. **交互触发**：动态连接边在调用 `startLinkNode` 方法后开始显示，在调用 `endLinkNode` 方法后消失。
5. **函数动态生成**：与 `EdgeOptions` 一致，`LinkOptions` 中的大部分属性都支持传入函数，函数参数 `d` 为边的原始数据。

通过以上配置，你可以灵活地控制动态连接边的外观、箭头、标签和交互状态。

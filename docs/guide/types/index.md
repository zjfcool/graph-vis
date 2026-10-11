# 类型声明

本页收录 GraphVis 中所有内置类型声明。为便于查阅，类型按「基础 → 组合 → 应用」的顺序排列：

1. **图与数据**：`GraphologyType`、`GraphAttributes`、`NodeAttributes`、`EdgeAttributes`
2. **几何基础**：`Point`
3. **通用工具**：`AttrType`、`DataDriven`、`GFillStyle`、`GStrokeStyle`
4. **渲染与节点**：`NodeType`、`DrawBy`、`TextType`
5. **标签相关**：`LabelType`、`Placement`、`EdgeLabelPositionMode`
6. **动画**：`EasingType`

## 图与数据

### GraphologyType

```ts
type GraphologyType = "mixed" | "undirected" | "directed";
```

图类型，用于标识当前图是有向图、无向图还是混合图。各取值的含义如下：

| 取值           | 含义                                                 |
| :------------- | :--------------------------------------------------- |
| `'directed'`   | 有向图。图中的边具有方向，从源节点指向目标节点。     |
| `'undirected'` | 无向图。图中的边没有方向，连接的两个节点是对等关系。 |
| `'mixed'`      | 混合图。图中同时包含有向边和无向边。                 |

### GraphAttributes

```ts
type GraphAttributes = {
  nodes: NodeAttributes[];
  edges: EdgeAttributes[];
};
```

`GraphAttributes` 表示图的原始数据，包含节点数据数组与边数据数组。

| 属性    | 类型                                  | 描述           |
| :------ | :------------------------------------ | :------------- |
| `nodes` | [`NodeAttributes[]`](#nodeattributes) | 节点数据数组。 |
| `edges` | [`EdgeAttributes[]`](#edgeattributes) | 边数据数组。   |

### NodeAttributes

```ts
type NodeAttributes = { [key: string]: any };
```

`NodeAttributes` 表示节点的原始数据，以键值对形式存储任意属性。键为属性名，值为任意类型。

### EdgeAttributes

```ts
type EdgeAttributes = { [key: string]: any };
```

`EdgeAttributes` 表示边的原始数据，以键值对形式存储任意属性。键为属性名，值为任意类型。

## 几何基础

### Point

```ts
type Point = { x: number; y: number };
```

`Point` 表示二维坐标系中的一个点，包含 `x` 与 `y` 两个数值坐标。

| 属性 | 类型     | 描述     |
| :--- | :------- | :------- |
| `x`  | `number` | 横坐标。 |
| `y`  | `number` | 纵坐标。 |

> 该类型为对象字面量类型，使用时需传入同时包含 `x` 与 `y` 的对象。

## 通用工具

### AttrType

```ts
type AttrFunc<T = any, D = any> = (d?: D) => T;
type AttrType<T = any, D = any> = T | AttrFunc<T, D>;
```

`AttrType` 表示一个属性既可以是类型 `T` 的静态值，也可以是一个函数。该函数接收数据 `D`，并返回类型 `T` 的值。函数参数 `d` 通常为节点或边的原始数据，你可以根据数据动态计算属性值。

#### 泛型参数

| 参数 | 默认值 | 描述                                           |
| :--- | :----- | :--------------------------------------------- |
| `T`  | `any`  | 属性的目标类型。                               |
| `D`  | `any`  | 函数接收的数据类型，通常为节点或边的原始数据。 |

#### 示例

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

> `d` 为原始节点数据。`d.category` 并非节点内置属性，需要你的数据中确实存在 `category` 字段才能这样使用。

### DataDriven

```ts
import { FillGradient, FillPattern, Matrix } from "pixi.js";

type NonRecursiveTypes = FillGradient | FillPattern | Matrix;

type DataDriven<T, D = any> = T extends undefined
  ? undefined
  : T extends (...args: any[]) => any
    ? AttrType<T, D>
    : T extends any[]
      ? AttrType<T, D>
      : T extends NonRecursiveTypes
        ? AttrType<T, D>
        : T extends object
          ? { [K in keyof T]: DataDriven<T[K], D> }
          : AttrType<T, D>;
```

`DataDriven` 是一个递归工具类型，用于将对象中的每个属性转换为 [`AttrType`](#attrtype)。它使得配置对象中的任意层级的属性都既可以传入静态值，也可以传入函数动态生成。

#### 泛型参数

| 参数 | 默认值 | 描述                                           |
| :--- | :----- | :--------------------------------------------- |
| `T`  | -      | 需要被转换的目标类型。                         |
| `D`  | `any`  | 函数接收的数据类型，通常为节点或边的原始数据。 |

#### 非递归类型

`NonRecursiveTypes` 是内部定义的非递归类型集合，由 PixiJS 的以下类型组成：

| 类型           | 来源      | 描述           |
| :------------- | :-------- | :------------- |
| `FillGradient` | `pixi.js` | 填充渐变对象。 |
| `FillPattern`  | `pixi.js` | 填充图案对象。 |
| `Matrix`       | `pixi.js` | 变换矩阵对象。 |

这些类型本身是对象，但它们的内部属性不需要递归转换为 `AttrType`，而是整体作为 `AttrType` 处理，即可以静态传入，也可以通过函数返回。

#### 转换规则

`DataDriven` 会根据 `T` 的不同类型进行不同的处理：

| 条件                                | 转换结果                                  | 说明                                                                                            |
| :---------------------------------- | :---------------------------------------- | :---------------------------------------------------------------------------------------------- |
| `T extends undefined`               | `undefined`                               | 如果属性类型为 `undefined`，则保持 `undefined`。                                                |
| `T extends (...args: any[]) => any` | [`AttrType<T, D>`](#attrtype)             | 如果属性本身是函数，则将其视为 `AttrType` 中的函数形式。                                        |
| `T extends any[]`                   | [`AttrType<T, D>`](#attrtype)             | 如果属性是数组，则整个数组既可以静态传入，也可以通过函数返回。                                  |
| `T extends NonRecursiveTypes`       | [`AttrType<T, D>`](#attrtype)             | 如果属性是 `FillGradient`、`FillPattern` 或 `Matrix`，则视为非递归类型，整体转换为 `AttrType`。 |
| `T extends object`                  | `{ [K in keyof T]: DataDriven<T[K], D> }` | 如果属性是普通对象，则递归地对每个属性应用 `DataDriven`。                                       |
| 其他情况                            | [`AttrType<T, D>`](#attrtype)             | 兜底处理，转换为 `AttrType`。                                                                   |

#### 作用与示例

`DataDriven` 的主要作用是简化配置，让开发者无需手动为每个属性编写 `AttrType`，就能获得完整的动态生成能力。

假设有如下样式类型：

```ts
type A = {
  color: string;
  background: string;
  stroke: {
    width: number;
  };
};
```

经过 `DataDriven<A>` 转换后，类型变为：

```ts
type A = {
  color: AttrType<string>;
  background: AttrType<string>;
  stroke: {
    width: AttrType<number>;
  };
};
```

这意味着 `color`、`background` 以及 `stroke.width` 都可以是静态值或函数。例如：

```js
new GraphVis({
  node: {
    style: {
      color: (d) => (d.category === "important" ? "#ff4d4f" : "#409eff"),
      background: "#ffffff",
      stroke: {
        width: (d) => (d.weight > 5 ? 3 : 1),
      },
    },
  },
});
```

### GFillStyle

```ts
type GFillStyle<D = any> = DataDriven<FillStyle, D> | AttrType<FillInput, D>;
```

`GFillStyle` 表示节点或边的填充样式。它可以是 `FillStyle` 对象（其内部属性支持动态生成），也可以是 `FillInput` 的静态值或函数。

#### 泛型参数

| 参数 | 默认值 | 描述                                           |
| :--- | :----- | :--------------------------------------------- |
| `D`  | `any`  | 函数接收的数据类型，通常为节点或边的原始数据。 |

#### 说明

- `FillStyle`：PixiJS 的填充样式对象，包含 `color`、`alpha` 等属性。详情请参考 [PixiJS FillStyle](https://pixijs.download/release/docs/scene.FillStyle.html)。
- `FillInput`：PixiJS 的填充输入类型，可以是颜色值、纹理等。详情请参考 [PixiJS FillInput](https://pixijs.download/release/docs/scene.FillInput.html)。
- `DataDriven`：递归地将对象属性转换为 `AttrType`，使得对象内每个属性都可以是静态值或函数。详情请参考 [`DataDriven`](#datadriven)。

#### 示例

**静态对象：**

```js
new GraphVis({
  node: {
    style: {
      fill: {
        color: "#ff4d4f",
        alpha: 0.8,
      },
    },
  },
});
```

**动态对象：**

```js
new GraphVis({
  node: {
    style: {
      fill: {
        color: (d) => (d.category === "important" ? "#ff4d4f" : "#409eff"),
        alpha: (d) => (d.weight > 5 ? 1 : 0.6),
      },
    },
  },
});
```

**直接使用颜色值：**

```js
new GraphVis({
  node: {
    style: {
      fill: "#ff4d4f",
    },
  },
});
```

### GStrokeStyle

```ts
type GStrokeStyle<D = any> = DataDriven<StrokeStyle, D> | AttrType<StrokeInput, D>;
```

`GStrokeStyle` 表示节点或边的描边样式。它可以是 `StrokeStyle` 对象（其内部属性支持动态生成），也可以是 `StrokeInput` 的静态值或函数。

#### 泛型参数

| 参数 | 默认值 | 描述                                           |
| :--- | :----- | :--------------------------------------------- |
| `D`  | `any`  | 函数接收的数据类型，通常为节点或边的原始数据。 |

#### 说明

- `StrokeStyle`：PixiJS 的描边样式对象，包含 `color`、`width`、`alpha` 等属性。详情请参考 [PixiJS StrokeStyle](https://pixijs.download/release/docs/scene.StrokeStyle.html)。
- `StrokeInput`：PixiJS 的描边输入类型，可以是颜色值、纹理等。详情请参考 [PixiJS StrokeInput](https://pixijs.download/release/docs/scene.StrokeInput.html)。
- `DataDriven`：递归地将对象属性转换为 `AttrType`，使得对象内每个属性都可以是静态值或函数。详情请参考 [`DataDriven`](#datadriven)。

#### 示例

**静态对象：**

```js
new GraphVis({
  node: {
    style: {
      stroke: {
        color: "#ffffff",
        width: 2,
      },
    },
  },
});
```

**动态对象：**

```js
new GraphVis({
  node: {
    style: {
      stroke: {
        color: (d) => (d.category === "important" ? "#ff4d4f" : "#409eff"),
        width: (d) => (d.weight > 5 ? 3 : 1),
      },
    },
  },
});
```

**直接使用颜色值：**

```js
new GraphVis({
  node: {
    style: {
      stroke: "#ffffff",
    },
  },
});
```

## 渲染与节点

### NodeType

```ts
type NodeType =
  | "circle"
  | "ellipse"
  | "image"
  | "polygon"
  | "rect"
  | "text"
  | "bitmap-text"
  | "star"
  | (string & {});
```

`NodeType` 表示节点类型，为以下内置形状名称之一，同时允许传入任意自定义字符串。

| 取值            | 含义       |
| :-------------- | :--------- |
| `'circle'`      | 圆形。     |
| `'ellipse'`     | 椭圆。     |
| `'image'`       | 图片。     |
| `'polygon'`     | 多边形。   |
| `'rect'`        | 矩形。     |
| `'text'`        | 文本。     |
| `'bitmap-text'` | 位图文本。 |
| `'star'`        | 星形。     |

> 类型末尾的 `(string & {})` 用于在保留字面量自动补全的同时，允许传入任意自定义字符串，因此实际取值不限于上表。

### DrawBy

```ts
type DrawBy = "sprite" | "graphics";
```

`DrawBy` 表示绘制方式，用于指定节点或边使用 PixiJS 的 `Sprite` 还是 `Graphics` 进行绘制。

| 取值         | 含义                                                                               |
| :----------- | :--------------------------------------------------------------------------------- |
| `'graphics'` | 使用 PixiJS 的 `Graphics` 对象绘制。适用于大多数矢量图形，如圆形、矩形、多边形等。 |
| `'sprite'`   | 使用 PixiJS 的 `Sprite` 对象绘制。适用于需要纹理、图片或高性能批量渲染的场景。     |

> 在节点和边的配置中，`drawBy` 属性类型为 [`AttrType`](#attrtype)&lt;`DrawBy`&gt;，因此既可以直接指定，也可以通过函数动态返回。

#### 示例

```js
new GraphVis({
  node: {
    drawBy: "sprite", // 使用 Sprite 绘制节点
  },
  edge: {
    drawBy: (d) => (d.weight > 5 ? "graphics" : "sprite"), // 根据权重动态选择
  },
});
```

### TextType

```ts
type TextType = string | number | { toString: () => string };
```

`TextType` 表示可用于文本渲染的内容类型，它可以是字符串、数字，或者任何实现了 `toString` 方法的对象。

| 类型                         | 描述                                                           |
| :--------------------------- | :------------------------------------------------------------- |
| `string`                     | 直接作为文本内容。                                             |
| `number`                     | 数字会被转换为字符串后作为文本内容。                           |
| `{ toString: () => string }` | 任何具有 `toString` 方法的对象，渲染时会调用该方法获取字符串。 |

> 在节点或边的标签配置中，`labelText` 等属性的类型为 [`AttrType`](#attrtype)&lt;`TextType`&gt;，因此既可以直接传入上述类型的值，也可以通过函数动态返回。

#### 示例

```js
new GraphVis({
  node: {
    labelConfig: {
      labelText: "节点 A", // 字符串
    },
  },
});

new GraphVis({
  node: {
    labelConfig: {
      labelText: (d) => d.weight, // 数字
    },
  },
});

new GraphVis({
  node: {
    labelConfig: {
      labelText: (d) => ({ toString: () => `节点 ${d.id}` }), // 自定义对象
    },
  },
});
```

## 标签相关

### LabelType

```ts
type LabelType = "text" | "bitmap-text";
```

`LabelType` 表示标签的渲染类型，用于指定节点或边的标签使用普通文本还是位图文本进行渲染。

| 取值            | 含义                                                               |
| :-------------- | :----------------------------------------------------------------- |
| `'text'`        | 使用 PixiJS 的 `Text` 对象渲染标签，支持丰富的文本样式。           |
| `'bitmap-text'` | 使用 PixiJS 的 `BitmapText` 对象渲染标签，性能更好，适合大量文本。 |

#### 示例

```js
new GraphVis({
  node: {
    labelConfig: {
      type: "bitmap-text", // 使用位图文本渲染节点标签
    },
  },
});
```

也可以使用函数动态设置：

```js
new GraphVis({
  node: {
    labelConfig: {
      type: (d) => (d.weight > 5 ? "bitmap-text" : "text"),
    },
  },
});
```

### Placement

```ts
type Placement = "center" | "left" | "right" | "top" | "bottom";
```

`Placement` 表示标签相对于节点或边的位置。它通常用于节点标签的 `placement` 属性。

| 取值       | 含义                               |
| :--------- | :--------------------------------- |
| `'center'` | 居中，标签位于节点或边的中心位置。 |
| `'left'`   | 左侧，标签位于节点或边的左侧。     |
| `'right'`  | 右侧，标签位于节点或边的右侧。     |
| `'top'`    | 上方，标签位于节点或边的上方。     |
| `'bottom'` | 下方，标签位于节点或边的下方。     |

#### 示例

```js
new GraphVis({
  node: {
    labelConfig: {
      style: {
        placement: "right", // 标签显示在节点右侧
      },
    },
  },
});
```

也可以使用函数动态设置：

```js
new GraphVis({
  node: {
    labelConfig: {
      style: {
        placement: (d) => (d.id % 2 === 0 ? "right" : "left"),
      },
    },
  },
});
```

### EdgeLabelPositionMode

```ts
type EdgeLabelPositionMode = "local" | "global";
```

`EdgeLabelPositionMode` 表示边标签位置的计算模式，用于确定边标签的 `alongT`、`offsetX`、`offsetY` 等属性所对应的坐标系。

| 取值       | 含义                                                                                                                     |
| :--------- | :----------------------------------------------------------------------------------------------------------------------- |
| `'local'`  | 局部坐标系，相对于当前边的坐标系。例如 `alongT` 表示在边上的相对位置，`offsetX`/`offsetY` 表示沿边方向或垂直方向的偏移。 |
| `'global'` | 全局坐标系，相对于整个图的坐标系。例如 `alongT` 对应的点直接使用全局坐标，`offsetX`/`offsetY` 表示全局 X/Y 方向的偏移。  |

#### 示例

```js
new GraphVis({
  edge: {
    labelConfig: {
      style: {
        alongT: 0.5,
        alongTPositionMode: "local", // alongT 使用局部坐标系
        offsetX: 10,
        offsetY: 10,
        offsetPositionMode: "global", // offsetX/offsetY 使用全局坐标系
      },
    },
  },
});
```

## 动画

### EasingType

```ts
type EasingType =
  | "linear"
  | "back-in"
  | "back-out"
  | "back-in-out"
  | "bounce-in"
  | "bounce-out"
  | "bounce-in-out"
  | "circular-in"
  | "circular-out"
  | "circular-in-out"
  | "cubic-in"
  | "cubic-out"
  | "cubic-in-out"
  | "elastic-in"
  | "elastic-out"
  | "elastic-in-out"
  | "exponential-in"
  | "exponential-out"
  | "exponential-in-out"
  | "linear-in"
  | "linear-out"
  | "linear-in-out"
  | "quadratic-in"
  | "quadratic-out"
  | "quadratic-in-out"
  | "quartic-in"
  | "quartic-out"
  | "quartic-in-out"
  | "quintic-in"
  | "quintic-out"
  | "quintic-in-out"
  | "sinusoidal-in"
  | "sinusoidal-out"
  | "sinusoidal-in-out";
```

`EasingType` 表示动画的缓动类型，为以下字符串字面量之一。命名规律为 `{曲线}[-{方向}]`：不带方向后缀时表示对称缓动，带 `-in`、`-out`、`-in-out` 时分别表示加速、减速、先加速后减速。

| 取值                   | 含义                               |
| :--------------------- | :--------------------------------- |
| `'linear'`             | 匀速动画，无缓动效果。             |
| `'back-in'`            | 起始阶段回退再加速进入。           |
| `'back-out'`           | 结束阶段超出目标再回落。           |
| `'back-in-out'`        | 起始回退、结束超出，两端均有回弹。 |
| `'bounce-in'`          | 起始阶段带弹跳效果进入。           |
| `'bounce-out'`         | 结束阶段带弹跳效果停止。           |
| `'bounce-in-out'`      | 起始与结束均带弹跳效果。           |
| `'circular-in'`        | 圆形曲线加速进入。                 |
| `'circular-out'`       | 圆形曲线减速停止。                 |
| `'circular-in-out'`    | 圆形曲线先加速后减速。             |
| `'cubic-in'`           | 三次方曲线加速进入。               |
| `'cubic-out'`          | 三次方曲线减速停止。               |
| `'cubic-in-out'`       | 三次方曲线先加速后减速。           |
| `'elastic-in'`         | 弹性曲线加速进入，起始有明显回弹。 |
| `'elastic-out'`        | 弹性曲线减速停止，结束有明显回弹。 |
| `'elastic-in-out'`     | 弹性曲线两端均有回弹。             |
| `'exponential-in'`     | 指数曲线加速进入。                 |
| `'exponential-out'`    | 指数曲线减速停止。                 |
| `'exponential-in-out'` | 指数曲线先加速后减速。             |
| `'linear-in'`          | 线性加速进入。                     |
| `'linear-out'`         | 线性减速停止。                     |
| `'linear-in-out'`      | 线性先加速后减速。                 |
| `'quadratic-in'`       | 二次方曲线加速进入。               |
| `'quadratic-out'`      | 二次方曲线减速停止。               |
| `'quadratic-in-out'`   | 二次方曲线先加速后减速。           |
| `'quartic-in'`         | 四次方曲线加速进入。               |
| `'quartic-out'`        | 四次方曲线减速停止。               |
| `'quartic-in-out'`     | 四次方曲线先加速后减速。           |
| `'quintic-in'`         | 五次方曲线加速进入。               |
| `'quintic-out'`        | 五次方曲线减速停止。               |
| `'quintic-in-out'`     | 五次方曲线先加速后减速。           |
| `'sinusoidal-in'`      | 正弦曲线加速进入。                 |
| `'sinusoidal-out'`     | 正弦曲线减速停止。                 |
| `'sinusoidal-in-out'`  | 正弦曲线先加速后减速。             |

---
outline: deep
---

# 边实例

边实例继承自 PixiJS 的 `Container` 类，以下仅列出边扩展的属性与方法。完整能力参见 [Container 相关属性与方法](https://pixijs.download/release/docs/scene.Container.html)。

## 属性

### id

- **类型**：`string`
- **描述**：边 ID。

### type

- **类型**：`string`
- **描述**：边的类型。

### data

- **类型**：[`EdgeAttributes`](/guide/types/#edgeattributes)
- **描述**：边的原始数据。

### options

- **类型**：`EdgeOptions`
- **描述**：边的配置项。

### state

- **类型**：`string`
- **描述**：当前边的状态。设置 `state` 时会根据情况重新绘制边。

### source

- **类型**：`BaseNode`
- **描述**：边的源头节点。

### target

- **类型**：`BaseNode`
- **描述**：边的目标节点。

### isSelfLoop

- **类型**：`boolean`
- **描述**：是否为自循环边。

### isDirected

- **类型**：`boolean`
- **描述**：是否为有向边。

### direction

- **类型**：`number`
- **描述**：方向标识。`source → target` 为 `1`，`target → source` 为 `-1`。

### edgeCount

- **类型**：`number`
- **描述**：`source` 与 `target` 两节点之间相连边的总数量。

### edgeIndex

- **类型**：`number`
- **描述**：`source` 与 `target` 之间边的索引，代表第几条边。

### sepCount

- **类型**：`number`
- **描述**：以 `source → target` 连线对称的索引。

### dx

- **类型**：`number`
- **描述**：`target.x - source.x`。

### dy

- **类型**：`number`
- **描述**：`target.y - source.y`。

### angle

- **类型**：`number`
- **描述**：边的角度。自循环边返回 `0`，其他边类型为 `Math.atan2(dy, dx)`。

### isAuto

- **类型**：`boolean`
- **描述**：边类型是否为 `auto`。

### isQuadratic

- **类型**：`boolean`
- **描述**：边类型是否为 `quadratic`。

### isCubic

- **类型**：`boolean`
- **描述**：边类型是否为 `cubic`。

### edge

- **类型**：`Container`
- **描述**：边元素。

### edgeArrow

- **类型**：`Container`
- **描述**：边箭头元素。

### edgeLabel

- **类型**：`Container`
- **描述**：边标签元素。

### edgePoints

- **类型**：[`Point[]`](/guide/types/#point)
- **描述**：边上的点，边由这些点连接而成。

### edgeArrowPoints

- **类型**：[`EdgeArrowPoints`](#type-edgearrowpoints)
- **描述**：边箭头的头部与尾部位置信息。

### edgeLabelPointAttr

- **类型**：[`EdgeLabelPointAttr`](#type-edgelabelpointattr)
- **描述**：边标签的坐标信息及旋转角度。

## 方法

### 配置获取

#### getEdgeConfig

- **参数**：无
- **返回值**：`object`
- **描述**：获取边的配置项。

#### getBezierConfig

- **参数**：无
- **返回值**：`object`
- **描述**：获取 Bezier 配置项。

#### getEdgeLabelConfig

- **参数**：无
- **返回值**：`object`
- **描述**：获取边标签的配置项。

#### getEdgeArrowConfig

- **参数**：无
- **返回值**：`object`
- **描述**：获取边箭头的配置项。

### 绘制

#### drawEdge

- **参数**：无
- **返回值**：无
- **描述**：绘制边。

#### drawEdgeArrow

- **参数**：无
- **返回值**：无
- **描述**：绘制边箭头。

#### drawEdgeLabel

- **参数**：无
- **返回值**：无
- **描述**：绘制边标签。

### 更新

#### update

- **参数**：无
- **返回值**：无
- **描述**：更新边。

### 设置

#### setEdgePoints

- **参数**：`...args: any[]`
- **返回值**：无
- **描述**：设置属性 [`edgePoints`](#edgepoints) 的值。

#### setEdgeArrowPoints

- **参数**：`...args: any[]`
- **返回值**：无
- **描述**：设置属性 [`edgeArrowPoints`](#type-edgearrowpoints) 的值。

#### setEdgeLabelPointAttr

- **参数**：`...args: any[]`
- **返回值**：无
- **描述**：设置属性 [`edgeLabelPointAttr`](#type-edgelabelpointattr) 的值。

## 类型

### EdgeArrowPoints {#type-edgearrowpoints}

```ts
type EdgeArrowPoints = { head: Point; tail: Point };
```

`EdgeArrowPoints` 表示边箭头的头部与尾部位置信息。

| 属性   | 类型                           | 描述             |
| :----- | :----------------------------- | :--------------- |
| `head` | [`Point`](/guide/types/#point) | 箭头的头部位置。 |
| `tail` | [`Point`](/guide/types/#point) | 箭头的尾部位置。 |

### EdgeLabelPointAttr {#type-edgelabelpointattr}

```ts
type EdgeLabelPointAttr = { x: number; y: number; rotation: number };
```

`EdgeLabelPointAttr` 表示边标签的坐标与旋转角度。

| 属性       | 类型     | 描述             |
| :--------- | :------- | :--------------- |
| `x`        | `number` | 标签的 x 坐标。  |
| `y`        | `number` | 标签的 y 坐标。  |
| `rotation` | `number` | 标签的旋转角度。 |

---
outline: deep
---

# 节点实例

节点实例继承自 PixiJS 的 `Container` 类，以下仅列出节点扩展的属性与方法。完整能力参见 [Container 相关属性与方法](https://pixijs.download/release/docs/scene.Container.html)。

## 属性

### id

- **类型**：`string`
- **描述**：节点 ID。

### type

- **类型**：[`NodeType`](/guide/types/#nodetype)
- **描述**：节点类型。

### data

- **类型**：[`NodeAttributes`](/guide/types/#nodeattributes)
- **描述**：节点的原始数据。

### options

- **类型**：`NodeOptions`
- **描述**：节点的配置项。

### state

- **类型**：`string`
- **描述**：节点状态。读取时返回当前状态，也可直接赋值以更改节点状态。

### locked

- **类型**：`boolean`
- **描述**：是否锁定节点位置。为 `true` 时，拖拽节点将锁定位置，不再参与动态迭代布局（仅当 `layout` 为 `d3-force` 时生效）。

### node

- **类型**：[`Container`](https://pixijs.download/release/docs/scene.Container.html)
- **描述**：节点元素。

### nodeLabel

- **类型**：[`Container`](https://pixijs.download/release/docs/scene.Container.html)
- **描述**：节点标签元素。

### bounds

- **类型**：`[number, number]`
- **描述**：节点边界的宽高尺寸。

### segments

- **类型**：[`Segment[]`](#segment)
- **描述**：节点的轮廓线段，由多个 [`Segment`](#segment) 组成。

## 方法

### 配置获取

#### getNodeConfig

- **参数**：无
- **返回值**：`object`
- **描述**：获取节点的配置。

#### getNodeLabelConfig

- **参数**：无
- **返回值**：`object`
- **描述**：获取节点标签的配置。

### 绘制

#### draw

- **参数**：无
- **返回值**：无
- **描述**：执行 [`drawNode`](#drawnode) 与 [`drawLabel`](#drawlabel)，绘制节点与节点标签。

#### beforeDraw

- **参数**：无
- **返回值**：无
- **描述**：钩子函数，在绘制节点与节点标签之前执行，用于扩展节点。

#### beforeDrawNode

- **参数**：无
- **返回值**：无
- **描述**：钩子函数，在 [`drawNode`](#drawnode) 之前执行，用于扩展节点。

#### drawNode

- **参数**：无
- **返回值**：无
- **描述**：重新绘制节点。

#### afterDrawNode

- **参数**：无
- **返回值**：无
- **描述**：钩子函数，在节点绘制之后执行，用于扩展节点。

#### beforeDrawLabel

- **参数**：无
- **返回值**：无
- **描述**：钩子函数，在节点标签绘制之前执行，用于扩展节点标签。

#### drawLabel

- **参数**：无
- **返回值**：无
- **描述**：绘制节点标签。

#### afterDrawLabel

- **参数**：无
- **返回值**：无
- **描述**：钩子函数，在节点标签绘制之后执行，用于扩展节点标签。

#### afterDraw

- **参数**：无
- **返回值**：无
- **描述**：钩子函数，在绘制完节点与节点标签之后执行，用于扩展节点。

### 更新

#### beforeUpdate

- **参数**：无
- **返回值**：无
- **描述**：钩子函数，在执行更新之前执行，用于扩展节点。

#### update

- **参数**：无
- **返回值**：无
- **描述**：更新节点。布局之后会执行此函数，更新节点的轮廓（[`segments`](#segments) 属性）以及位置信息。

#### afterUpdate

- **参数**：无
- **返回值**：无
- **描述**：钩子函数，在节点更新之后执行，用于扩展节点。

## 钩子执行顺序

扩展节点时，了解钩子的执行顺序很重要：

**绘制流程**

1. `beforeDraw`
2. `beforeDrawNode`
3. `drawNode`
4. `afterDrawNode`
5. `beforeDrawLabel`
6. `drawLabel`
7. `afterDrawLabel`
8. `afterDraw`

**更新流程**

1. `beforeUpdate`
2. `update`
3. `afterUpdate`

## 类型

### Segment

```ts
type Segment = { p1: Point; p2: Point };
```

`Segment` 表示一条由两个端点构成的线段，两个端点类型均为 [`Point`](/guide/types/#point)。

| 属性 | 类型                           | 描述       |
| :--- | :----------------------------- | :--------- |
| `p1` | [`Point`](/guide/types/#point) | 线段起点。 |
| `p2` | [`Point`](/guide/types/#point) | 线段终点。 |

---
outline: deep
---

# 全局 API

全局导出包括图、节点、边、布局相关的类，以及扩展注册与主题生成相关的方法，可直接从包中导入使用。

```ts
import { GraphVis, BaseNode, register } from "@zjfcool/graph-vis";
```

- **类**：图（`GraphVis`）、节点（`BaseNode` 及各形状子类）、边（`BaseEdge` 及各类型子类）、布局（`BaseLayout` 及各布局子类）。
- **方法**：扩展注册（`register`、`getExtension` 等）与主题生成（`generatePigment`、`generateThemeByPigment` 等）。

## 类

### 图

#### GraphVis

- **参数**：`options: GraphVisOptions`
- **返回值**：`GraphVis` 实例
- **描述**：图的类。

### 节点

#### BaseNode

- **参数**：`id: string, options: NodeOptions, data: NodeAttributes`
- **返回值**：无
- **描述**：节点抽象基类，其他类型的节点均继承自 `BaseNode`。

#### CircleNode

- **参数**：`id: string, options: NodeOptions, data: NodeAttributes`
- **返回值**：`CircleNode` 实例
- **描述**：`type` 为 `circle` 的节点类。

#### EllipseNode

- **参数**：`id: string, options: NodeOptions, data: NodeAttributes`
- **返回值**：`EllipseNode` 实例
- **描述**：`type` 为 `ellipse` 的节点类。

#### BitmapTextNode

- **参数**：`id: string, options: NodeOptions, data: NodeAttributes`
- **返回值**：`BitmapTextNode` 实例
- **描述**：`type` 为 `bitmap-text` 的节点类。

#### ImageNode

- **参数**：`id: string, options: NodeOptions, data: NodeAttributes`
- **返回值**：`ImageNode` 实例
- **描述**：`type` 为 `image` 的节点类。

#### PolygonNode

- **参数**：`id: string, options: NodeOptions, data: NodeAttributes`
- **返回值**：`PolygonNode` 实例
- **描述**：`type` 为 `polygon` 的节点类。

#### RectNode

- **参数**：`id: string, options: NodeOptions, data: NodeAttributes`
- **返回值**：`RectNode` 实例
- **描述**：`type` 为 `rect` 的节点类。

#### StarNode

- **参数**：`id: string, options: NodeOptions, data: NodeAttributes`
- **返回值**：`StarNode` 实例
- **描述**：`type` 为 `star` 的节点类。

#### TextNode

- **参数**：`id: string, options: NodeOptions, data: NodeAttributes`
- **返回值**：`TextNode` 实例
- **描述**：`type` 为 `text` 的节点类。

### 边

#### BaseEdge

- **参数**：`id: string, options: EdgeOptions, data: EdgeAttributes`
- **返回值**：无
- **描述**：边的抽象基类，其他边均继承该基类。

#### AutoEdge

- **参数**：`id: string, options: EdgeOptions, data: EdgeAttributes`
- **返回值**：`AutoEdge` 实例
- **描述**：`type` 为 `auto` 的边类。

#### CubicEdge

- **参数**：`id: string, options: EdgeOptions, data: EdgeAttributes`
- **返回值**：`CubicEdge` 实例
- **描述**：`type` 为 `cubic` 的边类。

#### LineEdge

- **参数**：`id: string, options: EdgeOptions, data: EdgeAttributes`
- **返回值**：`LineEdge` 实例
- **描述**：`type` 为 `line` 的边类。

#### QuadraticEdge

- **参数**：`id: string, options: EdgeOptions, data: EdgeAttributes`
- **返回值**：`QuadraticEdge` 实例
- **描述**：`type` 为 `quadratic` 的边类。

#### Link

- **参数**：`options: EdgeOptions`
- **返回值**：`Link` 实例
- **描述**：交互操作时用到的动态边类。

### 布局

#### BaseLayout

- **参数**：`graphology: Graph, options: T`
- **返回值**：无
- **描述**：不可迭代布局的抽象基类。`Graph` 类型为 graphology 库提供的类型，`T` 为泛型，不同布局有不同的 `Options`。`random` 布局继承该类。

#### BaseLayoutWithInterations

- **参数**：`graphology: Graph, options: T`
- **返回值**：无
- **描述**：可迭代布局的抽象类，`d3-force` 布局继承该类。

#### D3ForceLayout

- **参数**：`graphology: Graph, options: D3ForceLayoutOptions`
- **返回值**：`D3ForceLayout` 实例
- **描述**：`type` 为 `d3-force` 的布局类。

#### RandomLayout

- **参数**：`graphology: Graph, options: RandomLayoutOptions`
- **返回值**：`RandomLayout` 实例
- **描述**：`type` 为 `random` 的布局类。

## 方法

### 扩展注册

#### register

- **参数**：`category: string, type: string, obj: any`
- **返回值**：无
- **描述**：注册对应类型的扩展到全局。`category` 为 `theme | layout | node | edge`，`type` 为对应 `category` 的名称，`obj` 为具体的扩展类等。

#### getExtension

- **参数**：`category: string, type: string`
- **返回值**：`any`
- **描述**：获取全局注册的 `category` 下指定 `type` 的值。

#### getExtensions

- **参数**：`category: string`
- **返回值**：`object`
- **描述**：获取全局注册的 `category` 下所有值。

#### getExtensionsKeys

- **参数**：`category: string`
- **返回值**：`string[]`
- **描述**：获取全局注册的 `category` 下所有值的 keys。

### 主题生成

#### generatePigment

- **参数**：`primary: string, mode: 'light' | 'dark'`
- **返回值**：`{ nodeColor: string; edgeColor: string; backgroundColor: string }`
- **描述**：根据提供的主题色与模式，生成包含节点颜色、边颜色、背景色的对象。

#### generateThemeByPigment

- **参数**：`pigment: { nodeColor: string; edgeColor: string; backgroundColor: string }`
- **返回值**：`Theme`
- **描述**：根据入参提供的节点颜色、边的颜色、背景颜色生成主题配置。

#### generateThemeByPrimaryColor

- **参数**：`primaryColor: string, mode: 'light' | 'dark'`
- **返回值**：`Theme`
- **描述**：根据主题色以及模式生成主题配置。

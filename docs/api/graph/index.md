---
outline: deep
---

# 图实例

图实例`graph`对象上的属性与方法说明

```js
import { GraphVis } from "@zjfcool/graph-vis";
const graph = new GraphVis({
    ...
})
```

## 属性

### type

- **类型**：[`GraphologyType`](/guide/types/#graphologytype)
- **描述**：图的类型，可为有向、无向或混合。

### order

- **类型**：`number`
- **描述**：图中节点的总数量。

### size

- **类型**：`number`
- **描述**：图中边的总数量。

### multi

- **类型**：`boolean`
- **描述**：图是否为多边模式。

### allowSelfLoops

- **类型**：`boolean`
- **描述**：图是否允许自循环边。

### directedSize

- **类型**：`number`
- **描述**：图中有向边的总数量。

### undirectedSize

- **类型**：`number`
- **描述**：图中无向边的总数量。

### selfLoopCount

- **类型**：`number`
- **描述**：图中自循环边的数量。

### directedSelfLoopCount

- **类型**：`number`
- **描述**：图中有向自循环边的数量。

### undirectedSelfLoopCount

- **类型**：`number`
- **描述**：图中无向自循环边的数量。

### canvas

- **类型**：`HTMLCanvasElement`
- **描述**：canvas 元素。

### screenCenterX

- **类型**：`number`
- **描述**：屏幕中心点的 x 坐标。

### screenCenterY

- **类型**：`number`
- **描述**：屏幕中心点的 y 坐标。

### transform

- **类型**：`ZoomTransform`
- **描述**：返回 `ZoomTransform` 实例对象。详情参见 [d3-zoom#zoomTransform](https://d3js.org/d3-zoom#zoomTransform)。

### implementation

- **类型**：`string`
- **描述**：图实现的名称。

## 方法

### 生命周期与清理

#### init

- **参数**：无
- **返回值**：`Promise`
- **描述**：图初始化的方法。

#### destroy

- **参数**：无
- **返回值**：无
- **描述**：销毁图实例，之后不可再使用。

#### clear

- **参数**：无
- **返回值**：`GraphVis` 实例
- **描述**：清空图所有的节点与边，并同步清理画布上对应的图形。

#### clearEdges

- **参数**：无
- **返回值**：`GraphVis` 实例
- **描述**：清空图的所有边，并同步清理画布上对应的边。

### 渲染

#### draw

- **参数**：无
- **返回值**：无
- **描述**：重新绘制所有节点及边。图形形状、样式变化时会执行。

#### update

- **参数**：无
- **返回值**：无
- **描述**：更新节点及边。节点位置信息发生变化（如布局过程中）时会执行。

### 数据读写

#### getData

- **参数**：无
- **返回值**：`GraphAttributes`
- **描述**：获取原始数据。

#### setData

- **参数**：`GraphAttributes | (prev: GraphAttributes) => GraphAttributes`
- **返回值**：无
- **描述**：替换图的数据源。

### 布局

#### getLayout

- **参数**：无
- **返回值**：`BaseLayout`
- **描述**：获取当前图的布局实例。

#### setLayoutOptions

- **参数**：`LayoutOptions`
- **返回值**：无
- **描述**：为当前图切换布局类型。

#### stopLayout

- **参数**：无
- **返回值**：无
- **描述**：暂停当前图的布局。

#### restartLayout

- **参数**：无
- **返回值**：无
- **描述**：重启当前布局。

### 节点操作

#### addNode

- **参数**：`NodeAttributes`
- **返回值**：`nodeId | undefined`
- **描述**：入参为节点数据，添加一个节点。

#### getNode

- **参数**：`id: string`
- **返回值**：`BaseNode`
- **描述**：入参为节点 ID，获取节点实例。

#### dropNode

- **参数**：`id: string`
- **返回值**：graph 实例
- **描述**：入参为节点 ID，删除图的某一个节点。

#### nodes

- **参数**：无
- **返回值**：`BaseNode[]`
- **描述**：获取图的所有节点实例。

#### forEachNode

- **参数**：`(node: BaseNode, attr: EdgeAttributes) => void`
- **返回值**：graph 实例
- **描述**：循环节点实例。

#### neighbors

- **参数**：`id: string`
- **返回值**：`BaseNode[]`
- **描述**：入参为节点 ID，获取节点的相邻节点。

#### nonNeighbors

- **参数**：`id: string`
- **返回值**：`BaseNode[]`
- **描述**：入参为节点 ID，获取节点的非相邻点。

### 边操作

#### addEdge

- **参数**：`EdgeAttributes`
- **返回值**：`edgeId | undefined`
- **描述**：入参为边数据，为图添加一条边。

#### getEdge

- **参数**：`id: string`
- **返回值**：`BaseEdge`
- **描述**：入参为边 ID，获取边实例。

#### dropEdge

- **参数**：`id: string`
- **返回值**：无
- **描述**：入参为边 ID，删除图的一条边。

#### edges

- **参数**：无
- **返回值**：`BaseEdge[]`
- **描述**：获取图的所有边实例。

#### forEachEdge

- **参数**：`(edge: BaseEdge, attr: EdgeAttributes) => void`
- **返回值**：graph 实例
- **描述**：循环边实例。

#### relatedEdges

- **参数**：`id: string`
- **返回值**：`BaseEdge[]`
- **描述**：入参为节点 ID，获取与节点相连的边。

#### unrelatedEdges

- **参数**：`id: string`
- **返回值**：`BaseEdge[]`
- **描述**：入参为节点 ID，获取与节点不相连的边。

### 视图与坐标

#### getCenter

- **参数**：无
- **返回值**：`{ x: number; y: number }`
- **描述**：获取当前图的中心坐标。

#### global2LocalPoint

- **参数**：`x: number, y: number`
- **返回值**：`{ x: number; y: number }`
- **描述**：入参为全局的 x、y 坐标值，返回本地坐标。

#### local2GlobalPoint

- **参数**：`x: number, y: number`
- **返回值**：`{ x: number; y: number }`
- **描述**：入参为本地 x、y 坐标值，返回全局坐标。

#### translateTo

- **参数**：`x: number, y: number`
- **返回值**：无
- **描述**：将图变换平移至 x、y 坐标点。

#### translateBy

- **参数**：`dx: number, dy: number`
- **返回值**：无
- **描述**：将当前图 x 轴平移 `dx` 距离，y 轴平移 `dy` 距离。

#### centerAt

- **参数**：`x: number, y: number, easing?: EasingType, duration?: number`
- **返回值**：无
- **描述**：将当前图切换至以 x、y 坐标为中心点。`easing` 为动画类型，详见 [`EasingType`](/guide/types/#easingtype)；`duration` 为动画执行时间，单位 ms。

#### zoom

- **参数**：`k: number, easing?: EasingType, duration?: number`
- **返回值**：无
- **描述**：将图缩放 `k` 倍，使用 `easing` 动画，动画执行时间为 `duration`。`easing` 为动画类型，详见 [`EasingType`](/guide/types/#easingtype)。

#### zoomToFit

- **参数**：`zoomFactor?: number = 1, easing?: EasingType, duration?: number`
- **返回值**：无
- **描述**：图自适应，使整个图的节点、边都在显示区域内。`zoomFactor` 调整图距离显示区域的边距，默认为 1 无边距；数值越小边距越大，大于 1 时部分节点将超出显示区域。`easing` 为动画类型，详见 [`EasingType`](/guide/types/#easingtype)。

#### resetView

- **参数**：`easing?: EasingType, duration?: number`
- **返回值**：无
- **描述**：重置到初始状态，`ZoomTransform` 将被重置。`easing` 为动画类型，详见 [`EasingType`](/guide/types/#easingtype)。

### 配置

#### setThemeOptions

- **参数**：`string`
- **返回值**：GraphVis 实例
- **描述**：入参为主题别名，切换主题。

#### setLinkOptions

- **参数**：`LinkOptions`
- **返回值**：GraphVis 实例
- **描述**：更改 link 配置。

#### setZoomOptions

- **参数**：`ZoomOptions`
- **返回值**：GraphVis 实例
- **描述**：设置缩放配置项。

#### setDragOptions

- **参数**：`DragOptions`
- **返回值**：GraphVis 实例
- **描述**：设置拖拽配置项。

#### setNodeOptions

- **参数**：`NodeOptions`
- **返回值**：GraphVis 实例
- **描述**：动态更改节点的配置项。

#### setEdgeOptions

- **参数**：`EdgeOptions`
- **返回值**：GraphVis 实例
- **描述**：动态更改边的配置项。

### 交互

#### startLinkNode

- **参数**：`node: BaseNode, isDirected?: boolean = true`
- **返回值**：无
- **描述**：开始添加边的交互操作。`isDirected` 为 `true` 时添加有向边，为 `false` 时添加无向边。

#### endLinkNode

- **参数**：无
- **返回值**：无
- **描述**：结束添加边的交互操作。

### 事件

#### on

- **参数**：`event: GraphVisEvents, listener: (...args: any[]) => void`
- **返回值**：无
- **描述**：监听事件。

#### once

- **参数**：`event: GraphVisEvents, listener: (...args: any[]) => void`
- **返回值**：无
- **描述**：监听事件一次。

#### off

- **参数**：`event: GraphVisEvents, listener: (...args: any[]) => void`
- **返回值**：无
- **描述**：解除某个事件监听函数的绑定。

### 实例获取

#### getLink

- **参数**：无
- **返回值**：Link 实例
- **描述**：获取 Link 实例。

#### getApp

- **参数**：无
- **返回值**：Application 实例
- **描述**：获取 Application 实例。

#### getGraphology

- **参数**：无
- **返回值**：Graphology 实例
- **描述**：获取 Graphology 实例，用于操作数据。

### 节点属性操作

#### getNodeAttribute

- **参数**：`id: string, name: string | number`
- **返回值**：`any`
- **描述**：获取某个节点原始数据中某个属性的值。

#### getNodeAttributes

- **参数**：`id: string`
- **返回值**：`any`
- **描述**：获取某个节点的原始数据。

#### updateNodeAttribute

- **参数**：`id: string, attr: string, cb: (v: any) => any`
- **返回值**：GraphVis 实例
- **描述**：更新某个节点原始数据中某个属性的值。

#### updateNodeAttributes

- **参数**：`id: string, cb: (attr: NodeAttributes) => NodeAttributes`
- **返回值**：GraphVis 实例
- **描述**：更新某个节点的原始数据。

#### removeNodeAttribute

- **参数**：`id: string, attr: string | number`
- **返回值**：GraphVis 实例
- **描述**：移除某个节点原始数据中的某个属性。

#### hasNodeAttribute

- **参数**：`id: string, name: string | number`
- **返回值**：`boolean`
- **描述**：查看某个节点是否含有某个属性。

### 边属性操作

#### getEdgeAttribute

- **参数**：`id: string, name: string | number`
- **返回值**：`any`
- **描述**：获取某个边的原始数据中某个属性的值。

#### getEdgeAttributes

- **参数**：`id: string`
- **返回值**：`EdgeAttributes`
- **描述**：获取某个边的原始数据。

#### hasEdgeAttribute

- **参数**：`id: string, name: string | number`
- **返回值**：`boolean`
- **描述**：查看某个边原始数据是否含有某个属性。

#### updateEdgeAttribute

- **参数**：`id: string, name: string | number, cb: (v: any) => any`
- **返回值**：GraphVis 实例
- **描述**：更新边原始数据中某个属性的值。

#### updateEdgeAttributes

- **参数**：`id: string, cb: (attr: EdgeAttributes) => EdgeAttributes`
- **返回值**：GraphVis 实例
- **描述**：更新边原始数据。

#### removeEdgeAttribute

- **参数**：`id: string, name: string | number`
- **返回值**：GraphVis 实例
- **描述**：删除边原始数据中的某个属性。

## 事件

通过 [`on`](#on)、[`once`](#once)、[`off`](#off) 注册、监听与解绑事件。下表按触发对象分组。

> 各组内按使用频率与交互流程排序：点击/指针类在前，鼠标、右键、拖拽、触摸、滚轮依次在后；生命周期类事件按“创建 → 绘制 → 更新”排列，增删类事件按“前 → 后”排列。

### 图事件

与图整体状态相关的事件。

| 事件           | 回调函数                                                                           | 描述                                                    |
| :------------- | :--------------------------------------------------------------------------------- | :------------------------------------------------------ |
| `zoom`         | `(event: any) => void`                                                             | 图进行缩放交互的过程中触发。                            |
| `zoomstart`    | `(event: any) => void`                                                             | 图开始缩放交互时触发一次。                              |
| `zoomend`      | `(event: any) => void`                                                             | 图缩放交互结束后触发一次。                              |
| `resize`       | `(obj: { screenWidth: number; screenHeight: number; resolution: number }) => void` | `resizeTo` 对应的 HTML 元素尺寸发生变化时触发。         |
| `clear`        | `() => void`                                                                       | 执行清空图方法 [`clear`](#clear) 时触发。               |
| `clearedges`   | `() => void`                                                                       | 执行清空图的边方法 [`clearEdges`](#clearedges) 时触发。 |
| `beforecreate` | `() => void`                                                                       | 执行创建图元素方法 `create` 前触发。                    |
| `aftercreate`  | `() => void`                                                                       | 执行创建图元素方法 `create` 后触发。                    |
| `beforedraw`   | `() => void`                                                                       | 执行图元素绘制方法 [`draw`](#draw) 前触发。             |
| `afterdraw`    | `() => void`                                                                       | 执行图元素绘制方法 [`draw`](#draw) 后触发。             |
| `beforeupdate` | `() => void`                                                                       | 执行图元素更新方法 [`update`](#update) 前触发。         |
| `afterupdate`  | `() => void`                                                                       | 执行图元素更新方法 [`update`](#update) 后触发。         |

### 节点事件

触发对象为节点实例。除个别事件外，回调参数类型为 `NodeEventCallbackParams`：

```ts
type NodeEventCallbackParams = {
  target: BaseNode;
  originalTarget: Container;
  originalType: string;
  event: FederatedPointerEvent;
};
```

#### 指针与鼠标事件

| 事件                    | 回调函数                                                                                                              | 描述                                                                                                                       |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `node:click`            | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onclick](https://pixijs.download/release/docs/scene.Container.html#onclick)。                       |
| `node:tap`              | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#ontap](https://pixijs.download/release/docs/scene.Container.html#ontap)。                           |
| `node:pointerdown`      | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onpointerdown](https://pixijs.download/release/docs/scene.Container.html#onpointerdown)。           |
| `node:pointerup`        | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onpointerup](https://pixijs.download/release/docs/scene.Container.html#onpointerup)。               |
| `node:pointerupoutside` | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onpointerupoutside](https://pixijs.download/release/docs/scene.Container.html#onpointerupoutside)。 |
| `node:pointermove`      | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onpointermove](https://pixijs.download/release/docs/scene.Container.html#onpointermove)。           |
| `node:pointerover`      | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onpointerover](https://pixijs.download/release/docs/scene.Container.html#onpointerover)。           |
| `node:pointerout`       | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onpointerout](https://pixijs.download/release/docs/scene.Container.html#onpointerout)。             |
| `node:pointerenter`     | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onpointerenter](https://pixijs.download/release/docs/scene.Container.html#onpointerenter)。         |
| `node:pointerleave`     | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onpointerleave](https://pixijs.download/release/docs/scene.Container.html#onpointerleave)。         |
| `node:pointercancel`    | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onpointercancel](https://pixijs.download/release/docs/scene.Container.html#onpointercancel)。       |
| `node:pointertap`       | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onpointertap](https://pixijs.download/release/docs/scene.Container.html#onpointertap)。             |
| `node:mousedown`        | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onmousedown](https://pixijs.download/release/docs/scene.Container.html#onmousedown)。               |
| `node:mouseup`          | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onmouseup](https://pixijs.download/release/docs/scene.Container.html#onmouseup)。                   |
| `node:mouseupoutside`   | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onmouseupoutside](https://pixijs.download/release/docs/scene.Container.html#onmouseupoutside)。     |
| `node:mousemove`        | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onmousemove](https://pixijs.download/release/docs/scene.Container.html#onmousemove)。               |
| `node:mouseover`        | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onmouseover](https://pixijs.download/release/docs/scene.Container.html#onmouseover)。               |
| `node:mouseout`         | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onmouseout](https://pixijs.download/release/docs/scene.Container.html#onmouseout)。                 |
| `node:mouseenter`       | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onmouseenter](https://pixijs.download/release/docs/scene.Container.html#onmouseenter)。             |
| `node:mouseleave`       | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onmouseleave](https://pixijs.download/release/docs/scene.Container.html#onmouseleave)。             |
| `node:rightclick`       | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onrightclick](https://pixijs.download/release/docs/scene.Container.html#onrightclick)。             |
| `node:rightdown`        | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onrightdown](https://pixijs.download/release/docs/scene.Container.html#onrightdown)。               |
| `node:rightup`          | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onrightup](https://pixijs.download/release/docs/scene.Container.html#onrightup)。                   |
| `node:rightupoutside`   | `(params: NodeEventCallbackParams) => void`                                                                           | 详见 [PixiJS Container#onrightupoutside](https://pixijs.download/release/docs/scene.Container.html#onrightupoutside)。     |
| `node:wheel`            | `(params: { target: BaseNode; originalTarget: Container; originalType: string; event: FederatedWheelEvent }) => void` | 详见 [PixiJS Container#onwheel](https://pixijs.download/release/docs/scene.Container.html#onwheel)。                       |

#### 触摸事件

| 事件                   | 回调函数                                    | 描述                                                                                                                     |
| :--------------------- | :------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------- |
| `node:touchstart`      | `(params: NodeEventCallbackParams) => void` | 详见 [PixiJS Container#ontouchstart](https://pixijs.download/release/docs/scene.Container.html#ontouchstart)。           |
| `node:touchmove`       | `(params: NodeEventCallbackParams) => void` | 详见 [PixiJS Container#ontouchmove](https://pixijs.download/release/docs/scene.Container.html#ontouchmove)。             |
| `node:touchend`        | `(params: NodeEventCallbackParams) => void` | 详见 [PixiJS Container#ontouchend](https://pixijs.download/release/docs/scene.Container.html#ontouchend)。               |
| `node:touchendoutside` | `(params: NodeEventCallbackParams) => void` | 详见 [PixiJS Container#ontouchendoutside](https://pixijs.download/release/docs/scene.Container.html#ontouchendoutside)。 |
| `node:touchcancel`     | `(params: NodeEventCallbackParams) => void` | 详见 [PixiJS Container#ontouchcancel](https://pixijs.download/release/docs/scene.Container.html#ontouchcancel)。         |

#### 拖拽事件

| 事件             | 回调函数               | 描述                     |
| :--------------- | :--------------------- | :----------------------- |
| `node:drag`      | `(event: any) => void` | 节点拖拽过程中触发。     |
| `node:dragstart` | `(event: any) => void` | 节点开始拖拽时触发一次。 |
| `node:dragend`   | `(event: any) => void` | 节点拖拽结束后触发一次。 |

#### 增删事件

| 事件              | 回调函数                          | 描述             |
| :---------------- | :-------------------------------- | :--------------- |
| `node:beforeadd`  | `(attrs: NodeAttributes) => void` | 节点添加前触发。 |
| `node:afteradd`   | `(node: BaseNode) => void`        | 节点添加后触发。 |
| `node:beforedrop` | `(id: string) => void`            | 节点删除前触发。 |
| `node:afterdrop`  | `(node: BaseNode) => void`        | 节点删除后触发。 |

### 边事件

触发对象为边实例。除个别事件外，回调参数类型为 `EdgeCallbackParams`：

```ts
type EdgeCallbackParams = {
  target: BaseEdge;
  originalTarget: Container;
  originalType: string;
  event: FederatedPointerEvent;
};
```

#### 指针与鼠标事件

| 事件                    | 回调函数                                                                                                              | 描述                                                                                                                       |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `edge:click`            | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onclick](https://pixijs.download/release/docs/scene.Container.html#onclick)。                       |
| `edge:tap`              | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#ontap](https://pixijs.download/release/docs/scene.Container.html#ontap)。                           |
| `edge:pointerdown`      | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onpointerdown](https://pixijs.download/release/docs/scene.Container.html#onpointerdown)。           |
| `edge:pointerup`        | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onpointerup](https://pixijs.download/release/docs/scene.Container.html#onpointerup)。               |
| `edge:pointerupoutside` | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onpointerupoutside](https://pixijs.download/release/docs/scene.Container.html#onpointerupoutside)。 |
| `edge:pointermove`      | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onpointermove](https://pixijs.download/release/docs/scene.Container.html#onpointermove)。           |
| `edge:pointerover`      | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onpointerover](https://pixijs.download/release/docs/scene.Container.html#onpointerover)。           |
| `edge:pointerout`       | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onpointerout](https://pixijs.download/release/docs/scene.Container.html#onpointerout)。             |
| `edge:pointerenter`     | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onpointerenter](https://pixijs.download/release/docs/scene.Container.html#onpointerenter)。         |
| `edge:pointerleave`     | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onpointerleave](https://pixijs.download/release/docs/scene.Container.html#onpointerleave)。         |
| `edge:pointercancel`    | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onpointercancel](https://pixijs.download/release/docs/scene.Container.html#onpointercancel)。       |
| `edge:pointertap`       | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onpointertap](https://pixijs.download/release/docs/scene.Container.html#onpointertap)。             |
| `edge:mousedown`        | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onmousedown](https://pixijs.download/release/docs/scene.Container.html#onmousedown)。               |
| `edge:mouseup`          | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onmouseup](https://pixijs.download/release/docs/scene.Container.html#onmouseup)。                   |
| `edge:mouseupoutside`   | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onmouseupoutside](https://pixijs.download/release/docs/scene.Container.html#onmouseupoutside)。     |
| `edge:mousemove`        | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onmousemove](https://pixijs.download/release/docs/scene.Container.html#onmousemove)。               |
| `edge:mouseover`        | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onmouseover](https://pixijs.download/release/docs/scene.Container.html#onmouseover)。               |
| `edge:mouseout`         | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onmouseout](https://pixijs.download/release/docs/scene.Container.html#onmouseout)。                 |
| `edge:mouseenter`       | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onmouseenter](https://pixijs.download/release/docs/scene.Container.html#onmouseenter)。             |
| `edge:mouseleave`       | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onmouseleave](https://pixijs.download/release/docs/scene.Container.html#onmouseleave)。             |
| `edge:rightclick`       | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onrightclick](https://pixijs.download/release/docs/scene.Container.html#onrightclick)。             |
| `edge:rightdown`        | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onrightdown](https://pixijs.download/release/docs/scene.Container.html#onrightdown)。               |
| `edge:rightup`          | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onrightup](https://pixijs.download/release/docs/scene.Container.html#onrightup)。                   |
| `edge:rightupoutside`   | `(params: EdgeCallbackParams) => void`                                                                                | 详见 [PixiJS Container#onrightupoutside](https://pixijs.download/release/docs/scene.Container.html#onrightupoutside)。     |
| `edge:wheel`            | `(params: { target: BaseEdge; originalTarget: Container; originalType: string; event: FederatedWheelEvent }) => void` | 详见 [PixiJS Container#onwheel](https://pixijs.download/release/docs/scene.Container.html#onwheel)。                       |

#### 触摸事件

| 事件                   | 回调函数                               | 描述                                                                                                                     |
| :--------------------- | :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `edge:touchstart`      | `(params: EdgeCallbackParams) => void` | 详见 [PixiJS Container#ontouchstart](https://pixijs.download/release/docs/scene.Container.html#ontouchstart)。           |
| `edge:touchmove`       | `(params: EdgeCallbackParams) => void` | 详见 [PixiJS Container#ontouchmove](https://pixijs.download/release/docs/scene.Container.html#ontouchmove)。             |
| `edge:touchend`        | `(params: EdgeCallbackParams) => void` | 详见 [PixiJS Container#ontouchend](https://pixijs.download/release/docs/scene.Container.html#ontouchend)。               |
| `edge:touchendoutside` | `(params: EdgeCallbackParams) => void` | 详见 [PixiJS Container#ontouchendoutside](https://pixijs.download/release/docs/scene.Container.html#ontouchendoutside)。 |
| `edge:touchcancel`     | `(params: EdgeCallbackParams) => void` | 详见 [PixiJS Container#ontouchcancel](https://pixijs.download/release/docs/scene.Container.html#ontouchcancel)。         |

#### 增删事件

| 事件              | 回调函数                          | 描述                 |
| :---------------- | :-------------------------------- | :------------------- |
| `edge:beforeadd`  | `(attrs: EdgeAttributes) => void` | 添加边操作之前触发。 |
| `edge:afteradd`   | `(edge: BaseEdge) => void`        | 添加边之后触发。     |
| `edge:beforedrop` | `(id: string) => void`            | 删除边之前触发。     |
| `edge:afterdrop`  | `(edge: BaseEdge) => void`        | 删除边之后触发。     |

### stage 事件

触发对象为 `app.stage`。回调参数类型为 `StageCallbackParams`：

```ts
type StageCallbackParams = {
  event: FederatedPointerEvent;
  target: Container;
};
```

#### 指针与鼠标事件

| 事件                     | 回调函数                                                              | 描述                                                                                                                       |
| :----------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `stage:click`            | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onclick](https://pixijs.download/release/docs/scene.Container.html#onclick)。                       |
| `stage:tap`              | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#ontap](https://pixijs.download/release/docs/scene.Container.html#ontap)。                           |
| `stage:pointerdown`      | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onpointerdown](https://pixijs.download/release/docs/scene.Container.html#onpointerdown)。           |
| `stage:pointerup`        | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onpointerup](https://pixijs.download/release/docs/scene.Container.html#onpointerup)。               |
| `stage:pointerupoutside` | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onpointerupoutside](https://pixijs.download/release/docs/scene.Container.html#onpointerupoutside)。 |
| `stage:pointermove`      | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onpointermove](https://pixijs.download/release/docs/scene.Container.html#onpointermove)。           |
| `stage:pointerover`      | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onpointerover](https://pixijs.download/release/docs/scene.Container.html#onpointerover)。           |
| `stage:pointerout`       | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onpointerout](https://pixijs.download/release/docs/scene.Container.html#onpointerout)。             |
| `stage:pointerenter`     | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onpointerenter](https://pixijs.download/release/docs/scene.Container.html#onpointerenter)。         |
| `stage:pointerleave`     | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onpointerleave](https://pixijs.download/release/docs/scene.Container.html#onpointerleave)。         |
| `stage:pointercancel`    | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onpointercancel](https://pixijs.download/release/docs/scene.Container.html#onpointercancel)。       |
| `stage:pointertap`       | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onpointertap](https://pixijs.download/release/docs/scene.Container.html#onpointertap)。             |
| `stage:mousedown`        | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onmousedown](https://pixijs.download/release/docs/scene.Container.html#onmousedown)。               |
| `stage:mouseup`          | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onmouseup](https://pixijs.download/release/docs/scene.Container.html#onmouseup)。                   |
| `stage:mouseupoutside`   | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onmouseupoutside](https://pixijs.download/release/docs/scene.Container.html#onmouseupoutside)。     |
| `stage:mousemove`        | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onmousemove](https://pixijs.download/release/docs/scene.Container.html#onmousemove)。               |
| `stage:mouseover`        | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onmouseover](https://pixijs.download/release/docs/scene.Container.html#onmouseover)。               |
| `stage:mouseout`         | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onmouseout](https://pixijs.download/release/docs/scene.Container.html#onmouseout)。                 |
| `stage:mouseenter`       | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onmouseenter](https://pixijs.download/release/docs/scene.Container.html#onmouseenter)。             |
| `stage:mouseleave`       | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onmouseleave](https://pixijs.download/release/docs/scene.Container.html#onmouseleave)。             |
| `stage:rightclick`       | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onrightclick](https://pixijs.download/release/docs/scene.Container.html#onrightclick)。             |
| `stage:rightdown`        | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onrightdown](https://pixijs.download/release/docs/scene.Container.html#onrightdown)。               |
| `stage:rightup`          | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onrightup](https://pixijs.download/release/docs/scene.Container.html#onrightup)。                   |
| `stage:rightupoutside`   | `(params: StageCallbackParams) => void`                               | 详见 [PixiJS Container#onrightupoutside](https://pixijs.download/release/docs/scene.Container.html#onrightupoutside)。     |
| `stage:wheel`            | `(params: { event: FederatedWheelEvent; target: Container }) => void` | 详见 [PixiJS Container#onwheel](https://pixijs.download/release/docs/scene.Container.html#onwheel)。                       |

#### 触摸事件

| 事件                    | 回调函数                                | 描述                                                                                                                     |
| :---------------------- | :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `stage:touchstart`      | `(params: StageCallbackParams) => void` | 详见 [PixiJS Container#ontouchstart](https://pixijs.download/release/docs/scene.Container.html#ontouchstart)。           |
| `stage:touchmove`       | `(params: StageCallbackParams) => void` | 详见 [PixiJS Container#ontouchmove](https://pixijs.download/release/docs/scene.Container.html#ontouchmove)。             |
| `stage:touchend`        | `(params: StageCallbackParams) => void` | 详见 [PixiJS Container#ontouchend](https://pixijs.download/release/docs/scene.Container.html#ontouchend)。               |
| `stage:touchendoutside` | `(params: StageCallbackParams) => void` | 详见 [PixiJS Container#ontouchendoutside](https://pixijs.download/release/docs/scene.Container.html#ontouchendoutside)。 |
| `stage:touchcancel`     | `(params: StageCallbackParams) => void` | 详见 [PixiJS Container#ontouchcancel](https://pixijs.download/release/docs/scene.Container.html#ontouchcancel)。         |

### 布局事件

| 事件           | 回调函数     | 描述                 |
| :------------- | :----------- | :------------------- |
| `layout:start` | `() => void` | 布局开始时触发一次。 |
| `layout:end`   | `() => void` | 布局结束后触发一次。 |

### link 事件

| 事件         | 回调函数                                                       | 描述                                                                  |
| :----------- | :------------------------------------------------------------- | :-------------------------------------------------------------------- |
| `link:start` | `(link: Link) => void`                                         | 开始连接时触发一次，即调用 [`startLinkNode`](#startlinknode) 方法时。 |
| `link:move`  | `(data: { event: FederatedPointerEvent; link: Link }) => void` | 连接操作中鼠标移动过程中触发。                                        |
| `link:end`   | `(link: Link) => void`                                         | 结束连接时触发一次，即调用 [`endLinkNode`](#endlinknode) 方法时。     |

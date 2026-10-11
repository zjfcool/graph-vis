# Graph Instance

Description of the properties and methods on the graph instance (`graph`) object.

```js
import { GraphVis } from "@zjfcool/graph-vis";
const graph = new GraphVis({
    ...
})
```

## Properties

### type

- **Type**: [`GraphologyType`](/en/guide/types/#graphologytype)
- **Description**: The type of the graph, which can be directed, undirected, or mixed.

### order

- **Type**: `number`
- **Description**: The total number of nodes in the graph.

### size

- **Type**: `number`
- **Description**: The total number of edges in the graph.

### multi

- **Type**: `boolean`
- **Description**: Whether the graph is in multi-edge mode.

### allowSelfLoops

- **Type**: `boolean`
- **Description**: Whether the graph allows self-loop edges.

### directedSize

- **Type**: `number`
- **Description**: The total number of directed edges in the graph.

### undirectedSize

- **Type**: `number`
- **Description**: The total number of undirected edges in the graph.

### selfLoopCount

- **Type**: `number`
- **Description**: The number of self-loop edges in the graph.

### directedSelfLoopCount

- **Type**: `number`
- **Description**: The number of directed self-loop edges in the graph.

### undirectedSelfLoopCount

- **Type**: `number`
- **Description**: The number of undirected self-loop edges in the graph.

### canvas

- **Type**: `HTMLCanvasElement`
- **Description**: The canvas element.

### screenCenterX

- **Type**: `number`
- **Description**: The x-coordinate of the screen center.

### screenCenterY

- **Type**: `number`
- **Description**: The y-coordinate of the screen center.

### transform

- **Type**: `ZoomTransform`
- **Description**: Returns a `ZoomTransform` instance. See [d3-zoom#zoomTransform](https://d3js.org/d3-zoom#zoomTransform) for details.

### implementation

- **Type**: `string`
- **Description**: The name of the graph implementation.

## Methods

### Lifecycle and Cleanup

#### init

- **Parameters**: None
- **Returns**: `Promise`
- **Description**: The method that initializes the graph.

#### destroy

- **Parameters**: None
- **Returns**: None
- **Description**: Destroys the graph instance. It can no longer be used afterward.

#### clear

- **Parameters**: None
- **Returns**: A `GraphVis` instance
- **Description**: Clears all nodes and edges of the graph, and cleans up the corresponding shapes on the canvas at the same time.

#### clearEdges

- **Parameters**: None
- **Returns**: A `GraphVis` instance
- **Description**: Clears all edges of the graph, and cleans up the corresponding edges on the canvas at the same time.

### Rendering

#### draw

- **Parameters**: None
- **Returns**: None
- **Description**: Redraws all nodes and edges. Executed when shapes or styles change.

#### update

- **Parameters**: None
- **Returns**: None
- **Description**: Updates nodes and edges. Executed when node position information changes (e.g., during layout).

### Data Read/Write

#### getData

- **Parameters**: None
- **Returns**: `GraphAttributes`
- **Description**: Gets the raw data.

#### setData

- **Parameters**: `GraphAttributes | (prev: GraphAttributes) => GraphAttributes`
- **Returns**: None
- **Description**: Replaces the graph's data source.

### Layout

#### getLayout

- **Parameters**: None
- **Returns**: `BaseLayout`
- **Description**: Gets the current graph's layout instance.

#### setLayoutOptions

- **Parameters**: `LayoutOptions`
- **Returns**: None
- **Description**: Switches the layout type for the current graph.

#### stopLayout

- **Parameters**: None
- **Returns**: None
- **Description**: Pauses the current graph's layout.

#### restartLayout

- **Parameters**: None
- **Returns**: None
- **Description**: Restarts the current layout.

### Node Operations

#### addNode

- **Parameters**: `NodeAttributes`
- **Returns**: `nodeId | undefined`
- **Description**: Adds a node, with the node data as the argument.

#### getNode

- **Parameters**: `id: string`
- **Returns**: `BaseNode`
- **Description**: Gets a node instance, with the node ID as the argument.

#### dropNode

- **Parameters**: `id: string`
- **Returns**: A graph instance
- **Description**: Removes a node from the graph, with the node ID as the argument.

#### nodes

- **Parameters**: None
- **Returns**: `BaseNode[]`
- **Description**: Gets all node instances of the graph.

#### forEachNode

- **Parameters**: `(node: BaseNode, attr: EdgeAttributes) => void`
- **Returns**: A graph instance
- **Description**: Iterates over node instances.

#### neighbors

- **Parameters**: `id: string`
- **Returns**: `BaseNode[]`
- **Description**: Gets the neighboring nodes of a node, with the node ID as the argument.

#### nonNeighbors

- **Parameters**: `id: string`
- **Returns**: `BaseNode[]`
- **Description**: Gets the non-neighboring nodes of a node, with the node ID as the argument.

### Edge Operations

#### addEdge

- **Parameters**: `EdgeAttributes`
- **Returns**: `edgeId | undefined`
- **Description**: Adds an edge to the graph, with the edge data as the argument.

#### getEdge

- **Parameters**: `id: string`
- **Returns**: `BaseEdge`
- **Description**: Gets an edge instance, with the edge ID as the argument.

#### dropEdge

- **Parameters**: `id: string`
- **Returns**: None
- **Description**: Removes an edge from the graph, with the edge ID as the argument.

#### edges

- **Parameters**: None
- **Returns**: `BaseEdge[]`
- **Description**: Gets all edge instances of the graph.

#### forEachEdge

- **Parameters**: `(edge: BaseEdge, attr: EdgeAttributes) => void`
- **Returns**: A graph instance
- **Description**: Iterates over edge instances.

#### relatedEdges

- **Parameters**: `id: string`
- **Returns**: `BaseEdge[]`
- **Description**: Gets the edges connected to a node, with the node ID as the argument.

#### unrelatedEdges

- **Parameters**: `id: string`
- **Returns**: `BaseEdge[]`
- **Description**: Gets the edges not connected to a node, with the node ID as the argument.

### View and Coordinates

#### getCenter

- **Parameters**: None
- **Returns**: `{ x: number; y: number }`
- **Description**: Gets the center coordinates of the current graph.

#### global2LocalPoint

- **Parameters**: `x: number, y: number`
- **Returns**: `{ x: number; y: number }`
- **Description**: Takes global x and y coordinates as arguments and returns local coordinates.

#### local2GlobalPoint

- **Parameters**: `x: number, y: number`
- **Returns**: `{ x: number; y: number }`
- **Description**: Takes local x and y coordinates as arguments and returns global coordinates.

#### translateTo

- **Parameters**: `x: number, y: number`
- **Returns**: None
- **Description**: Translates the graph transform to the x and y coordinate point.

#### translateBy

- **Parameters**: `dx: number, dy: number`
- **Returns**: None
- **Description**: Translates the current graph by `dx` along the x-axis and by `dy` along the y-axis.

#### centerAt

- **Parameters**: `x: number, y: number, easing?: EasingType, duration?: number`
- **Returns**: None
- **Description**: Moves the current graph so that the x and y coordinates become the center point. `easing` is the animation type; see [`EasingType`](/en/guide/types/#easingtype) for details. `duration` is the animation duration, in ms.

#### zoom

- **Parameters**: `k: number, easing?: EasingType, duration?: number`
- **Returns**: None
- **Description**: Zooms the graph by a factor of `k`, using the `easing` animation, with `duration` as the animation duration. `easing` is the animation type; see [`EasingType`](/en/guide/types/#easingtype) for details.

#### zoomToFit

- **Parameters**: `zoomFactor?: number = 1, easing?: EasingType, duration?: number`
- **Returns**: None
- **Description**: Fits the graph so that all nodes and edges are within the visible area. `zoomFactor` adjusts the margin between the graph and the visible area; the default is 1, meaning no margin. Smaller values mean a larger margin; values greater than 1 cause some nodes to exceed the visible area. `easing` is the animation type; see [`EasingType`](/en/guide/types/#easingtype) for details.

#### resetView

- **Parameters**: `easing?: EasingType, duration?: number`
- **Returns**: None
- **Description**: Resets to the initial state; `ZoomTransform` will be reset. `easing` is the animation type; see [`EasingType`](/en/guide/types/#easingtype) for details.

### Configuration

#### setThemeOptions

- **Parameters**: `string`
- **Returns**: A GraphVis instance
- **Description**: Switches the theme, with the theme alias as the argument.

#### setLinkOptions

- **Parameters**: `LinkOptions`
- **Returns**: A GraphVis instance
- **Description**: Changes the link options.

#### setZoomOptions

- **Parameters**: `ZoomOptions`
- **Returns**: A GraphVis instance
- **Description**: Sets the zoom options.

#### setDragOptions

- **Parameters**: `DragOptions`
- **Returns**: A GraphVis instance
- **Description**: Sets the drag options.

#### setNodeOptions

- **Parameters**: `NodeOptions`
- **Returns**: A GraphVis instance
- **Description**: Dynamically changes the node options.

#### setEdgeOptions

- **Parameters**: `EdgeOptions`
- **Returns**: A GraphVis instance
- **Description**: Dynamically changes the edge options.

### Interaction

#### startLinkNode

- **Parameters**: `node: BaseNode, isDirected?: boolean = true`
- **Returns**: None
- **Description**: Starts the interactive operation of adding an edge. When `isDirected` is `true`, a directed edge is added; when `false`, an undirected edge is added.

#### endLinkNode

- **Parameters**: None
- **Returns**: None
- **Description**: Ends the interactive operation of adding an edge.

### Events

#### on

- **Parameters**: `event: GraphVisEvents, listener: (...args: any[]) => void`
- **Returns**: None
- **Description**: Listens to an event.

#### once

- **Parameters**: `event: GraphVisEvents, listener: (...args: any[]) => void`
- **Returns**: None
- **Description**: Listens to an event once.

#### off

- **Parameters**: `event: GraphVisEvents, listener: (...args: any[]) => void`
- **Returns**: None
- **Description**: Unbinds an event listener.

### Instance Retrieval

#### getLink

- **Parameters**: None
- **Returns**: A `Link` instance
- **Description**: Gets the `Link` instance.

#### getApp

- **Parameters**: None
- **Returns**: An `Application` instance
- **Description**: Gets the `Application` instance.

#### getGraphology

- **Parameters**: None
- **Returns**: A `Graphology` instance
- **Description**: Gets the `Graphology` instance, used for operating on data.

### Node Attribute Operations

#### getNodeAttribute

- **Parameters**: `id: string, name: string | number`
- **Returns**: `any`
- **Description**: Gets the value of a certain property in the raw data of a node.

#### getNodeAttributes

- **Parameters**: `id: string`
- **Returns**: `any`
- **Description**: Gets the raw data of a node.

#### updateNodeAttribute

- **Parameters**: `id: string, attr: string, cb: (v: any) => any`
- **Returns**: A GraphVis instance
- **Description**: Updates the value of a certain property in the raw data of a node.

#### updateNodeAttributes

- **Parameters**: `id: string, cb: (attr: NodeAttributes) => NodeAttributes`
- **Returns**: A GraphVis instance
- **Description**: Updates the raw data of a node.

#### removeNodeAttribute

- **Parameters**: `id: string, attr: string | number`
- **Returns**: A GraphVis instance
- **Description**: Removes a certain property from the raw data of a node.

#### hasNodeAttribute

- **Parameters**: `id: string, name: string | number`
- **Returns**: `boolean`
- **Description**: Checks whether a node has a certain property.

### Edge Attribute Operations

#### getEdgeAttribute

- **Parameters**: `id: string, name: string | number`
- **Returns**: `any`
- **Description**: Gets the value of a certain property in the raw data of an edge.

#### getEdgeAttributes

- **Parameters**: `id: string`
- **Returns**: `EdgeAttributes`
- **Description**: Gets the raw data of an edge.

#### hasEdgeAttribute

- **Parameters**: `id: string, name: string | number`
- **Returns**: `boolean`
- **Description**: Checks whether the raw data of an edge has a certain property.

#### updateEdgeAttribute

- **Parameters**: `id: string, name: string | number, cb: (v: any) => any`
- **Returns**: A GraphVis instance
- **Description**: Updates the value of a certain property in the raw data of an edge.

#### updateEdgeAttributes

- **Parameters**: `id: string, cb: (attr: EdgeAttributes) => EdgeAttributes`
- **Returns**: A GraphVis instance
- **Description**: Updates the raw data of an edge.

#### removeEdgeAttribute

- **Parameters**: `id: string, name: string | number`
- **Returns**: A GraphVis instance
- **Description**: Removes a certain property from the raw data of an edge.

## Events

Events are registered, listened to, and unbound via [`on`](#on), [`once`](#once), and [`off`](#off). The tables below are grouped by the triggering object.

> Within each group, events are ordered by usage frequency and interaction flow: click/pointer events first, followed by mouse, right-click, drag, touch, and wheel events; lifecycle events are ordered as "create → draw → update", and add/remove events are ordered as "before → after".

### Graph Events

Events related to the overall state of the graph.

| Event          | Callback                                                                           | Description                                                                                       |
| :------------- | :--------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `zoom`         | `(event: any) => void`                                                             | Triggered during a zoom interaction on the graph.                                                 |
| `zoomstart`    | `(event: any) => void`                                                             | Triggered once when a zoom interaction on the graph begins.                                       |
| `zoomend`      | `(event: any) => void`                                                             | Triggered once when a zoom interaction on the graph ends.                                         |
| `resize`       | `(obj: { screenWidth: number; screenHeight: number; resolution: number }) => void` | Triggered when the size of the HTML element corresponding to `resizeTo` changes.                  |
| `clear`        | `() => void`                                                                       | Triggered when the [`clear`](#clear) method for clearing the graph is executed.                   |
| `clearedges`   | `() => void`                                                                       | Triggered when the [`clearEdges`](#clearedges) method for clearing the graph's edges is executed. |
| `beforecreate` | `() => void`                                                                       | Triggered before the `create` method for creating graph elements is executed.                     |
| `aftercreate`  | `() => void`                                                                       | Triggered after the `create` method for creating graph elements is executed.                      |
| `beforedraw`   | `() => void`                                                                       | Triggered before the [`draw`](#draw) method for drawing graph elements is executed.               |
| `afterdraw`    | `() => void`                                                                       | Triggered after the [`draw`](#draw) method for drawing graph elements is executed.                |
| `beforeupdate` | `() => void`                                                                       | Triggered before the [`update`](#update) method for updating graph elements is executed.          |
| `afterupdate`  | `() => void`                                                                       | Triggered after the [`update`](#update) method for updating graph elements is executed.           |

### Node Events

The triggering object is a node instance. Except for a few events, the callback parameter type is `NodeEventCallbackParams`:

```ts
type NodeEventCallbackParams = {
  target: BaseNode;
  originalTarget: Container;
  originalType: string;
  event: FederatedPointerEvent;
};
```

#### Pointer and Mouse Events

| Event                   | Callback                                                                                                              | Description                                                                                                                          |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `node:click`            | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onclick](https://pixijs.download/release/docs/scene.Container.html#onclick) for details.                       |
| `node:tap`              | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#ontap](https://pixijs.download/release/docs/scene.Container.html#ontap) for details.                           |
| `node:pointerdown`      | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onpointerdown](https://pixijs.download/release/docs/scene.Container.html#onpointerdown) for details.           |
| `node:pointerup`        | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onpointerup](https://pixijs.download/release/docs/scene.Container.html#onpointerup) for details.               |
| `node:pointerupoutside` | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onpointerupoutside](https://pixijs.download/release/docs/scene.Container.html#onpointerupoutside) for details. |
| `node:pointermove`      | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onpointermove](https://pixijs.download/release/docs/scene.Container.html#onpointermove) for details.           |
| `node:pointerover`      | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onpointerover](https://pixijs.download/release/docs/scene.Container.html#onpointerover) for details.           |
| `node:pointerout`       | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onpointerout](https://pixijs.download/release/docs/scene.Container.html#onpointerout) for details.             |
| `node:pointerenter`     | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onpointerenter](https://pixijs.download/release/docs/scene.Container.html#onpointerenter) for details.         |
| `node:pointerleave`     | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onpointerleave](https://pixijs.download/release/docs/scene.Container.html#onpointerleave) for details.         |
| `node:pointercancel`    | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onpointercancel](https://pixijs.download/release/docs/scene.Container.html#onpointercancel) for details.       |
| `node:pointertap`       | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onpointertap](https://pixijs.download/release/docs/scene.Container.html#onpointertap) for details.             |
| `node:mousedown`        | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onmousedown](https://pixijs.download/release/docs/scene.Container.html#onmousedown) for details.               |
| `node:mouseup`          | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onmouseup](https://pixijs.download/release/docs/scene.Container.html#onmouseup) for details.                   |
| `node:mouseupoutside`   | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onmouseupoutside](https://pixijs.download/release/docs/scene.Container.html#onmouseupoutside) for details.     |
| `node:mousemove`        | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onmousemove](https://pixijs.download/release/docs/scene.Container.html#onmousemove) for details.               |
| `node:mouseover`        | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onmouseover](https://pixijs.download/release/docs/scene.Container.html#onmouseover) for details.               |
| `node:mouseout`         | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onmouseout](https://pixijs.download/release/docs/scene.Container.html#onmouseout) for details.                 |
| `node:mouseenter`       | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onmouseenter](https://pixijs.download/release/docs/scene.Container.html#onmouseenter) for details.             |
| `node:mouseleave`       | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onmouseleave](https://pixijs.download/release/docs/scene.Container.html#onmouseleave) for details.             |
| `node:rightclick`       | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onrightclick](https://pixijs.download/release/docs/scene.Container.html#onrightclick) for details.             |
| `node:rightdown`        | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onrightdown](https://pixijs.download/release/docs/scene.Container.html#onrightdown) for details.               |
| `node:rightup`          | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onrightup](https://pixijs.download/release/docs/scene.Container.html#onrightup) for details.                   |
| `node:rightupoutside`   | `(params: NodeEventCallbackParams) => void`                                                                           | See [PixiJS Container#onrightupoutside](https://pixijs.download/release/docs/scene.Container.html#onrightupoutside) for details.     |
| `node:wheel`            | `(params: { target: BaseNode; originalTarget: Container; originalType: string; event: FederatedWheelEvent }) => void` | See [PixiJS Container#onwheel](https://pixijs.download/release/docs/scene.Container.html#onwheel) for details.                       |

#### Touch Events

| Event                  | Callback                                    | Description                                                                                                                        |
| :--------------------- | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------- |
| `node:touchstart`      | `(params: NodeEventCallbackParams) => void` | See [PixiJS Container#ontouchstart](https://pixijs.download/release/docs/scene.Container.html#ontouchstart) for details.           |
| `node:touchmove`       | `(params: NodeEventCallbackParams) => void` | See [PixiJS Container#ontouchmove](https://pixijs.download/release/docs/scene.Container.html#ontouchmove) for details.             |
| `node:touchend`        | `(params: NodeEventCallbackParams) => void` | See [PixiJS Container#ontouchend](https://pixijs.download/release/docs/scene.Container.html#ontouchend) for details.               |
| `node:touchendoutside` | `(params: NodeEventCallbackParams) => void` | See [PixiJS Container#ontouchendoutside](https://pixijs.download/release/docs/scene.Container.html#ontouchendoutside) for details. |
| `node:touchcancel`     | `(params: NodeEventCallbackParams) => void` | See [PixiJS Container#ontouchcancel](https://pixijs.download/release/docs/scene.Container.html#ontouchcancel) for details.         |

#### Drag Events

| Event            | Callback               | Description                             |
| :--------------- | :--------------------- | :-------------------------------------- |
| `node:drag`      | `(event: any) => void` | Triggered during a node drag.           |
| `node:dragstart` | `(event: any) => void` | Triggered once when a node drag begins. |
| `node:dragend`   | `(event: any) => void` | Triggered once when a node drag ends.   |

#### Add/Remove Events

| Event             | Callback                          | Description                         |
| :---------------- | :-------------------------------- | :---------------------------------- |
| `node:beforeadd`  | `(attrs: NodeAttributes) => void` | Triggered before a node is added.   |
| `node:afteradd`   | `(node: BaseNode) => void`        | Triggered after a node is added.    |
| `node:beforedrop` | `(id: string) => void`            | Triggered before a node is removed. |
| `node:afterdrop`  | `(node: BaseNode) => void`        | Triggered after a node is removed.  |

### Edge Events

The triggering object is an edge instance. Except for a few events, the callback parameter type is `EdgeCallbackParams`:

```ts
type EdgeCallbackParams = {
  target: BaseEdge;
  originalTarget: Container;
  originalType: string;
  event: FederatedPointerEvent;
};
```

#### Pointer and Mouse Events

| Event                   | Callback                                                                                                              | Description                                                                                                                          |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `edge:click`            | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onclick](https://pixijs.download/release/docs/scene.Container.html#onclick) for details.                       |
| `edge:tap`              | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#ontap](https://pixijs.download/release/docs/scene.Container.html#ontap) for details.                           |
| `edge:pointerdown`      | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onpointerdown](https://pixijs.download/release/docs/scene.Container.html#onpointerdown) for details.           |
| `edge:pointerup`        | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onpointerup](https://pixijs.download/release/docs/scene.Container.html#onpointerup) for details.               |
| `edge:pointerupoutside` | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onpointerupoutside](https://pixijs.download/release/docs/scene.Container.html#onpointerupoutside) for details. |
| `edge:pointermove`      | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onpointermove](https://pixijs.download/release/docs/scene.Container.html#onpointermove) for details.           |
| `edge:pointerover`      | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onpointerover](https://pixijs.download/release/docs/scene.Container.html#onpointerover) for details.           |
| `edge:pointerout`       | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onpointerout](https://pixijs.download/release/docs/scene.Container.html#onpointerout) for details.             |
| `edge:pointerenter`     | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onpointerenter](https://pixijs.download/release/docs/scene.Container.html#onpointerenter) for details.         |
| `edge:pointerleave`     | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onpointerleave](https://pixijs.download/release/docs/scene.Container.html#onpointerleave) for details.         |
| `edge:pointercancel`    | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onpointercancel](https://pixijs.download/release/docs/scene.Container.html#onpointercancel) for details.       |
| `edge:pointertap`       | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onpointertap](https://pixijs.download/release/docs/scene.Container.html#onpointertap) for details.             |
| `edge:mousedown`        | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onmousedown](https://pixijs.download/release/docs/scene.Container.html#onmousedown) for details.               |
| `edge:mouseup`          | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onmouseup](https://pixijs.download/release/docs/scene.Container.html#onmouseup) for details.                   |
| `edge:mouseupoutside`   | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onmouseupoutside](https://pixijs.download/release/docs/scene.Container.html#onmouseupoutside) for details.     |
| `edge:mousemove`        | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onmousemove](https://pixijs.download/release/docs/scene.Container.html#onmousemove) for details.               |
| `edge:mouseover`        | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onmouseover](https://pixijs.download/release/docs/scene.Container.html#onmouseover) for details.               |
| `edge:mouseout`         | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onmouseout](https://pixijs.download/release/docs/scene.Container.html#onmouseout) for details.                 |
| `edge:mouseenter`       | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onmouseenter](https://pixijs.download/release/docs/scene.Container.html#onmouseenter) for details.             |
| `edge:mouseleave`       | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onmouseleave](https://pixijs.download/release/docs/scene.Container.html#onmouseleave) for details.             |
| `edge:rightclick`       | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onrightclick](https://pixijs.download/release/docs/scene.Container.html#onrightclick) for details.             |
| `edge:rightdown`        | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onrightdown](https://pixijs.download/release/docs/scene.Container.html#onrightdown) for details.               |
| `edge:rightup`          | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onrightup](https://pixijs.download/release/docs/scene.Container.html#onrightup) for details.                   |
| `edge:rightupoutside`   | `(params: EdgeCallbackParams) => void`                                                                                | See [PixiJS Container#onrightupoutside](https://pixijs.download/release/docs/scene.Container.html#onrightupoutside) for details.     |
| `edge:wheel`            | `(params: { target: BaseEdge; originalTarget: Container; originalType: string; event: FederatedWheelEvent }) => void` | See [PixiJS Container#onwheel](https://pixijs.download/release/docs/scene.Container.html#onwheel) for details.                       |

#### Touch Events

| Event                  | Callback                               | Description                                                                                                                        |
| :--------------------- | :------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `edge:touchstart`      | `(params: EdgeCallbackParams) => void` | See [PixiJS Container#ontouchstart](https://pixijs.download/release/docs/scene.Container.html#ontouchstart) for details.           |
| `edge:touchmove`       | `(params: EdgeCallbackParams) => void` | See [PixiJS Container#ontouchmove](https://pixijs.download/release/docs/scene.Container.html#ontouchmove) for details.             |
| `edge:touchend`        | `(params: EdgeCallbackParams) => void` | See [PixiJS Container#ontouchend](https://pixijs.download/release/docs/scene.Container.html#ontouchend) for details.               |
| `edge:touchendoutside` | `(params: EdgeCallbackParams) => void` | See [PixiJS Container#ontouchendoutside](https://pixijs.download/release/docs/scene.Container.html#ontouchendoutside) for details. |
| `edge:touchcancel`     | `(params: EdgeCallbackParams) => void` | See [PixiJS Container#ontouchcancel](https://pixijs.download/release/docs/scene.Container.html#ontouchcancel) for details.         |

#### Add/Remove Events

| Event             | Callback                          | Description                          |
| :---------------- | :-------------------------------- | :----------------------------------- |
| `edge:beforeadd`  | `(attrs: EdgeAttributes) => void` | Triggered before an edge is added.   |
| `edge:afteradd`   | `(edge: BaseEdge) => void`        | Triggered after an edge is added.    |
| `edge:beforedrop` | `(id: string) => void`            | Triggered before an edge is removed. |
| `edge:afterdrop`  | `(edge: BaseEdge) => void`        | Triggered after an edge is removed.  |

### Stage Events

The triggering object is `app.stage`. The callback parameter type is `StageCallbackParams`:

```ts
type StageCallbackParams = {
  event: FederatedPointerEvent;
  target: Container;
};
```

#### Pointer and Mouse Events

| Event                    | Callback                                                              | Description                                                                                                                          |
| :----------------------- | :-------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `stage:click`            | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onclick](https://pixijs.download/release/docs/scene.Container.html#onclick) for details.                       |
| `stage:tap`              | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#ontap](https://pixijs.download/release/docs/scene.Container.html#ontap) for details.                           |
| `stage:pointerdown`      | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onpointerdown](https://pixijs.download/release/docs/scene.Container.html#onpointerdown) for details.           |
| `stage:pointerup`        | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onpointerup](https://pixijs.download/release/docs/scene.Container.html#onpointerup) for details.               |
| `stage:pointerupoutside` | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onpointerupoutside](https://pixijs.download/release/docs/scene.Container.html#onpointerupoutside) for details. |
| `stage:pointermove`      | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onpointermove](https://pixijs.download/release/docs/scene.Container.html#onpointermove) for details.           |
| `stage:pointerover`      | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onpointerover](https://pixijs.download/release/docs/scene.Container.html#onpointerover) for details.           |
| `stage:pointerout`       | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onpointerout](https://pixijs.download/release/docs/scene.Container.html#onpointerout) for details.             |
| `stage:pointerenter`     | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onpointerenter](https://pixijs.download/release/docs/scene.Container.html#onpointerenter) for details.         |
| `stage:pointerleave`     | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onpointerleave](https://pixijs.download/release/docs/scene.Container.html#onpointerleave) for details.         |
| `stage:pointercancel`    | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onpointercancel](https://pixijs.download/release/docs/scene.Container.html#onpointercancel) for details.       |
| `stage:pointertap`       | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onpointertap](https://pixijs.download/release/docs/scene.Container.html#onpointertap) for details.             |
| `stage:mousedown`        | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onmousedown](https://pixijs.download/release/docs/scene.Container.html#onmousedown) for details.               |
| `stage:mouseup`          | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onmouseup](https://pixijs.download/release/docs/scene.Container.html#onmouseup) for details.                   |
| `stage:mouseupoutside`   | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onmouseupoutside](https://pixijs.download/release/docs/scene.Container.html#onmouseupoutside) for details.     |
| `stage:mousemove`        | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onmousemove](https://pixijs.download/release/docs/scene.Container.html#onmousemove) for details.               |
| `stage:mouseover`        | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onmouseover](https://pixijs.download/release/docs/scene.Container.html#onmouseover) for details.               |
| `stage:mouseout`         | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onmouseout](https://pixijs.download/release/docs/scene.Container.html#onmouseout) for details.                 |
| `stage:mouseenter`       | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onmouseenter](https://pixijs.download/release/docs/scene.Container.html#onmouseenter) for details.             |
| `stage:mouseleave`       | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onmouseleave](https://pixijs.download/release/docs/scene.Container.html#onmouseleave) for details.             |
| `stage:rightclick`       | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onrightclick](https://pixijs.download/release/docs/scene.Container.html#onrightclick) for details.             |
| `stage:rightdown`        | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onrightdown](https://pixijs.download/release/docs/scene.Container.html#onrightdown) for details.               |
| `stage:rightup`          | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onrightup](https://pixijs.download/release/docs/scene.Container.html#onrightup) for details.                   |
| `stage:rightupoutside`   | `(params: StageCallbackParams) => void`                               | See [PixiJS Container#onrightupoutside](https://pixijs.download/release/docs/scene.Container.html#onrightupoutside) for details.     |
| `stage:wheel`            | `(params: { event: FederatedWheelEvent; target: Container }) => void` | See [PixiJS Container#onwheel](https://pixijs.download/release/docs/scene.Container.html#onwheel) for details.                       |

#### Touch Events

| Event                   | Callback                                | Description                                                                                                                        |
| :---------------------- | :-------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `stage:touchstart`      | `(params: StageCallbackParams) => void` | See [PixiJS Container#ontouchstart](https://pixijs.download/release/docs/scene.Container.html#ontouchstart) for details.           |
| `stage:touchmove`       | `(params: StageCallbackParams) => void` | See [PixiJS Container#ontouchmove](https://pixijs.download/release/docs/scene.Container.html#ontouchmove) for details.             |
| `stage:touchend`        | `(params: StageCallbackParams) => void` | See [PixiJS Container#ontouchend](https://pixijs.download/release/docs/scene.Container.html#ontouchend) for details.               |
| `stage:touchendoutside` | `(params: StageCallbackParams) => void` | See [PixiJS Container#ontouchendoutside](https://pixijs.download/release/docs/scene.Container.html#ontouchendoutside) for details. |
| `stage:touchcancel`     | `(params: StageCallbackParams) => void` | See [PixiJS Container#ontouchcancel](https://pixijs.download/release/docs/scene.Container.html#ontouchcancel) for details.         |

### Layout Events

| Event          | Callback     | Description                            |
| :------------- | :----------- | :------------------------------------- |
| `layout:start` | `() => void` | Triggered once when the layout begins. |
| `layout:end`   | `() => void` | Triggered once when the layout ends.   |

### Link Events

| Event        | Callback                                                       | Description                                                                                            |
| :----------- | :------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `link:start` | `(link: Link) => void`                                         | Triggered once when linking begins, i.e., when the [`startLinkNode`](#startlinknode) method is called. |
| `link:move`  | `(data: { event: FederatedPointerEvent; link: Link }) => void` | Triggered while the mouse moves during a linking operation.                                            |
| `link:end`   | `(link: Link) => void`                                         | Triggered once when linking ends, i.e., when the [`endLinkNode`](#endlinknode) method is called.       |

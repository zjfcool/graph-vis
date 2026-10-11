# Node Instance

The node instance extends PixiJS's `Container` class. Only the properties and methods that the node adds are listed below. For the full set of capabilities, see [Container-related Properties and Methods](https://pixijs.download/release/docs/scene.Container.html).

## Properties

### id

- **Type**: `string`
- **Description**: The node ID.

### type

- **Type**: [`NodeType`](/en/guide/types/#nodetype)
- **Description**: The node type.

### data

- **Type**: [`NodeAttributes`](/en/guide/types/#nodeattributes)
- **Description**: The raw data of the node.

### options

- **Type**: `NodeOptions`
- **Description**: The node options.

### state

- **Type**: `string`
- **Description**: The node state. When read, it returns the current state; you can also assign to it directly to change the node's state.

### locked

- **Type**: `boolean`
- **Description**: Whether the node's position is locked. When `true`, dragging the node locks its position and it no longer participates in dynamic layout iterations (only takes effect when `layout` is `d3-force`).

### node

- **Type**: [`Container`](https://pixijs.download/release/docs/scene.Container.html)
- **Description**: The node element.

### nodeLabel

- **Type**: [`Container`](https://pixijs.download/release/docs/scene.Container.html)
- **Description**: The node label element.

### bounds

- **Type**: `[number, number]`
- **Description**: The width and height of the node's bounding box.

### segments

- **Type**: [`Segment[]`](#segment)
- **Description**: The outline segments of the node, composed of multiple [`Segment`](#segment) entries.

## Methods

### Configuration Retrieval

#### getNodeConfig

- **Parameters**: None
- **Returns**: `object`
- **Description**: Gets the node's options.

#### getNodeLabelConfig

- **Parameters**: None
- **Returns**: `object`
- **Description**: Gets the node label's options.

### Drawing

#### draw

- **Parameters**: None
- **Returns**: None
- **Description**: Executes [`drawNode`](#drawnode) and [`drawLabel`](#drawlabel) to draw the node and the node label.

#### beforeDraw

- **Parameters**: None
- **Returns**: None
- **Description**: A hook function executed before drawing the node and the node label, used to extend the node.

#### beforeDrawNode

- **Parameters**: None
- **Returns**: None
- **Description**: A hook function executed before [`drawNode`](#drawnode), used to extend the node.

#### drawNode

- **Parameters**: None
- **Returns**: None
- **Description**: Redraws the node.

#### afterDrawNode

- **Parameters**: None
- **Returns**: None
- **Description**: A hook function executed after the node is drawn, used to extend the node.

#### beforeDrawLabel

- **Parameters**: None
- **Returns**: None
- **Description**: A hook function executed before the node label is drawn, used to extend the node label.

#### drawLabel

- **Parameters**: None
- **Returns**: None
- **Description**: Draws the node label.

#### afterDrawLabel

- **Parameters**: None
- **Returns**: None
- **Description**: A hook function executed after the node label is drawn, used to extend the node label.

#### afterDraw

- **Parameters**: None
- **Returns**: None
- **Description**: A hook function executed after the node and the node label are drawn, used to extend the node.

### Update

#### beforeUpdate

- **Parameters**: None
- **Returns**: None
- **Description**: A hook function executed before the update, used to extend the node.

#### update

- **Parameters**: None
- **Returns**: None
- **Description**: Updates the node. This function is executed after layout, updating the node's outline (the [`segments`](#segments) property) and position information.

#### afterUpdate

- **Parameters**: None
- **Returns**: None
- **Description**: A hook function executed after the node is updated, used to extend the node.

## Hook Execution Order

When extending a node, it is important to understand the execution order of the hooks:

**Drawing flow**

1. `beforeDraw`
2. `beforeDrawNode`
3. `drawNode`
4. `afterDrawNode`
5. `beforeDrawLabel`
6. `drawLabel`
7. `afterDrawLabel`
8. `afterDraw`

**Update flow**

1. `beforeUpdate`
2. `update`
3. `afterUpdate`

## Types

### Segment

```ts
type Segment = { p1: Point; p2: Point };
```

`Segment` represents a line segment defined by two endpoints, both of which are of type [`Point`](/en/guide/types/#point).

| Property | Type                              | Description                     |
| :------- | :-------------------------------- | :------------------------------ |
| `p1`     | [`Point`](/en/guide/types/#point) | The start point of the segment. |
| `p2`     | [`Point`](/en/guide/types/#point) | The end point of the segment.   |

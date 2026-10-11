# Edge Instance

The edge instance extends PixiJS's `Container` class. Only the properties and methods that the edge adds are listed below. For the full set of capabilities, see [Container-related Properties and Methods](https://pixijs.download/release/docs/scene.Container.html).

## Properties

### id

- **Type**: `string`
- **Description**: The edge ID.

### type

- **Type**: `string`
- **Description**: The type of the edge.

### data

- **Type**: [`EdgeAttributes`](/en/guide/types/#edgeattributes)
- **Description**: The raw data of the edge.

### options

- **Type**: `EdgeOptions`
- **Description**: The edge options.

### state

- **Type**: `string`
- **Description**: The current state of the edge. Setting `state` will redraw the edge as needed.

### source

- **Type**: `BaseNode`
- **Description**: The source node of the edge.

### target

- **Type**: `BaseNode`
- **Description**: The target node of the edge.

### isSelfLoop

- **Type**: `boolean`
- **Description**: Whether the edge is a self-loop edge.

### isDirected

- **Type**: `boolean`
- **Description**: Whether the edge is a directed edge.

### direction

- **Type**: `number`
- **Description**: Direction flag. `source → target` is `1`, and `target → source` is `-1`.

### edgeCount

- **Type**: `number`
- **Description**: The total number of edges connecting the `source` and `target` nodes.

### edgeIndex

- **Type**: `number`
- **Description**: The index of the edge between `source` and `target`, indicating which edge it is.

### sepCount

- **Type**: `number`
- **Description**: The index symmetric with respect to the `source → target` line.

### dx

- **Type**: `number`
- **Description**: `target.x - source.x`.

### dy

- **Type**: `number`
- **Description**: `target.y - source.y`.

### angle

- **Type**: `number`
- **Description**: The angle of the edge. Self-loop edges return `0`; other edge types return `Math.atan2(dy, dx)`.

### isAuto

- **Type**: `boolean`
- **Description**: Whether the edge type is `auto`.

### isQuadratic

- **Type**: `boolean`
- **Description**: Whether the edge type is `quadratic`.

### isCubic

- **Type**: `boolean`
- **Description**: Whether the edge type is `cubic`.

### edge

- **Type**: `Container`
- **Description**: The edge element.

### edgeArrow

- **Type**: `Container`
- **Description**: The edge arrow element.

### edgeLabel

- **Type**: `Container`
- **Description**: The edge label element.

### edgePoints

- **Type**: [`Point[]`](/en/guide/types/#point)
- **Description**: The points along the edge; the edge is formed by connecting these points.

### edgeArrowPoints

- **Type**: [`EdgeArrowPoints`](#type-edgearrowpoints)
- **Description**: The position information of the edge arrow's head and tail.

### edgeLabelPointAttr

- **Type**: [`EdgeLabelPointAttr`](#type-edgelabelpointattr)
- **Description**: The coordinate information and rotation angle of the edge label.

## Methods

### Configuration Retrieval

#### getEdgeConfig

- **Parameters**: None
- **Returns**: `object`
- **Description**: Gets the edge options.

#### getBezierConfig

- **Parameters**: None
- **Returns**: `object`
- **Description**: Gets the Bezier options.

#### getEdgeLabelConfig

- **Parameters**: None
- **Returns**: `object`
- **Description**: Gets the edge label options.

#### getEdgeArrowConfig

- **Parameters**: None
- **Returns**: `object`
- **Description**: Gets the edge arrow options.

### Drawing

#### drawEdge

- **Parameters**: None
- **Returns**: None
- **Description**: Draws the edge.

#### drawEdgeArrow

- **Parameters**: None
- **Returns**: None
- **Description**: Draws the edge arrow.

#### drawEdgeLabel

- **Parameters**: None
- **Returns**: None
- **Description**: Draws the edge label.

### Update

#### update

- **Parameters**: None
- **Returns**: None
- **Description**: Updates the edge.

### Setters

#### setEdgePoints

- **Parameters**: `...args: any[]`
- **Returns**: None
- **Description**: Sets the value of the [`edgePoints`](#edgepoints) property.

#### setEdgeArrowPoints

- **Parameters**: `...args: any[]`
- **Returns**: None
- **Description**: Sets the value of the [`edgeArrowPoints`](#type-edgearrowpoints) property.

#### setEdgeLabelPointAttr

- **Parameters**: `...args: any[]`
- **Returns**: None
- **Description**: Sets the value of the [`edgeLabelPointAttr`](#type-edgelabelpointattr) property.

## Types

### EdgeArrowPoints {#type-edgearrowpoints}

```ts
type EdgeArrowPoints = { head: Point; tail: Point };
```

`EdgeArrowPoints` represents the position information of the edge arrow's head and tail.

| Property | Type                              | Description                       |
| :------- | :-------------------------------- | :-------------------------------- |
| `head`   | [`Point`](/en/guide/types/#point) | The position of the arrow's head. |
| `tail`   | [`Point`](/en/guide/types/#point) | The position of the arrow's tail. |

### EdgeLabelPointAttr {#type-edgelabelpointattr}

```ts
type EdgeLabelPointAttr = { x: number; y: number; rotation: number };
```

`EdgeLabelPointAttr` represents the coordinates and rotation angle of the edge label.

| Property   | Type     | Description                      |
| :--------- | :------- | :------------------------------- |
| `x`        | `number` | The x-coordinate of the label.   |
| `y`        | `number` | The y-coordinate of the label.   |
| `rotation` | `number` | The rotation angle of the label. |

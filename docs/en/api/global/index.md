# Global API

The global exports include classes related to graphs, nodes, edges, and layouts, as well as methods for extension registration and theme generation. They can be imported directly from the package.

```ts
import { GraphVis, BaseNode, register } from "@zjfcool/graph-vis";
```

- **Classes**: Graph (`GraphVis`), nodes (`BaseNode` and its shape subclasses), edges (`BaseEdge` and its type subclasses), layouts (`BaseLayout` and its layout subclasses).
- **Methods**: Extension registration (`register`, `getExtension`, etc.) and theme generation (`generatePigment`, `generateThemeByPigment`, etc.).

## Classes

### Graph

#### GraphVis

- **Parameters**: `options: GraphVisOptions`
- **Returns**: A `GraphVis` instance
- **Description**: The graph class.

### Node

#### BaseNode

- **Parameters**: `id: string, options: NodeOptions, data: NodeAttributes`
- **Returns**: None
- **Description**: The abstract base class for nodes. All other node types inherit from `BaseNode`.

#### CircleNode

- **Parameters**: `id: string, options: NodeOptions, data: NodeAttributes`
- **Returns**: A `CircleNode` instance
- **Description**: The node class whose `type` is `circle`.

#### EllipseNode

- **Parameters**: `id: string, options: NodeOptions, data: NodeAttributes`
- **Returns**: An `EllipseNode` instance
- **Description**: The node class whose `type` is `ellipse`.

#### BitmapTextNode

- **Parameters**: `id: string, options: NodeOptions, data: NodeAttributes`
- **Returns**: A `BitmapTextNode` instance
- **Description**: The node class whose `type` is `bitmap-text`.

#### ImageNode

- **Parameters**: `id: string, options: NodeOptions, data: NodeAttributes`
- **Returns**: An `ImageNode` instance
- **Description**: The node class whose `type` is `image`.

#### PolygonNode

- **Parameters**: `id: string, options: NodeOptions, data: NodeAttributes`
- **Returns**: A `PolygonNode` instance
- **Description**: The node class whose `type` is `polygon`.

#### RectNode

- **Parameters**: `id: string, options: NodeOptions, data: NodeAttributes`
- **Returns**: A `RectNode` instance
- **Description**: The node class whose `type` is `rect`.

#### StarNode

- **Parameters**: `id: string, options: NodeOptions, data: NodeAttributes`
- **Returns**: A `StarNode` instance
- **Description**: The node class whose `type` is `star`.

#### TextNode

- **Parameters**: `id: string, options: NodeOptions, data: NodeAttributes`
- **Returns**: A `TextNode` instance
- **Description**: The node class whose `type` is `text`.

### Edge

#### BaseEdge

- **Parameters**: `id: string, options: EdgeOptions, data: EdgeAttributes`
- **Returns**: None
- **Description**: The abstract base class for edges. All other edges inherit from this base class.

#### AutoEdge

- **Parameters**: `id: string, options: EdgeOptions, data: EdgeAttributes`
- **Returns**: An `AutoEdge` instance
- **Description**: The edge class whose `type` is `auto`.

#### CubicEdge

- **Parameters**: `id: string, options: EdgeOptions, data: EdgeAttributes`
- **Returns**: A `CubicEdge` instance
- **Description**: The edge class whose `type` is `cubic`.

#### LineEdge

- **Parameters**: `id: string, options: EdgeOptions, data: EdgeAttributes`
- **Returns**: A `LineEdge` instance
- **Description**: The edge class whose `type` is `line`.

#### QuadraticEdge

- **Parameters**: `id: string, options: EdgeOptions, data: EdgeAttributes`
- **Returns**: A `QuadraticEdge` instance
- **Description**: The edge class whose `type` is `quadratic`.

#### Link

- **Parameters**: `options: EdgeOptions`
- **Returns**: A `Link` instance
- **Description**: The dynamic edge class used during interactive operations.

### Layout

#### BaseLayout

- **Parameters**: `graphology: Graph, options: T`
- **Returns**: None
- **Description**: The abstract base class for non-iterative layouts. The `Graph` type is the type provided by the graphology library, and `T` is a generic type representing the different `Options` of each layout. The `random` layout inherits from this class.

#### BaseLayoutWithInterations

- **Parameters**: `graphology: Graph, options: T`
- **Returns**: None
- **Description**: The abstract class for iterative layouts. The `d3-force` layout inherits from this class.

#### D3ForceLayout

- **Parameters**: `graphology: Graph, options: D3ForceLayoutOptions`
- **Returns**: A `D3ForceLayout` instance
- **Description**: The layout class whose `type` is `d3-force`.

#### RandomLayout

- **Parameters**: `graphology: Graph, options: RandomLayoutOptions`
- **Returns**: A `RandomLayout` instance
- **Description**: The layout class whose `type` is `random`.

## Methods

### Extension Registration

#### register

- **Parameters**: `category: string, type: string, obj: any`
- **Returns**: None
- **Description**: Registers an extension of the corresponding type globally. `category` is one of `theme | layout | node | edge`, `type` is the name of the corresponding `category`, and `obj` is the specific extension class, etc.

#### getExtension

- **Parameters**: `category: string, type: string`
- **Returns**: `any`
- **Description**: Gets the value of the specified `type` under the globally registered `category`.

#### getExtensions

- **Parameters**: `category: string`
- **Returns**: `object`
- **Description**: Gets all values under the globally registered `category`.

#### getExtensionsKeys

- **Parameters**: `category: string`
- **Returns**: `string[]`
- **Description**: Gets the keys of all values under the globally registered `category`.

### Theme Generation

#### generatePigment

- **Parameters**: `primary: string, mode: 'light' | 'dark'`
- **Returns**: `{ nodeColor: string; edgeColor: string; backgroundColor: string }`
- **Description**: Generates an object containing the node color, edge color, and background color based on the provided primary color and mode.

#### generateThemeByPigment

- **Parameters**: `pigment: { nodeColor: string; edgeColor: string; backgroundColor: string }`
- **Returns**: `Theme`
- **Description**: Generates a theme configuration based on the node color, edge color, and background color provided in the argument.

#### generateThemeByPrimaryColor

- **Parameters**: `primaryColor: string, mode: 'light' | 'dark'`
- **Returns**: `Theme`
- **Description**: Generates a theme configuration based on the primary color and mode.

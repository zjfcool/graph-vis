# Graph GraphVis

Using `@zjfcool/graph-vis` does not require a full understanding of `PixiJS`. You only need to know the essential options and follow the configuration guide to visualize your graph.

## Graph Lifecycle

1. **Create a graph instance**

```js
const graph = new GraphVis(options);
```

2. **Initialize**

Call the asynchronous `init` method to complete initialization. Before that, some of the graph's methods (such as those related to layout and drawing) are not yet available, but you can set up event listeners in advance via `.on`.

```js
await graph.init();
```

3. **Render**

Rendering is handled internally; after modifying node / edge data, the canvas is automatically refreshed on the next frame.

4. **Update**

After initialization, call the various APIs provided by the instance to dynamically operate on graph data and styles.

5. **Destroy the graph instance**

`destroy` is used to completely destroy the graph instance and release the related resources. The instance can no longer be used after being destroyed.

```js
graph.destroy();
```

## Graph Options (GraphVisOptions)

`GraphVisOptions` extends [ApplicationOptions](https://pixijs.download/release/docs/app.ApplicationOptions.html). The main properties are listed below.

| Property           | Type                                 | Default                   | Description                                                                                               |
| :----------------- | :----------------------------------- | :------------------------ | :-------------------------------------------------------------------------------------------------------- |
| container          | `string` \| `HTMLElement`            | `document.body`           | The graph container; a CSS selector or an HTMLElement                                                     |
| width              | `number`                             | `500`                     | The width of the graph                                                                                    |
| height             | `number`                             | `500`                     | The height of the graph                                                                                   |
| type               | `GraphologyType`                     | `mixed`                   | The type of the graph                                                                                     |
| multi              | `boolean`                            | `true`                    | Whether the graph allows multiple edges                                                                   |
| allowSelfLoops     | `boolean`                            | `true`                    | Whether the graph allows self-loop edges                                                                  |
| background         | `ColorSource`                        | `#F8F9FB`                 | The background color of the graph; [details](https://pixijs.download/release/docs/color.ColorSource.html) |
| resolution         | `number`                             | `window.devicePixelRatio` | Device pixel ratio                                                                                        |
| data               | `GraphAttributes`                    | `{nodes:[],edges:[]}`     | Graph data                                                                                                |
| interactable       | `boolean`                            | `true`                    | Whether to allow interaction with the graph                                                               |
| resizeTo           | `HTMLElement` \| `Window`            | -                         | Automatically resize and reposition the graph to fit an element.                                          |
| resizeDebounceTime | `number`                             | `500`                     | The delay before the listener runs when the resize event is triggered, in ms                              |
| layout             | [`LayoutOptions`](/en/guide/layout/) | -                         | Layout options for the graph                                                                              |
| node               | [`NodeOptions`](/en/guide/node/)     | -                         | Options for graph nodes                                                                                   |
| edge               | [`EdgeOptions`](/en/guide/edge/)     | -                         | Options for graph edges                                                                                   |
| link               | [`LinkOptions`](/en/guide/link/)     | -                         | Options for the dynamic link shown when editing edges in the graph                                        |
| zoom               | [`ZoomOptions`](/en/guide/zoom/)     | -                         | Options related to the graph's zoom and pan functionality                                                 |
| drag               | [`DragOptions`](/en/guide/drag/)     | -                         | Options related to the graph's node drag functionality                                                    |
| theme              | `string`                             | `light`                   | Options related to the graph's theme                                                                      |

::: info
Its options are extremely flexible: in `node`, `edge`, `link`, and other configurations, you can either use raw data directly or pass in functions to dynamically generate the corresponding properties.
:::

**Static value:**

```js
new GraphVis({
  node: {
    style: {
      fill: "red",
    },
  },
});
```

**Dynamically generated by a function:**

```js
new GraphVis({
  node: {
    style: {
      fill: (d) => (d.category === "important" ? "#ff4d4f" : "#409eff"),
    },
  },
});
```

`d` is the raw node data. `d.category` is not a built-in node property; you can only use it this way if the `category` field actually exists in your data.

::: tip
For more properties, see: [ApplicationOptions](https://pixijs.download/release/docs/app.ApplicationOptions.html)
:::

## Complete Example

The following example combines dynamic node styles, force-directed layout, event listening, and theme switching:

```js
import { GraphVis } from "@zjfcool/graph-vis";

async function init() {
  const container = document.getElementById("container");

  const graph = new GraphVis({
    container: container,
    width: container.clientWidth,
    height: container.clientHeight,
    background: "#f5f7fa",
    data: {
      nodes: [
        { id: "a", label: "Node A", category: "person", weight: 3 },
        { id: "b", label: "Node B", category: "company", weight: 5 },
        { id: "c", label: "Node C", category: "person", weight: 1 },
        { id: "d", label: "Node D", category: "location", weight: 2 },
      ],
      edges: [
        { source: "a", target: "b", weight: 2 },
        { source: "b", target: "c", weight: 1 },
        { source: "c", target: "d", weight: 3 },
        { source: "d", target: "a", weight: 1 },
      ],
    },

    // Dynamic node styles
    node: {
      type: "circle",
      size: (d) => d.weight * 8 + 20,
      style: {
        fill: (d) => {
          const colorMap = {
            person: "#409eff",
            company: "#67c23a",
            location: "#e6a23c",
          };
          return colorMap[d.category] || "#909399";
        },
        stroke: "#ffffff",
      },
      labelConfig: {
        style: {
          visible: true,
          color: "#303133",
          fontSize: 12,
        },
      },
    },

    // Edge styles
    edge: {
      type: "line",
      style: {
        stroke: {
          color: "#c0c4cc",
          width: (d) => d.weight || 1,
        },
      },
      arrowConfig: {
        style: {
          visible: true,
          size: [8, 6],
        },
      },
    },

    // Force-directed layout
    layout: {
      type: "d3-force",
      warmTicks: 0,
      cooldownTicks: Infinity,
      cooldownTime: 1500,
      collide: {
        radius: 20,
        strength: 0.1,
      },
      link: {
        id: (d) => d.id,
        distance: 90,
        strength: 0.2,
      },
      manyBody: {
        strength: -20,
      },
      alphaDecay: 0.01,
    },
    // Zoom and drag
    zoom: {
      enable: true,
    },
    drag: {
      enable: true,
    },
    theme: "light",
  });

  // Listeners can be set up before initialization
  graph.on("layout:end", () => {
    console.log("Layout finished");
    // Adjust the view after the layout finishes
    graph.zoomToFit();
  });

  await graph.init();
}

init();
```

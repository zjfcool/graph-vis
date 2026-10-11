# Layout Options (LayoutOptions)

`LayoutOptions` is used to configure how nodes are arranged in the graph. It is typically passed as the `layout` property of `GraphVisOptions`. GraphVis includes two built-in layout types, `d3-force` and `random`, and also supports registering custom layouts via `register`.

## 1. Options Quick Reference

| Property | Type     | Default | Description                                               |
| :------- | :------- | :------ | :-------------------------------------------------------- |
| `type`   | `string` | -       | Layout type; built-in options are `d3-force` and `random` |

> `type` determines how the remaining options are interpreted. When `d3-force` is selected, the other properties follow [`D3ForceLayoutOptions`](#d3forcelayoutoptions); when `random` is selected, the other properties follow [`RandomLayoutOptions`](#randomlayoutoptions).

## 2. Layout Type (`type`)

Built-in layout types:

- `d3-force`: Force-directed layout, built on top of [d3-force](https://d3js.org/d3-force). Suitable for showing the connection relationships and clustering structure between nodes.
- `random`: Random layout, which distributes nodes randomly within a specified area. Suitable for debugging or as the initial state for other layouts.

`type` is a string; simply specify the layout name:

```js
layout: {
  type: 'd3-force',
  // other options
}
```

You can also register a custom layout via `register` and then enable it using the corresponding name:

```js
import { register } from "@zjfcool/graph-vis";

register("layout", "my-layout", MyLayoutClass);

new GraphVis({
  layout: {
    type: "my-layout",
    // options for the custom layout
  },
});
```

::: tip
`MyLayoutClass` must extend `BaseLayout` (non-iterative layout) or `BaseLayoutWithInterations` (iterative layout), and implement the corresponding abstract methods and properties.
:::

## 3. D3ForceLayoutOptions {#d3forcelayoutoptions}

When `layout.type` is `d3-force`, the following options are supported:

| Property        | Type                                                           | Default    | Description                                                                                                        |
| :-------------- | :------------------------------------------------------------- | :--------- | :----------------------------------------------------------------------------------------------------------------- |
| `warmTicks`     | `number`                                                       | `0`        | How many times to pre-run the layout                                                                               |
| `cooldownTicks` | `number`                                                       | `Infinity` | How many times to run the layout before stopping                                                                   |
| `cooldownTime`  | `number`                                                       | `1500`     | Duration of the layout run, in ms                                                                                  |
| `alpha`         | `number`                                                       | `1`        | See [d3-force simulation.alpha](https://d3js.org/d3-force/simulation#simulation_alpha) for details                 |
| `alphaMin`      | `number`                                                       | `0.001`    | See [d3-force simulation.alphaMin](https://d3js.org/d3-force/simulation#simulation_alphaMin) for details           |
| `alphaDecay`    | `number`                                                       | `0.01`     | See [d3-force simulation.alphaDecay](https://d3js.org/d3-force/simulation#simulation_alphaDecay) for details       |
| `alphaTarget`   | `number`                                                       | `0`        | See [d3-force simulation.alphaTarget](https://d3js.org/d3-force/simulation#simulation_alphaTarget) for details     |
| `velocityDecay` | `number`                                                       | `0.4`      | See [d3-force simulation.velocityDecay](https://d3js.org/d3-force/simulation#simulation_velocityDecay) for details |
| `randomSource`  | `() => number`                                                 | -          | See [d3-force simulation.randomSource](https://d3js.org/d3-force/simulation#simulation_randomSource) for details   |
| `link`          | [`D3ForceLinkOptions`](#d3forcelinkoptions) \| `false`         | -          | See [d3-force link](https://d3js.org/d3-force/link) for details                                                    |
| `center`        | [`D3ForceCenterOptions`](#d3forcecenteroptions) \| `false`     | -          | See [d3-force center](https://d3js.org/d3-force/center) for details                                                |
| `collide`       | [`D3ForceCollideOptions`](#d3forcecollideoptions) \| `false`   | -          | See [d3-force collide](https://d3js.org/d3-force/collide) for details                                              |
| `manyBody`      | [`D3ForceManyBodyOptions`](#d3forcemanybodyoptions) \| `false` | -          | See [d3-force many-body](https://d3js.org/d3-force/many-body) for details                                          |
| `x`             | [`D3ForceXOptions`](#d3forcexoptions) \| `false`               | -          | See [d3-force position.forceX](https://d3js.org/d3-force/position#forceX) for details                              |
| `y`             | [`D3ForceYOptions`](#d3forceyoptions) \| `false`               | -          | See [d3-force position.forceY](https://d3js.org/d3-force/position#forceY) for details                              |
| `radial`        | [`D3ForceRadialOptions`](#d3forceradialoptions) \| `false`     | -          | See [d3-force position.forceRadial](https://d3js.org/d3-force/position#forceRadial) for details                    |

::: tip
Setting properties such as `link`, `center`, `collide`, `manyBody`, `x`, `y`, and `radial` to `false` disables the corresponding force, allowing you to customize the layout's behavior.
:::

### 3.1 D3ForceLinkOptions {#d3forcelinkoptions}

Controls the link force between edges and nodes. See [d3-force link](https://d3js.org/d3-force/link) for details.

| Property     | Type                             | Default       | Description                                                                       |
| :----------- | :------------------------------- | :------------ | :-------------------------------------------------------------------------------- |
| `id`         | `(d: any) => string`             | `(d) => d.id` | See [link.id](https://d3js.org/d3-force/link#link_id) for details                 |
| `distance`   | `number \| ((d: any) => number)` | `90`          | See [link.distance](https://d3js.org/d3-force/link#link_distance) for details     |
| `strength`   | `number \| ((d: any) => number)` | `0.2`         | See [link.strength](https://d3js.org/d3-force/link#link_strength) for details     |
| `iterations` | `number`                         | -             | See [link.iterations](https://d3js.org/d3-force/link#link_iterations) for details |

### 3.2 D3ForceCenterOptions {#d3forcecenteroptions}

Fixes the layout's center point to a specified position. See [d3-force center](https://d3js.org/d3-force/center) for details.

| Property   | Type     | Default | Description                                                                         |
| :--------- | :------- | :------ | :---------------------------------------------------------------------------------- |
| `x`        | `number` | `0`     | See [center.x](https://d3js.org/d3-force/center#center_x) for details               |
| `y`        | `number` | `0`     | See [center.y](https://d3js.org/d3-force/center#center_y) for details               |
| `strength` | `number` | `1`     | See [center.strength](https://d3js.org/d3-force/center#center_strength) for details |

### 3.3 D3ForceCollideOptions {#d3forcecollideoptions}

Prevents nodes from overlapping. See [d3-force collide](https://d3js.org/d3-force/collide) for details.

| Property     | Type                             | Default | Description                                                                                |
| :----------- | :------------------------------- | :------ | :----------------------------------------------------------------------------------------- |
| `radius`     | `number \| ((d: any) => number)` | `20`    | See [collide.radius](https://d3js.org/d3-force/collide#collide_radius) for details         |
| `strength`   | `number`                         | `0.1`   | See [collide.strength](https://d3js.org/d3-force/collide#collide_strength) for details     |
| `iterations` | `number`                         | -       | See [collide.iterations](https://d3js.org/d3-force/collide#collide_iterations) for details |

### 3.4 D3ForceManyBodyOptions {#d3forcemanybodyoptions}

The many-body force between nodes (attraction or repulsion). See [d3-force many-body](https://d3js.org/d3-force/many-body) for details.

| Property      | Type                                            | Default    | Description                                                                                      |
| :------------ | :---------------------------------------------- | :--------- | :----------------------------------------------------------------------------------------------- |
| `strength`    | `number \| ((d: any, index: number) => number)` | `-20`      | See [manyBody.strength](https://d3js.org/d3-force/many-body#manyBody_strength) for details       |
| `theta`       | `number`                                        | `0.9`      | See [manyBody.theta](https://d3js.org/d3-force/many-body#manyBody_theta) for details             |
| `distanceMin` | `number`                                        | `1`        | See [manyBody.distanceMin](https://d3js.org/d3-force/many-body#manyBody_distanceMin) for details |
| `distanceMax` | `number`                                        | `Infinity` | See [manyBody.distanceMax](https://d3js.org/d3-force/many-body#manyBody_distanceMax) for details |

### 3.5 D3ForceXOptions {#d3forcexoptions}

Pushes nodes along the x-axis toward a specified position. See [d3-force position.forceX](https://d3js.org/d3-force/position#forceX) for details.

| Property   | Type                             | Default | Description                                                                 |
| :--------- | :------------------------------- | :------ | :-------------------------------------------------------------------------- |
| `strength` | `number \| ((d: any) => number)` | `0.1`   | See [x.strength](https://d3js.org/d3-force/position#x_strength) for details |
| `x`        | `number \| ((d: any) => number)` | `0`     | See [x.x](https://d3js.org/d3-force/position#x_x) for details               |

### 3.6 D3ForceYOptions {#d3forceyoptions}

Pushes nodes along the y-axis toward a specified position. See [d3-force position.forceY](https://d3js.org/d3-force/position#forceY) for details.

| Property   | Type                             | Default | Description                                                                 |
| :--------- | :------------------------------- | :------ | :-------------------------------------------------------------------------- |
| `strength` | `number \| ((d: any) => number)` | -       | See [y.strength](https://d3js.org/d3-force/position#y_strength) for details |
| `y`        | `number \| ((d: any) => number)` | -       | See [y.y](https://d3js.org/d3-force/position#y_y) for details               |

### 3.7 D3ForceRadialOptions {#d3forceradialoptions}

Pushes nodes toward a specified ring. See [d3-force position.forceRadial](https://d3js.org/d3-force/position#forceRadial) for details.

| Property   | Type                             | Default | Description                                                                           |
| :--------- | :------------------------------- | :------ | :------------------------------------------------------------------------------------ |
| `strength` | `number \| ((d: any) => number)` | `0.1`   | See [radial.strength](https://d3js.org/d3-force/position#radial_strength) for details |
| `radius`   | `number \| ((d: any) => number)` | -       | See [radial.radius](https://d3js.org/d3-force/position#radial_radius) for details     |
| `x`        | `number`                         | `0`     | See [radial.x](https://d3js.org/d3-force/position#radial_x) for details               |
| `y`        | `number`                         | `0`     | See [radial.y](https://d3js.org/d3-force/position#radial_y) for details               |

## 4. RandomLayoutOptions {#randomlayoutoptions}

When `layout.type` is `random`, the following options are supported:

| Property | Type               | Default  | Description                                                                           |
| :------- | :----------------- | :------- | :------------------------------------------------------------------------------------ |
| `width`  | `number`           | `500`    | The width of the random layout                                                        |
| `height` | `number`           | `500`    | The height of the random layout                                                       |
| `center` | `[number, number]` | `[0, 0]` | The center point, indicating around which center the random distribution is performed |

## 5. Complete Example

### 5.1 d3-force Layout

```js
import { GraphVis } from "@zjfcool/graph-vis";

new GraphVis({
  // ... other options
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
});
```

### 5.2 random Layout

```js
import { GraphVis } from "@zjfcool/graph-vis";

new GraphVis({
  // ... other options
  layout: {
    type: "random",
    width: 800,
    height: 600,
    center: [400, 300],
  },
});
```

### 5.3 Custom Layout

```js
import { GraphVis, register, BaseLayout, BaseLayoutWithInterations } from "@zjfcool/graph-vis";

// Non-iterative layout: extend BaseLayout
class MyStaticLayout extends BaseLayout {
  // Implement abstract methods and properties
}

// Iterative layout: extend BaseLayoutWithInterations
class MyIterativeLayout extends BaseLayoutWithInterations {
  // Implement abstract methods and properties
}

register("layout", "my-static-layout", MyStaticLayout);
register("layout", "my-iterative-layout", MyIterativeLayout);

new GraphVis({
  // ... other options
  layout: {
    type: "my-static-layout",
    // options for the custom layout
  },
});
```

## 6. Notes

1. **Layout type is required**: `layout.type` is required; if it is not specified, no layout will be started.
2. **Option compatibility**: Different layout types accept different options. For example, `d3-force` layout options such as `link` and `collide` do not take effect in the `random` layout.
3. **Iterations**: `d3-force` is an iterative layout, and you can control the number and duration of iterations via `cooldownTicks` and `cooldownTime`.
4. **Dynamic switching**: After initialization, you can dynamically switch layout type and options via `graph.setLayoutOptions()`.
5. **Layout control**: You can pause the layout via `graph.stopLayout()` and restart it via `graph.restartLayout()`.
6. **Custom layouts**: Register a custom layout via `register('layout', 'your-layout', YourLayoutClass)`, then enable it with `layout.type: 'your-layout'`. `YourLayoutClass` must extend `BaseLayout` (non-iterative layout) or `BaseLayoutWithInterations` (iterative layout), and implement the corresponding abstract methods and properties.

With the options above, you can flexibly control how nodes are arranged in the graph, so as to better present the structure and relationships of your data.

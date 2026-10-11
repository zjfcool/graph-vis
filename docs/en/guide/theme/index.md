# Theme Options

The theme is used to configure the overall visual style of nodes, edges, links, and the background in the graph in a unified way. With themes, you can switch between different color schemes with a single click, without having to modify the styles of nodes and edges one by one. The theme is typically passed as the `theme` property of `GraphVisOptions`.

GraphVis includes the built-in `light` and `dark` themes, and also supports registering custom themes via `register`.

## 1. Options Quick Reference

| Property | Type     | Default | Description                                         |
| :------- | :------- | :------ | :-------------------------------------------------- |
| `theme`  | `string` | `light` | Theme name; built-in options are `light` and `dark` |

## 2. Theme Structure

A theme is essentially an object containing the following properties, used to override the default configuration of nodes, edges, links, and the background:

```ts
type Theme = {
  node?: NodeOptions;
  edge?: EdgeOptions;
  link?: LinkOptions;
  background?: ColorSource;
};
```

| Property     | Type                                                                         | Description                                  |
| :----------- | :--------------------------------------------------------------------------- | :------------------------------------------- |
| `node`       | [`NodeOptions`](/en/guide/node/)                                             | Theme configuration related to nodes         |
| `edge`       | [`EdgeOptions`](/en/guide/edge/)                                             | Theme configuration related to edges         |
| `link`       | [`LinkOptions`](/en/guide/link/)                                             | Theme configuration related to dynamic links |
| `background` | [`ColorSource`](https://pixijs.download/release/docs/color.ColorSource.html) | The background color of the graph            |

## 3. Built-in Themes

GraphVis includes the following two themes:

| Theme Name | Style                                                                     |
| :--------- | :------------------------------------------------------------------------ |
| `light`    | Light theme, suitable for bright interface backgrounds; the default theme |
| `dark`     | Dark theme, suitable for dark interface backgrounds                       |

Usage:

```js
import { GraphVis } from "@zjfcool/graph-vis";

new GraphVis({
  // ... other options
  theme: "dark",
});
```

## 4. Custom Themes

### 4.1 Registering via `register`

Use the `register` method to register a custom theme globally, after which it can be used by its theme name.

```js
import { register, GraphVis } from "@zjfcool/graph-vis";

register("theme", "purple", {
  node: {
    // NodeOptions
  },
  edge: {
    // EdgeOptions
  },
  link: {
    // LinkOptions
  },
  background: "#F3E5F5",
});

new GraphVis({
  // ... other options
  theme: "purple",
});
```

### 4.2 Quick Generation via `generateThemeByPrimaryColor`

`generateThemeByPrimaryColor` is a convenience function that automatically generates a `Theme` object from just a primary color and a mode (`light` / `dark`).

```ts
function generateThemeByPrimaryColor(primaryColor: string, mode: "light" | "dark"): Theme;
```

| Parameter      | Type                | Description       |
| :------------- | :------------------ | :---------------- |
| `primaryColor` | `string`            | The primary color |
| `mode`         | `'light' \| 'dark'` | The theme style   |

Example:

```js
import { register, generateThemeByPrimaryColor, GraphVis } from "@zjfcool/graph-vis";

register("theme", "nature", generateThemeByPrimaryColor("#4CAF50", "dark"));

new GraphVis({
  // ... other options
  theme: "nature",
});
```

### 4.3 Fine-Grained Generation via `generateThemeByPigment`

If you want finer control over the theme's node color, edge color, and background color, you can first generate a pigment via `generatePigment`, and then generate the theme via `generateThemeByPigment`.

```ts
function generatePigment(
  primary: string,
  mode: "light" | "dark",
): {
  nodeColor: string;
  edgeColor: string;
  backgroundColor: string;
};

function generateThemeByPigment(pigment: {
  nodeColor: string;
  edgeColor: string;
  backgroundColor: string;
}): Theme;
```

Example:

```js
import { register, generatePigment, generateThemeByPigment, GraphVis } from "@zjfcool/graph-vis";

const pigment = generatePigment("#4CAF50", "dark");

register("theme", "nature", generateThemeByPigment(pigment));

new GraphVis({
  // ... other options
  theme: "nature",
});
```

## 5. Switching Themes

After initialization, you can dynamically switch themes via the `setThemeOptions` method:

```js
graph.setThemeOptions("dark");
```

Combined with UI controls, you can implement an interactive theme-switching effect:

```js
document.getElementById("theme-toggle").addEventListener("click", () => {
  const next = currentTheme === "light" ? "dark" : "light";
  graph.setThemeOptions(next);
  currentTheme = next;
});
```

## 6. Complete Example

The following example shows how to register and use a custom theme:

```js
import { GraphVis, register, generateThemeByPrimaryColor } from "@zjfcool/graph-vis";

// Register a custom theme
register("theme", "nature", generateThemeByPrimaryColor("#4CAF50", "light"));

async function init() {
  const container = document.getElementById("container");

  const graph = new GraphVis({
    container: container,
    width: container.clientWidth,
    height: container.clientHeight,
    theme: "nature",
    data: {
      nodes: [
        { id: "a", label: "Node A" },
        { id: "b", label: "Node B" },
        { id: "c", label: "Node C" },
      ],
      edges: [
        { source: "a", target: "b" },
        { source: "b", target: "c" },
        { source: "c", target: "a" },
      ],
    },
  });

  await graph.init();

  // Dynamically switch the theme
  // graph.setThemeOptions('dark')
}

init();
```

## 7. Notes

1. **Priority**: Configurations in `theme` are overridden by `node`, `edge`, `link`, and `background` explicitly specified in `GraphVisOptions`. Therefore, you can fine-tune some properties while still using a theme.
2. **Theme structure**: When defining a custom theme, you only need to provide the properties you want to override; properties not provided continue to use the default values.
3. **Registration timing**: Registering a theme via `register` must be done before creating a `GraphVis` instance.
4. **Dynamic switching**: After initialization, you can dynamically switch themes via `setThemeOptions`, and the graph will be redrawn after switching.
5. **Theme extensibility**: A theme can override all configuration items for nodes, edges, and links, so you can design multiple themes for different scenarios (such as presentation-oriented or analysis-oriented).

With the options above, you can flexibly control the overall visual style of the graph and provide users with a better visual experience.

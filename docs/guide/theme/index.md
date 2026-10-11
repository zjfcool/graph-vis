# 主题配置项

主题（Theme）用于统一配置图中节点、边、连接线以及背景的整体视觉风格。通过主题，你可以在不同配色方案之间一键切换，而无需逐个修改节点和边的样式。主题通常作为 `GraphVisOptions` 的 `theme` 属性传入。

GraphVis 内置了 `light` 和 `dark` 两个主题，同时支持通过 `register` 注册自定义主题。

## 1. 配置项速查表

| 属性    | 类型     | 默认值  | 描述                           |
| :------ | :------- | :------ | :----------------------------- |
| `theme` | `string` | `light` | 主题名称，内置 `light`、`dark` |

## 2. 主题结构

一个主题本质上是一个包含以下属性的对象，用于覆盖节点、边、连接线以及背景的默认配置：

```ts
type Theme = {
  node?: NodeOptions;
  edge?: EdgeOptions;
  link?: LinkOptions;
  background?: ColorSource;
};
```

| 属性         | 类型                                                                         | 描述                       |
| :----------- | :--------------------------------------------------------------------------- | :------------------------- |
| `node`       | [`NodeOptions`](/guide/node/)                                                | 节点相关的主题配置项       |
| `edge`       | [`EdgeOptions`](/guide/edge/)                                                | 边相关的主题配置项         |
| `link`       | [`LinkOptions`](/guide/link/)                                                | 动态连接边相关的主题配置项 |
| `background` | [`ColorSource`](https://pixijs.download/release/docs/color.ColorSource.html) | 图的背景色                 |

## 3. 内置主题

GraphVis 内置了以下两个主题：

| 主题名称 | 风格                                   |
| :------- | :------------------------------------- |
| `light`  | 浅色主题，适合明亮的界面背景，默认主题 |
| `dark`   | 深色主题，适合暗色界面背景             |

使用方式：

```js
import { GraphVis } from "@zjfcool/graph-vis";

new GraphVis({
  // ... 其他配置
  theme: "dark",
});
```

## 4. 自定义主题

### 4.1 通过 `register` 注册

使用 `register` 方法可以将自定义主题注册到全局，之后即可通过主题名称使用。

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
  // ... 其他配置
  theme: "purple",
});
```

### 4.2 通过 `generateThemeByPrimaryColor` 快捷生成

`generateThemeByPrimaryColor` 是一个便捷函数，只需提供一个主题色和风格（`light` / `dark`），即可自动生成一个 `Theme` 对象。

```ts
function generateThemeByPrimaryColor(primaryColor: string, mode: "light" | "dark"): Theme;
```

| 参数           | 类型                | 描述     |
| :------------- | :------------------ | :------- |
| `primaryColor` | `string`            | 主题色   |
| `mode`         | `'light' \| 'dark'` | 主题风格 |

示例：

```js
import { register, generateThemeByPrimaryColor, GraphVis } from "@zjfcool/graph-vis";

register("theme", "nature", generateThemeByPrimaryColor("#4CAF50", "dark"));

new GraphVis({
  // ... 其他配置
  theme: "nature",
});
```

### 4.3 通过 `generateThemeByPigment` 精细生成

如果你希望更精细地控制主题的节点颜色、边颜色和背景颜色，可以先通过 `generatePigment` 生成色板，再通过 `generateThemeByPigment` 生成主题。

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

示例：

```js
import { register, generatePigment, generateThemeByPigment, GraphVis } from "@zjfcool/graph-vis";

const pigment = generatePigment("#4CAF50", "dark");

register("theme", "nature", generateThemeByPigment(pigment));

new GraphVis({
  // ... 其他配置
  theme: "nature",
});
```

## 5. 切换主题

初始化后，可以通过 `setThemeOptions` 方法动态切换主题：

```js
graph.setThemeOptions("dark");
```

结合 UI 控件，可以实现主题切换的交互效果：

```js
document.getElementById("theme-toggle").addEventListener("click", () => {
  const next = currentTheme === "light" ? "dark" : "light";
  graph.setThemeOptions(next);
  currentTheme = next;
});
```

## 6. 完整示例

以下示例展示了如何注册并使用自定义主题：

```js
import { GraphVis, register, generateThemeByPrimaryColor } from "@zjfcool/graph-vis";

// 注册自定义主题
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
        { id: "a", label: "节点 A" },
        { id: "b", label: "节点 B" },
        { id: "c", label: "节点 C" },
      ],
      edges: [
        { source: "a", target: "b" },
        { source: "b", target: "c" },
        { source: "c", target: "a" },
      ],
    },
  });

  await graph.init();

  // 动态切换主题
  // graph.setThemeOptions('dark')
}

init();
```

## 7. 注意事项

1. **优先级**：`theme` 中的配置会被 `GraphVisOptions` 中显式指定的 `node`、`edge`、`link`、`background` 覆盖。因此你可以在使用主题的同时，对部分属性进行微调。
2. **主题结构**：自定义主题时，只需提供需要覆盖的属性，未提供的属性会继续使用默认值。
3. **注册时机**：使用 `register` 注册主题必须在创建 `GraphVis` 实例之前完成。
4. **动态切换**：初始化后可以通过 `setThemeOptions` 动态切换主题，切换后图会重新绘制。
5. **主题扩展**：通过主题可以覆盖节点、边、连接线的全部配置项，因此可以针对不同场景（如展示型、分析型）设计多套主题。

通过以上配置，你可以灵活地控制图的整体视觉风格，为用户提供更好的视觉体验。

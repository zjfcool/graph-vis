# 布局配置项 (LayoutOptions)

`LayoutOptions` 用于配置图中节点的排列方式。它通常作为 `GraphVisOptions` 的 `layout` 属性传入。GraphVis 内置了 `d3-force` 与 `random` 两种布局类型，同时支持通过 `register` 注册自定义布局。

## 1. 配置项速查表

| 属性   | 类型     | 默认值 | 描述                                |
| :----- | :------- | :----- | :---------------------------------- |
| `type` | `string` | -      | 布局类型，内置 `d3-force`、`random` |

> `type` 决定了其余配置项如何解析。选择 `d3-force` 时，其他属性遵循 [`D3ForceLayoutOptions`](#d3forcelayoutoptions)；选择 `random` 时，其他属性遵循 [`RandomLayoutOptions`](#randomlayoutoptions)。

## 2. 布局类型 (type)

内置布局类型：

- `d3-force`：力导向布局，基于 [d3-force](https://d3js.org/d3-force) 实现，适用于展示节点之间的连接关系与聚类结构。
- `random`：随机布局，将节点随机分布在指定区域内，适合调试或作为其他布局的初始状态。

`type` 为字符串类型，直接指定布局名称：

```js
layout: {
  type: 'd3-force',
  // 其他配置
}
```

也可以通过 `register` 注册自定义布局，然后使用对应的名称启用：

```js
import { register } from "@zjfcool/graph-vis";

register("layout", "my-layout", MyLayoutClass);

new GraphVis({
  layout: {
    type: "my-layout",
    // 自定义布局的参数
  },
});
```

::: tip
`MyLayoutClass` 需继承 `BaseLayout`（不可迭代布局）或 `BaseLayoutWithInterations`（可迭代布局），并实现对应的抽象方法与属性。
:::

## 3. D3ForceLayoutOptions {#d3forcelayoutoptions}

当 `layout.type` 为 `d3-force` 时，支持以下配置项：

| 属性            | 类型                                                           | 默认值     | 描述                                                                                                          |
| :-------------- | :------------------------------------------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------ |
| `warmTicks`     | `number`                                                       | `0`        | 预先执行布局多少次                                                                                            |
| `cooldownTicks` | `number`                                                       | `Infinity` | 执行布局多少次停止布局                                                                                        |
| `cooldownTime`  | `number`                                                       | `1500`     | 执行布局的持续时间，单位 ms                                                                                   |
| `alpha`         | `number`                                                       | `1`        | 详情请参考 [d3-force simulation.alpha](https://d3js.org/d3-force/simulation#simulation_alpha)                 |
| `alphaMin`      | `number`                                                       | `0.001`    | 详情请参考 [d3-force simulation.alphaMin](https://d3js.org/d3-force/simulation#simulation_alphaMin)           |
| `alphaDecay`    | `number`                                                       | `0.01`     | 详情请参考 [d3-force simulation.alphaDecay](https://d3js.org/d3-force/simulation#simulation_alphaDecay)       |
| `alphaTarget`   | `number`                                                       | `0`        | 详情请参考 [d3-force simulation.alphaTarget](https://d3js.org/d3-force/simulation#simulation_alphaTarget)     |
| `velocityDecay` | `number`                                                       | `0.4`      | 详情请参考 [d3-force simulation.velocityDecay](https://d3js.org/d3-force/simulation#simulation_velocityDecay) |
| `randomSource`  | `() => number`                                                 | -          | 详情请参考 [d3-force simulation.randomSource](https://d3js.org/d3-force/simulation#simulation_randomSource)   |
| `link`          | [`D3ForceLinkOptions`](#d3forcelinkoptions) \| `false`         | -          | 详情请参考 [d3-force link](https://d3js.org/d3-force/link)                                                    |
| `center`        | [`D3ForceCenterOptions`](#d3forcecenteroptions) \| `false`     | -          | 详情请参考 [d3-force center](https://d3js.org/d3-force/center)                                                |
| `collide`       | [`D3ForceCollideOptions`](#d3forcecollideoptions) \| `false`   | -          | 详情请参考 [d3-force collide](https://d3js.org/d3-force/collide)                                              |
| `manyBody`      | [`D3ForceManyBodyOptions`](#d3forcemanybodyoptions) \| `false` | -          | 详情请参考 [d3-force many-body](https://d3js.org/d3-force/many-body)                                          |
| `x`             | [`D3ForceXOptions`](#d3forcexoptions) \| `false`               | -          | 详情请参考 [d3-force position.forceX](https://d3js.org/d3-force/position#forceX)                              |
| `y`             | [`D3ForceYOptions`](#d3forceyoptions) \| `false`               | -          | 详情请参考 [d3-force position.forceY](https://d3js.org/d3-force/position#forceY)                              |
| `radial`        | [`D3ForceRadialOptions`](#d3forceradialoptions) \| `false`     | -          | 详情请参考 [d3-force position.forceRadial](https://d3js.org/d3-force/position#forceRadial)                    |

::: tip
将 `link`、`center`、`collide`、`manyBody`、`x`、`y`、`radial` 等属性设为 `false` 可以禁用对应的力，从而自定义布局的行为。
:::

### 3.1 D3ForceLinkOptions {#d3forcelinkoptions}

控制边对节点的连接力，详情请参考 [d3-force link](https://d3js.org/d3-force/link)。

| 属性         | 类型                             | 默认值        | 描述                                                                         |
| :----------- | :------------------------------- | :------------ | :--------------------------------------------------------------------------- |
| `id`         | `(d: any) => string`             | `(d) => d.id` | 详情请参考 [link.id](https://d3js.org/d3-force/link#link_id)                 |
| `distance`   | `number \| ((d: any) => number)` | `90`          | 详情请参考 [link.distance](https://d3js.org/d3-force/link#link_distance)     |
| `strength`   | `number \| ((d: any) => number)` | `0.2`         | 详情请参考 [link.strength](https://d3js.org/d3-force/link#link_strength)     |
| `iterations` | `number`                         | -             | 详情请参考 [link.iterations](https://d3js.org/d3-force/link#link_iterations) |

### 3.2 D3ForceCenterOptions {#d3forcecenteroptions}

将布局的中心点固定到指定的位置，详情请参考 [d3-force center](https://d3js.org/d3-force/center)。

| 属性       | 类型     | 默认值 | 描述                                                                           |
| :--------- | :------- | :----- | :----------------------------------------------------------------------------- |
| `x`        | `number` | `0`    | 详情请参考 [center.x](https://d3js.org/d3-force/center#center_x)               |
| `y`        | `number` | `0`    | 详情请参考 [center.y](https://d3js.org/d3-force/center#center_y)               |
| `strength` | `number` | `1`    | 详情请参考 [center.strength](https://d3js.org/d3-force/center#center_strength) |

### 3.3 D3ForceCollideOptions {#d3forcecollideoptions}

防止节点之间重叠，详情请参考 [d3-force collide](https://d3js.org/d3-force/collide)。

| 属性         | 类型                             | 默认值 | 描述                                                                                  |
| :----------- | :------------------------------- | :----- | :------------------------------------------------------------------------------------ |
| `radius`     | `number \| ((d: any) => number)` | `20`   | 详情请参考 [collide.radius](https://d3js.org/d3-force/collide#collide_radius)         |
| `strength`   | `number`                         | `0.1`  | 详情请参考 [collide.strength](https://d3js.org/d3-force/collide#collide_strength)     |
| `iterations` | `number`                         | -      | 详情请参考 [collide.iterations](https://d3js.org/d3-force/collide#collide_iterations) |

### 3.4 D3ForceManyBodyOptions {#d3forcemanybodyoptions}

节点之间的多体力（吸引或排斥），详情请参考 [d3-force many-body](https://d3js.org/d3-force/many-body)。

| 属性          | 类型                                            | 默认值     | 描述                                                                                        |
| :------------ | :---------------------------------------------- | :--------- | :------------------------------------------------------------------------------------------ |
| `strength`    | `number \| ((d: any, index: number) => number)` | `-20`      | 详情请参考 [manyBody.strength](https://d3js.org/d3-force/many-body#manyBody_strength)       |
| `theta`       | `number`                                        | `0.9`      | 详情请参考 [manyBody.theta](https://d3js.org/d3-force/many-body#manyBody_theta)             |
| `distanceMin` | `number`                                        | `1`        | 详情请参考 [manyBody.distanceMin](https://d3js.org/d3-force/many-body#manyBody_distanceMin) |
| `distanceMax` | `number`                                        | `Infinity` | 详情请参考 [manyBody.distanceMax](https://d3js.org/d3-force/many-body#manyBody_distanceMax) |

### 3.5 D3ForceXOptions {#d3forcexoptions}

将节点沿 x 轴方向推向指定位置，详情请参考 [d3-force position.forceX](https://d3js.org/d3-force/position#forceX)。

| 属性       | 类型                             | 默认值 | 描述                                                                   |
| :--------- | :------------------------------- | :----- | :--------------------------------------------------------------------- |
| `strength` | `number \| ((d: any) => number)` | `0.1`  | 详情请参考 [x.strength](https://d3js.org/d3-force/position#x_strength) |
| `x`        | `number \| ((d: any) => number)` | `0`    | 详情请参考 [x.x](https://d3js.org/d3-force/position#x_x)               |

### 3.6 D3ForceYOptions {#d3forceyoptions}

将节点沿 y 轴方向推向指定位置，详情请参考 [d3-force position.forceY](https://d3js.org/d3-force/position#forceY)。

| 属性       | 类型                             | 默认值 | 描述                                                                   |
| :--------- | :------------------------------- | :----- | :--------------------------------------------------------------------- |
| `strength` | `number \| ((d: any) => number)` | -      | 详情请参考 [y.strength](https://d3js.org/d3-force/position#y_strength) |
| `y`        | `number \| ((d: any) => number)` | -      | 详情请参考 [y.y](https://d3js.org/d3-force/position#y_y)               |

### 3.7 D3ForceRadialOptions {#d3forceradialoptions}

将节点推向指定圆环，详情请参考 [d3-force position.forceRadial](https://d3js.org/d3-force/position#forceRadial)。

| 属性       | 类型                             | 默认值 | 描述                                                                             |
| :--------- | :------------------------------- | :----- | :------------------------------------------------------------------------------- |
| `strength` | `number \| ((d: any) => number)` | `0.1`  | 详情请参考 [radial.strength](https://d3js.org/d3-force/position#radial_strength) |
| `radius`   | `number \| ((d: any) => number)` | -      | 详情请参考 [radial.radius](https://d3js.org/d3-force/position#radial_radius)     |
| `x`        | `number`                         | `0`    | 详情请参考 [radial.x](https://d3js.org/d3-force/position#radial_x)               |
| `y`        | `number`                         | `0`    | 详情请参考 [radial.y](https://d3js.org/d3-force/position#radial_y)               |

## 4. RandomLayoutOptions {#randomlayoutoptions}

当 `layout.type` 为 `random` 时，支持以下配置项：

| 属性     | 类型               | 默认值   | 描述                               |
| :------- | :----------------- | :------- | :--------------------------------- |
| `width`  | `number`           | `500`    | 随机布局的宽度                     |
| `height` | `number`           | `500`    | 随机布局的高度                     |
| `center` | `[number, number]` | `[0, 0]` | 中心点，表示以哪个中心进行随机分布 |

## 5. 完整示例

### 5.1 d3-force 布局

```js
import { GraphVis } from "@zjfcool/graph-vis";

new GraphVis({
  // ... 其他配置
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

### 5.2 random 布局

```js
import { GraphVis } from "@zjfcool/graph-vis";

new GraphVis({
  // ... 其他配置
  layout: {
    type: "random",
    width: 800,
    height: 600,
    center: [400, 300],
  },
});
```

### 5.3 自定义布局

```js
import { GraphVis, register, BaseLayout, BaseLayoutWithInterations } from "@zjfcool/graph-vis";

// 不可迭代布局：继承 BaseLayout
class MyStaticLayout extends BaseLayout {
  // 实现抽象方法与属性
}

// 可迭代布局：继承 BaseLayoutWithInterations
class MyIterativeLayout extends BaseLayoutWithInterations {
  // 实现抽象方法与属性
}

register("layout", "my-static-layout", MyStaticLayout);
register("layout", "my-iterative-layout", MyIterativeLayout);

new GraphVis({
  // ... 其他配置
  layout: {
    type: "my-static-layout",
    // 自定义布局的参数
  },
});
```

## 6. 注意事项

1. **布局类型必填**：`layout.type` 为必填项，未指定时不会启动任何布局。
2. **属性兼容**：不同布局类型的配置项不同，例如 `d3-force` 布局的 `link`、`collide` 等属性在 `random` 布局中不会生效。
3. **迭代次数**：`d3-force` 是可迭代布局，可以通过 `cooldownTicks` 与 `cooldownTime` 控制迭代的次数和持续时间。
4. **动态切换**：初始化后，可以通过 `graph.setLayoutOptions()` 动态切换布局类型与配置。
5. **布局控制**：可以通过 `graph.stopLayout()` 暂停布局，通过 `graph.restartLayout()` 重启布局。
6. **自定义布局**：通过 `register('layout', 'your-layout', YourLayoutClass)` 注册自定义布局，然后使用 `layout.type: 'your-layout'` 启用。`YourLayoutClass` 需继承 `BaseLayout`（不可迭代布局）或 `BaseLayoutWithInterations`（可迭代布局），并实现对应的抽象方法与属性。

通过以上配置，你可以灵活地控制图中节点的排列方式，从而更好地展示数据的结构与关系。

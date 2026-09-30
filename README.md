# GraphVis
一个图可视化库, 支持上万节点、边的渲染,渲染层基于[PixiJS](https://github.com/pixijs/pixijs)。
## 示例

## 文档
### 快速开始
#### 1.直接使用
```html
<!-- 准备一个容器 -->
<div id="container" style="width: 500px; height: 500px"></div>
<!-- 引入pixi.js-->
<script src="https://cdn.jsdelivr.net/npm/pixi.js"></script>
<!-- 引入graph-vis-->
<script src="https://unpkg.com/@zjfcool/graph-vis"></script>
<script>
    const {GraphVis} = Graph;
    async function init (){
        const graph = new GraphVis({
            container:"#container", 
            data, // 默认: {edges:[],nodes:[]}
            width:container.clientWidth,
            height:container.clientHeight,
        });
        await graph.init();
    }
    init()
</script>
```
#### 2.安装使用
1. 安装依赖
```sh
npm install pixi.js @zjfcool/graph-vis
```
2. 基本使用

```javascript
// index.html 准备一个容器
<div id="container" style="width: 500px; height: 500px"></div>
// main.js 引入安装包
import {GraphVis} from "@zjfcool/graph-vis"
async function init(){
    const graph = new GraphVis({
        container:"#container", 
        data, // 默认: {edges:[],nodes:[]}
        width:container.clientWidth,
        height:container.clientHeight,
    })
    await graph.init();
}
init()
```
### 配置
#### 通用类型声明
```typescript
type Point = {x:number;y:number;}
type Segment = {p1:Point,p1:Point}
type NodeAttributes = {[key:string]:any}
type EdgeAttributes = {[key:string]:any};
type GraphAttributes = {
    nodes: NodeAttributes[];
    edges: EdgeAttributes[];
}
type AttrFunc<T = any, D = any> = (d?: D) => T;
type AttrType<T = any, D = any> = T | AttrFunc<T, D>;
type NodeType = "circle" | "ellipse" | "image" | "polygon" | "rect" | "text" | "bitmap-text" | "star" | (string & {});
type DrawBy = "sprite" | "graphics";
type TextType = string | number | {toString: () => string;};
/**
 * 递归遍历纯对象属性使其为转换为AttrType
 * 应用示例:
 * type A ={
 *  color: string;
 *  background:string;
 *  stroke:{
 *      width: number;
 *  }
 * }
 * 经过DataDriven,将转化为:
 * type A = {
 *   color: AttrType<string>;
 *   background: AttrType<string>;
 *   stroke: {
 *      width: AttrType<number>;
 *   }
 * }
 * 这样表示的意图为：
 * 每个属性值既可以使用原始类型也可以使用函数动态生成原始类型的内容
 */
type DataDriven<T, D = any> = T extends undefined
  ? undefined
  : T extends (...args: any[]) => any
    ? AttrType<T, D>
    : T extends any[]
      ? AttrType<T, D>
      : T extends NonRecursiveTypes
        ? AttrType<T, D>
        : T extends object
          ? { [K in keyof T]: DataDriven<T[K], D> }
          : AttrType<T, D>;
type GFillStyle<D = any> = DataDriven<FillStyle, D> | AttrType<FillInput, D>;
type GStrokeStyle<D = any> = DataDriven<StrokeStyle, D> | AttrType<StrokeInput, D>;
type GTextStyleOptions<D = any> = DataDriven<TextStyleOptions, D>;
type Placement = "center" | "left" | "right" | "top" | "bottom";
type LabelType = "text" | "bitmap-text";
type EdgeLabelPositionMode = "local" | "global";
type GraphologyType = `mixed`|`undirected`|`directed`;
```
#### 图配置项(GraphVisOptions)
GraphVisOptions继承[ApplicationOptions](https://pixijs.download/release/docs/app.ApplicationOptions.html)，主要属性有以下:
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---|:---|
|container| `string`\|`HTMLElement`|document.body|图容器,css selector 或者 HTMLElement|
|width|`number`|500|图的宽度|
|height|`number`|500|图的高度|
|type|`GraphologyType`|mixed|图的类型|
|multi|`boolean`|true|图是否允许多条边|
|allowSelfLoops|`boolean`|true|图是否允许有自循环边|
|background|`ColorSource`|`#F8F9FB`|图背景色，[详情](https://pixijs.download/release/docs/color.ColorSource.html)|
|resolution|`number`|window.devicePixelRatio|设备像素比｜
|data|`GraphAttributes`|{nodes:[],edges:[]}|图数据|
|interactable|`boolean`|true|是否允许图的交互行为|
|resizeTo|`HTMLElement`\| `Window`|-|用一个元素自动调整图的位置与大小。|
|resizeDebounceTime|`number`|500|resize事件触发时监听函数延时执行时间,单位ms|
|layout|`LayoutOptions`|-|图的布局配置项|
|node|`NodeOptions`|-|图节点的配置项|
|edge|`EdgeOptions`|-|图边的配置项|
|link|`LinkOptions`|-|图在进行边的编辑时,那条动态连接边的配置项|
|zoom|`ZoomOptions`|-|图缩放平移功能的相关配置项|
|drag|`DragOptions`|-|图节点拖拽功能的相关配置项|
|theme|`string`|light|图主题的相关配置|

更多属性请查看:[ApplicationOptions](https://pixijs.download/release/docs/app.ApplicationOptions.html)
#### 节点配置项(NodeOptions)

| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---|:---|
|type|`AttrType<NodeType>`|circle|节点的类型|
|drawBy|`AttrType<DrawBy>`|graphics|节点基于[Graphics](https://pixijs.download/release/docs/scene.Graphics.html)或[Sprite](https://pixijs.download/release/docs/scene.Sprite.html)进行绘画|
|state|`NodeStateOptions`|-|节点状态配置项|
|textValue| `AttrType<TextType>`|-|当节点类型为`text`或`bitmap-text`时生效,返回内容最终渲染为文本节点|
|style|`NodeStyleOptions`|-|节点样式配置项|
|labelConfig|`NodeLabelConfigOptions`|-|节点标签配置项|

##### 节点样式配置项(NodeStyleOptions)
| 属性 | 类型 | 默认值 | 描述 |drawBy|
|:---|:---|:---:|:---|:---:|
|visible|`AttrType<boolean>`|true|节点显示或隐藏|-|
|size|`AttrType<number \| [number, number] \| number[]>`|20|节点大小尺寸|-|
|pointNum|`AttrType<number>`|-|节点类型为star时表示star有pointNum个角,节点类型为polygon时为pointNum边形,对其他节点类型不生效|-|
|rotation|`AttrType<number>`|0|节点旋转角度|-|
|imgUrl|`AttrType<string>`|-|节点类型为image时才生效,表示图片的地址|-|
|radius|`AttrType<number>`|0|节点类型为rect时才生效,表示圆角值|graphics|
|fill|`GFillStyle`|-|节点填充的样式,[FillStyle详情](https://pixijs.download/release/docs/scene.FillStyle.html),[FillInput详情](https://pixijs.download/release/docs/scene.FillInput.html)|graphics|
|stroke|`GStrokeStyle`|-|节点边的样式,[StrokeStyle](https://pixijs.download/release/docs/scene.StrokeStyle.html),[StrokeInput](https://pixijs.download/release/docs/scene.StrokeInput.html)|graphics|
|halo|`AttrType<boolean>`|false|节点背景隐藏或显示|graphics|
|haloFill|`GFillStyle`|-|节点背景填充样式|graphics|
|haloStroke|`GStrokeStyle`|-|节点背景边样式|graphics|
|haloSpacing|`AttrType<number>`|3|节点背景边与节点边的间距|-|
|haloRadius|`AttrType<number>`|0|当节点类型为rect时,节点背景圆角值|graphics|
|haloTint|`AttrType<ColorSource>`|`#F8F9FB`|节点drawBy为sprite时生效，为节点背景的填充色|sprite|
|haloAlpha|`AttrType<number>`|0.55|节点drawBy为sprite时生效,节点背景的透明度|sprite|
|tint|`AttrType<ColorSource>`|`#F8F9FB`|节点drawBy为sprite时生效,表示节点颜色|sprite|
|alpha|`AttrType<number>`|1|节点drawBy为sprite时生效,表示节点透明度|sprite|

当节点类型为text或bitmap-text时会增多一些属性[TextStyleOptions](https://pixijs.download/release/docs/text.TextStyleOptions.html),这些属性类型都会映射为`AttrType<T>`。
##### 节点标签配置项(NodeLabelConfigOptions)
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|type|`AttrType<LabelType>`|text|使用text\|bitmap-text绘画文本内容|
|drawBy|`AttrType<DrawBy>`|-|默认继承上级drawBy配置，如果设置将使用设置后的drawBy,这里的drawBy会应用到label背景上|
|labelText|`AttrType<TextType>`|(d)=>d.label|设置要显示的文本内容|
|style|`NodeLabelStyleOptions`|-|label样式配置项|
##### 节点标签样式配置项(NodeLabelStyleOptions)
| 属性 | 类型 | 默认值 | 描述 |drawBy|
|:---|:---|:---:|:---|:---:|
|visible|`AttrType<boolean>`|true|节点标签的现实与隐藏|-|
|placement|`Placement`|right|节点标签整体位置的设置|-|
|offsetY|`AttrType<number>`|0|节点标签的Y轴偏移量|-|
|offsetX|`AttrType<number`|0|节点标签的X轴偏移量|-|
|halo|`AttrType<boolean>`|false|节点标签背景显示与隐藏|-|
|haloFill|`GFillStyle`|-|节点标签背景填充样式|graphics|
|haloStroke|`GStrokeStyle`|-|节点标签背景边样式|graphics|
|haloSpacing|`AttrType<number>`|0|节点标签背景边与label边的间距|-|
|haloRadius|`AttrType<number>`|0|节点标签背景边的圆角值|graphics|
|haloTint|`AttrType<ColorSource>`|节点标签背景颜色|sprite|
|haloAlpha|`AttrType<number>`|0.55|节点标签背景透明度|sprite|

其他属性为[TextStyleOptions](https://pixijs.download/release/docs/text.TextStyleOptions.html),这些属性类型都会映射为`AttrType<T>`。
##### 节点状态配置项(NodeStateOptions)
默认有active,selected,inactive三个状态的配置项,你可以自行添加更多的节点状态配置项。
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|`[key:string]`|`NodeStateStyleOptions`|-|对应状态的样式配置项|
##### 节点状态样式配置项(NodeStateStyleOptions)
`NodeStateStyleOptions` 继承 `NodeStyleOptions` 并扩展了以下属性:
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|labelStyle|`NodeLabelStyleOptions`|-|节点标签样式配置项，详情见上|

示例代码:
```javascript
import {GraphVis} from "@zjfcool/graph-vis";
new GraphVis({
    ...,
    node:{
        type: "circle",
        state: {
            active: {
                halo: true,
                haloSpacing: 3,
            },
            selected: {
                halo: true,
                haloSpacing: 3,
            },
            inactive: {
                halo: false,
            },
        },
        style: {
            visible: true,
            size: 20,
            pointNum: 5,
            rotation: 0,
            radius: 0,
            haloRadius: 0,
            halo: false,
            haloSpacing: 3,
            alpha: 1,
            haloAlpha: 0.55,
        },
        labelConfig: {
            labelText: (d) => d.label,
            style: {
                visible: true,
                placement: d=>d.id%2===0?"right":"left",
                offsetX: 0,
                offsetY: 0,
                fontSize: 12,
                halo: false,
                haloSpacing: 0,
                haloRadius: 2,
                haloAlpha: 0.55,
            },
        },
    }
})
```
#### 边配置项(EdgeOptions)
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|type|`AttrType<string>`|auto|边类型内置了auto\|line\|quadratic\|cubic四种类型的边|
|id|`string`|id|边ID对应的key|
|source|`string`|source|边source对应的key|
|target|`string`|target|边target对应的key|
|drawBy|`AttrType<DrawBy>`|graphics|边以Graphics还是Sprite的形式绘画|
|state|`EdgeStateOptions`|-|边状态样式配置项|
|style|`EdgeStyleOptions`|-|边样式配置项|
|arrowConfig|`EdgeArrowConfigOptions`|-|边箭头配置项|
|labelConfig|`EdgeLabelConfigOptions`|-|边标签配置项|
##### 边样式配置项(EdgeStyleOptions)
| 属性 | 类型 | 默认值 | 描述 |drawBy|
|:---|:---|:---:|:---|:---:|
|visible|`AttrType<boolean>`|true|边的显示与隐藏|-|
|smoothness|`AttrType<number>`|0.75|曲线边的柔和度值越大越顺滑|-|
|quadraticAlongT|`AttrType<number>`|0.5|确定二次贝塞尔曲线控制点位置的向量在边的中的位置,0为边的起始位置,1为边的末尾,0.5为边的中间位置,使用该值可以沿边来回移动二次贝塞尔曲线控制点的位置|-|
|quadraticRotation|`AttrType<number>`|0|确定二次贝塞尔曲线控制点位置的向量的方向,正值为顺时针旋转向量,负值为逆时针旋转向量|-|
|quadraticSpacing|`AttrType<number>`|40|二次贝塞尔曲线控制点的间距|-|
|cubicAlongT|`AttrType<number \| [number, number]>`|-|确定三次贝塞尔曲线两个控制点位置的向量在边的中的位置,0为边的起始位置,1为边的末尾,0.5为边的中间位置,使用该值可以沿边来回移动三次贝塞尔曲线控制点的位置|-|
|cubicRotation|`AttrType<number \| [number, number]>`|-|确定三次贝塞尔曲线两个控制点位置的向量的方向,正值为顺时针旋转向量,负值为逆时针旋转向量|-|
|cubicSpacing|`AttrType<number \| [number, number]>`|-|确定三次贝塞尔曲线控制点之间的间距|-|
|stroke|`GStrokeStyle`|-|边的填充样式|graphics|
|halo|`AttrType<boolean>`|false|边背景的显示与隐藏|-|
|haloStroke|`GStrokeStyle`|-|边背景填充样式|graphics|
|haloSpacing|`AttrType<number>`|3|边背景与边的间距|-|
|haloTint|`AttrType<ColorSource>`|-|边背景的颜色|sprite|
|haloAlpha|`AttrType<number>`|0.55|边背景透明度|sprite|
|tint|`AttrType<ColorSource>`|-|边的颜色|sprite|
|width|`AttrType<number>`|1|边的宽度|sprite|
|alpha|`AttrType<number>`|1|边的透明度|sprite|

Tip:构建一条贝塞尔曲线需要确定控制点的位置，quadraticAlongT/cubicAlongT确定在边的哪个位置,quadraticRotation/cubicRotation确定控制点沿着哪个方向偏移,quadraticSpacing确定沿着既定位置和方向偏移的距离，最终确定了控制点的位置,进而调整曲线的形状。
##### 边箭头配置项(EdgeArrowConfigOptions)
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|style|`EdgeArrowStyleOptions`|-|边箭头样式配置项|

###### 边箭头样式配置项(EdgeArrowStyleOptions)
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|visible|`AttrType<boolean>`|true|边箭头显示与隐藏|
|tailMidpointRatio|`AttrType<number`>|0.2|边箭头尾部中间点占箭头长度的比例，推荐值为`[0,1)`|
|size|`AttrType<number \| number[]>`|[6, 4]|边箭头的宽高值|
|alongT|`AttrType<number>`|1|箭头沿着边方向的位置,0为边的起始位置,1为边的末尾,0.5为边的中间,以此类推|
|fill|`GFillStyle`|-|边箭头填充样式|
|stroke|`GStrokeStyle`|-|边箭头描边样式|
##### 边标签配置项(EdgeLabelConfigOptions)
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|type|`AttrType<LabelType>`|text|边标签类型|
|drawBy|`AttrType<DrawBy>`|-|默认与边的drawBy一致|
|labelText|`AttrType<TextType>`|(d) => d.label|边标签文本内容|
|style|`EdgeLabelStyleOptions`|-|边标签样式配置项|
###### 边标签样式配置项(EdgeLabelStyleOptions)
| 属性 | 类型 | 默认值 | 描述 |drawBy|
|:---|:---|:---:|:---|:---:|
|visible|`AttrType<boolean>`|true|边标签的显示与隐藏|-|
|alongT|`AttrType<number>`|0.5|标签在边上的位置,0为边的起始位置,1为边的末尾,0.5为边的中间|-|
|offsetX|`AttrType<number>`|0|标签X轴方向偏移量|-|
|offsetY|`AttrType<number>`|0|标签Y轴方向偏移量|-|
|alongTPositionMode|`EdgeLabelPositionMode`|local|alongT属性对应的坐标系统local为相对于当前边的坐标系统,global相对于全局坐标系统|-|
|offsetPositionMode|`EdgeLabelPositionMode`|local|offsetX/offsetY属性对应的坐标系统local为相对于当前边的坐标系统,global相对于全局坐标系统|-|
|halo|`AttrType<boolean>`|false|边标签背景显示与隐藏|-|
|haloFill|`GFillStyle`|-|边标签背景填充样式|graphics|
|haloStroke|`GStrokeStyle`|-|边标签背景描边样式|graphics|
|haloSpacing|`AttrType<number>`|0|边标签背景与标签间距|-|
|haloRadius|`AttrType<number>`|0|标签背景圆角值|graphics|
|haloTint|`AttrType<ColorSource>`|-|标签背景颜色|sprite|
|haloAlpha|`AttrType<number>`|-|标签背景透明度|sprite|

其他标签文本属性为:[TextStyleOptions](https://pixijs.download/release/docs/text.TextStyleOptions.html),这些属性类型都会映射为`AttrType<T>`。
##### 边状态样式配置项(EdgeStateOptions)
边状态默认有active,selected,inactive三个配置项,key的类型为string。
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|[key:string]|`EdgeStateStyleOptions`|-|一个状态对应一个边状态样式配置项|
###### 边状态样式配置项(EdgeStateStyleOptions)
EdgeStateStyleOptions 继承 EdgeStyleOptions, 还有以下属性:
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|labelStyle|`EdgeLabelStyleOptions`|-|标签样式配置项|
|arrowStyle|`EdgeArrowStyleOptions`|-|箭头样式配置项|

示例代码:
```javascript
import {GraphVis} from "@zjfcool/graph-vis";
new GraphVis({
    ...,
    edge:{
        type:"auto",
        state: {
            active: {
                halo: true,
                haloSpacing: 3,
                haloAlpha: 0.55,
            },
            selected: {
                stroke: {
                    width: d=>d.id>100?2:1,
                },
                halo: true,
                width: 2,
                haloSpacing: 3,
                haloAlpha: 0.55,
            },
            inactive: {
                halo: false,
            },
        },
        style: {
            visible: (d)=> d.id%2===0,
            smoothness: 0.75,
            halo: false,
            haloSpacing: 3,
            alpha: 1,
            stroke: {
                width: 1,
            },
            width: 1,
        },
        arrowConfig: {
            style: {
                visible: true,
                size: [6, 4],
                tailMidpointRatio: 0.2,
                alongT: 1,
            },
        },
        labelConfig: {
            labelText: (d) => d.label,
            style: {
                visible: true,
                alongT: (d)=>0.5,
                alongTPositionMode: "local",
                offsetPositionMode: "local",
                offsetX: 0,
                offsetY: 0,
                fontSize: 12,
                halo: false,
                haloSpacing: 0,
                haloRadius: 2,
                haloAlpha: 0.55,
            },
        },
    }
})
```
#### 链接配置项(LinkOptions)
默认继承EdgeOptions中的type,style,state,arrowConfig,labelConfig 属性的配置项,link如果另行配置将覆盖这些配置。drawBy为 graphics的属性都可使用 
```javascript
type LinkOptions<D = any> = Omit<EdgeOptions<D>, "source" | "target" | "drawBy" | "id">;
```
示例代码:
```javascript
import {GraphVis} from "@zjfcool/graph-vis";
new GraphVis({
    ...,
    link:{
        style:{
            stroke: {
                width:3,
                color:#000
            }，
        },
        arrowConfig:{}
    }
})
```
#### 布局配置项(LayoutOptions)
默认提供d3-force,random两种布局类型.
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|type|string|-|布局类型|
##### D3ForceLayoutOptions
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|warmTicks|`number`|0|预先执行布局多少次|
|cooldownTicks|`number`|Infinity|执行布局多少次停止布局|
|cooldownTime|`number`|1500|执行布局的持续时间单位ms|
|alpha|`number`|1|[详情](https://d3js.org/d3-force/simulation#simulation_alpha)|
|alphaMin|`number`|0.001|[详情](https://d3js.org/d3-force/simulation#simulation_alphaMin)|
|alphaDecay|`number`|0.01|[详情](https://d3js.org/d3-force/simulation#simulation_alphaMin)|
|alphaTarget|`number`|0|[详情](https://d3js.org/d3-force/simulation#simulation_alphaTarget)|
|velocityDecay|`number`|0.4|[详情](https://d3js.org/d3-force/simulation#simulation_velocityDecay)|
|randomSource|`() => number`|-|[详情](https://d3js.org/d3-force/simulation#simulation_randomSource)|
|link|`D3ForceLinkOptions`\|`false`|-|[详情](https://d3js.org/d3-force/link)|
|center|`D3ForceCenterOptions`\|`false`|-|[详情](https://d3js.org/d3-force/center)|
|collide|`D3ForceCollideOptions`\|`false`|-|[详情](https://d3js.org/d3-force/collide)|
|manyBody|`D3ForceManyBodyOptions`\|`false`|-|[详情](https://d3js.org/d3-force/many-body)|
|x|`D3ForceXOptions`\|`false`|-|[详情](https://d3js.org/d3-force/position#forceX)|
|y|`D3ForceYOptions`\|`false`|-|[详情](https://d3js.org/d3-force/position#forceY)|
|radial|`D3ForceRadialOptions`\|`false`|-|[详情](https://d3js.org/d3-force/position#forceRadial)|
###### D3ForceLinkOptions
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|id|`(d:any)=>string`|(d) => d.id|[详情](https://d3js.org/d3-force/link#link_id)|
|distance|`number \| ((d: any) => number)`|90|[详情](https://d3js.org/d3-force/link#link_distance)|
|strength|`number \| ((d: any) => number)`|0.2|[详情](https://d3js.org/d3-force/link#link_strength)|
|iterations|`number`|-|[详情](https://d3js.org/d3-force/link#link_iterations)|
###### D3ForceCenterOptions
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|x|`number`|0|[详情](https://d3js.org/d3-force/center#center_x)|
|y|`number`|0|[详情](https://d3js.org/d3-force/center#center_y)|
|strength|`number`|1|[详情](https://d3js.org/d3-force/center#center_strength)|
###### D3ForceCollideOptions
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|radius|`number \| ((d: any) => number)`|20|[详情](https://d3js.org/d3-force/collide#collide_radius)|
|strength|`number`|0.1|[详情](https://d3js.org/d3-force/collide#collide_strength)|
|iterations|`number`|-|[详情](https://d3js.org/d3-force/collide#collide_iterations)|
###### D3ForceManyBodyOptions
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|strength|`number`\|`((d: any, index: number) => number)`|-20|[详情](https://d3js.org/d3-force/many-body#manyBody_strength)|
|theta|`number`|0.9|[详情](https://d3js.org/d3-force/many-body#manyBody_theta)|
|distanceMin|`number`|1|[详情](https://d3js.org/d3-force/many-body#manyBody_distanceMin)|
|distanceMax|`number`|Infinity|[详情](https://d3js.org/d3-force/many-body#manyBody_distanceMax)|
###### D3ForceXOptions
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|strength|`number \| ((d: any) => number)`|0.1|[详情](https://d3js.org/d3-force/position#x_strength)|
|x|`number \| ((d: any) => number)`|0|[详情](https://d3js.org/d3-force/position#x_x)|
###### D3ForceYOptions
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|strength|`number \| ((d: any) => number)`|-|[详情](https://d3js.org/d3-force/position#y_strength)|
|y|`number` \| `((d: any) => number)`|-|[详情](https://d3js.org/d3-force/position#y_y)|
###### D3ForceRadialOptions
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|strength|`number \| ((d: any) => number)`|0.1|[详情](https://d3js.org/d3-force/position#radial_strength)|
|radius| `number \| ((d: any) => number)`|-|[详情](https://d3js.org/d3-force/position#radial_radius)|
|x|`number`|0|[详情](https://d3js.org/d3-force/position#radial_x)|
|y|`number`|0|[详情](https://d3js.org/d3-force/position#radial_y)|
##### RandomLayoutOptions
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|width|`number`|500|随机布局的宽度|
|height|`number`|500|随机布局的高度|
|center|`[number, number]`|[0,0]|中心点,作用为以哪个中心所用随机分布|

示例代码:
```javascript
import {GraphVis} from "@zjfcool/graph-vis";
new GraphVis({
    ...,
    layout:{
        type:"d3-force",
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
    }
})
```
#### 缩放配置项(ZoomOptions)
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|enable|`boolean`|true|是否开启缩放功能|
|wheelDelta|`(event: any) => number`|-|[详情](https://d3js.org/d3-zoom#zoom_wheelDelta)|
|extent|`[[number, number], [number, number]]`|-|[详情](https://d3js.org/d3-zoom#zoom_extent)|
|scaleExtent|`[number, number]`|-|[详情](https://d3js.org/d3-zoom#zoom_scaleExtent)|
|translateExtent|`[[number, number], [number, number]]`|-|[详情](https://d3js.org/d3-zoom#zoom_translateExtent)|
|clickDistance|`number`|-|[详情](https://d3js.org/d3-zoom#zoom_clickDistance)|
|tapDistance|`number`|-|[详情](https://d3js.org/d3-zoom#zoom_tapDistance)|
|enableDblclickZoom|`boolean`|false|是否开启鼠标双击交互缩放的功能|
|enableWheelZoom|`boolean`|true|是否开启滑轮交互缩放功能|
|filter|`(event: any) => boolean`|-|[详情](https://d3js.org/d3-zoom#zoom_filter)|
#### 拖拽配置项(DragOptions)
| 属性 | 类型 | 默认值 | 描述 |
|:---|:---|:---:|:---|
|enable|`boolean`|true|开启节点拖拽功能|
|filter|`(event: any) => boolean`|-|[详情](https://d3js.org/d3-drag#drag_filter)|
|touchable|`(event: any, d: any) => boolean`|-|[详情](https://d3js.org/d3-drag#drag_touchable)|
|clickDistance|`number`|-|[详情](https://d3js.org/d3-drag#drag_clickDistance)|
#### 主题配置项
默认有light,dark两个主题,可自定义主题.
自定义主题示例代码:
```javascript
import {register,generateThemeByPrimaryColor,GraphVis} from "@zjfcool/graph-vis";
//generateThemeByPrimaryColor 函数为生成主题的快捷函数，提供一个主题色和风格(light/dark)会自动生成类型为Theme的options对象
register("theme","natrue", generateThemeByPrimaryColor("#4CAF50", "dark"));
// 或者自定义配置对象
register("theme","purple",{
    node:{}, // NodeOptions
    edge:{}, // EdgeOptions
    link:{}, // LinkOptions
    background:""//ColorSource
})
// 使用定义的主题色
new GraphVis({
    ...,
    theme:"natrue"
})

```
## API
### 图实例
#### 属性
| 属性名 | 类型 | 描述 |
|:---|:---|:---|
|canvas|`HTMLCanvasElement`|canvas 元素|
|screenCenterX|`number`|屏幕中心点x的值|
|screenCenterY|`number`|屏幕中心y值|
|transform|`ZoomTransform`|返回ZoomTransform实例对象,[详情](https://d3js.org/d3-zoom#zoomTransform)|
|order|`number`|图节点的总数量|
|size|`number`|图边的总数量|
|directedSize|`number`|图有向边的总数量|
|undirectedSize|`number`|图无向边的总数量|
|type|`GraphologyType`|图的类型为有向,无向或者混合|
|multi|`boolean`|图是否为多边模式|
|allowSelfLoops|`boolean`|图是否允许自循环边|
|selfLoopCount|`number`|图自循环边数量|
|directedSelfLoopCount|`number`|图有向自循环边的数量|
|undirectedSelfLoopCount|`number`|图无向自循环边的数量|
|implementation|`string`|图实现的名称|
#### 方法
| 方法名 | 参数 | 返回值 |描述|
|:---|:---|:---:|:---|
|init|-|Promise|图初始化的方法|
|destroy|-|-|图销毁|
|draw|-|-|图重新绘画所有节点及边,图形形状样式变化的时候会执行|
|update|-|-|更新节点及边，当节点位置信息发生变化时，布局的时候会执行此函数|
|clear|-|graph实例|清空图所有的节点与边|
|clearEdges|-|graph实例|清空图的所有边|
|getLayout|-|`BaseLayout`|获取当前图的布局实例|
|setLayoutOptions|`LayoutOptions`|-|为当前图切换布局类型|
|stopLayout|-|-|暂停当前图的布局|
|restartLayout|-|-|重启当前布局|
|getData|-|`GraphAttributes`|获取原始数据|
|setData|`GraphAttributes \| (prev:GraphAttributes)=>GraphAttributes`|重新替换图的数据源|
|forEachNode|`(node: BaseNode, attr: EdgeAttributes) => void`|graph实例|循环节点实例|
|neighbors|`id:string`|`BaseNode[]`|入参为节点ID,获取节点的相邻节点|
|nonNeighbors|`id:string`|`BaseNode[]`|入参为节点ID,获取节点的非相邻点|
|relatedEdges|`id:string`|`BaseEdge[]`|入参为节点ID,获取与节点相连的边|
|unrelatedEdges|`id:string`|`BaseEdge[]`|入参为节点ID,获取与节点不相连的边|
|addNode|`NodeAttributes`|graph实例|入参为节点数据,添加一个节点|
|getNode|`id:string`|`BaseNode`|入参为节点ID，获取节点实例|
|dropNode|`id:string`|graph实例|入参为节点ID，删除图的某一个节点|
|nodes|-|`BaseNode[]`|获取图的所有节点实例|
|setNodeOptions|`NodeOptions`|-|动态更改节点的配置项|
|forEachEdge|`(edge: BaseEdge, attr: EdgeAttributes) => void`|graph实例|循环边实例|
|getEdge|`id:string`|`BaseEdge`|入参为边ID,获取边实例|
|addEdge|`EdgeAttributes`|graph实例|入参为边数据,为图添加一条边|
|dropEdge|`id:string`|-|如参为边ID,删除图的一条边|
|edges|-|`BaseEdge[]`|获取图的所有边实例|
|setEdgeOptions|`EdgeOptions`|-|动态更改边的配置项|
|setThemeOptions|`string`|-|入参为主题别名,切换主题|
|setLinkOptions|`LinkOptions`|-|更改link配置|
|getLink|-|link实例|获取link实例|
|getApp|-|Application 实例| 获取Application实例|
|getGraphology|-|Graph实例|获取Graph实例,用于操作数据|
|global2LocalPoint|`x:number,y:number`|`{x:number,y:number}`|入参为全局的x,y坐标值,返回本地坐标|
|local2GlobalPoint|`x:number,y:number`|`{x:number,y:number}`|入参为本地x,y坐标值,返回全局坐标|
|getCenter|-|`{x:number,y:number}`|获取当前图的中心坐标|
|translateTo|`x:number,y:number`|-|图变换平移至x,y坐标点|
|translateBy|`dx: number, dy: number`|-|将当前图x轴平移dx距离,y轴平移dy距离|
|centerAt|`x: number, y: number, easing?: EasingType, duration?: number`|-|将当前图切换至x,y坐标中心点,easing 为动画类型,duration为动画执行时间单位ms|
|zoom|`k: number, easing?: EasingType, duration?: number`|-|将图缩放k倍,使用easing动画,动画执行时间为duration|
|zoomToFit|`zoomFactor: number = 1, easing?: EasingType, duration?: number`|-|图自适应，使整个图的节点,边都在显示区域内,zoomFactor调整整个图距离显示区域的边距,默认为1没有边距,输越小边距越大,数如果大于1图部分节点将超出显示区域|
|resetView|`easing?: EasingType, duration?: number`|-|重置到初始状态,Zoom Transform将重置|
|startLinkNode|`node: BaseNode, isDirected: boolean = true`|-|开始添加边的交互操作,isDirected 为true时添加有向边,false添加无向边|
|endLinkNode|-|-|结束添加边的交互操作|
|on|`event:GraphVisEvents,listener:(...args:ang[])=>void`|-|对事件监听|
|once|`event:GraphVisEvents,listener:(...args:ang[])=>void`|-|对事件监听一次|
|off|`event:GraphVisEvents,listener:(...args:ang[])=>void`|-|对事件的某个监听函数解绑|
|getNodeAttribute|`id:string,name:string\|number`| any| 获取某个节点原始数据某个属性的值|
|getNodeAttributes|`id:string`|any|获取某个节点的原始数据|
|updateNodeAttribute|`id:string,attr:string,cb:(v:any)=>any`|GraphVis实例|更新某个节点的原始数据的某个属性值|
|updateNodeAttributes｜`id:string,cb:(attr:NodeAttributes)=>NodeAttributes`|GraphVis实例|更新某个节点的原始数据|
|removeNodeAttribute|`id:string,attr:string\|number`|GraphVis实例|移除某个节点的原始数据的某个属性|
|hasNodeAttribute|`id:string,name:string\|number`|boolean|查看某个节点是否含有某个属性|
|getEdgeAttribute|`id:string,name:string\|number`|any|获取某个边的原始数据的某个属性|
|getEdgeAttributes|`id:string`|EdgeAttributes|获取某个边的原始数据|
|hasEdgeAttribute|`id:string,name:string\|number`|boolean|查看某个边原始数据是否含有某个属性|
|updateEdgeAttribute|`id:string,name:string\|number,cb:(v:any)=>any`|GraphVis实例|更新边原始数据的属性的某个值|
|updateEdgeAttributes|`id: string, cb: (attr: EdgeAttributes) => EdgeAttributes`|GraphVis实例|更新边原始数据|
|removeEdgeAttribute|`id: string, name: string \| number`|GraphVis实例|删除边原始数据的某个属性|

Tip: 
```typescript
type EasingType = "linear" | "back-in" | "back-out" | "back-in-out" | "bounce-in" | "bounce-out" | "bounce-in-out" | "circular-in" | "circular-out" | "circular-in-out" | "cubic-in" | "cubic-out" | "cubic-in-out" | "elastic-in" | "elastic-out" | "elastic-in-out" | "exponential-in" | "exponential-out" | "exponential-in-out" | "linear-in" | "linear-out" | "linear-in-out" | "quadratic-in" | "quadratic-out" | "quadratic-in-out" | "quartic-in" | "quartic-out" | "quartic-in-out" | "quintic-in" | "quintic-out" | "quintic-in-out" | "sinusoidal-in" | "sinusoidal-out" | "sinusoidal-in-out"
```

#### 事件监听
##### 图事件
| 事件 | 回调函数 | 描述|
|:---|:---|:---|
|zoom|`(event: any) => void`|图进行缩放交互的过程中会触发|
|zoomstart|`(event: any) => void`|图开始缩放交互触发一次|
|zoomend|`(event: any) => void`|图缩放交互结束后触发一次|
|clear|`()=>void`|执行清空图方法`clear`时候触发|
|clearedges|`()=>void`|执行清空图的边方法`clearEdges`的时候触发|
|resize|`(obj:{screenWidth: number;screenHeight: number;resolution: number;})=>void`|resizeTo 对应的html元素尺寸发生变化的时候触发|
|beforecreate|()=>void|执行创建图元素方法create前触发|
|aftercreate|()=>void|执行创建图元素方法create后触发|
|beforedraw|()=>void|执行图元素绘画方法draw前触发|
|afterdraw|()=>void|执行图元素绘画方法draw后触发|
|beforeupdate|() => void|执行图元素更新方法update前触发|
|afterupdate|() => void|执行图元素更新方法update后触发|
##### 节点事件
触发对象为节点实例
| 事件 | 回调函数 | 描述|
|:---|:---|:---|
|node:click|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onclick)|
|node:mousedown|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmousedown)|
|node:mousemove|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmousemove)|
|node:mouseout|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseout)|
|node:mouseover|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseover)|
|node:mouseup|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseup)|
|node:mouseupoutside|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseupoutside)|
|node:pointercancel|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointercancel)|
|node:pointerdown|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerdown)|
|node:pointermove|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointermove)|
|node:pointerout|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerout)|
|node:pointerover|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerover)|
|node:pointertap|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointertap)|
|node:pointerup|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerup)|
|node:pointerupoutside|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerupoutside)|
|node:rightclick|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onrightclick)|
|node:rightdown|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onrightdown)|
|node:rightup|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onrightup)|
|node:rightupoutside|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onrightupoutside)|
|node:tap|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontap)|
|node:touchcancel|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontouchcancel)|
|node:touchend|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontouchend)|
|node:touchendoutside|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontouchendoutside)|
|node:touchmove|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontouchmove)|
|node:touchstart|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontouchstart)|
|node:wheel|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedWheelEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onwheel)|
|node:mouseenter|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseenter)|
|node:mouseleave|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseleave)|
|node:pointerenter|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerenter)|
|node:pointerleave|`({target:BaseNode;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerleave)|
|node:drag|`(event:any)=>void`|节点拖拽过程中触发|
|node:dragstart|`(event:any)=>void`|节点开始拖拽时触发一次|
|node:dragend|`(event:any)=>void`|节点拖拽结束后触发一次|
|node:beforeadd|`(NodeAttributes)=>void`|节点添加前触发|
|node:afteradd|`(BaseNode)=>void`|节点添加后触发|
|node:beforedrop|`(id:string)=>void`|节点删除前触发|
|node:afterdrop|`(BaseNode)=>void`|节点删除后触发|
##### 边事件
触发对象为边实例
| 事件 | 回调函数 | 描述|
|:---|:---|:---|
|edge:click|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onclick)|
|edge:mousedown|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmousedown)|
|edge:mousemove|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmousemove)|
|edge:mouseout|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseout)|
|edge:mouseover|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseover)|
|edge:mouseup|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseup)|
|edge:mouseupoutside|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseupoutside)|
|edge:pointercancel|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointercancel)|
|edge:pointerdown|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerdown)|
|edge:pointermove|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointermove)|
|edge:pointerout|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerout)|
|edge:pointerover|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerover)|
|edge:pointertap|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointertap)|
|edge:pointerup|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerup)|
|edge:pointerupoutside|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerupoutside)|
|edge:rightclick|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onrightclick)|
|edge:rightdown|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onrightdown)|
|edge:rightup|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onrightup)|
|edge:rightupoutside|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onrightupoutside)|
|edge:tap|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontap)|
|edge:touchcancel|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontouchcancel)|
|edge:touchend|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontouchend)|
|edge:touchendoutside|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontouchendoutside)|
|edge:touchmove|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontouchmove)|
|edge:touchstart|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontouchstart)|
|edge:wheel|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedWheelEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onwheel)|
|edge:mouseenter|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseenter)|
|edge:mouseleave|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseleave)|
|edge:pointerenter|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerenter)|
|edge:pointerleave|`({target:BaseEdge;originalTarget:Container;originalType:string;event:FederatedPointerEvent})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerleave)|
|edge:beforeadd|`(EdgeAttributes)=>void`|添加边操作之前触发|
|edge:afteradd|`(BaseEdge)=>void`|添加边之后触发|
|edge:beforedrop|`(id:string)=>void`|删除边之前触发|
|edge:afterdrop|`(BaseEdge)=>void`|删除边之后触发|
##### stage事件
触发对象为app.stage
| 事件 | 回调函数 | 描述|
|:---|:---|:---|
|stage:click|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onclick)|
|stage:mousedown|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmousedown)|
|stage:mousemove|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmousemove)|
|stage:mouseout|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseout)|
|stage:mouseover|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseover)|
|stage:mouseup|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseup)|
|stage:mouseupoutside|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseupoutside)|
|stage:pointercancel|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointercancel)|
|stage:pointerdown|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerdown)|
|stage:pointermove|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointermove)|
|stage:pointerout|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerout)|
|stage:pointerover|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerover)|
|stage:pointertap|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointertap)|
|stage:pointerup|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerup)|
|stage:pointerupoutside|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerupoutside)|
|stage:rightclick|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onrightclick)|
|stage:rightdown|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onrightdown)|
|stage:rightup|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onrightup)|
|stage:rightupoutside|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onrightupoutside)|
|stage:tap|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontap)|
|stage:touchcancel|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontouchcancel)|
|stage:touchend|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontouchend)|
|stage:touchendoutside|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontouchendoutside)|
|stage:touchmove|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontouchmove)|
|stage:touchstart|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#ontouchstart)|
|stage:wheel|`({event:FederatedWheelEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onwheel)|
|stage:mouseenter|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseenter)|
|stage:mouseleave|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onmouseleave)|
|stage:pointerenter|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerenter)|
|stage:pointerleave|`({event:FederatedPointerEvent;target:Container})=>void`|[详情](https://pixijs.download/release/docs/scene.Container.html#onpointerleave)|
##### 布局事件
| 事件 | 回调函数 | 描述|
|:---|:---|:---|
|layout:start|()=>void|布局开始的时候触发一次|
|layout:end|()=>void|布局结束后触发一次|
##### link事件
| 事件 | 回调函数 | 描述|
|:---|:---|:---|
|link:start|`(link:Link)=>void`|当开始连接的时候,也就是调用startLinkEnd方法的时候触发一次|
|link:move|`(data:{event:FederatedPointerEvent;link:Link})=>void`|当连接操作时鼠标移动过程中触发|
|link:end|`(link:Link)=>void`|当结束连接的时候,也就是调用endLinkNode方法的时候触发一次|
### 节点实例
节点继承Container类,以下是扩展方法与属性:
#### 属性
| 属性名 | 类型 |描述|
|:---|:---:|:---|
|id|`string`|节点id|
|data|`NodeAttributes`|节点原始数据|
|node|`Container`|节点元素|
|nodeLabel|`Container`|节点标签元素|
|bounds|`[number,number]`|节点边界长宽尺寸|
|type|`NodeType`|节点类型|
|state|`string`|获取state返回当前的节点状态,也可以直接赋值更改节点状态|
|options|`NodeOptions`|节点配置项|
|locked|`boolean`|true拖拽节点将锁定位置不在进行动态迭代布局(layout 为 d3-force时)|
|segments|`Segment[]`|节点的轮廓线段|
#### 方法
| 方法名 | 参数 | 返回值 |描述|
|:---|:---:|:---:|:---|
|getNodeLabelConfig|-|object|获取节点标签的配置|
|getNodeConfig|-|object|获取节点的配置|
|beforeDrawNode|-|-|钩子函数,在drawNode之前会执行该操作,用于扩展节点|
|drawNode|-|-|重新绘画节点|
|afterDrawNode|-|-|钩子函数在节点绘画之后执行,用于扩展节点|
|beforeDrawLabel|-|-|钩子函数在节点标签绘画之前执行,由于扩展节点标签|
|drawLabel|-|-|绘画节点标签|
|afterDrawLabel|-|-|钩子函数,节点标签绘画后执行,用于扩展节点标签|
|beforeDraw|-|-|钩子函数绘画节点与节点标签之前执行,用于扩展节点｜
|draw|-|-|执行drawNode,drawLabel函数绘画节点与节点标签|
|afterDraw|-|-|绘画完节点与节点标签后执行,用于扩展节点|
|beforeUpdate|-|-|钩子函数,在执行更新之前的操作,用于扩展节点|
|update|-|-|更新节点，layout之后会执行此函数，会更新节点的轮廓(segments属性)以及位置信息|
|afterUpdate|-|-|节点更新之后执行的钩子函数,用于扩展节点|

节点钩子函数执行的顺序,知道这个顺序方便扩展节点使用:
beforeDraw->beforeDrawNode->afterDrawNode->beforeDrawLabel->afterDrawLabel->afterDraw
beforeUpdate->afterUpdate
更多属性与方法查看[Container相关属性与方法](https://pixijs.download/release/docs/scene.Container.html)
### 边实例
边继承Container类,以下是扩展方法与属性:
#### 属性
| 属性名 | 类型 |描述|
|:---|:---:|:---|
|id|`string`|边ID|
|options|`EdgeOptions`|边配置项|
|source|`BaseNode`|边的源头节点|
|target|`BaseNode`|边的目标节点|
|edge|`Container`|边元素|
|edgeArrow|`Container`|边箭头元素|
|edgeLabel|`Container`|边标签元素|
|edgePoints|`Point[]`|边上的的点,边是由点连接而成|
|edgeArrowPoints|`{ head: Point; tail: Point }`|边箭头的头部位置与尾部位置信息|
|edgeLabelPointAttr|`{ x: number; y: number; rotation: number }`|边标签坐标信息及旋转角度|
|data|`EdgeAttributes`|边的原始数据|
|type|`string`|边的类型|
|state|`string`|当前边的状态,set state的时候根据情况重新绘画边|
|edgeCount|`number`|source target 两节点相连的边的总数量|
|edgeIndex|`number`|source target 上边的索引,代表第几条边|
|isSelfLoop|`boolean`|是否为自循环边|
|isDirected|`boolean`|是否为有向边|
|dx|`number`|target.x-source.x|
|dy|`number`|target.y-source.y|
|angle|`number`|自循环边返回0,其他边类型为 Math.atan2(dy, dx)|
|sepCount|`number`|以source->target连线对称索引|
|isAuto|`boolean`|边类型是否为auto|
|isQuadratic|`boolean`|边类型是否为quadratic|
|isCubic|`boolean`|边类型是否为cubic|
|direction|`number`|source->target 为1, target->source 为-1|
#### 方法
| 方法名 | 参数 | 返回值 |描述|
|:---|:---:|:---:|:---|
|getBezierConfig|-|object|获取Bezier配置项|
|getEdgeConfig|-|object|获取边配置项|
|getEdgeLabelConfig|-|object|获取边标签配置项|
|getEdgeArrowConfig|-|object|获取边箭头配置项|
|drawEdge|-|-|绘画边|
|drawEdgeArrow|-|-|绘画边箭头|
|drawEdgeLabel|-|-|绘画边标签|
|update|-|-|更新边|
|setEdgePoints|`...args:any[]`|-|设置属性edgePoints的值|
|setEdgeArrowPoints|`...args:any[]`|-|设置属性edgeArrowPoints的值|
|setEdgeLabelPointAttr|`...args:any[]`|-|设置属性edgeLabelPointAttr的值|

更多属性与方法查看[Container相关属性与方法](https://pixijs.download/release/docs/scene.Container.html)
### 布局实例
#### 属性
| 属性名 | 类型 |描述|
|:---|:---|:---|
|id|`string`|布局类的ID|
|isStop|`boolean`|是否停止布局,控制布局的开始与结束|
#### 方法
| 方法名 | 参数 | 返回值 |描述|
|:---|:---:|:---:|:---|
|layout|-|-|执行布局的具体方法|
|execute|`options:LayoutOptions`|layout 实例|布局开始执行入口方法|
|ticker|`ticker:Ticker`|-|外部Application.ticker 每一帧会执行一次,这里会使用isStop来控制什么时候结束执行,什么时候开始执行|
|stop|-|-|结束布局，可迭代布局有的方法|
|tick|interations:`number`|-|迭代布局中执行的方法,interations表示预先迭代的次数,默认为一次|
|restart|-|-|重新启动布局|
### 全局
| 方法/类名 | 参数 | 返回值 |描述|
|:---|:---|:---:|:---|
|GraphVis|options:`GraphVisOptions`|graph实例|图的类|
|BaseNode|`id: string, options: NodeOptions, data: NodeAttributes`|-| 节点抽象基类，其他类型的节点都继承自BaseNode|
|CircleNode|`id: string, options: NodeOptions, data: NodeAttributes`|circleNode实例|type 为circle的节点类|
|EllipseNode|`id: string, options: NodeOptions, data: NodeAttributes`|ellipseNode实例|type 为ellipse的节点类|
|BitmapTextNode|`id: string, options: NodeOptions, data: NodeAttributes`|bitmapTextNode实例|type 为bitmap-text的节点类|
|ImageNode|`id: string, options: NodeOptions, data: NodeAttributes`|imageNode实例|type 为 image的节点类|
|PolygonNode|`id: string, options: NodeOptions, data: NodeAttributes`|polygonNode实例|type 为 polygon的节点类|
|RectNode|`id: string, options: NodeOptions, data: NodeAttributes`|rectNode实例|type为rect的节点类|
|StarNode|`id: string, options: NodeOptions, data: NodeAttributes`|starNode实例|type为star的节点类|
|TextNode|`id: string, options: NodeOptions, data: NodeAttributes`|textNode实例|type为text的节点类|
|BaseEdge|`id: string, options: EdgeOptions, data: EdgeAttributes`|-|边的抽象基类,其他边都继承该基类|
|AutoEdge|`id: string, options: EdgeOptions, data: EdgeAttributes`|autoEdge实例|type 为auto的边类|
|CubicEdge|`id: string, options: EdgeOptions, data: EdgeAttributes`|cubicEdge实例|type 为 cubic的边类|
|LineEdge|`id: string, options: EdgeOptions, data: EdgeAttributes`|lineEdge实例|type 为line的边类|
|QuadraticEdge|`id: string, options: EdgeOptions, data: EdgeAttributes`|quadraticEdge实例|type 为 quadratic的边类|
|Link| `options: EdgeOptions`|link实例|交互操作时用到的动态边类|
|BaseLayout|`graphology: Graph, options: T`|-｜不可迭代布局的抽象基类,Graph类型为graphology库提供的类型,T为泛型不同布局有不同的Options,random 布局继承该类|
|BaseLayoutWithInterations|`graphology: Graph, options: T`|可迭代布局的抽象类,d3-force布局继承该类|
|D3ForceLayout|`graphology: Graph, options: D3ForceLayoutOptions`|d3ForceLayout实例|type为d3-force的布局类|
|RandomLayout|`graphology: Graph, options: D3ForceLayoutOptions`|randomLayout实例|type为random的布局类|
|register| `category:string,type: string,obj:any`|-|注册对应类型的扩展到全局,category为theme\|layout\|node\|edge, type为对应category的名称,obj为具体的扩展类等|
|getExtension|`category:string,type: string`|`any`| 获取全局注册的category下的type的值|
|getExtensions|`category:string`|`object`|获取全局注册的category所有值|
|getExtensionsKeys|`category:string`|`string[]`|获取全局注册的category所有值的keys|
|generatePigment|`primary: string, mode:light \| dark` |`{nodeColor:string, edgeColor:string, backgroundColor:string}`|根据提供的主题色与模式生成包含节点颜色,边颜色,背景色的对象|
|generateThemeByPigment|pigment:`{nodeColor:string, edgeColor:string, backgroundColor:string}`|`Theme`|根据入参提供的节点颜色,边的颜色,背景颜色生成主题配置|
|generateThemeByPrimaryColor|primaryColor:`string`,mode:`light`\|`dark`|`Theme`|根据主题色以及模式生成主题配置|




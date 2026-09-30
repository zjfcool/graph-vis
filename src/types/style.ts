import {
  ColorSource,
  FillInput,
  FillStyle,
  StrokeInput,
  StrokeStyle,
  TextStyleOptions,
} from "pixi.js";
import { AttrType, DataDriven, EdgeLabelPositionMode, Placement } from "./common";

export type GFillStyle<D = any> = DataDriven<FillStyle, D> | AttrType<FillInput, D>;
export type GStrokeStyle<D = any> = DataDriven<StrokeStyle, D> | AttrType<StrokeInput, D>;
export type GTextStyleOptions<D = any> = DataDriven<TextStyleOptions, D>;
/**
 * node style options(node, node label, node state)
 */
export type NodeStyleOptions<D = any> = {
  visible?: AttrType<boolean, D>;
  size?: AttrType<number | [number, number] | number[], D>;
  pointNum?: AttrType<number, D>;
  rotation?: AttrType<number, D>;
  // type 为 image时提供图片地址
  imgUrl?: AttrType<string, D>;
  // type 为rect时, 表示圆角值
  radius?: AttrType<number, D>;
  fill?: GFillStyle<D>;
  stroke?: GStrokeStyle<D>;
  halo?: AttrType<boolean, D>;
  haloFill?: GFillStyle<D>;
  haloStroke?: GStrokeStyle<D>;
  haloSpacing?: AttrType<number, D>;
  haloRadius?: AttrType<number, D>;
  // draw by sprite
  haloTint?: AttrType<ColorSource, D>;
  haloAlpha?: AttrType<number, D>;
  tint?: AttrType<ColorSource, D>;
  alpha?: AttrType<number, D>;
} & GTextStyleOptions<D>;
export type NodeLabelStyleOptions<D = any> = {
  offsetY?: AttrType<number, D>;
  offsetX?: AttrType<number, D>;
  placement?: Placement;
  visible?: AttrType<boolean, D>;
  // halo draw by graphics
  halo?: AttrType<boolean, D>;
  haloFill?: GFillStyle<D>;
  haloStroke?: GStrokeStyle<D>;
  haloSpacing?: AttrType<number, D>;
  haloRadius?: AttrType<number, D>;
  // halo dray by sprite
  haloTint?: AttrType<ColorSource, D>;
  haloAlpha?: AttrType<number, D>;
} & GTextStyleOptions<D>;
export type NodeStateStyleOptions<D = any> = NodeStyleOptions<D> & {
  labelStyle?: NodeLabelStyleOptions<D>;
};
/**
 * edge style options (edge, edge arrow, edge label)
 */
export type EdgeArrowStyleOptions<D = any> = {
  visible?: AttrType<boolean, D>;
  tailMidpointRatio?: AttrType<number, D>; // 箭头尾部中间点占箭头长度的比例，推荐值为[0,1)
  size?: AttrType<number | number[], D>;
  alongT?: AttrType<number, D>; //0-1
  fill?: GFillStyle<D>;
  stroke?: GStrokeStyle<D>;
};
export type EdgeLabelStyleOptions<D = any> = {
  visible?: AttrType<boolean, D>;
  alongT?: AttrType<number, D>; // 沿这边0-1位置
  alongTPositionMode?: EdgeLabelPositionMode; // label沿边移动的时候相对于global(全局)还是local(当前边)
  offsetPositionMode?: EdgeLabelPositionMode; // label 上下左右偏移相对于global(全局)还是local(当前边)
  offsetY?: AttrType<number, D>;
  offsetX?: AttrType<number, D>;
  // halo draw by graphics
  halo?: AttrType<boolean, D>;
  haloFill?: GFillStyle<D>;
  haloStroke?: GStrokeStyle<D>;
  haloSpacing?: AttrType<number, D>;
  haloRadius?: AttrType<number, D>;
  // halo dray by sprite
  haloTint?: AttrType<ColorSource, D>;
  haloAlpha?: AttrType<number, D>;
} & GTextStyleOptions<D>;
// interface BaseEdgeStyleOptions<D = any> {
//   visible?: AttrType<boolean, D>;
//   stroke?: GStrokeStyle<D>;
//   // halo
//   halo?: AttrType<boolean, D>;
//   // haloFill?: GFillStyle<D>;
//   haloStroke?: GStrokeStyle<D>;
//   haloSpacing?: AttrType<number, D>;
//   // draw edge by sprite style options
//   haloTint?: AttrType<ColorSource, D>;
//   haloAlpha?: AttrType<number, D>;
//   tint?: AttrType<ColorSource, D>;
//   width?: AttrType<number, D>;
//   alpha?: AttrType<number, D>;
// }
// export interface AutoEdgeStyleOptions<D = any> extends BaseEdgeStyleOptions<D> {
//   smoothness?: AttrType<number, D>; //0-1 edge
//   quadraticSpacing?: AttrType<number, D>;
//   quadraticRotation?: AttrType<number, D>;
//   quadraticAlongT?: AttrType<number, D>;
//   cubicSpacing?: AttrType<number | [number, number], D>;
//   cubicRotation?: AttrType<number | [number, number], D>;
//   cubicAlongT?: AttrType<number | [number, number], D>;
// }
// export interface LineEdgeStyleOptions<
//   D = any,
// > extends BaseEdgeStyleOptions<D> {}
// export interface QuadraticEdgeStyleOptions<
//   D = any,
// > extends BaseEdgeStyleOptions<D> {
//   smoothness?: AttrType<number, D>; //0-1 edge
//   spacing?: AttrType<number, D>;
//   rotation?: AttrType<number, D>;
//   alongT?: AttrType<number, D>;
// }
// export interface CubicEdgeStyleOptions<
//   D = any,
// > extends BaseEdgeStyleOptions<D> {
//   smoothness?: AttrType<number, D>; //0-1 edge
//   spacing?: AttrType<number | [number, number], D>;
//   rotation?: AttrType<number | [number, number], D>;
//   alongT?: AttrType<number | [number, number], D>;
// }
export interface EdgeStyleOptions<D = any> {
  visible?: AttrType<boolean, D>;
  smoothness?: AttrType<number, D>; //0-1 edge
  quadraticSpacing?: AttrType<number, D>;
  quadraticRotation?: AttrType<number, D>;
  quadraticAlongT?: AttrType<number, D>;
  cubicSpacing?: AttrType<number | [number, number], D>;
  cubicRotation?: AttrType<number | [number, number], D>;
  cubicAlongT?: AttrType<number | [number, number], D>;
  stroke?: GStrokeStyle<D>;
  // halo
  halo?: AttrType<boolean, D>;
  // haloFill?: GFillStyle<D>;
  haloStroke?: GStrokeStyle<D>;
  haloSpacing?: AttrType<number, D>;
  // draw edge by sprite style options
  haloTint?: AttrType<ColorSource, D>;
  haloAlpha?: AttrType<number, D>;
  tint?: AttrType<ColorSource, D>;
  width?: AttrType<number, D>;
  alpha?: AttrType<number, D>;
}
// interface BaseEdgeStateStyleOptions<D = any> {
//   labelStyle?: EdgeLabelStyleOptions<D>;
//   arrowStyle?: EdgeArrowStyleOptions<D>;
// }
// export interface AutoEdgeStateStyleOptions<D = any>
//   extends BaseEdgeStateStyleOptions<D>, AutoEdgeStyleOptions<D> {}
// export interface LineEdgeStateStyleOptions<D = any>
//   extends BaseEdgeStateStyleOptions<D>, LineEdgeStyleOptions<D> {}
// export interface QuadraticEdgeStateStyleOptions<D = any>
//   extends BaseEdgeStateStyleOptions<D>, QuadraticEdgeStyleOptions<D> {}
// export interface CubicEdgeStateStyleOptions<D = any>
//   extends BaseEdgeStateStyleOptions<D>, CubicEdgeStyleOptions<D> {}
export interface EdgeStateStyleOptions<D = any> extends EdgeStyleOptions {
  labelStyle?: EdgeLabelStyleOptions<D>;
  arrowStyle?: EdgeArrowStyleOptions<D>;
}

/**
 * link style options
 */
// export interface LinkStyleOptions<D = any> {
//   visible?: AttrType<boolean, D>;
//   stroke?: GStrokeStyle<D>;
//   halo?: AttrType<boolean, D>;
//   haloStroke?: GStrokeStyle<D>;
//   haloSpacing?: AttrType<number, D>;
// }

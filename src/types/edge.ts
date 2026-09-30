import {
  ColorSource,
  FillInput,
  FillStyle,
  StrokeInput,
  StrokeStyle,
  TextStyleOptions,
} from "pixi.js";
import {
  Attributes,
  AttrType,
  DrawBy,
  EdgeLabelPositionMode,
  LabelType,
  State,
  TextType,
} from "./common";
import {
  EdgeArrowStyleOptions,
  EdgeLabelStyleOptions,
  EdgeStateStyleOptions,
  EdgeStyleOptions,
} from "./style";

export interface EdgeAttributes extends Attributes {}

export interface EdgeArrowConfigOptions<D = any> {
  style?: EdgeArrowStyleOptions<D>;
}
interface EdgeLabelConfigOptions<D = any> {
  type?: AttrType<LabelType, D>;
  drawBy?: AttrType<DrawBy, D>;
  labelText?: AttrType<TextType, D>;
  style?: EdgeLabelStyleOptions<D>;
}

type EdgeStateOptions<D = any> = {
  [key in State]?: EdgeStateStyleOptions<D>;
};
interface BaseEdgeOptions<D = any> {
  type?: AttrType<string, D>;
  id?: string;
  source?: string;
  target?: string;
  drawBy?: AttrType<DrawBy, D>;
  state?: EdgeStateOptions<D>;
  style?: EdgeStyleOptions<D>;
  arrowConfig?: EdgeArrowConfigOptions<D>;
  labelConfig?: EdgeLabelConfigOptions<D>;
}
interface AutoEdgeOptions<D = any> extends BaseEdgeOptions<D> {
  type?: "auto";
  // state?: AutoEdgeStateOptions;
  // style?: AutoEdgeStyleOptions;
}
interface LineEdgeOptions<D = any> extends BaseEdgeOptions<D> {
  type?: "line";
  // state?: LineEdgeStateOptions;
  // style?: LineEdgeStyleOptions;
}
interface QuadraticEdgeOptions<D = any> extends BaseEdgeOptions<D> {
  type?: "quadratic";
  // state?: QuadraticEdgeStateOptions;
  // style?: QuadraticEdgeStyleOptions;
}
interface CubicEdgeOptions<D = any> extends BaseEdgeOptions<D> {
  type?: "cubic";
  // state?: CubicEdgeStateOptions;
  // style?: CubicEdgeStyleOptions;
}
export type EdgeOptions<D = any> =
  | AutoEdgeOptions<D>
  | LineEdgeOptions<D>
  | QuadraticEdgeOptions<D>
  | CubicEdgeOptions<D>;
export interface EdgeArrowConfig {
  visible: boolean;
  fill: FillStyle | FillInput;
  stroke: StrokeStyle | StrokeInput;
  tailMidpointRatio: number;
  size: number | number[];
  alongT: number;
}
export interface EdgeConfig {
  visible: boolean;
  stroke: StrokeStyle | StrokeInput;
  haloStroke: StrokeStyle | StrokeInput;
  halo: boolean;
  haloTint: ColorSource;
  haloSpacing: number;
  haloAlpha: number;
  smoothness: number;
  tint: ColorSource;
  alpha: number;
  width: number;
}
export interface EdgeLabelConfig {
  visible: boolean;
  textStyle: TextStyleOptions;
  labelText: TextType;
  offsetX: number;
  offsetY: number;
  halo: boolean;
  haloSpacing: number;
  haloFill: FillStyle | FillInput;
  haloStroke: StrokeStyle | StrokeInput;
  haloRadius: number;
  haloTint: ColorSource;
  haloAlpha: number;
  alongT: number;
  alongTPositionMode: EdgeLabelPositionMode;
  offsetPositionMode: EdgeLabelPositionMode;
  type: LabelType;
  drawBy: DrawBy;
}
export interface BezierConfig {
  quadraticSpacing: number;
  quadraticRotation: number;
  quadraticAlongT: number;
  cubicSpacing: number | [number, number];
  cubicRotation: number | [number, number];
  cubicAlongT: number | [number, number];
  nodeMaxBound: number;
}

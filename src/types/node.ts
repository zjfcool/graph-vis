import {
  ColorSource,
  FillInput,
  FillStyle,
  StrokeInput,
  StrokeStyle,
  TextStyleOptions,
} from "pixi.js";
import { Attributes, AttrType, DrawBy, LabelType, Placement, State, TextType } from "./common";
import { NodeLabelStyleOptions, NodeStateStyleOptions, NodeStyleOptions } from "./style";

export type NodeType =
  | "circle"
  | "rect"
  | "ellipse"
  | "polygon"
  | "text"
  | "bitmap-text"
  | "image"
  | "star"
  | (string & {});
export interface NodeAttributes extends Attributes {}

interface BaseNodeOptions {
  id?: string;
}
type NodeStateOptions<D = any> = {
  [key in State]?: NodeStateStyleOptions<D>;
};
type NodeLabelConfigOptions<D = any> = {
  type?: AttrType<LabelType, D>;
  drawBy?: AttrType<DrawBy, D>;
  labelText?: AttrType<TextType, D>;
  style?: NodeLabelStyleOptions<D>;
};
export interface NodeOptions<D = any> extends BaseNodeOptions {
  type?: AttrType<NodeType, D>;
  drawBy?: AttrType<DrawBy, D>;
  state?: NodeStateOptions<D>;
  textValue?: AttrType<TextType, D>;
  style?: NodeStyleOptions<D>;
  labelConfig?: NodeLabelConfigOptions<D>;
}
export interface NodeConfig {
  textStyle?: TextStyleOptions;
  visible?: boolean;
  size?: number | [number, number] | number[];
  fill?: FillStyle | FillInput;
  stroke?: StrokeStyle | StrokeInput;
  halo?: boolean;
  haloSpacing?: number;
  haloFill?: FillStyle | FillInput;
  haloStroke?: StrokeStyle | StrokeInput;
  tint?: ColorSource;
  alpha?: number;
  haloTint?: ColorSource;
  haloAlpha?: number;
  pointNum?: number;
  rotation?: number;
  imgUrl?: string;
  radius?: number;
  haloRadius?: number;
  drawBy?: DrawBy;
  type?: NodeType;
  textValue?: TextType;
}
export interface NodeLabelConfig {
  textStyle?: TextStyleOptions;
  visible?: boolean;
  labelOffsetX?: number;
  labelOffsetY?: number;
  placement?: Placement;
  halo?: boolean;
  haloSpacing?: number;
  haloFill?: FillStyle | FillInput;
  haloStroke?: StrokeStyle | StrokeInput;
  haloRadius?: number;
  haloTint?: ColorSource;
  haloAlpha?: number;
  labelText?: TextType;
  type?: LabelType;
  drawBy?: DrawBy;
}

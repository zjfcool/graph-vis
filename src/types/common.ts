import { FillGradient, FillPattern, Matrix } from "pixi.js";

export interface Attributes {
  [key: string]: any;
}
export type State = "active" | "selected" | "inactive" | (string & {});
export type CommonPoint = {
  x: number;
  y: number;
};
export type Segment = {
  p1: CommonPoint;
  p2: CommonPoint;
};
export type BezierPoints = {
  source: CommonPoint;
  target: CommonPoint;
  cp1?: CommonPoint;
  cp2?: CommonPoint;
  cp?: CommonPoint;
};
export type AttrFunc<T = any, D = any> = (d?: D) => T;
export type AttrType<T = any, D = any> = T | AttrFunc<T, D>;
type NonRecursiveTypes = FillGradient | FillPattern | Matrix;
export type DataDriven<T, D = any> = T extends undefined
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
export type TextType = string | number | { toString: () => string };
export type Placement = "center" | "left" | "right" | "top" | "bottom";
export type DrawBy = "graphics" | "sprite";
export type LabelType = "text" | "bitmap-text";
export type EdgeLabelPositionMode = "global" | "local";

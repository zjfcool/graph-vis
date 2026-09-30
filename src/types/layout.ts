// export type LayoutType = "force" | "random";

import type { BaseLayout, BaseLayoutWithInterations } from "../layouts/base-layout";

/**
 * d3-force options
 */
export interface D3ForceLinkOptions {
  id?: (d: any) => string;
  distance?: number | ((d: any) => number);
  strength?: number | ((d: any) => number);
  iterations?: number;
}
export interface D3ForceCenterOptions {
  x?: number;
  y?: number;
  strength?: number;
}
export interface D3ForceCollideOptions {
  radius?: number | ((d: any) => number);
  strength?: number;
  iterations?: number;
}
export interface D3ForceManyBodyOptions {
  strength?: number | ((d: any, index: number) => number);
  theta?: number;
  distanceMin?: number;
  distanceMax?: number;
}
export interface D3ForceXOptions {
  strength?: number | ((d: any) => number);
  x?: number | ((d: any) => number);
}
export interface D3ForceYOptions {
  strength?: number | ((d: any) => number);
  y?: number | ((d: any) => number);
}
export interface D3ForceRadialOptions {
  strength?: number | ((d: any) => number);
  radius?: number | ((d: any) => number);
  x?: number;
  y?: number;
}
export interface BaseLayoutOptions {
  [key: string]: any;
}
export interface D3ForceLayoutOptions extends BaseLayoutOptions {
  alpha?: number;
  alphaMin?: number;
  alphaDecay?: number;
  alphaTarget?: number;
  velocityDecay?: number;
  randomSource?: () => number;
  link?: D3ForceLinkOptions | false;
  center?: D3ForceCenterOptions | false;
  collide?: D3ForceCollideOptions | false;
  manyBody?: D3ForceManyBodyOptions | false;
  x?: D3ForceXOptions | false;
  y?: D3ForceYOptions | false;
  radial?: D3ForceRadialOptions | false;
  warmTicks?: number; // 预先对数据进行tick多少次
  cooldownTicks?: number; // tick 多少次停止
  cooldownTime?: number; // tick 多长时间停止
  onTick?: () => void;
}

interface D3ForceLayout extends D3ForceLayoutOptions {
  type: "d3-force";
}
export interface RandomLayoutOptions extends BaseLayoutOptions {
  width?: number;
  height?: number;
  center?: [number, number];
  onTick?: () => void;
}
interface RandomLayout extends RandomLayoutOptions {
  type: "random";
}
export type LayoutOptions = D3ForceLayout | RandomLayout;
export type Layout = BaseLayoutWithInterations | BaseLayout;

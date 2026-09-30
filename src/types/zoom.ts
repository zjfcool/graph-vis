// d3-zoom options
export interface ZoomOptions {
  enable?: boolean;
  wheelDelta?: (event: any) => number;
  extent?: [[number, number], [number, number]];
  scaleExtent?: [number, number];
  translateExtent?: [[number, number], [number, number]];
  clickDistance?: number;
  tapDistance?: number;
  enableDblclickZoom?: boolean;
  enableWheelZoom?: boolean;
  filter?: (event: any) => boolean;
}

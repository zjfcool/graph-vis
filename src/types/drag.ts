// d3-drag options
export interface DragOptions {
  enable?: boolean;
  filter?: (event: any) => boolean;
  touchable?: (event: any, d: any) => boolean;
  clickDistance?: number;
}

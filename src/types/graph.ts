import { ApplicationOptions } from "pixi.js";
import { EdgeAttributes, EdgeOptions } from "./edge";
import { NodeAttributes, NodeOptions } from "./node";
import { GraphologyOptions } from "./graphlogy";
import { LayoutOptions } from "./layout";
import { LinkOptions } from "./link";
import { ZoomOptions } from "./zoom";
import { DragOptions } from "./drag";
import { ThemeOptions } from "./theme";

export interface GraphAttributes<
  N extends NodeAttributes = NodeAttributes,
  T extends EdgeAttributes = EdgeAttributes,
> {
  nodes: N[];
  edges: T[];
}
// application is pixi.js application options
export interface GraphVisOptions<D = any> extends Partial<ApplicationOptions>, GraphologyOptions {
  interactable?: boolean;
  resizeDebounceTime?: number;
  container?: HTMLElement | string;
  data?: GraphAttributes;
  layout?: LayoutOptions;
  node?: NodeOptions<D>;
  edge?: EdgeOptions<D>;
  link?: LinkOptions<D>;
  zoom?: ZoomOptions;
  drag?: DragOptions;
  theme?: ThemeOptions;
}

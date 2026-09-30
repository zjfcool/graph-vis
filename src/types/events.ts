import { Container, FederatedPointerEvent, FederatedWheelEvent } from "pixi.js";
import type { BaseEdge, Link } from "../elements/edges";
import type { BaseNode } from "../elements/nodes";
import { GraphVisEventNames } from "../constants";
import { NodeAttributes } from "./node";
import { EdgeAttributes } from "./edge";

type EdgeEventCallbackParams = {
  target: BaseEdge;
  originalTarget?: Container;
  originalType?: string;
  event: FederatedPointerEvent | FederatedWheelEvent;
};
type NodeEventCallbackParams = {
  target: BaseNode;
  originalTarget?: Container;
  originalType?: string;
  event: FederatedPointerEvent | FederatedWheelEvent;
};
type StageEventCallbackParams = {
  event: FederatedPointerEvent | FederatedWheelEvent;
  target: Container;
};
type GraphVisEventCallback<T = any> = (payload: T) => void;
type NodeEventCallback = GraphVisEventCallback<NodeEventCallbackParams>;
type EdgeEventCallback = GraphVisEventCallback<EdgeEventCallbackParams>;
type StageEventCallback = GraphVisEventCallback<StageEventCallbackParams>;
type GraphVisEventNamePrefix = "node" | "edge" | "stage";
type GraphVisEventName = (typeof GraphVisEventNames)[number];
type GraphVisEventCallbackMap = {
  node: NodeEventCallback;
  edge: EdgeEventCallback;
  stage: StageEventCallback;
};
export type GraphVisEvents = {
  [K in `${GraphVisEventNamePrefix}:${GraphVisEventName}`]: K extends `${infer P extends GraphVisEventNamePrefix}:${string}`
    ? GraphVisEventCallbackMap[P]
    : never;
} & {
  /**
   * graph event
   */
  zoom: GraphVisEventCallback;
  zoomstart: GraphVisEventCallback;
  zoomend: GraphVisEventCallback;
  clear: () => void;
  clearedges: () => void;
  resize: GraphVisEventCallback<{
    screenWidth: number;
    screenHeight: number;
    resolution: number;
  }>;
  beforecreate: () => void;
  aftercreate: () => void;
  beforedraw: () => void;
  afterdraw: () => void;
  beforeupdate: () => void;
  afterupdate: () => void;
  /**
   * layout event
   */
  "layout:start": () => void;
  "layout:end": () => void;
  /**
   * node event
   */
  "node:drag": GraphVisEventCallback;
  "node:dragstart": GraphVisEventCallback;
  "node:dragend": GraphVisEventCallback;
  "node:beforeadd": GraphVisEventCallback<NodeAttributes>;
  "node:afteradd": GraphVisEventCallback<BaseNode>;
  "node:beforedrop": GraphVisEventCallback<string>;
  "node:afterdrop": GraphVisEventCallback<BaseNode>;
  /**
   * edge event
   */
  "edge:beforeadd": GraphVisEventCallback<EdgeAttributes>;
  "edge:afteradd": GraphVisEventCallback<BaseEdge>;
  "edge:beforedrop": GraphVisEventCallback<string>;
  "edge:afterdrop": GraphVisEventCallback<BaseEdge>;
  /**
   * link event
   */
  "link:start": GraphVisEventCallback<Link>;
  "link:move": GraphVisEventCallback<{
    event: FederatedPointerEvent;
    link: Link;
  }>;
  "link:end": GraphVisEventCallback<Link>;
};

import {
  Application,
  Container,
  FederatedPointerEvent,
  FederatedWheelEvent,
  Ticker,
} from "pixi.js";
import Graphology from "graphology";
import {
  debounce,
  deepAssign,
  deepClone,
  omit,
  toValue,
  TextureGenerator,
  isFunction,
} from "./utils";
import { zoom, zoomIdentity, ZoomTransform, zoomTransform, type ZoomBehavior } from "d3-zoom";
import { select } from "d3-selection";
import { drag, type DragBehavior } from "d3-drag";
import { TypedEmitter } from "tiny-typed-emitter";
import type {
  EdgeAttributes,
  EdgeOptions,
  GraphAttributes,
  GraphologyType,
  Layout,
  NodeAttributes,
  NodeOptions,
  GraphVisEvents,
  GraphVisOptions,
  LayoutOptions,
  LinkOptions,
  ZoomOptions,
  DragOptions,
} from "./types";
import { BaseEdge, Link } from "./elements/edges";
import { Tween, Group } from "@tweenjs/tween.js";
import {
  ID_SPLIT_CHAR,
  GraphVisBubblingEventNames,
  GraphVisEventNames,
  GraphVisNonBubblingEventNames,
  EASING,
  EasingType,
} from "./constants";
import { getExtension, getExtensionsKeys } from "./registry";
import { BaseNode } from "./elements/nodes";
import { isInterationLayout } from "./layouts";

function getContainer(container: HTMLElement | string): HTMLElement | null {
  let c: HTMLElement | null = null;
  if (typeof container === "string") {
    c = document.querySelector(container);
  } else {
    c = container;
  }
  return c;
}
function initOptions(options: GraphVisOptions) {
  let defaultOptions: GraphVisOptions = {
    // default graphology options
    type: "mixed",
    multi: true,
    allowSelfLoops: true,
    // default pixi application options
    antialias: true,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
    width: 500,
    height: 500,
    // default pixi graph options
    resizeDebounceTime: 500,
    container: "body",
    data: { nodes: [], edges: [] },
    node: {
      type: "circle",
      id: "id",
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
          visible: false,
          placement: "right",
          offsetX: 0,
          offsetY: 0,
          fontSize: 12,
          halo: false,
          haloSpacing: 0,
          haloRadius: 2,
          haloAlpha: 0.55,
        },
      },
    },
    edge: {
      type: "auto",
      source: "source",
      target: "target",
      state: {
        active: {
          halo: true,
          haloSpacing: 3,
          haloAlpha: 0.55,
        },
        selected: {
          stroke: {
            width: 2,
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
        visible: true,
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
          visible: false,
          alongT: 0.5,
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
    },
    link: {
      style: {
        visible: true,
      },
      labelConfig: {
        style: {
          visible: false,
        },
      },
    },
    zoom: {
      enable: true,
      enableDblclickZoom: false,
    },
    drag: {
      enable: true,
    },
    theme: "light",
  };
  const themeType = options.theme ?? defaultOptions.theme ?? "light";
  const themeKeys = getExtensionsKeys("theme");
  const hasThemeType = themeKeys.includes(themeType);
  if (!hasThemeType) {
    console.warn(`invalid theme: ${themeType} ; valid themes: ${themeKeys.join(",")}`);
  }
  if (hasThemeType) {
    const extension = getExtension("theme", themeType);
    defaultOptions = deepAssign(defaultOptions, extension);
  }
  const ops = deepAssign<GraphVisOptions>(defaultOptions, options);
  ops.link = deepAssign(
    deepClone({
      style: ops.edge?.style,
      state: ops.edge?.state,
      arrowConfig: ops.edge?.arrowConfig,
      labelConfig: ops.edge?.labelConfig,
      type: ops.edge?.type,
    }),
    ops.link,
  );
  const container = getContainer(ops.container!);
  if (!container) {
    throw new Error("container is invalid");
  }
  ops.container = container;
  return ops;
}

function preprocessEdge(graphology: Graphology, edge: EdgeAttributes, edgeOptions: EdgeOptions) {
  const key = edgeOptions.id;
  const sourceKey = edgeOptions.source!;
  const targetKey = edgeOptions.target!;
  const type = graphology.type;
  const isMulti = graphology.multi;
  edge.__original = Object.assign({}, edge);
  if (type === "undirected") {
    edge.isDirected = false;
  } else {
    edge.isDirected = edge.isDirected ?? true;
  }
  let edgeId: string;
  const { [sourceKey]: source, [targetKey]: target } = edge;
  const edges = graphology.edges(source, target);
  const len = edges.length;
  if (isMulti) {
    edges.forEach((key) => {
      graphology.setEdgeAttribute(key, "edgeCount", len + 1);
    });
    edge.edgeCount = len + 1;
    edge.edgeIndex = len;
  } else {
    edge.edgeCount = 1;
    edge.edgeIndex = 0;
  }

  if (sourceKey !== "source") edge.source = source;
  if (targetKey !== "target") edge.target = target;
  if (graphology.allowSelfLoops) {
    edge.isSelfLoop = source === target;
  }
  if (key) {
    const { [key]: id } = edge;
    if (id != undefined) {
      edgeId = id;
      if (edge.isDirected) graphology.addEdgeWithKey(edgeId, source, target, edge);
      else graphology.addUndirectedEdgeWithKey(edgeId, source, target, edge);
    } else {
      throw new Error("edge id can not be empty");
    }
  } else {
    if (edge.isDirected) edgeId = graphology.addEdge(source, target, edge);
    else edgeId = graphology.addUndirectedEdge(source, target, edge);
  }
  return edgeId;
}
function preprocessEdges(
  graphology: Graphology,
  edges: EdgeAttributes[],
  edgeOptions: EdgeOptions,
) {
  edges.forEach((edge) => {
    preprocessEdge(graphology, edge, edgeOptions);
  });
}
function preprocessNode(graphology: Graphology, node: NodeAttributes, nodeOptions: NodeOptions) {
  const { [nodeOptions.id!]: id } = node;
  node.__original = Object.assign({}, node);
  return graphology.addNode(id, node);
}
function preprocessNodes(
  graphology: Graphology,
  nodes: NodeAttributes[],
  nodeOptions: NodeOptions,
) {
  nodes.forEach((node) => {
    preprocessNode(graphology, node, nodeOptions);
  });
}

class GraphVis extends TypedEmitter<GraphVisEvents> {
  private app: Application;
  private options: GraphVisOptions;
  private viewportContainer: Container;
  private nodesContainer: Container;
  private edgesContainer: Container;
  private link?: Link;
  private tweenGroup: Group = new Group();
  private textureGenerator?: TextureGenerator;
  private layoutContext?: Layout;
  private zoomBehavior: ZoomBehavior<HTMLCanvasElement, unknown>;
  private dragBehavior: DragBehavior<HTMLCanvasElement, any, any>;
  private nodeMap: Map<string, BaseNode>;
  private edgeMap: Map<string, BaseEdge>;
  private graphology: Graphology;
  private interactable?: boolean;
  private activeNode?: BaseNode;
  private activeEdge?: BaseEdge;
  private __isEmitLayoutEnd?: boolean;
  constructor(options: GraphVisOptions) {
    super();
    this.options = initOptions(options);
    const { multi, allowSelfLoops, type, data, node, edge } = this.options;
    // this.canvas = app.canvas;
    this.nodeMap = new Map();
    this.edgeMap = new Map();
    // handle data graph
    this.graphology = new Graphology({ multi, allowSelfLoops, type });
    preprocessNodes(this.graphology, data!.nodes, node!);
    preprocessEdges(this.graphology, data!.edges, edge!);
    this.app = new Application();
    // add viewport
    this.viewportContainer = new Container();
    this.app.stage.addChild(this.viewportContainer);
    // add nodes,edges container
    this.nodesContainer = new Container();
    this.edgesContainer = new Container();
    this.viewportContainer.addChild(this.edgesContainer, this.nodesContainer);
    // zoom
    this.zoomBehavior = zoom();
    // drag
    this.dragBehavior = drag();
  }
  get canvas() {
    return this.app.canvas;
  }
  // 屏幕的中心x值
  get screenCenterX() {
    return this.app.screen.width / 2;
  }
  // 屏幕中心y值
  get screenCenterY() {
    return this.app.screen.height / 2;
  }
  get transform() {
    return zoomTransform(this.canvas);
  }
  /**
   * graphology properties
   */
  // node count
  get order() {
    return this.graphology.order;
  }
  // edge count
  get size() {
    return this.graphology.size;
  }
  get directedSize() {
    return this.graphology.directedSize;
  }
  get undirectedSize() {
    return this.graphology.undirectedSize;
  }
  // graph type
  get type() {
    return this.graphology.type as GraphologyType;
  }
  // graph multi
  get multi() {
    return this.graphology.multi;
  }
  // graph allowSelfLoops
  get allowSelfLoops() {
    return this.graphology.allowSelfLoops;
  }
  // graph selfLoopCount
  get selfLoopCount() {
    return this.graphology.selfLoopCount;
  }
  get directedSelfLoopCount() {
    return this.graphology.directedSelfLoopCount;
  }
  get undirectedSelfLoopCount() {
    return this.graphology.undirectedSelfLoopCount;
  }
  get implementation() {
    return this.graphology.implementation;
  }
  async init() {
    const { container } = this.options;
    const appOptions = omit(
      this.options,
      "container",
      "layout",
      "node",
      "edge",
      "zoom",
      "drag",
      "theme",
      "multi",
      "allowSelfLoops",
      "type",
      "data",
      "interactable",
      "resizeDebounceTime",
      "link",
    );
    await this.app.init(appOptions);
    (container as HTMLElement).appendChild(this.app.canvas as HTMLCanvasElement);
    this.textureGenerator = new TextureGenerator(this.app.renderer);
    this.interactable = this.options.interactable;
    if (this.interactable === false) {
      this.viewportContainer.eventMode = "none";
      this.app.stage.eventMode = "none";
    } else {
      this.viewportContainer.eventMode = "static";
      this.app.stage.eventMode = "static";
      this.app.stage.hitArea = this.app.screen;
    }
    this.viewportContainer.position.set(this.screenCenterX, this.screenCenterY);
    this.initZoom();
    this.initDrag();
    // ticker
    this.app.ticker.add(() => {
      this.tweenGroup.update();
    });
    // this.zoomToFit(0.9);
    this.initEvents();
    // create
    this.create();
    this.graphLayout();
    this.draw();
    if (this.layoutContext) {
      this.app.ticker.add(this.graphLayoutTicker());
    }
    return this;
  }
  getApp() {
    return this.app;
  }
  getGraphology() {
    return this.graphology as Graphology<NodeAttributes, EdgeAttributes, GraphAttributes>;
  }
  destroy() {
    this.clear();
    this.app.stage.removeChildren();
    this.removeAllListeners();
    this.app.destroy(true, true);
    this.layoutContext = null as any;
    this.zoomBehavior = null as any;
    this.dragBehavior = null as any;
    this.textureGenerator = null as any;
    this.nodeMap = null as any;
    this.edgeMap = null as any;
    this.graphology = null as any;
    this.app = null as any;
    this.link = null as any;
    this.activeEdge = null as any;
    this.activeNode = null as any;
    this.tweenGroup = null as any;
    this.nodesContainer = null as any;
    this.edgesContainer = null as any;
    this.viewportContainer = null as any;
    this.options = null as any;
  }
  private resizeHandler() {
    let preX = this.screenCenterX,
      preY = this.screenCenterY;
    return (w: number, h: number, resolution: number) => {
      this.emit("resize", {
        screenHeight: h,
        screenWidth: w,
        resolution,
      });
      const { k } = this.transform;
      const dx = (this.screenCenterX - preX) / k;
      const dy = (this.screenCenterY - preY) / k;
      this.translateBy(dx, dy);
      preX = this.screenCenterX;
      preY = this.screenCenterY;
    };
  }
  private graphLayoutTicker() {
    this.__isEmitLayoutEnd = false;
    return (ticker: Ticker) => {
      if (!this.__isEmitLayoutEnd && this.layoutContext?.isStop) {
        this.emit("layout:end");
        this.__isEmitLayoutEnd = true;
        return;
      }
      this.layoutContext?.ticker(ticker);
    };
  }
  private graphLayout() {
    const layoutOptions = this.options.layout;
    if (layoutOptions) {
      this.emit("layout:start");
      const { type, ...opts } = layoutOptions;
      const Layout = getExtension("layout", type);
      if (!Layout) {
        throw new Error(`Layout ${type} is not registered.`);
      }
      this.layoutContext = new Layout(this.graphology, opts).execute({
        onTick: () => {
          this.update();
        },
      });
    }
    return this;
  }
  getLayout() {
    return this.layoutContext;
  }
  setLayoutOptions(options: Partial<LayoutOptions>) {
    if (this.options.layout === undefined) this.options.layout = { type: "random" };
    deepAssign(this.options.layout, options);
    this.stopLayout();
    this.restartLayout();
  }
  stopLayout() {
    if (isInterationLayout(this.layoutContext)) {
      this.layoutContext.stop();
    }
    if (this.layoutContext) {
      this.layoutContext.isStop = true;
    }
  }
  restartLayout() {
    this.graphLayout();
    this.__isEmitLayoutEnd = false;
  }
  private create() {
    this.emit("beforecreate");
    this.graphology.forEachNode((id) => {
      this.createNode(id);
    });
    this.graphology.forEachEdge((id) => {
      this.createEdge(id);
    });
    this.emit("aftercreate");
  }
  draw() {
    this.emit("beforedraw");
    this.forEachNode((node) => {
      node.draw();
    });
    this.forEachEdge((edge) => {
      edge.draw();
    });
    this.emit("afterdraw");
  }
  update() {
    this.emit("beforeupdate");
    this.forEachNode((node, attr) => {
      node.x = attr.x;
      node.y = attr.y;
      node.update();
    }).forEachEdge((edge) => {
      edge.update();
    });
    this.emit("afterupdate");
  }
  getData() {
    let data: GraphAttributes = { nodes: [], edges: [] };
    for (let { attributes } of this.graphology.nodeEntries()) {
      data.nodes.push(attributes.__original);
    }
    for (let { attributes } of this.graphology.edgeEntries()) {
      data.edges.push(attributes.__original);
    }
    return data;
  }
  setData(d: GraphAttributes | ((prev: GraphAttributes) => GraphAttributes)) {
    let data: GraphAttributes;
    if (isFunction(d)) {
      data = d(this.getData());
    } else {
      data = d;
    }
    this.clear();
    preprocessNodes(this.graphology, data.nodes, this.options.node!);
    preprocessEdges(this.graphology, data.edges, this.options.edge!);
    this.create();
    this.graphLayout();
    this.draw();
  }
  forEachNode(cb: (node: BaseNode, attr: EdgeAttributes) => void) {
    this.graphology.forEachNode((id, attr) => {
      const node = this.getNode(id)!;
      cb(node, attr);
    });
    return this;
  }
  forEachEdge(cb: (edge: BaseEdge, attr: EdgeAttributes) => void) {
    this.graphology.forEachEdge((id, attr) => {
      const edge = this.getEdge(id)!;
      cb(edge, attr);
    });
    return this;
  }
  getNodeAttribute(id: string, name: string | number) {
    return this.graphology.getNodeAttribute(id, name);
  }
  getNodeAttributes(id: string) {
    return this.graphology.getNodeAttributes(id) as NodeAttributes;
  }
  updateNodeAttribute(id: string, attr: string, cb: (v: any) => any) {
    this.graphology.updateNodeAttribute(id, attr, cb);
    return this;
  }
  updateNodeAttributes(id: string, cb: (attr: NodeAttributes) => NodeAttributes) {
    this.graphology.updateNodeAttributes(id, cb);
    return this;
  }
  removeNodeAttribute(id: string, attr: string | number) {
    this.graphology.removeNodeAttribute(id, attr);
    return this;
  }
  hasNodeAttribute(id: string, name: string | number) {
    return this.graphology.hasNodeAttribute(id, name);
  }
  getEdgeAttribute(id: string, name: string | number) {
    return this.graphology.getEdgeAttribute(id, name);
  }
  getEdgeAttributes(id: string) {
    return this.graphology.getEdgeAttributes(id) as EdgeAttributes;
  }
  hasEdgeAttribute(id: string, name: string | number) {
    return this.graphology.hasEdgeAttribute(id, name);
  }
  updateEdgeAttribute(id: string, name: string | number, cb: (v: any) => any) {
    this.graphology.updateEdgeAttribute(id, name, cb);
    return this;
  }
  updateEdgeAttributes(id: string, cb: (attr: EdgeAttributes) => EdgeAttributes) {
    this.graphology.updateEdgeAttributes(id, cb);
    return this;
  }
  removeEdgeAttribute(id: string, name: string | number) {
    this.graphology.removeEdgeAttribute(id, name);
    return this;
  }

  neighbors(id: string) {
    return this.graphology.neighbors(id).map((key) => {
      return this.nodeMap.get(key) as BaseNode;
    });
  }
  nonNeighbors(id: string) {
    const neighbors = this.neighbors(id);
    const node = this.nodeMap.get(id);
    return this.nodeMap.values().filter((n) => ![node, ...neighbors].includes(n));
  }
  relatedEdges(id: string) {
    return this.graphology
      .neighbors(id)
      .map((key) => {
        return this.graphology.edges(id, key);
      })
      .flat()
      .map((key) => this.edgeMap.get(key) as BaseEdge);
  }
  unrelatedEdges(id: string) {
    const relatedEdges = this.relatedEdges(id);
    return this.edgeMap.values().filter((e) => !relatedEdges.includes(e));
  }
  private createNode(id: string) {
    const options = this.options.node!;
    const data = this.graphology.getNodeAttributes(id);
    const type = toValue(options.type, data);
    const Node = getExtension("node", type as string);
    if (!Node) {
      throw new Error(`Node ${type} is not registered`);
    }
    const node = new Node(id, options, data);
    node.viewportScale = this.viewportContainer.scale;
    node.textureGenerator = this.textureGenerator;
    this.nodeMap.set(id, node);
    GraphVisNonBubblingEventNames.forEach((eventName) => {
      node.on(eventName, (e: FederatedPointerEvent) => {
        this.emit(`node:${eventName}`, {
          event: e,
          target: node,
          originalTarget: e.target,
          originalType: e.target.label,
        });
      });
    });
    this.nodesContainer.addChild(node);
    return node;
  }
  // 添加节点
  addNode(nodeData: NodeAttributes) {
    const nodeOptions = this.options.node!;
    this.emit("node:beforeadd", nodeData);
    const nodeId = preprocessNode(this.graphology, nodeData, nodeOptions);
    const node = this.createNode(nodeId) as BaseNode;
    node.draw();
    this.emit("node:afteradd", node);
    return this;
  }
  // 获取单个节点
  getNode(id: string) {
    return this.nodeMap.get(id);
  }
  // 删除节点
  dropNode(id: string) {
    this.emit("node:beforedrop", id);
    const node = this.getNode(id);
    if (!node) return;
    const nodeId = node.id;
    const edges = this.graphology.edges(nodeId);
    edges.forEach((key) => {
      this.dropEdge(key);
    });
    this.nodeMap.delete(nodeId);
    this.nodesContainer.removeChild(node);
    this.graphology.dropNode(nodeId);
    this.emit("node:afterdrop", node);
    return this;
  }
  nodes() {
    return [...this.nodeMap.values()];
  }
  // 清空图
  clear() {
    this.nodesContainer.removeChildren();
    this.edgesContainer.removeChildren();
    this.nodeMap.clear();
    this.edgeMap.clear();
    this.graphology.clear();
    this.emit("clear");
    return this;
  }
  // 清空所有边
  clearEdges() {
    this.edgesContainer.removeChildren();
    this.edgeMap.clear();
    this.graphology.clearEdges();
    this.emit("clearedges");
    return this;
  }
  setThemeOptions(type: string) {
    const ops = getExtension("theme", type);
    if (!ops) {
      const themes = getExtensionsKeys("theme");
      console.warn(`invalid theme: ${type} ; valid themes: ${themes.join(",")}`);
      return;
    }
    const { node, edge, background } = ops;
    if (background) {
      this.options.background = background;
      this.app.renderer.background.color = background;
    }
    if (node) this.setNodeOptions(node);
    if (edge) this.setEdgeOptions(edge);
  }
  // 判断是否要试图更改节点大小,形状，位置等layout
  private isNodeLayoutChanged(nodeOptions: NodeOptions) {
    const { style } = nodeOptions;
    if (!style) return false;
    if (style.size !== undefined || style.rotation !== undefined || style.radius !== undefined)
      return true;
    return false;
  }
  setNodeOptions(nodeOptions: Omit<NodeOptions, "type" | "drawBy">) {
    deepAssign(this.options.node, nodeOptions);
    this.forEachNode((node) => {
      // TODO: 修改为更细粒度的更新
      node.drawNode();
      node.drawLabel();
    });
    if (this.isNodeLayoutChanged(nodeOptions)) {
      this.forEachEdge((edge) => {
        edge.update();
      });
    }
    return this;
  }
  setEdgeOptions(edgeOptions: Omit<EdgeOptions, "type" | "drawBy">) {
    this.options.edge = deepAssign(this.options.edge, edgeOptions);
    Object.assign(
      this.options.link!,
      deepAssign(
        deepClone({
          style: this.options.edge.style,
          arrowConfig: this.options.edge.arrowConfig,
        }),
        this.options.link,
      ),
    );
    this.forEachEdge((edge) => {
      // TODO: 修改为更细粒度的更新
      edge.update();
    });
    return this;
  }
  setLinkOptions(linkOptions: LinkOptions) {
    deepAssign(this.options.link, linkOptions);
    this.link?.draw();
    return this;
  }
  getLink() {
    return this.link;
  }
  private createEdge(id: string) {
    const options = this.options.edge!;
    const data = this.graphology.getEdgeAttributes(id);
    const type = toValue(options.type, data);
    const Edge = getExtension("edge", type);
    if (!Edge) {
      throw new Error(`Edge ${type} is not registered`);
    }
    const edge = new Edge(id, options, data);
    const { source, target } = data;
    edge.source = this.nodeMap.get(source);
    edge.target = this.nodeMap.get(target);
    this.edgeMap.set(id, edge);
    GraphVisNonBubblingEventNames.forEach((eventName) => {
      edge.on(eventName, (e: FederatedPointerEvent) => {
        this.emit(`edge:${eventName}`, {
          target: edge,
          originalTarget: e.target,
          originalType: "edge",
          event: e,
        });
      });
    });
    this.edgesContainer.addChild(edge);
    return edge;
  }
  // 获取一条边
  getEdge(id: string) {
    return this.edgeMap.get(id);
  }
  // 添加边
  addEdge(edgeData: EdgeAttributes) {
    this.emit("edge:beforeadd", edgeData);
    const { edge: edgeOptions } = this.options;
    const edgeId = preprocessEdge(this.graphology, edgeData, edgeOptions!);
    const edge = this.createEdge(edgeId);
    edge.draw(true);
    this.emit("edge:afteradd", edge);
    return this;
  }
  // 删除边
  dropEdge(id: string) {
    this.emit("edge:beforedrop", id);
    const edge = this.getEdge(id);
    if (!edge) return;
    this.edgesContainer.removeChild(edge);
    this.edgeMap.delete(id);
    this.graphology.dropEdge(id);
    const { source, target } = edge;
    const edges = this.graphology.edges(source?.id, target?.id);
    const len = edges.length;
    if (len > 0) {
      edges.forEach((edgeId, index) => {
        const e = this.getEdge(edgeId);
        e!.edgeIndex = index;
        e!.edgeCount = len;
        e?.draw(true);
      });
    }
    this.emit("edge:afterdrop", edge);
    return this;
  }
  edges(s?: string, t?: string) {
    if (s === undefined && t === undefined) {
      return [...this.edgeMap.values()];
    }
    if (t === undefined) {
      return this.graphology.edges(s).map((id) => {
        return this.getEdge(id);
      });
    }
    return this.graphology.edges(s, t).map((id) => {
      return this.getEdge(id);
    });
  }
  private initEvents() {
    this.app.renderer.on("resize", debounce(this.resizeHandler(), this.options.resizeDebounceTime));
    this.initViewContainerEvents();
    this.initStageEvents();
  }
  private initViewContainerEvents() {
    GraphVisBubblingEventNames.forEach((eventName) => {
      this.viewportContainer.on(eventName, (e: FederatedPointerEvent | FederatedWheelEvent) => {
        if (!e.target.label) return;
        const [type = "", id] = e.target.label.split(ID_SPLIT_CHAR);
        if (type.includes("node")) {
          const node = this.getNode(id);
          if (node) {
            this.emit(`node:${eventName}`, {
              target: node,
              originalTarget: e.target,
              event: e,
              originalType: type,
            });
          }
        }
        if (type.includes("edge")) {
          const edge = this.getEdge(id);
          if (edge) {
            this.emit(`edge:${eventName}`, {
              target: edge,
              originalTarget: e.target,
              event: e,
              originalType: type,
            });
          }
        }
      });
    });
  }
  private initStageEvents() {
    const mousemoveHandler = (e: FederatedPointerEvent) => {
      const label = e.target.label;
      if (label) {
        const [type, id] = label.split(ID_SPLIT_CHAR);
        if (type.includes("node")) {
          const node = this.getNode(id);
          this.activeNode = node;
        }
        if (type.includes("edge")) {
          const edge = this.getEdge(id);
          this.activeEdge = edge;
        }
      } else {
        this.activeEdge = undefined;
        this.activeNode = undefined;
      }
    };
    GraphVisEventNames.forEach((eventName) => {
      this.app.stage.on(eventName, (e) => {
        if (eventName === "mousemove") {
          mousemoveHandler(e as FederatedPointerEvent);
        }
        this.emit(`stage:${eventName}`, { event: e, target: e.target });
      });
    });
  }
  private initZoom() {
    const zoomedHandle = (event: any) => {
      const { transform } = event;
      this.viewportContainer.position.set(transform.x, transform.y);
      this.viewportContainer.scale.set(transform.k, transform.k);
      this.emit("zoom", event);
    };
    const zoomStartHandle = (event: any) => {
      this.emit("zoomstart", event);
    };
    const zoomEndHandle = (event: any) => {
      this.emit("zoomend", event);
    };
    const { zoom: zoomOptions } = this.options;
    const selection = select(this.canvas);
    if (zoomOptions) {
      const {
        enable,
        enableDblclickZoom,
        enableWheelZoom,
        scaleExtent,
        extent,
        translateExtent,
        tapDistance,
        wheelDelta,
        clickDistance,
        filter,
      } = zoomOptions;
      if (enable === false) {
        selection.on(".zoom", null);
      } else {
        this.zoomBehavior.filter((event) => {
          // 默认保护逻辑
          const defaultAllowed = (!event.ctrlKey || event.type === "wheel") && !event.button;
          if (!defaultAllowed) return false;
          // 如果是在元素节点或边元素的时候并且不是缩放操作禁止缩放
          if (this.activeNode && event.type !== "wheel") return false;
          return true;
        });
        if (typeof filter === "function") {
          this.zoomBehavior.filter(filter);
        }
        if (Array.isArray(scaleExtent)) {
          this.zoomBehavior.scaleExtent(scaleExtent);
        }
        if (Array.isArray(extent)) {
          this.zoomBehavior.extent(extent);
        }
        if (Array.isArray(translateExtent)) {
          this.zoomBehavior.translateExtent(translateExtent);
        }
        if (typeof tapDistance === "number") {
          this.zoomBehavior.tapDistance(tapDistance);
        }
        if (typeof clickDistance === "number") {
          this.zoomBehavior.clickDistance(clickDistance);
        }
        if (typeof wheelDelta === "function") {
          this.zoomBehavior.wheelDelta(wheelDelta);
        }
        this.zoomBehavior
          .on("zoom", zoomedHandle)
          .on("start", zoomStartHandle)
          .on("end", zoomEndHandle);
        selection.call(this.zoomBehavior);
        if (enableDblclickZoom === false) {
          selection.on("dblclick.zoom", null);
        }
        if (enableWheelZoom === false) {
          selection.on("wheel.zoom", null);
        }
        selection.call(
          this.zoomBehavior.transform,
          zoomIdentity.translate(this.screenCenterX, this.screenCenterY).scale(1),
        );
      }
    }
  }
  setZoomOptions(options: ZoomOptions) {
    deepAssign(this.options.zoom, options);
    this.initZoom();
    return this;
  }
  setDragOptions(options: DragOptions) {
    deepAssign(this.options.drag, options);
    this.initDrag();
    return this;
  }
  private initDrag() {
    const dragStartHandle = (event: any) => {
      this.emit("node:dragstart", event);
      event.subject.onDragStart(event);
    };
    const draggingHandle = (event: any) => {
      this.emit("node:drag", event);
      event.subject.onDragged(event, (id: string) => {
        this.graphology.filterEdges(id, (edgeId) => {
          this.edgeMap.get(edgeId)?.update();
        });
      });
    };
    const dragEndHandle = (event: any) => {
      this.emit("node:dragend", event);
      event.subject.onDragEnd(event);
    };
    const { drag: dragOptions } = this.options;
    const selection = select(this.canvas);
    if (dragOptions) {
      const { enable, filter, touchable, clickDistance } = dragOptions;
      if (enable === false) {
        selection.on(".drag", null);
      } else {
        if (typeof filter === "function") {
          this.dragBehavior.filter(filter);
        }
        if (touchable) {
          this.dragBehavior.touchable(touchable);
        }
        if (typeof clickDistance === "number") {
          this.dragBehavior.clickDistance(clickDistance);
        }
        this.dragBehavior
          .container(this.canvas)
          .subject(() => {
            return this.activeNode ? this.activeNode : null;
          })
          .on("start", dragStartHandle)
          .on("drag", draggingHandle)
          .on("end", dragEndHandle);
        selection.call(this.dragBehavior);
      }
    }
  }
  global2LocalPoint(x: number, y: number) {
    return this.viewportContainer.toLocal({ x, y });
  }
  local2GlobalPoint(x: number, y: number) {
    return this.viewportContainer.toGlobal({ x, y });
  }
  getCenter() {
    const { x, y, k } = this.transform;
    const center = {
      x: (this.screenCenterX - x) / k,
      y: (this.screenCenterY - y) / k,
    };
    return center;
  }
  translateTo(x: number, y: number) {
    this.zoomBehavior.translateTo(select(this.canvas), x, y);
  }
  translateBy(dx: number, dy: number) {
    this.zoomBehavior.translateBy(select(this.canvas), dx, dy);
  }
  centerAt(x: number, y: number, easing?: EasingType, duration?: number) {
    if (duration === undefined && easing === undefined) {
      this.translateTo(x, y);
    } else {
      const t = new Tween(this.getCenter(), this.tweenGroup)
        .to({ x, y }, duration ?? 1000)
        .easing(EASING[easing ?? "quadratic-in"])
        .onUpdate(({ x, y }) => {
          this.translateTo(x, y);
        })
        .onComplete(() => {
          this.tweenGroup.remove(t);
        })
        .start();
    }
  }
  zoom(k: number, easing?: EasingType, duration?: number) {
    const selection = select(this.canvas);
    if (duration === undefined && easing === undefined) {
      this.setZoom(k);
    } else {
      const { k: k1 } = this.transform;
      const t = new Tween({ k: k1 }, this.tweenGroup)
        .to({ k }, duration)
        .easing(EASING[easing ?? "quadratic-in"])
        .onUpdate(({ k }) => {
          this.zoomBehavior.scaleTo(selection, k);
        })
        .onComplete(() => {
          this.tweenGroup.remove(t);
        })
        .start();
    }
  }
  getGraphBBox() {
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    this.forEachNode((node) => {
      if (node.x < minX) {
        minX = node.x;
      }
      if (node.x > maxX) {
        maxX = node.x;
      }
      if (node.y < minY) {
        minY = node.y;
      }
      if (node.y > maxY) {
        maxY = node.y;
      }
    });
    return { minX, maxX, minY, maxY };
  }
  private setZoom(zoom: number) {
    this.zoomBehavior.scaleTo(select(this.canvas), zoom);
  }
  zoomToFit(zoomFactor: number = 1, easing?: EasingType, duration?: number) {
    const { width, height } = this.app.screen;
    let { minX, maxX, minY, maxY } = this.getGraphBBox();
    const center = [(minX + maxX) / 2, (minY + maxY) / 2];
    const zoomK = Math.min(width / (maxX - minX), height / (maxY - minY));
    this.centerAt(center[0], center[1], easing, duration);
    this.zoom(zoomK * zoomFactor, easing, duration);
  }
  // 重置到初始状态
  resetView(easing?: EasingType, duration?: number) {
    if (easing === undefined && duration === undefined) {
      select(this.canvas).call(
        this.zoomBehavior.transform,
        new ZoomTransform(1, this.screenCenterX, this.screenCenterY),
      );
    } else {
      const { x, y, k } = this.transform;
      const t = new Tween({ x, y, k }, this.tweenGroup)
        .to({ x: this.screenCenterX, y: this.screenCenterY, k: 1 }, duration ?? 500)
        .easing(EASING[easing ?? "quadratic-out"])
        .onUpdate(({ x, y, k }) => {
          select(this.canvas).call(this.zoomBehavior.transform, new ZoomTransform(k, x, y));
        })
        .onComplete(() => {
          this.tweenGroup.remove(t);
        })
        .start();
    }
  }
  private linkeNodeMoveHandle(event: FederatedPointerEvent) {
    if (!this.link) return;
    const node = this.activeNode;
    if (node) {
      const source = this.link.source;
      const edgeKeys = this.graphology.edges(source?.id, node.id);
      const edgeCount = edgeKeys.length + 1;
      if (edgeCount > 1 && this.multi === false) {
        const { x, y } = this.global2LocalPoint(event.x, event.y);
        this.link.target = {
          x,
          y,
        } as BaseNode;
        this.link.targetType = "point";
        return;
      }
      if (source === node) {
        this.link.isSelfLoop = true;
      }
      this.link.target = node;
      this.link.targetType = "node";
      const cacheEdges: BaseEdge[] = [];
      edgeKeys.forEach((k) => {
        const edge = this.edgeMap.get(k)!;
        edge.edgeCount = edgeCount;
        edge.draw(true);
        cacheEdges.push(edge);
      });
      this.link.cacheEdges = cacheEdges;
      this.link.edgeCount = edgeCount;
    } else {
      const { x, y } = this.global2LocalPoint(event.x, event.y);
      this.link.targetType = "point";
      const length = this.link.cacheEdges.length;
      this.link.cacheEdges.forEach((e) => {
        e.edgeCount = length;
        e.draw(true);
      });
      this.link.cacheEdges = [];
      this.link.edgeCount = 1;
      this.link.isSelfLoop = false;
      this.link.target = {
        x,
        y,
      } as BaseNode;
    }
    this.link.data.target = this.link.target.data ?? this.link.target;
    this.link.data.targetType = this.link.targetType;
    this.link.draw();
    this.emit("link:move", { event, link: this.link });
  }
  startLinkNode(node: BaseNode, isDirected: boolean = true) {
    if (this.type === "undirected" && isDirected === true) {
      console.warn(`graph type is ${this.type}, can not draw directed edge.`);
      isDirected = false;
    }
    if (this.type === "directed" && isDirected === false) {
      console.warn(`graph type is ${this.type},can not draw undirected edge.`);
      isDirected = true;
    }
    if (this.link === undefined) {
      this.link = new Link(this.options.link!);
    }
    this.stopLayout();
    this.link.isLinking = true;
    this.link.isDirected = isDirected;
    this.link.source = node;
    this.link.data.source = node.data;
    this.link.data.isLinking = true;
    this.edgesContainer.addChild(this.link);
    this.app.stage.cursor = "crosshair";
    this.app.stage.on("pointermove", this.linkeNodeMoveHandle, this);
    this.app.stage.on("pointerdown", this.endLinkNode, this);
    this.emit("link:start", this.link);
  }
  endLinkNode() {
    if (this.link) {
      // 如果没有正在link返回
      if (!this.link.isLinking) return;
      if (this.link.targetType === "node") {
        const source = this.link.source?.id;
        const target = (this.link.target as BaseNode)?.id;
        this.addEdge({ source, target, isDirected: this.link.isDirected });
      }
      this.link.isLinking = false;
      this.link.data.isLinking = false;
      this.app.stage.off("pointermove", this.linkeNodeMoveHandle, this);
      this.app.stage.off("pointerdown", this.endLinkNode, this);
      this.link.visible = false;
      this.app.stage.cursor = "default";
      this.link.cacheEdges = [];
      this.emit("link:end", this.link);
    }
  }
}
export { GraphVis };

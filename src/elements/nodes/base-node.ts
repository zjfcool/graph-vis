import { BitmapText, Text, Container, Graphics, ObservablePoint, Sprite, Texture } from "pixi.js";
import type {
  DrawBy,
  NodeAttributes,
  NodeConfig,
  NodeLabelConfig,
  NodeOptions,
  NodeType,
  Segment,
  State,
} from "../../types";
import { deepAssignList, isText, omit, toValue, toValueList } from "../../utils";
import type { TextureGenerator } from "../../utils";
import { GraphElementLabel, ID_SPLIT_CHAR, NodeElementLabel } from "../../constants";

abstract class BaseNode extends Container {
  id: string;
  data: NodeAttributes;
  options: NodeOptions;
  node: Container;
  nodeLabel: Container;
  viewportScale?: ObservablePoint;
  locked?: boolean;
  bounds?: [number, number];
  currentState: State;
  dragStartPosition?: {
    x: number;
    y: number;
    fx?: number;
    fy?: number;
  };
  isDragging: boolean = false;
  textureGenerator?: TextureGenerator;
  segments?: Segment[] = [];
  nodeContext?: Graphics | Sprite | Text | BitmapText;
  haloContext?: Graphics | Sprite;

  constructor(id: string, options: NodeOptions, data: NodeAttributes) {
    super();
    this.options = options;
    this.id = id;
    this.data = data;
    this.x = data.x ?? 0;
    this.y = data.y ?? 0;
    this.eventMode = "static";
    // node init
    let node = new Container();
    node.eventMode = "static";
    node.cursor = "pointer";
    node.label = `${GraphElementLabel.Node}${ID_SPLIT_CHAR}${id}`;
    this.node = node;
    this.addChild(this.node);
    // node label init
    const nodeLabel = new Container();
    nodeLabel.eventMode = "static";
    nodeLabel.cursor = "pointer";
    nodeLabel.label = `${GraphElementLabel.NodeLabel}${ID_SPLIT_CHAR}${id}`;
    this.nodeLabel = nodeLabel;
    this.addChild(this.nodeLabel);
    // init state
    this.currentState = "default";

    // this.locked = true;
  }
  get type() {
    return toValue(this.options.type, this.data) as NodeType;
  }
  get state() {
    return this.currentState;
  }
  set state(v: string) {
    this.currentState = v;
    this.draw();
  }
  getDraggedPosition(event: any) {
    const { x, y } = this.dragStartPosition!;
    return {
      x: x + (event.x - x) / this.viewportScale!.x,
      y: y + (event.y - y) / this.viewportScale!.y,
    };
  }
  onDragStart() {
    this.dragStartPosition = {
      x: this.x!,
      y: this.y!,
      //   fx: this.fx!,
      //   fy: this.fy!,
    };
    // this.fx = this.x;
    // this.fy = this.y;
    this.data!.fx = this.x;
    this.data!.fy = this.y;
    this.isDragging = true;
    this.node!.cursor = "grab";
  }
  onDragged(event: any, callback?: (id: string) => void) {
    const { x, y } = this.getDraggedPosition(event);
    this.x = x;
    this.y = y;
    this.data!.fx = this.x;
    this.data!.fy = this.y;
    this.update();
    callback?.(this.id);
  }
  onDragEnd(event: any) {
    if (this.locked) {
      const { x, y } = this.getDraggedPosition(event);
      this.data!.fx = x;
      this.data!.fy = y;
    } else {
      this.data!.fx = null;
      this.data!.fy = null;
    }
    this.isDragging = false;
    this.node!.cursor = "pointer";
  }
  useContext(drawBy: DrawBy) {
    const { node, type } = this;
    if (drawBy === "graphics" || drawBy === undefined) {
      let haloContext = node.getChildByLabel(`${NodeElementLabel.Halo}`) as Graphics;
      if (!haloContext) {
        haloContext = new Graphics();
        haloContext.label = `${NodeElementLabel.Halo}`;
        node.addChild(haloContext);
      }
      haloContext.clear();
      this.haloContext = haloContext;

      this.beforeDrawNode();
      let nodeContext;
      if (type === "text") {
        nodeContext = node.getChildByLabel(`${NodeElementLabel.Node}`) as Text;
        if (!nodeContext) {
          nodeContext = new Text();
          nodeContext.label = `${NodeElementLabel.Node}`;
          node.addChild(nodeContext);
        }
      } else if (type === "bitmap-text") {
        nodeContext = node.getChildByLabel(`${NodeElementLabel.Node}`) as BitmapText;
        if (!nodeContext) {
          nodeContext = new BitmapText();
          nodeContext.label = `${NodeElementLabel.Node}`;
          node.addChild(nodeContext);
        }
      } else {
        nodeContext = node.getChildByLabel(`${NodeElementLabel.Node}`) as Graphics;
        if (!nodeContext) {
          nodeContext = new Graphics();
          nodeContext.label = `${NodeElementLabel.Node}`;
          node.addChild(nodeContext);
        }
        nodeContext.clear();
      }
      this.nodeContext = nodeContext;
    }
    if (drawBy === "sprite") {
      let haloContext = node.getChildByLabel(`${NodeElementLabel.Halo}`) as Sprite;
      if (!haloContext) {
        haloContext = new Sprite();
        haloContext.label = `${NodeElementLabel.Halo}`;
        node.addChild(haloContext);
      }
      haloContext.visible = false;
      this.haloContext = haloContext;
      this.beforeDrawNode();
      let nodeContext;
      if (type === "text") {
        nodeContext = node.getChildByLabel(`${NodeElementLabel.Node}`) as Text;
        if (!nodeContext) {
          nodeContext = new Text();
          nodeContext.label = `${NodeElementLabel.Node}`;
          node.addChild(nodeContext);
        }
      } else if (type === "bitmap-text") {
        nodeContext = node.getChildByLabel(`${NodeElementLabel.Node}`) as BitmapText;
        if (!nodeContext) {
          nodeContext = new BitmapText();
          nodeContext.label = `${NodeElementLabel.Node}`;
          node.addChild(nodeContext);
        }
      } else {
        nodeContext = node.getChildByLabel(`${NodeElementLabel.Node}`) as Sprite;
        if (!nodeContext) {
          nodeContext = new Sprite();
          nodeContext.label = `${NodeElementLabel.Node}`;
          node.addChild(nodeContext);
        }
      }
      this.nodeContext = nodeContext;
    }
  }
  getNodeLabelConfig(): Required<NodeLabelConfig> {
    const { data, options, state } = this;
    const { labelConfig } = options;
    const style = labelConfig?.style;
    let [
      textStyle,
      visible,
      labelOffsetX,
      labelOffsetY,
      placement,
      halo,
      haloSpacing = 0,
      haloFill,
      haloStroke,
      haloRadius = 0,
      haloTint,
      haloAlpha,
      stateObj,
      labelText,
      type,
      drawBy,
      nodeDrawBy,
    ] = toValueList(
      [
        omit(
          style,
          "halo",
          "haloSpacing",
          "haloFill",
          "haloStroke",
          "haloRadius",
          "visible",
          "offsetX",
          "offsetY",
          "placement",
          "haloTint",
          "haloAlpha",
        ),
        style?.visible,
        style?.offsetX,
        style?.offsetY,
        style?.placement,
        style?.halo,
        style?.haloSpacing,
        style?.haloFill,
        style?.haloStroke,
        style?.haloRadius,
        style?.haloTint,
        style?.haloAlpha,
        options?.state,
        labelConfig?.labelText,
        labelConfig?.type,
        labelConfig?.drawBy,
        options.drawBy,
      ],
      data,
    );
    drawBy = drawBy ?? nodeDrawBy;
    if (stateObj?.[state]?.labelStyle) {
      let {
        visible: stateVisible,
        halo: stateHalo,
        haloFill: stateHaloFill,
        haloStroke: stateHaloStroke,
        haloSpacing: stateHaloSpacing,
        haloRadius: stateHaloRadius,
        offsetY: stateOffsetY,
        offsetX: stateOffsetX,
        placement: statePlacement,
        haloTint: stateHaloTint,
        haloAlpha: stateHaloAlpha,
        ...stateTextStyle
      } = stateObj[state].labelStyle;

      [
        textStyle,
        visible,
        halo,
        haloFill,
        haloSpacing,
        haloStroke,
        haloRadius,
        labelOffsetX,
        labelOffsetY,
        placement,
        haloTint,
        haloAlpha,
      ] = deepAssignList(
        [
          textStyle,
          visible,
          halo,
          haloFill,
          haloSpacing,
          haloStroke,
          haloRadius,
          labelOffsetX,
          labelOffsetY,
          placement,
          haloTint,
          haloAlpha,
        ],
        toValueList(
          [
            stateTextStyle,
            stateVisible,
            stateHalo,
            stateHaloFill,
            stateHaloSpacing,
            stateHaloStroke,
            stateHaloRadius,
            stateOffsetX,
            stateOffsetY,
            statePlacement,
            stateHaloTint,
            stateHaloAlpha,
          ],
          data,
        ),
      );
    }
    return {
      textStyle,
      visible,
      labelOffsetX,
      labelOffsetY,
      placement,
      halo,
      haloSpacing,
      haloFill,
      haloStroke,
      haloRadius,
      haloTint,
      haloAlpha,
      labelText,
      type,
      drawBy,
    };
  }
  getNodeConfig(): Required<NodeConfig> {
    const { data, options, state } = this;
    const { style } = options;
    let [
      textStyle,
      visible,
      size,
      fill,
      stroke,
      halo,
      haloSpacing,
      haloFill,
      haloStroke,
      tint,
      alpha,
      haloTint,
      haloAlpha,
      pointNum,
      rotation,
      imgUrl,
      radius,
      haloRadius,
      stateObj,
      drawBy,
      type,
      textValue,
    ] = toValueList(
      [
        omit(
          style,
          "visible",
          "size",
          "halo",
          "haloSpacing",
          "haloFill",
          "haloStroke",
          "tint",
          "alpha",
          "haloTint",
          "haloAlpha",
          "pointNum",
          "rotation",
          "imgUrl",
          "radius",
          "haloRadius",
        ),
        style?.visible,
        style?.size,
        style?.fill,
        style?.stroke,
        style?.halo,
        style?.haloSpacing,
        style?.haloFill,
        style?.haloStroke,
        style?.tint,
        style?.alpha,
        style?.haloTint,
        style?.haloAlpha,
        style?.pointNum,
        style?.rotation,
        style?.imgUrl,
        style?.radius,
        style?.haloRadius,
        options.state,
        options.drawBy,
        options.type,
        options.textValue,
      ],
      data,
    );
    if (stateObj?.[state]) {
      let {
        visible: stateVisible,
        size: stateSize,
        fill: stateFill,
        stroke: stateStroke,
        halo: stateHalo,
        haloFill: stateHaloFill,
        haloStroke: stateHaloStroke,
        haloSpacing: stateHaloSpacing,
        tint: stateTint,
        alpha: stateAlpha,
        haloTint: stateHaloTint,
        haloAlpha: stateHaloAlpha,
        pointNum: statePointNum,
        rotation: stateRotation,
        imgUrl: stateImgUrl,
        radius: stateRadius,
        haloRadius: stateHaloRadius,
        ...stateTextStyle
      } = stateObj[state];
      [
        textStyle,
        visible,
        size,
        fill,
        stroke,
        halo,
        haloSpacing,
        haloFill,
        haloStroke,
        tint,
        alpha,
        haloTint,
        haloAlpha,
        pointNum,
        rotation,
        imgUrl,
        radius,
        haloRadius,
      ] = deepAssignList(
        [
          textStyle,
          visible,
          size,
          fill,
          stroke,
          halo,
          haloSpacing,
          haloFill,
          haloStroke,
          tint,
          alpha,
          haloTint,
          haloAlpha,
          pointNum,
          rotation,
          imgUrl,
          radius,
          haloRadius,
        ],
        toValueList(
          [
            stateTextStyle,
            stateVisible,
            stateSize,
            stateFill,
            stateStroke,
            stateHalo,
            stateHaloSpacing,
            stateHaloFill,
            stateHaloStroke,
            stateTint,
            stateAlpha,
            stateHaloTint,
            stateHaloAlpha,
            statePointNum,
            stateRotation,
            stateImgUrl,
            stateRadius,
            stateHaloRadius,
          ],
          data,
        ),
      );
    }
    return {
      textStyle,
      visible,
      size,
      fill,
      stroke,
      halo,
      haloSpacing,
      haloFill,
      haloStroke,
      tint,
      alpha,
      haloTint,
      haloAlpha,
      pointNum,
      rotation,
      imgUrl,
      radius,
      haloRadius,
      drawBy,
      type,
      textValue,
    };
  }
  beforeDrawNode() {}
  afterDrawNode() {}
  abstract drawNode(): void;
  beforeDrawLabel?: () => void;
  afterDrawLabel() {}
  drawLabel() {
    const {
      textStyle,
      visible,
      labelOffsetX,
      labelOffsetY,
      placement,
      halo,
      haloSpacing,
      haloFill,
      haloStroke,
      haloRadius,
      haloTint,
      haloAlpha,
      labelText,
      type,
      drawBy,
    } = this.getNodeLabelConfig();
    const { bounds } = this;
    const nodeLabel = this.nodeLabel;
    nodeLabel.visible = visible!;
    if (visible === false) return;
    if (!isText(labelText)) {
      console.error(
        "Please config node.labelConfig.labelText (return string | number | { toString: ()=>string })",
      );
      return;
    }
    let haloContext = nodeLabel.getChildByLabel("halo") as Graphics | Sprite;
    if (!haloContext) {
      if (drawBy === "graphics" || drawBy === undefined) haloContext = new Graphics();
      if (drawBy === "sprite") haloContext = new Sprite(Texture.WHITE);
      haloContext.label = "halo";
      nodeLabel.addChild(haloContext);
    }
    this.beforeDrawLabel?.();
    if (drawBy === "graphics" || drawBy === undefined) {
      (haloContext as Graphics).clear();
    }
    haloContext.visible = false;

    let textContext = nodeLabel.getChildByLabel("text") as Text | BitmapText;
    if (!textContext) {
      if (type === "text" || type === undefined) textContext = new Text();
      if (type === "bitmap-text") textContext = new BitmapText();
      textContext.label = "text";
      nodeLabel.addChild(textContext);
    }

    textContext.text = labelText;
    textContext.style = textStyle;
    textContext.anchor.set(0.5, 0.5);

    const { width, height } = textContext;
    const w = halo === true ? width + haloSpacing * 2 : width;
    const h = halo === true ? height + haloSpacing * 2 : height;
    const position = { x: labelOffsetX, y: labelOffsetY };
    switch (placement) {
      case "left":
        position.x -= w / 2 + bounds![0] / 2;
        break;
      case "right":
        position.x += w / 2 + bounds![0] / 2;
        break;
      case "top":
        position.y -= h / 2 + bounds![1] / 2;
        break;
      case "bottom":
        position.y += h / 2 + bounds![1] / 2;
        break;
    }

    if (halo === true) {
      haloContext.visible = true;
      if (drawBy === "graphics" || drawBy === undefined) {
        (haloContext as Graphics).roundRect(-w / 2, -h / 2, w, h, haloRadius);
        if (haloFill) (haloContext as Graphics).fill(haloFill);
        if (haloStroke) (haloContext as Graphics).stroke(haloStroke);
      }
      if (drawBy === "sprite") {
        haloContext.scale.set(w, h);
        (haloContext as Sprite).anchor.set(0.5, 0.5);
        haloContext.tint = haloTint;
        haloContext.alpha = haloAlpha;
      }
    }
    this.afterDrawLabel?.();
    nodeLabel.position.set(position.x, position.y);
  }
  beforeDraw() {}
  draw() {
    this.beforeDraw();
    this.drawNode();
    this.drawLabel();
    this.afterDraw();
  }
  afterDraw() {}
  beforeUpdate() {}
  abstract setSegments(): void;
  update() {
    this.beforeUpdate();
    this.setSegments();
    // this.position.set(this.x, this.y);
    this.afterUpdate();
    return this;
  }
  afterUpdate() {}
}
export { BaseNode };

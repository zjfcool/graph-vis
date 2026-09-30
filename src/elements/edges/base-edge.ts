import {
  Text,
  BitmapText,
  ColorSource,
  Container,
  FillGradient,
  FillPattern,
  Graphics,
  Sprite,
  StrokeStyle,
  Texture,
  MeshRope,
  RopeGeometry,
} from "pixi.js";
import {
  BezierConfig,
  CommonPoint,
  EdgeArrowConfig,
  EdgeAttributes,
  EdgeConfig,
  EdgeLabelConfig,
  EdgeOptions,
  EdgeStyleOptions,
  State,
} from "../../types";
import { BaseNode } from "../nodes";
import { GraphElementLabel, ID_SPLIT_CHAR } from "../../constants";
import { deepAssignList, isPlainObject, isText, omit, toValue, toValueList } from "../../utils";

export abstract class BaseEdge extends Container {
  id: string;
  options: EdgeOptions;
  source?: BaseNode;
  target?: BaseNode;
  edge: Container;
  edgeArrow: Container;
  edgeLabel: Container;
  edgePoints: CommonPoint[] = [];
  edgeArrowPoints?: { head: CommonPoint; tail: CommonPoint };
  edgeLabelPointAttr?: { x: number; y: number; rotation: number };
  data: EdgeAttributes;
  currentState: State;
  isLinkMode?: boolean;
  constructor(id: string, options: EdgeOptions, data: EdgeAttributes) {
    super();
    this.id = id;
    this.options = options;
    this.data = data;
    this.eventMode = "static";
    const edge = new Container();
    edge.eventMode = "static";
    edge.cursor = "pointer";
    edge.label = `${GraphElementLabel.Edge}${ID_SPLIT_CHAR}${id}`;
    this.edge = edge;
    this.addChild(this.edge);
    const edgeArrow = new Container();
    edgeArrow.eventMode = "static";
    edgeArrow.cursor = "pointer";
    edgeArrow.label = `${GraphElementLabel.EdgeArrow}${ID_SPLIT_CHAR}${id}`;
    this.edgeArrow = edgeArrow;
    this.addChild(this.edgeArrow);
    this.currentState = "default";
    const edgeLabel = new Container();
    edgeLabel.eventMode = "static";
    edgeLabel.cursor = "pointer";
    edgeLabel.label = `${GraphElementLabel.EdgeLabel}${ID_SPLIT_CHAR}${id}`;
    this.edgeLabel = edgeLabel;
    this.addChild(this.edgeLabel);
  }
  get type() {
    return toValue(this.options.type, this.data);
  }
  get state() {
    return this.currentState;
  }
  set state(v) {
    this.currentState = v;
    const stateStyle = this.options.state?.[v];
    if (stateStyle) {
      this.drawEdge();
      if (stateStyle.labelStyle) {
        this.drawEdgeLabel();
      }
      if (stateStyle.arrowStyle) {
        this.drawEdgeArrow();
      }
    }
    if (v === "default") {
      this.draw();
    }
  }
  get edgeCount() {
    return this.data.edgeCount ?? (1 as number);
  }
  set edgeCount(v: number) {
    this.data.edgeCount = v;
  }
  get edgeIndex() {
    return this.data.edgeIndex ?? (0 as number);
  }
  set edgeIndex(v: number) {
    this.data.edgeIndex = v;
  }
  get isSelfLoop() {
    return this.data.isSelfLoop as boolean;
  }
  set isSelfLoop(v: boolean) {
    this.data.isSelfLoop = v;
  }
  get isDirected() {
    return this.data.isDirected;
  }
  set isDirected(v: boolean) {
    this.data.isDirected = v;
  }
  get dx() {
    if (this.target && this.source) {
      return this.target.x! - this.source.x!;
    }
    return 0;
  }
  get dy() {
    if (this.target && this.source) {
      return this.target.y! - this.source.y!;
    }
    return 0;
  }
  get angle() {
    return this.isSelfLoop ? 0 : Math.atan2(this.dy, this.dx);
  }
  get stepCount() {
    const middleIndex = (this.edgeCount! - 1) / 2;
    const delta = this.edgeIndex! - middleIndex;
    return delta;
  }
  get direction() {
    return this.source!.id! > this.target!.id! ? 1 : -1;
  }
  get isCurved() {
    return this.stepCount !== 0 && !this.isSelfLoop;
  }
  get isQuadratic() {
    return this.type === "quadratic";
  }
  get isCubic() {
    return this.type === "cubic";
  }
  get isAuto() {
    return this.type === "auto";
  }
  getBezierConfig(): BezierConfig {
    const { source } = this;
    const style = this.options.style as EdgeStyleOptions;
    let [
      quadraticSpacing,
      quadraticRotation,
      quadraticAlongT,
      cubicSpacing,
      cubicRotation,
      cubicAlongT,
    ] = toValueList(
      [
        style?.quadraticSpacing,
        style?.quadraticRotation,
        style?.quadraticAlongT,
        style?.cubicSpacing,
        style?.cubicRotation,
        style?.cubicAlongT,
      ],
      this.data,
    );
    const nodeMaxBound = (Math.max(...(source?.bounds || [])) ?? 0) / 2;
    return {
      quadraticSpacing,
      quadraticRotation,
      quadraticAlongT,
      cubicSpacing,
      cubicRotation,
      cubicAlongT,
      nodeMaxBound,
    };
  }
  getEdgeConfig(): EdgeConfig {
    const { options, data, state } = this;
    const style = options.style as EdgeStyleOptions;
    let [
      visible,
      stroke,
      haloStroke,
      halo,
      haloTint,
      haloSpacing,
      haloAlpha,
      smoothness,
      tint,
      alpha,
      width,
      stateObj,
    ] = toValueList(
      [
        style?.visible,
        style?.stroke,
        style?.haloStroke,
        style?.halo,
        style?.haloTint,
        style?.haloSpacing,
        style?.haloAlpha,
        style?.smoothness,
        style?.tint,
        style?.alpha,
        style?.width,
        options.state,
      ],
      data,
    );
    const stateStyle = stateObj?.[state];
    if (stateStyle) {
      const {
        visible: stateVisible,
        stroke: stateStroke,
        haloStroke: stateHaloStroke,
        halo: stateHalo,
        haloTint: stateHaloTint,
        haloSpacing: stateHaloSpacing,
        haloAlpha: stateHaloAlpha,
        smoothness: stateSmoothness,
        tint: stateTint,
        alpha: stateAlpha,
        width: stateWidth,
      } = stateStyle;
      [
        visible,
        stroke,
        haloStroke,
        halo,
        haloTint,
        haloSpacing,
        haloAlpha,
        smoothness,
        tint,
        alpha,
        width,
      ] = deepAssignList(
        [
          visible,
          stroke,
          haloStroke,
          halo,
          haloTint,
          haloSpacing,
          haloAlpha,
          smoothness,
          tint,
          alpha,
          width,
        ],
        toValueList(
          [
            stateVisible,
            stateStroke,
            stateHaloStroke,
            stateHalo,
            stateHaloTint,
            stateHaloSpacing,
            stateHaloAlpha,
            stateSmoothness,
            stateTint,
            stateAlpha,
            stateWidth,
          ],
          data,
        ),
      );
    }
    return {
      visible,
      stroke,
      haloStroke,
      halo,
      haloTint,
      haloSpacing,
      haloAlpha,
      smoothness,
      tint,
      alpha,
      width,
    };
  }
  getEdgeLabelConfig(): EdgeLabelConfig {
    const { options, data, state } = this;
    const { labelConfig } = options;
    const style = labelConfig?.style;
    let [
      visible,
      textStyle,
      labelText,
      offsetX,
      offsetY,
      halo,
      haloSpacing = 0,
      haloFill,
      haloStroke,
      haloRadius = 0,
      haloTint,
      haloAlpha,
      alongT,
      alongTPositionMode,
      offsetPositionMode,
      stateObj,
      type,
      drawBy,
      edgeDrawBy,
    ] = toValueList(
      [
        style?.visible,
        omit(
          style,
          "visible",
          "offsetX",
          "offsetY",
          "halo",
          "haloFill",
          "haloStroke",
          "haloSpacing",
          "haloRadius",
          "haloTint",
          "haloAlpha",
          "alongT",
          "alongTPositionMode",
          "offsetPositionMode",
        ),
        labelConfig?.labelText,
        style?.offsetX,
        style?.offsetY,
        style?.halo,
        style?.haloSpacing,
        style?.haloFill,
        style?.haloStroke,
        style?.haloRadius,
        style?.haloTint,
        style?.haloAlpha,
        style?.alongT,
        style?.alongTPositionMode,
        style?.offsetPositionMode,
        options?.state,
        labelConfig?.type,
        labelConfig?.drawBy,
        options.drawBy,
      ],
      data,
    );
    drawBy = drawBy ?? edgeDrawBy;
    const stateLabelStyle = stateObj?.[state]?.labelStyle;
    if (stateLabelStyle) {
      let {
        visible: stateVisible,
        halo: stateHalo,
        haloFill: stateHaloFill,
        haloStroke: stateHaloStroke,
        haloSpacing: stateHaloSpacing,
        haloRadius: stateHaloRadius,
        offsetX: stateOffsetX,
        offsetY: stateOffsetY,
        haloTint: stateHaloTint,
        haloAlpha: stateHaloAlpha,
        alongT: stateAlongT,
        alongTPositionMode: stateAlongTPositionMode,
        offsetPositionMode: stateOffsetPositionMode,
        ...stateTextStyle
      } = stateLabelStyle;
      [
        visible,
        textStyle,
        offsetX,
        offsetY,
        halo,
        haloSpacing,
        haloFill,
        haloStroke,
        haloRadius,
        haloTint,
        haloAlpha,
        alongT,
        alongTPositionMode,
        offsetPositionMode,
      ] = deepAssignList(
        [
          visible,
          textStyle,
          offsetX,
          offsetY,
          halo,
          haloSpacing,
          haloFill,
          haloStroke,
          haloRadius,
          haloTint,
          haloAlpha,
          alongT,
          alongTPositionMode,
          offsetPositionMode,
        ],
        toValueList(
          [
            stateVisible,
            stateTextStyle,
            stateOffsetX,
            stateOffsetY,
            stateHalo,
            stateHaloSpacing,
            stateHaloFill,
            stateHaloStroke,
            stateHaloRadius,
            stateHaloTint,
            stateHaloAlpha,
            stateAlongT,
            stateAlongTPositionMode,
            stateOffsetPositionMode,
          ],
          data,
        ),
      );
    }
    return {
      visible,
      textStyle,
      labelText,
      offsetX,
      offsetY,
      halo,
      haloSpacing,
      haloFill,
      haloStroke,
      haloRadius,
      haloTint,
      haloAlpha,
      alongT,
      alongTPositionMode,
      offsetPositionMode,
      type,
      drawBy,
    };
  }
  getEdgeArrowConfig(): EdgeArrowConfig {
    const { options } = this;
    const { arrowConfig } = options;
    const style = arrowConfig?.style;
    let [visible, fill, stroke, tailMidpointRatio, size, alongT, stateObj] = toValueList(
      [
        style?.visible,
        style?.fill,
        style?.stroke,
        style?.tailMidpointRatio,
        style?.size,
        style?.alongT,
        options.state,
      ],
      this.data,
    );
    const stateArrowStyle = stateObj[this.state]?.arrowStyle;
    if (stateArrowStyle) {
      const {
        visible: stateVisible,
        fill: stateFill,
        stroke: stateStroke,
        tailMidpointRatio: stateTailMidpointRatio,
        size: stateSize,
        alongT: stateAlongT,
      } = stateArrowStyle;
      [visible, fill, stroke, tailMidpointRatio, size, alongT] = deepAssignList(
        [visible, fill, stroke, tailMidpointRatio, size, alongT],
        toValueList(
          [stateVisible, stateFill, stateStroke, stateTailMidpointRatio, stateSize, stateAlongT],
          this.data,
        ),
      );
    }
    return {
      visible,
      fill,
      stroke,
      tailMidpointRatio,
      size,
      alongT,
    };
  }
  drawEdge() {}
  abstract setEdgePoints(...args: any[]): unknown;
  abstract setEdgeArrowPoints(...args: any[]): unknown;
  setEdgeLabelPointAttr(..._: any[]) {}
  drawEdgeByGraphics() {
    const { edge } = this;
    const { visible, smoothness, halo, stroke, haloSpacing, haloStroke } = this.getEdgeConfig();
    edge.visible = visible;
    this.visible = visible;
    if (visible === false) return;
    this.setEdgePoints(smoothness);
    const points = this.edgePoints;
    let edgeContext = edge.getChildByLabel("line") as Graphics;
    if (!edgeContext) {
      edgeContext = new Graphics();
      edgeContext.label = "line";
      edge.addChild(edgeContext);
    }
    edgeContext.clear();
    if (halo === true) {
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        if (i === 0) edgeContext.moveTo(point.x, point.y);
        else edgeContext.lineTo(point.x, point.y);
      }
      const baseWidth = isPlainObject(stroke) ? ((stroke as StrokeStyle).width ?? 1) : 1;
      const baseStroke: StrokeStyle = {
        width: baseWidth + haloSpacing * 2,
      };
      if (!isPlainObject(haloStroke)) {
        if (haloStroke instanceof FillPattern || haloStroke instanceof FillGradient) {
          baseStroke.fill = haloStroke;
        } else {
          baseStroke.color = haloStroke as ColorSource;
        }
      } else {
        Object.assign(baseStroke, haloStroke);
      }
      edgeContext.stroke(baseStroke);
    }
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      if (i === 0) edgeContext.moveTo(point.x, point.y);
      else edgeContext.lineTo(point.x, point.y);
    }
    edgeContext.stroke(stroke);
  }
  drawEdgeBySprite(): void {
    const { edge, isLinkMode, isCurved, isSelfLoop, isCubic, isQuadratic } = this;
    const { visible, halo, haloTint, haloSpacing, haloAlpha, smoothness, tint, alpha, width } =
      this.getEdgeConfig();
    edge.visible = visible;
    this.visible = visible;
    if (visible === false) return;
    this.setEdgePoints(smoothness);
    const points = this.edgePoints;
    let haloContext = edge.getChildByLabel("halo") as Container;
    if (!haloContext) {
      haloContext = new Container();
      haloContext.label = "halo";
      edge.addChild(haloContext);
    }
    haloContext.visible = false;
    let lineContext = edge.getChildByLabel("line") as Container;
    if (!lineContext) {
      lineContext = new Container();
      lineContext.label = "line";
      edge.addChild(lineContext);
    }
    // 如果添加边，删除边，link操作
    if (isLinkMode) {
      lineContext.removeChildren();
      haloContext.removeChildren();
    }
    if (isCurved || isSelfLoop || isCubic || isQuadratic) {
      /**
       * 回退到使用graphics
       */
      // let lineGraphics = lineContext.getChildByLabel("line-graphics") as Graphics;
      // if (!lineGraphics) {
      //   lineGraphics = new Graphics();
      //   lineGraphics.label = "line-graphics";
      //   lineContext.addChild(lineGraphics);
      // }
      // lineGraphics.clear();
      // if (halo === true) {
      //   for (let i = 0; i < points.length; i++) {
      //     const point = points[i];
      //     if (i === 0) lineGraphics.moveTo(point.x, point.y);
      //     else lineGraphics.lineTo(point.x, point.y);
      //   }
      //   lineGraphics.stroke({ color: tint, with: width + haloSpacing * 2 });
      //   lineGraphics.alpha = alpha;
      // }
      // for (let i = 0; i < points.length; i++) {
      //   const point = points[i];
      //   if (i === 0) lineGraphics.moveTo(point.x, point.y);
      //   else lineGraphics.lineTo(point.x, point.y);
      // }
      // lineGraphics.stroke({ color: tint, with: width });
      // lineGraphics.alpha = alpha;

      /**
       * MeshRope只重新创建一次
       */
      let meshRope = lineContext.getChildByLabel("meshRope") as MeshRope;
      if (!meshRope) {
        meshRope = new MeshRope({
          texture: Texture.WHITE,
          points,
          textureScale: 0,
        });
        meshRope.label = "meshRope";
        lineContext.addChild(meshRope);
      }
      const ropeGeometry = new RopeGeometry({
        textureScale: width,
        points,
      });
      meshRope.tint = tint;
      meshRope.alpha = alpha ?? 1;
      meshRope.geometry = ropeGeometry;

      if (halo === true) {
        haloContext.visible = true;
        let haloMeshRope = haloContext.getChildByLabel("haloMeshRope") as MeshRope;
        if (!haloMeshRope) {
          haloMeshRope = new MeshRope({
            texture: Texture.WHITE,
            points,
            textureScale: 0,
          });
          haloMeshRope.label = "haloMeshRope";
          haloContext.addChild(haloMeshRope);
        }
        const haloRopeGeometry = new RopeGeometry({
          points,
          textureScale: width + haloSpacing * 2,
        });
        haloMeshRope.geometry = haloRopeGeometry;
        haloMeshRope.tint = haloTint;
        haloMeshRope.alpha = haloAlpha ?? 1;
      }
    } else {
      const sprites = lineContext.children as Sprite[];
      const haloSprites = haloContext.children as Sprite[];
      for (let i = 0; i < points.length - 1; i++) {
        const cacheSprite = sprites[i];
        const from = points[i];
        const to = points[i + 1];
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const length = Math.sqrt(dx ** 2 + dy ** 2);
        const angle = Math.atan2(dy, dx);
        const sprite = cacheSprite ?? new Sprite(Texture.WHITE);
        sprite.x = from.x;
        sprite.y = from.y;
        sprite.rotation = angle;
        sprite.tint = tint ?? 0xffffff;
        sprite.height = width;
        sprite.width = length;
        sprite.anchor.set(0, 0.5);
        sprite.alpha = alpha ?? 1;
        if (!cacheSprite) {
          lineContext.addChild(sprite);
        }
        if (halo === true) {
          const cacheHaloSprite = haloSprites[i];
          haloContext.visible = true;
          const haloSprite = cacheHaloSprite ?? new Sprite(Texture.WHITE);
          haloSprite.x = from.x;
          haloSprite.y = from.y;
          haloSprite.rotation = angle;
          haloSprite.tint = haloTint;
          haloSprite.alpha = haloAlpha ?? 1;
          haloSprite.height = width + haloSpacing * 2;
          haloSprite.width = length;
          haloSprite.anchor.set(0, 0.5);
          if (!cacheHaloSprite) {
            haloContext.addChild(haloSprite);
          }
        }
      }
    }
  }
  drawEdgeArrow() {
    const { direction, edgeArrow } = this;
    const { visible, fill, stroke, tailMidpointRatio, size, alongT } = this.getEdgeArrowConfig();
    edgeArrow.visible = visible;
    if (visible === false) return;
    let [width, height = width / 1.5] = Array.isArray(size) ? size : [size];
    this.setEdgeArrowPoints(width, alongT, tailMidpointRatio);
    const { head, tail } = this.edgeArrowPoints!;
    const midpointWidth = Math.hypot(head.y - tail.y, head.x - tail.x) * direction;
    const baseAngle = Math.atan2(head.y - tail?.y, head.x - tail.x);
    const arrowTailAngle = direction === -1 ? baseAngle : baseAngle + Math.PI;
    edgeArrow.position.set(head.x, head.y);
    edgeArrow.rotation = arrowTailAngle;
    let arrowContext = edgeArrow.getChildByLabel("arrow") as Graphics;
    if (!arrowContext) {
      arrowContext = new Graphics();
      arrowContext.label = "arrow";
      edgeArrow.addChild(arrowContext);
    }
    arrowContext.clear();
    width = midpointWidth / (1 - tailMidpointRatio);
    height = direction * height;
    const arrowHalfHeight = height / 2;
    arrowContext.moveTo(0, 0);
    arrowContext.lineTo(width, arrowHalfHeight);
    arrowContext.lineTo(midpointWidth, 0);
    arrowContext.lineTo(width, -arrowHalfHeight);
    arrowContext.closePath();
    if (fill) {
      arrowContext.fill(fill);
    }
    if (stroke) {
      arrowContext.stroke(stroke);
    }
  }
  drawEdgeLabel() {
    let {
      visible,
      textStyle,
      labelText,
      offsetX,
      offsetY,
      halo,
      haloSpacing,
      haloFill,
      haloStroke,
      haloRadius,
      haloTint,
      haloAlpha,
      alongT,
      alongTPositionMode,
      offsetPositionMode,
      type,
      drawBy,
    } = this.getEdgeLabelConfig();
    const { edgeLabel, direction, angle } = this;
    edgeLabel.visible = visible;
    if (visible === false) return;
    if (!isText(labelText)) {
      console.error(
        "Please config edge.labelConfig.labelText (return string | number | { toString: ()=>string })",
      );
      return;
    }
    let haloContext = edgeLabel.getChildByLabel("halo") as Graphics | Sprite;
    if (!haloContext) {
      if (drawBy === "graphics" || drawBy === undefined) haloContext = new Graphics();
      if (drawBy === "sprite") haloContext = new Sprite(Texture.WHITE);
      haloContext.label = "halo";
      edgeLabel.addChild(haloContext);
    }
    if (drawBy === "graphics" || drawBy === undefined) (haloContext as Graphics).clear();
    haloContext.visible = false;
    let textContext = edgeLabel.getChildByLabel("text") as Text | BitmapText;
    if (!textContext) {
      if (type === "text" || type === undefined) textContext = new Text();
      if (type === "bitmap-text") textContext = new BitmapText();
      textContext.label = "text";
      edgeLabel.addChild(textContext);
    }
    textContext.text = labelText;
    textContext.style = textStyle;
    textContext.anchor.set(0.5, 0.5);

    const { width, height } = textContext;
    if (halo === true) {
      const w = width + haloSpacing * 2;
      const h = height + haloSpacing * 2;
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

    const labelRotation = angle > -Math.PI / 2 && angle < Math.PI / 2 ? 0 : Math.PI;
    const t = alongTPositionMode === "global" ? (direction === -1 ? alongT : 1 - alongT) : alongT;
    offsetY = offsetPositionMode === "global" ? -offsetY * direction : offsetY;
    offsetX = offsetPositionMode === "global" ? -offsetX * direction : offsetX;
    this.setEdgeLabelPointAttr(t, offsetX, offsetY);

    const labelPointAttr = this.edgeLabelPointAttr;
    if (labelPointAttr) {
      edgeLabel.position.set(labelPointAttr.x, labelPointAttr.y);
      edgeLabel.rotation = labelRotation + labelPointAttr.rotation;
    }
  }

  draw(isLinkedMode: boolean = false) {
    this.isLinkMode = isLinkedMode;
    this.drawEdge();
    this.drawEdgeLabel();
    if (this.isDirected) this.drawEdgeArrow();
  }
  update() {
    this.draw();
  }
}

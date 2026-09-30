import { Graphics, Sprite } from "pixi.js";
import { CommonPoint, NodeAttributes, NodeOptions } from "../../types";
import { getStartPoints, points2segments } from "../../utils";
import { BaseNode } from "./base-node";

export class StarNode extends BaseNode {
  constructor(id: string, options: NodeOptions, data: NodeAttributes) {
    super(id, options, data);
  }
  polyPoints?: CommonPoint[];
  drawNode(): void {
    const { textureGenerator, node } = this;
    const {
      visible,
      size,
      fill,
      stroke,
      pointNum,
      rotation,
      halo,
      haloSpacing,
      haloFill,
      haloStroke,
      tint,
      alpha,
      haloTint,
      haloAlpha,
      drawBy,
    } = this.getNodeConfig();
    node.visible = visible;
    this.visible = visible;
    if (visible === false) return;
    let [radius, innerRadius = radius / 2] = Array.isArray(size) ? size : [size];
    const polyPoints = getStartPoints(0, 0, pointNum, radius, innerRadius, rotation);
    this.useContext(drawBy);
    if (drawBy === "graphics" || drawBy === undefined) {
      let haloContext = this.haloContext as Graphics;
      if (halo === true) {
        const scale = (haloSpacing + radius) / radius;
        const haloPoints = getStartPoints(
          0,
          0,
          pointNum,
          radius * scale,
          innerRadius * scale,
          rotation,
        );
        haloContext.poly(haloPoints);
        if (haloFill) haloContext.fill(haloFill);
        if (haloStroke) haloContext.stroke(haloStroke);
      }
      let nodeContext = this.nodeContext as Graphics;
      nodeContext.poly(polyPoints);
      if (fill) nodeContext.fill(fill);
      if (stroke) nodeContext.stroke(stroke);
    }
    if (drawBy === "sprite") {
      const ratio = Number((innerRadius / radius).toFixed(1));
      const textureRadius = 40;
      const texture = textureGenerator!.get(`star-${pointNum}-${ratio}`, () =>
        new Graphics().star(0, 0, pointNum, textureRadius, textureRadius * ratio).fill("#fff"),
      )!;
      let haloContext = this.haloContext as Sprite;
      if (halo === true) {
        haloContext.visible = true;
        haloContext.texture = texture;
        haloContext.rotation = rotation;
        const scale = (haloSpacing + radius) / textureRadius;
        haloContext.scale.set(scale, scale);
        haloContext.anchor.set(0.5, 0.5);
        haloContext.tint = haloTint;
        haloContext.alpha = haloAlpha;
      }
      let nodeContext = this.nodeContext as Sprite;
      nodeContext.texture = texture;
      nodeContext.rotation = rotation;
      nodeContext.scale.set(radius / textureRadius, radius / textureRadius);
      nodeContext.anchor.set(0.5, 0.5);
      nodeContext.tint = tint;
      nodeContext.alpha = alpha;
    }
    this.polyPoints = polyPoints;
    this.setSegments();
    this.afterDrawNode();
  }
  setSegments(): void {
    if (!this.polyPoints) return;
    const transformPoints = this.polyPoints.map((p) => {
      return {
        x: p.x + this.x,
        y: p.y + this.y,
      };
    });
    const { segments, bounds } = points2segments(transformPoints);
    this.segments = segments;
    this.bounds = bounds;
    this.afterDrawNode();
  }
}

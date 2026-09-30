import { Graphics, Sprite } from "pixi.js";
import { NodeAttributes, NodeOptions } from "../../types";
import { BaseNode } from "./base-node";
import { getEllipseSegments } from "../../utils";

export class EllipseNode extends BaseNode {
  constructor(id: string, options: NodeOptions, data: NodeAttributes) {
    super(id, options, data);
  }
  drawNode(): void {
    const { node, textureGenerator } = this;
    let {
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
      drawBy,
    } = this.getNodeConfig();
    node.visible = visible;
    this.visible = visible;
    if (visible === false) return;
    const [radiusX, radiusY] = Array.isArray(size) ? size : [size, size];
    this.useContext(drawBy);
    if (drawBy === "graphics" || drawBy === undefined) {
      let haloContext = this.haloContext as Graphics;
      if (halo === true) {
        const rx = radiusX + haloSpacing;
        const ry = radiusY + haloSpacing;
        haloContext.ellipse(0, 0, rx, ry);
        if (haloFill) haloContext.fill(haloFill);
        if (haloStroke) haloContext.stroke(haloStroke);
      }
      let nodeContext = this.nodeContext as Graphics;
      nodeContext.ellipse(0, 0, radiusX, radiusY);
      if (fill) nodeContext.fill(fill);
      if (stroke) nodeContext.stroke(stroke);
    }
    if (drawBy === "sprite") {
      const RX = 64,
        RY = 32;
      const texture = textureGenerator!.get("ellipse", () =>
        new Graphics().ellipse(0, 0, RX, RY).fill("#fff"),
      )!;
      let haloContext = this.haloContext as Sprite;
      if (halo === true) {
        haloContext.visible = true;
        haloContext.texture = texture;
        const rx = (radiusX + haloSpacing) / RX;
        const ry = (radiusY + haloSpacing) / RY;
        haloContext.scale.set(rx, ry);
        haloContext.anchor.set(0.5, 0.5);
        haloContext.tint = haloTint;
        haloContext.alpha = haloAlpha;
      }
      let nodeContext = this.nodeContext as Sprite;
      nodeContext.texture = texture;
      nodeContext.scale.set(radiusX / RX, radiusY / RY);
      nodeContext.anchor.set(0.5, 0.5);
      nodeContext.tint = tint;
      nodeContext.alpha = alpha;
    }

    this.bounds = [radiusX * 2, radiusY * 2];
    this.setSegments();
    this.afterDrawNode();
  }
  setSegments(): void {
    if (!this.bounds) return;
    const [w, h] = this.bounds;
    this.segments = getEllipseSegments(this.x, this.y, w / 2, h / 2);
  }
}

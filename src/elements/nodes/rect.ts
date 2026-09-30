import { Graphics, Sprite, Texture } from "pixi.js";
import { NodeAttributes, NodeOptions } from "../../types";
import { BaseNode } from "./base-node";
import { getRoundRectSegments } from "../../utils";

export class RectNode extends BaseNode {
  rectRadius?: number;
  constructor(id: string, options: NodeOptions, data: NodeAttributes) {
    super(id, options, data);
  }
  drawNode(): void {
    const { node } = this;
    let {
      visible,
      size,
      radius,
      fill,
      stroke,
      halo,
      haloSpacing,
      haloFill,
      haloStroke,
      haloRadius,
      tint,
      alpha,
      haloTint,
      haloAlpha,
      drawBy,
    } = this.getNodeConfig();

    node.visible = visible;
    node.parent!.visible = visible;
    if (visible === false) return;
    this.useContext(drawBy);
    const [w, h] = Array.isArray(size) ? size : [size, size];
    if (drawBy === "graphics" || drawBy === undefined) {
      let haloContext = this.haloContext as Graphics;
      if (halo === true) {
        const w1 = w + haloSpacing * 2;
        const h1 = h + haloSpacing * 2;
        haloContext.roundRect(-w1 / 2, -h1 / 2, w1, h1, haloRadius);
        if (haloFill) haloContext.fill(haloFill);
        if (haloStroke) haloContext.stroke(haloStroke);
      }

      let nodeContext = this.nodeContext as Graphics;
      nodeContext.roundRect(-w / 2, -h / 2, w, h, radius);
      if (fill) nodeContext.fill(fill);
      if (stroke) nodeContext.stroke(stroke);
      this.rectRadius = radius;
    }
    if (drawBy === "sprite") {
      const texture = Texture.WHITE;
      let haloContext = this.haloContext as Sprite;
      if (halo === true) {
        haloContext.visible = true;
        haloContext.texture = texture;
        const r1 = w + haloSpacing * 2;
        const r2 = h + haloSpacing * 2;
        haloContext.scale.set(r1, r2);
        haloContext.anchor.set(0.5, 0.5);
        haloContext.tint = haloTint;
        haloContext.alpha = haloAlpha;
      }
      let nodeContext = this.nodeContext as Sprite;
      nodeContext.texture = texture;
      nodeContext.scale.set(w, h);
      nodeContext.anchor.set(0.5, 0.5);
      nodeContext.tint = tint;
      nodeContext.alpha = alpha;
      this.rectRadius = 0;
    }
    this.bounds = [w, h];
    this.setSegments();
    this.afterDrawNode();
  }
  setSegments(): void {
    if (!this.bounds) return;
    const [w, h] = this.bounds;
    this.segments = getRoundRectSegments(this.x - w / 2, this.y - h / 2, w, h, this.rectRadius);
    this.afterDrawNode();
  }
}

import { Graphics, Sprite } from "pixi.js";
import { NodeAttributes, NodeOptions } from "../../types";
import { BaseNode } from "./base-node";
import { getCircleSegments } from "../../utils";

export class CircleNode extends BaseNode {
  constructor(id: string, options: NodeOptions, data: NodeAttributes) {
    super(id, options, data);
  }
  drawNode(): void {
    const { textureGenerator, node } = this;
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
    size = Array.isArray(size) ? size[0] : size;
    this.useContext(drawBy);
    if (drawBy === "graphics" || drawBy === undefined) {
      let haloContext = this.haloContext as Graphics;
      if (halo === true) {
        haloContext.circle(0, 0, size + haloSpacing);
        if (haloFill) haloContext.fill(haloFill);
        if (haloStroke) haloContext.stroke(haloStroke);
      }
      let nodeContext = this.nodeContext as Graphics;
      nodeContext.circle(0, 0, size);
      if (fill) nodeContext.fill(fill);
      if (stroke) nodeContext.stroke(stroke);
    }
    if (drawBy === "sprite") {
      const R = 64;
      const texture = textureGenerator!.get("circle", () =>
        new Graphics().circle(0, 0, R).fill("#fff"),
      )!;
      let haloContext = this.haloContext as Sprite;
      if (halo === true) {
        haloContext.visible = true;
        haloContext.texture = texture;
        const r = (size + haloSpacing) / R;
        haloContext.scale.set(r, r);
        haloContext.anchor.set(0.5, 0.5);
        haloContext.tint = haloTint;
        haloContext.alpha = haloAlpha;
      }
      let nodeContext = this.nodeContext as Sprite;
      nodeContext.texture = texture;
      nodeContext.scale.set(size / R, size / R);
      nodeContext.anchor.set(0.5, 0.5);
      nodeContext.tint = tint;
      nodeContext.alpha = alpha;
    }
    // const segments = getCircleSegments(this.x, this.y, size);
    // this.segments = segments;
    const bw = size * 2;
    this.bounds = [bw, bw];
    this.setSegments();
    this.afterDrawNode();
  }
  setSegments(): void {
    if (!this.bounds) return;
    const [w] = this.bounds;
    this.segments = getCircleSegments(this.x, this.y, w / 2);
  }
}

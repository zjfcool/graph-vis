import { Assets, Graphics, Sprite, Texture } from "pixi.js";
import { NodeAttributes, NodeOptions } from "../../types";
import { BaseNode } from "./base-node";
import { getRoundRectSegments } from "../../utils";

export class ImageNode extends BaseNode {
  constructor(id: string, options: NodeOptions, data: NodeAttributes) {
    super(id, options, data);
  }
  drawNode(): void {
    const { node } = this;
    let {
      visible,
      halo,
      haloSpacing,
      haloFill,
      haloStroke,
      haloRadius,
      imgUrl,
      size,
      alpha,
      haloTint,
      haloAlpha,
      drawBy,
    } = this.getNodeConfig();
    node.visible = visible;
    this.visible = visible;
    if (visible === false) return;
    if (typeof imgUrl !== "string") {
      console.error("Please config node.style.imgUrl (return string)");
      return;
    }
    this.useContext(drawBy);
    const [w, h = w] = Array.isArray(size) ? size : [size, size];
    if (drawBy === "graphics" || drawBy === undefined) {
      const haloContext = this.haloContext as Graphics;
      if (halo === true) {
        const w1 = w + haloSpacing * 2;
        const h1 = h + haloSpacing * 2;
        haloContext.visible = true;
        haloContext.roundRect(-w1 / 2, -h1 / 2, w1, h1, haloRadius);
        if (haloFill) haloContext.fill(haloFill);
        if (haloStroke) haloContext.stroke(haloStroke);
      }
    }
    if (drawBy === "sprite") {
      const haloContext = this.haloContext as Sprite;
      if (halo === true) {
        haloContext.visible = true;
        const w1 = w + haloSpacing * 2;
        const h1 = h + haloSpacing * 2;
        haloContext.visible = true;
        haloContext.texture = Texture.WHITE;
        haloContext.anchor.set(0.5, 0.5);
        haloContext.tint = haloTint;
        haloContext.alpha = haloAlpha;
        haloContext.scale.set(w1, h1);
      }
    }

    let nodeContext = this.nodeContext as Sprite;
    // 纹理占位
    nodeContext.texture = Texture.EMPTY;
    nodeContext.anchor.set(0.5, 0.5);
    nodeContext.width = w;
    nodeContext.height = h;
    nodeContext.alpha = alpha ?? 1;
    loadTexture(nodeContext, imgUrl);
    this.bounds = [w, h];
    this.setSegments();
    this.afterDrawNode();
  }
  setSegments(): void {
    if (!this.bounds) return;
    const [w, h] = this.bounds;
    this.segments = getRoundRectSegments(this.x - w / 2, this.y - h / 2, w, h);
  }
}
async function loadTexture(sprite: Sprite, imgUrl: string) {
  try {
    const texture = await Assets.load(imgUrl);
    if (!sprite.destroyed) {
      sprite.texture = texture;
    }
  } catch (err) {
    if (sprite.destroyed) return;
    console.error(err);
  }
}

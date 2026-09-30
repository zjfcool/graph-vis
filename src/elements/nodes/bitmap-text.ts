import { NodeAttributes, NodeOptions } from "../../types";
import { getRoundRectSegments, isText } from "../../utils";
import { BaseNode } from "./base-node";
import { BitmapText, Graphics, Sprite, Texture } from "pixi.js";

export class BitmapTextNode extends BaseNode {
  constructor(id: string, options: NodeOptions, data: NodeAttributes) {
    super(id, options, data);
  }
  drawNode(): void {
    const { node } = this;
    const {
      visible,
      textStyle,
      textValue,
      halo,
      haloSpacing,
      haloFill,
      haloStroke,
      haloRadius,
      haloTint,
      haloAlpha,
      drawBy,
    } = this.getNodeConfig();

    node.visible = visible;
    this.visible = visible;
    if (visible === false) return;
    if (!isText(textValue)) {
      console.error(
        "Please config node.textValue (return string | number | { toString: ()=>string })",
      );
      return;
    }
    this.useContext(drawBy);
    const nodeContext = this.nodeContext as BitmapText;
    nodeContext.text = textValue;
    nodeContext.style = textStyle;
    nodeContext.anchor.set(0.5, 0.5);
    const w = nodeContext.width;
    const h = nodeContext.height;

    if (halo === true) {
      const w1 = w + haloSpacing * 2;
      const h1 = h + haloSpacing * 2;
      if (drawBy === "graphics" || drawBy === undefined) {
        const haloContext = this.haloContext as Graphics;
        haloContext.roundRect(-w1 / 2, -h1 / 2, w1, h1, haloRadius);
        if (haloFill) haloContext.fill(haloFill);
        if (haloStroke) haloContext.stroke(haloStroke);
      }
      if (drawBy === "sprite") {
        const haloContext = this.haloContext as Sprite;
        haloContext.visible = true;
        haloContext.texture = Texture.WHITE;
        haloContext.scale.set(w1, h1);
        haloContext.tint = haloTint;
        haloContext.alpha = haloAlpha;
        haloContext.anchor.set(0.5, 0.5);
      }
    }

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

import { Graphics, Sprite } from "pixi.js";
import { CommonPoint, NodeAttributes, NodeOptions } from "../../types";
import { divideByGCD, getPolygonPoints, offsetPolygon, points2segments } from "../../utils";
import { BaseNode } from "./base-node";

export class PolygonNode extends BaseNode {
  points?: CommonPoint[];
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
    size = Array.isArray(size) ? size : Array(pointNum).fill(size);
    const baseSizes = divideByGCD(size);
    // 判断是否为正多边形
    const isRegularPoly = baseSizes.every((v) => v === 1);

    this.useContext(drawBy);
    if (drawBy === "graphics" || drawBy === undefined) {
      const points = getPolygonPoints(0, 0, size, pointNum, rotation);
      const haloContext = this.haloContext as Graphics;
      if (halo === true) {
        let haloPoints = points;
        if (isRegularPoly) {
          const k = 1 + haloSpacing / (size[0] * Math.cos(Math.PI / pointNum));
          haloPoints = points.map((p) => ({
            x: p.x * k,
            y: p.y * k,
          }));
        } else {
          haloPoints = offsetPolygon(points, haloSpacing);
        }
        haloContext.poly(haloPoints);
        if (haloFill) haloContext.fill(haloFill);
        if (haloStroke) haloContext.stroke(haloStroke);
      }
      const nodeContext = this.nodeContext as Graphics;
      nodeContext.poly(points);
      if (fill) nodeContext.fill(fill);
      if (stroke) nodeContext.stroke(stroke);
      this.points = points;
    }
    if (drawBy === "sprite") {
      const key = `polygon-${pointNum}-${baseSizes.join(",")}`;
      const scaleNum = 40;
      const textureSizes = baseSizes.map((v) => v * scaleNum);
      const points = getPolygonPoints(0, 0, textureSizes, pointNum, 0);
      const texture = textureGenerator!.get(key, () => new Graphics().poly(points).fill("#fff"))!;
      const nodeContext = this.nodeContext as Sprite;
      nodeContext.texture = texture;
      nodeContext.tint = tint;
      nodeContext.alpha = alpha;
      nodeContext.rotation = rotation;
      nodeContext.anchor.set(0.5, 0.5);
      const scale = size[0] / baseSizes[0] / scaleNum;
      nodeContext.scale.set(scale, scale);
      this.points = getRenderedPoints(points, nodeContext);
      const haloContext = this.haloContext as Sprite;
      if (halo === true) {
        // const haloTextureScale = 10;
        // const haloTexture = isRegularPoly
        //   ? texture
        //   : textureGenerator?.get(`halo-${key}`, () =>
        //       new Graphics()
        //         .poly(
        //           offsetPolygon(this.points!, haloSpacing).map((p) => ({
        //             x: p.x * haloTextureScale,
        //             y: p.y * haloTextureScale,
        //           })),
        //         )
        //         .fill("#fff"),
        //     )!;
        haloContext.visible = true;
        haloContext.texture = texture;
        haloContext.tint = haloTint;
        haloContext.alpha = haloAlpha;
        haloContext.rotation = rotation;
        haloContext.anchor.set(0.5, 0.5);
        const scale = (size[0] + haloSpacing) / baseSizes[0] / scaleNum;

        haloContext.scale.set(scale, scale);
      }
    }
    this.setSegments();
    this.afterDrawNode();
  }
  setSegments(): void {
    if (!this.points) return;
    const transformPoints = this.points.map(({ x, y }) => {
      return {
        x: x + this.x,
        y: y + this.y,
      };
    });
    const { segments, bounds } = points2segments(transformPoints);
    this.segments = segments;
    this.bounds = bounds;
  }
}
/**
 * 计算 poly 图形Sprite(anchor, scale, rotation) 后，
 * 在局部坐标中的顶点位置
 */
function getRenderedPoints(points: CommonPoint[], sprite: Sprite) {
  if (!points || points.length === 0) return [];

  // 原始 points 的包围盒
  let minX = Infinity,
    maxX = -Infinity;
  let minY = Infinity,
    maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  const W = maxX - minX;
  const H = maxY - minY;

  const ax = sprite.anchor.x;
  const ay = sprite.anchor.y;
  const n = sprite.scale.x;
  const m = sprite.scale.y;
  const cos = Math.cos(sprite.rotation);
  const sin = Math.sin(sprite.rotation);

  return points.map((p) => {
    // 纹理坐标
    const tx = p.x - minX;
    const ty = p.y - minY;

    //  减 pivot（anchor 位置）
    const lx = tx - W * ax;
    const ly = ty - H * ay;

    // 缩放
    const sx = lx * n;
    const sy = ly * m;

    // 旋转
    const rx = sx * cos - sy * sin;
    const ry = sx * sin + sy * cos;

    // 平移
    return {
      x: rx + sprite.x,
      y: ry + sprite.y,
    };
  });
}
/**
 * 多边形每条边沿法线向外偏移 spacing
 * @param {{x:number,y:number}[]} points
 * @param {number} spacing
 * @returns {{x:number,y:number}[]}
 */

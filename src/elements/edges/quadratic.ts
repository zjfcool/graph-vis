import { Bezier, Offset } from "bezier-js";
import { EdgeAttributes, EdgeOptions } from "../../types";
import { BaseEdge } from "./base-edge";
import { deepAssign, getCubicControlPoints, getQuadraticControlPoint, toValue } from "../../utils";
const DefaultOptions: EdgeOptions = {
  style: {
    quadraticAlongT: 0.5,
    quadraticRotation: 0,
    quadraticSpacing: 40,
  },
};
export class QuadraticEdge extends BaseEdge {
  bezier?: Bezier;
  constructor(id: string, options: EdgeOptions, data: EdgeAttributes) {
    super(id, options, data);
  }
  createBezier() {
    const { source, target } = this;
    if (source === undefined || target === undefined) return;
    if (this.isSelfLoop) {
      const nodeMaxBound = (Math.max(...(this.source?.bounds || [])) ?? 0) / 2;
      const spacing = (40 + nodeMaxBound) / 0.75;
      this.options = deepAssign(
        {
          style: {
            cubicAlongT: [0, 0],
            cubicRotation: [-Math.PI / 2, 0],
            cubicSpacing: [spacing, spacing],
          },
        },
        this.options,
      );
    } else {
      this.options = deepAssign(DefaultOptions, this.options);
    }
    let {
      cubicAlongT,
      cubicRotation,
      cubicSpacing,
      quadraticSpacing,
      quadraticAlongT,
      quadraticRotation,
    } = this.getBezierConfig();
    let bezier: Bezier;

    const sourceSegments = source.segments ? [...source.segments] : [];
    const targetSegments = target.segments ? [...target.segments] : [];
    const [spacing1, spacing2 = spacing1] = Array.isArray(cubicSpacing)
      ? cubicSpacing
      : [cubicSpacing];
    const [rotation1, rotation2 = 0] = Array.isArray(cubicRotation)
      ? cubicRotation
      : [cubicRotation];
    let [t1, t2 = 1 - t1] = Array.isArray(cubicAlongT) ? cubicAlongT : [cubicAlongT];
    let startT = 1,
      endT = 0;
    if (this.isSelfLoop) {
      const { cp1, cp2 } = getCubicControlPoints(
        source,
        target,
        [spacing1, spacing2],
        [rotation1, rotation2],
        [t1, t2],
      );
      bezier = new Bezier(source.x, source.y, cp1.x, cp1.y, cp2.x, cp2.y, target.x, target.y);
      for (let segment of sourceSegments) {
        const arr_t = bezier.intersects(segment);
        if (arr_t.length === 0) continue;
        arr_t.forEach((t) => {
          t = Number(t);
          if (t < startT) startT = t;
          if (t > endT) endT = t;
        });
      }
      if (startT === 1) startT = 0;
      if (endT === 0) endT = 1;
      bezier = bezier.split(startT, endT);
    } else {
      const cp = getQuadraticControlPoint(
        source,
        target,
        quadraticSpacing,
        quadraticRotation,
        quadraticAlongT,
      );
      bezier = new Bezier(source.x, source.y, cp.x, cp.y, target.x, target.y);
      for (let segment of sourceSegments) {
        const arr_t = bezier.intersects(segment);
        if (arr_t.length === 0) continue;
        arr_t.forEach((t) => {
          t = Number(t);
          if (t < startT) startT = t;
        });
      }
      for (let segment of targetSegments) {
        const arr_t = bezier.intersects(segment);
        if (arr_t.length === 0) continue;
        arr_t.forEach((t) => {
          t = Number(t);
          if (t > endT) endT = t;
        });
      }
      if (startT === 1) startT = 0;
      if (endT === 0) endT = 1;
      bezier = bezier.split(startT, endT);
    }

    return bezier;
  }
  setEdgePoints(smoothness: number) {
    const { bezier } = this;
    if (bezier === undefined) return;
    const pointNum = Math.ceil(40 * (smoothness ?? 0.5));
    const points = bezier.getLUT(pointNum);
    this.edgePoints = points;
  }

  setEdgeArrowPoints(width: number, alongT: number, tailMidpointRatio: number) {
    const { bezier } = this;
    if (bezier === undefined) return;
    const edgeLength = bezier.length()!;
    const arrowPositionLength = width + (edgeLength - width) * alongT;
    // 获取箭头头位置
    const head = bezier.get(arrowPositionLength / edgeLength)!;
    // // 获取箭头尾部位置
    // const arrowTail = bezier.get((arrowPositionLength - width) / edgeLength)!;
    // 获取箭头尾部偏移位置
    const tail = bezier?.get((arrowPositionLength - width * (1 - tailMidpointRatio)) / edgeLength);
    this.edgeArrowPoints = {
      head: head,
      tail: tail,
    };
  }
  setEdgeLabelPointAttr(t: number, offsetX: number, offsetY: number) {
    const { bezier } = this;
    if (bezier) {
      const p = bezier.offset(t, offsetY) as Offset;
      const derivative = bezier.derivative(t);
      const derivativeAngle = Math.atan2(derivative.y, derivative.x);
      const x = p.x + offsetX * Math.cos(derivativeAngle);
      const y = p.y + offsetX * Math.sin(derivativeAngle);
      this.edgeLabelPointAttr = {
        x,
        y,
        rotation: derivativeAngle,
      };
    }
  }
  drawEdge(): void {
    const { options, data } = this;
    const drawBy = toValue(options.drawBy, data);
    this.bezier = this.createBezier();
    if (drawBy === undefined || drawBy === "graphics") {
      this.drawEdgeByGraphics();
    }
    if (drawBy === "sprite") {
      this.drawEdgeBySprite();
    }
  }
}

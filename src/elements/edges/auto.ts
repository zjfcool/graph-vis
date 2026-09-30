import { Bezier, Offset } from "bezier-js";
import type { EdgeAttributes, EdgeOptions } from "../../types";
import { BaseEdge } from "./base-edge";
import {
  deepAssign,
  getCubicControlPoints,
  getLineBezierIntersections,
  getQuadraticControlPoint,
  toValue,
} from "../../utils";
const DefaultOptions: EdgeOptions = {
  style: {
    quadraticAlongT: 0.5,
    quadraticRotation: 0,
    quadraticSpacing: 40,
    cubicAlongT: [0.2, 0.8],
    cubicRotation: [-Math.PI / 2, 0],
    cubicSpacing: [40, 40],
  },
};
export class AutoEdge extends BaseEdge {
  bezier?: Bezier;
  constructor(id: string, options: EdgeOptions, data: EdgeAttributes) {
    super(id, Object.assign(options, deepAssign(DefaultOptions, options)), data);
  }
  createBezier() {
    const { source, target, isCurved, stepCount, isSelfLoop, edgeIndex, direction } = this;
    if (source === undefined || target === undefined) return;
    let {
      quadraticAlongT,
      quadraticRotation,
      quadraticSpacing,
      cubicAlongT,
      cubicRotation,
      cubicSpacing,
      nodeMaxBound,
    } = this.getBezierConfig();
    let bezier: Bezier;
    let startT = 1,
      endT = 0;
    const sourceSegments = source.segments ? [...source.segments] : [];
    const targetSegments = target.segments ? [...target.segments] : [];
    if (isCurved) {
      const isForward = direction === 1;
      const [s, t] = isForward ? [target, source] : [source, target];
      quadraticAlongT = isForward ? 1 - quadraticAlongT : quadraticAlongT;
      const cp = getQuadraticControlPoint(
        s,
        t,
        quadraticSpacing * stepCount,
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
    } else if (isSelfLoop) {
      const [spacing1, spacing2 = spacing1] = Array.isArray(cubicSpacing)
        ? cubicSpacing
        : [cubicSpacing];
      const [rotation1, rotation2 = 0] = Array.isArray(cubicRotation)
        ? cubicRotation
        : [cubicRotation];
      const [t1, t2 = 1 - t1] = Array.isArray(cubicAlongT) ? cubicAlongT : [cubicAlongT];
      const offsetVal1 = (spacing1 * (edgeIndex + 1) + nodeMaxBound) / 0.75;
      const offsetVal2 = (spacing2 * (edgeIndex + 1) + nodeMaxBound) / 0.75;

      const { cp1, cp2 } = getCubicControlPoints(
        source,
        target,
        [offsetVal1, offsetVal2],
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
      const sourceIntersections = getLineBezierIntersections(source, target, sourceSegments);
      const targetIntersections = getLineBezierIntersections(source, target, targetSegments);
      const bezierSource = sourceIntersections[0]?.intersection ?? source;
      const bezierTarget = targetIntersections[0]?.intersection ?? target;
      bezier = new Bezier(
        bezierSource.x,
        bezierSource.y,
        (bezierSource.x + bezierTarget.x) / 2,
        (bezierSource.y + bezierTarget.y) / 2,
        bezierTarget.x,
        bezierTarget.y,
      );
    }
    return bezier;
  }
  setEdgePoints(smoothness: number) {
    const { isCurved, isSelfLoop, bezier } = this;
    if (bezier === undefined) return;
    const pointNum = Math.ceil(isCurved || isSelfLoop ? 40 * (smoothness ?? 0.5) : 1);
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

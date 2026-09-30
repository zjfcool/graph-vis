import { Bezier, Offset } from "bezier-js";
import { CommonPoint, EdgeOptions } from "../../types";
import { BaseEdge } from "./base-edge";
import {
  deepAssign,
  getCubicControlPoints,
  getLineBezierIntersections,
  getQuadraticControlPoint,
} from "../../utils";

const ID = "__LINK__";
const DATA = {
  id: ID,
  edgeCount: 1,
};
const DefaultOptionsMap: Record<string, EdgeOptions> = {
  auto: {
    style: {
      quadraticAlongT: 0.5,
      quadraticRotation: 0,
      quadraticSpacing: 40,
      cubicAlongT: [0.2, 0.8],
      cubicRotation: [-Math.PI / 2, 0],
      cubicSpacing: [40, 40],
    },
  },
  cubic: {
    style: {
      cubicAlongT: [0.2, 0.8],
      cubicRotation: [0, 0],
      cubicSpacing: [40, -40],
    },
  },
  quadratic: {
    style: {
      quadraticAlongT: 0.5,
      quadraticRotation: 0,
      quadraticSpacing: 40,
    },
  },
};
export class Link extends BaseEdge {
  isLinking: boolean;
  cacheEdges: BaseEdge[] = []; // 存取
  targetType: "node" | "point" = "point";
  bezier?: Bezier;
  constructor(options: EdgeOptions) {
    super(ID, options, DATA);
    this.isLinking = false;
  }
  get edgeIndex() {
    return this.edgeCount - 1;
  }
  createBezier() {
    const {
      source,
      target,
      isCurved,
      stepCount,
      isSelfLoop,
      edgeIndex,
      direction,
      isQuadratic,
      isCubic,
      isAuto,
      isLine,
    } = this;
    if (source === undefined || target === undefined) return;
    const DefaultOptions = DefaultOptionsMap[this.type] ?? {};

    if (this.isSelfLoop) {
      const spacing = 40;
      Object.assign(
        this.options,
        deepAssign(
          {
            style: {
              cubicAlongT: [0, 0],
              cubicRotation: [-Math.PI / 2, 0],
              cubicSpacing: [spacing, spacing],
            },
          },
          this.options,
        ),
      );
    } else {
      Object.assign(this.options, deepAssign(DefaultOptions, this.options));
    }
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

    if ((isCurved || isQuadratic) && !isSelfLoop && !isLine && !isCubic) {
      let cp: CommonPoint;
      if (isQuadratic) {
        cp = getQuadraticControlPoint(
          source,
          target,
          quadraticSpacing,
          quadraticRotation,
          quadraticAlongT,
        );
      } else {
        const isForward = direction === 1;
        const [s, t] = isForward ? [target, source] : [source, target];
        quadraticAlongT = isForward ? 1 - quadraticAlongT : quadraticAlongT;
        cp = getQuadraticControlPoint(
          s,
          t,
          quadraticSpacing * stepCount,
          quadraticRotation,
          quadraticAlongT,
        );
      }

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
    } else if ((isSelfLoop || isCubic) && !isLine) {
      const [spacing1, spacing2 = spacing1] = Array.isArray(cubicSpacing)
        ? cubicSpacing
        : [cubicSpacing];
      const [rotation1, rotation2 = 0] = Array.isArray(cubicRotation)
        ? cubicRotation
        : [cubicRotation];
      const [t1, t2 = 1 - t1] = Array.isArray(cubicAlongT) ? cubicAlongT : [cubicAlongT];
      let offsetVal1: number = 0;
      let offsetVal2: number = 0;
      if (isAuto && isSelfLoop) {
        offsetVal1 = (spacing1 * (edgeIndex + 1) + nodeMaxBound) / 0.75;
        offsetVal2 = (spacing2 * (edgeIndex + 1) + nodeMaxBound) / 0.75;
      }
      if (isCubic) {
        offsetVal1 = spacing1;
        offsetVal2 = spacing2;
      }
      if (!isAuto && isSelfLoop) {
        offsetVal1 = (spacing1 + nodeMaxBound) / 0.75;
        offsetVal2 = (spacing2 + nodeMaxBound) / 0.75;
      }
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
    const { isCurved, isSelfLoop, isQuadratic, isCubic, bezier } = this;
    if (bezier === undefined) return;
    const pointNum = Math.ceil(
      isCurved || isSelfLoop || isQuadratic || isCubic ? 40 * (smoothness ?? 0.5) : 1,
    );
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
    this.bezier = this.createBezier();
    this.drawEdgeByGraphics();
  }
  draw(): void {
    this.drawEdge();
    this.drawEdgeLabel();
    if (this.isDirected) this.drawEdgeArrow();
  }
}

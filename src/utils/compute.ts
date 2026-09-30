import type { CommonPoint, Segment } from "../types";

/**
 *
 * @param cx 中心点坐标x
 * @param cy 中心点坐标y
 * @param sizes 距离中心点的距离数组
 * @param pointNum 多边形点数
 * @param rotation 多边形旋转角度
 * @param haloSpacing 多边形底边边距
 * @returns {{x:number;y:number}[]} 点数组
 */
function getPolygonPoints(
  cx: number,
  cy: number,
  sizes: number[],
  pointNum: number,
  rotation: number,
  haloSpacing?: number,
) {
  const vertices = [];
  const sizes2 = [...sizes];
  const scale = haloSpacing
    ? sizes2.reduce((a: number, b: number) => {
        return (b + haloSpacing) / b + a;
      }, 0) / sizes2.length
    : 1;
  for (let i = 0; i < pointNum; i++) {
    // 当前顶点的角度
    const angle = rotation + (2 * Math.PI * i) / pointNum;
    if (typeof sizes2[i] !== "number") sizes2[i] = sizes2[i - 1];
    const r = sizes2[i] * scale;
    vertices.push({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    });
  }
  return vertices;
}
/**
 * 生成星形顶点坐标数组
 * @param {number} cx - 中心点 x
 * @param {number} cy - 中心点 y
 * @param {number} pointNum - 尖角数量（即星形的角数）
 * @param {number} outerRadius - 外半径（尖角顶点到中心的距离）
 * @param {number} innerRadius - 内半径（凹角顶点到中心的距离）
 * @param {number} rotation - 整体旋转角度（弧度），默认 0，从 12 点钟方向顺时针旋转
 * @returns {CommonPoint[]} 顶点数组
 */
function getStartPoints(
  cx: number,
  cy: number,
  pointNum: number,
  outerRadius: number,
  innerRadius?: number,
  rotation?: number,
): CommonPoint[] {
  const points: CommonPoint[] = [];
  const step = Math.PI / pointNum; // 相邻顶点夹角增量
  const startAngle = -Math.PI / 2 + (rotation ?? 0); // 起始角度（尖角朝上）

  for (let i = 0; i < pointNum * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : (innerRadius ?? outerRadius / 2);
    const angle = startAngle + i * step;
    points.push({
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    });
  }
  return points;
}

/**
 * 计算直线段（由 source 到 target）与一组线段（节点边界）的交点
 * @param {{x: number, y: number}} source - 直线起点
 * @param {{x: number, y: number}} target - 直线终点
 * @param {Array<{p1: {x,y}, p2: {x,y}}>} segments - 边界线段数组
 * @returns {number[]} 所有交点的 t 值（0~1），无交点时返回空数组
 */
function getLineBezierIntersections(source: CommonPoint, target: CommonPoint, segments: Segment[]) {
  const results: { t: number; intersection: CommonPoint }[] = [];
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return results;

  for (const seg of segments) {
    const { p1, p2 } = seg;
    const ax = p1.x,
      ay = p1.y;
    const bx = p2.x - p1.x,
      by = p2.y - p1.y;

    const denom = dx * by - dy * bx;
    if (Math.abs(denom) < 1e-10) continue;

    const t = ((ax - source.x) * by - (ay - source.y) * bx) / denom;
    const u = ((ax - source.x) * dy - (ay - source.y) * dx) / denom;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      results.push({
        t: t,
        intersection: {
          x: source.x + t * dx,
          y: source.y + t * dy,
        },
      });
    }
  }
  return results;
}
function getLineSegmentIntersection(source: CommonPoint, target: CommonPoint, segment: Segment) {
  const { p1, p2 } = segment;
  const dx1 = target.x - source.x;
  const dy1 = target.y - source.y;
  const dx2 = p2.x - p1.x;
  const dy2 = p2.y - p1.y;

  // 计算行列式（判断是否平行）
  const denom = dx1 * dy2 - dy1 * dx2;
  if (Math.abs(denom) < 1e-10) {
    // 平行或共线，无单一交点（可扩展重叠处理，此处返回 null）
    return null;
  }

  const t = ((p1.x - source.x) * dy2 - (p1.y - source.y) * dx2) / denom;
  const u = ((p1.x - source.x) * dy1 - (p1.y - source.y) * dx1) / denom;

  // 检查交点是否同时位于两线段内（含端点）
  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return t;
  }
  return null;
}

/**
 * 获取圆的分段点
 * @param cx 圆心x坐标值
 * @param cy 圆心y坐标值
 * @param radius 圆半径
 * @param segmentCount 将圆分割的段数
 * @returns 分段点数组，每个点包含x和y坐标
 */
function getCircleSegments(
  cx: number,
  cy: number,
  radius: number,
  segmentCount: number = 12,
): Segment[] {
  const segments: Segment[] = [];
  for (let i = 0; i < segmentCount; i++) {
    const a1 = (i / segmentCount) * 2 * Math.PI;
    const a2 = ((i + 1) / segmentCount) * 2 * Math.PI;
    segments.push({
      p1: { x: cx + radius * Math.cos(a1), y: cy + radius * Math.sin(a1) },
      p2: { x: cx + radius * Math.cos(a2), y: cy + radius * Math.sin(a2) },
    });
  }
  return segments;
}
/**
 * 获取矩形的分段点
 * @param x 矩形起始点x
 * @param y 矩形起始点y
 * @param width 矩形宽
 * @param height 矩形高
 * @param radius 矩形圆角
 * @param arcSegments 矩形圆角分割数量
 * @returns
 */
function getRoundRectSegments(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number = 0,
  arcSegments: number = 4,
): Segment[] {
  const segments: Segment[] = [];
  // ----- 特殊处理：半径不存在或为0，返回四条边 -----
  if (radius === undefined || radius === null || radius === 0) {
    return [
      { p1: { x, y }, p2: { x: x + width, y } }, // 上边
      { p1: { x: x + width, y }, p2: { x: x + width, y: y + height } }, // 右边
      { p1: { x: x + width, y: y + height }, p2: { x, y: y + height } }, // 下边
      { p1: { x, y: y + height }, p2: { x, y } }, // 左边
    ];
  }
  // ---- 辅助函数 ----
  const addLine = (p1: CommonPoint, p2: CommonPoint) => segments.push({ p1, p2 });

  const addArc = (
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number,
    steps: number,
  ) => {
    const delta = endAngle - startAngle;
    if (delta <= 0 || r <= 0) return;
    const n = Math.max(1, Math.ceil((steps * delta) / (Math.PI / 2)));
    for (let i = 0; i < n; i++) {
      const t1 = i / n;
      const t2 = (i + 1) / n;
      const a1 = startAngle + delta * t1;
      const a2 = startAngle + delta * t2;
      segments.push({
        p1: { x: cx + r * Math.cos(a1), y: cy + r * Math.sin(a1) },
        p2: { x: cx + r * Math.cos(a2), y: cy + r * Math.sin(a2) },
      });
    }
  };

  let radii = { tl: radius, tr: radius, br: radius, bl: radius };

  // 限制半径不超过宽高的一半，避免重叠
  const maxR = Math.min(width / 2, height / 2);
  radii.tl = Math.min(radii.tl, maxR);
  radii.tr = Math.min(radii.tr, maxR);
  radii.br = Math.min(radii.br, maxR);
  radii.bl = Math.min(radii.bl, maxR);

  // ---- 八个关键点（顺时针） ----
  const p1 = { x: x + radii.tl, y: y };
  const p2 = { x: x + width - radii.tr, y: y };
  const p3 = { x: x + width, y: y + radii.tr };
  const p4 = { x: x + width, y: y + height - radii.br };
  const p5 = { x: x + width - radii.br, y: y + height };
  const p6 = { x: x + radii.bl, y: y + height };
  const p7 = { x: x, y: y + height - radii.bl };
  const p8 = { x: x, y: y + radii.tl };

  // ---- 构建轮廓（直线 + 圆弧交替） ----
  // 上边直线
  addLine(p1, p2);
  // 右上圆弧（从 3π/2 到 2π）
  addArc(x + width - radii.tr, y + radii.tr, radii.tr, (3 * Math.PI) / 2, 2 * Math.PI, arcSegments);
  // 右边直线
  addLine(p3, p4);
  // 右下圆弧（从 0 到 π/2）
  addArc(x + width - radii.br, y + height - radii.br, radii.br, 0, Math.PI / 2, arcSegments);
  // 下边直线
  addLine(p5, p6);
  // 左下圆弧（从 π/2 到 π）
  addArc(x + radii.bl, y + height - radii.bl, radii.bl, Math.PI / 2, Math.PI, arcSegments);
  // 左边直线
  addLine(p7, p8);
  // 左上圆弧（从 π 到 3π/2）
  addArc(x + radii.tl, y + radii.tl, radii.tl, Math.PI, (3 * Math.PI) / 2, arcSegments);

  return segments;
}
/**
 * 获取椭圆分段点
 * @param cx 椭圆中心x
 * @param cy 椭圆中心y
 * @param rx 椭圆x轴半径
 * @param ry 椭圆y轴半径
 * @param segmentCount 椭圆线段分割数量
 * @returns Segment[]
 */
function getEllipseSegments(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  segmentCount = 12,
): Segment[] {
  const segments = [];
  for (let i = 0; i < segmentCount; i++) {
    const a1 = (i / segmentCount) * 2 * Math.PI;
    const a2 = ((i + 1) / segmentCount) * 2 * Math.PI;
    segments.push({
      p1: { x: cx + rx * Math.cos(a1), y: cy + ry * Math.sin(a1) },
      p2: { x: cx + rx * Math.cos(a2), y: cy + ry * Math.sin(a2) },
    });
  }
  return segments;
}
/** 绕中心旋转点 */
function rotatePoint(point: CommonPoint, center: CommonPoint, angle: number) {
  if (angle === 0) return point;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = point.x - center.x;
  const dy = point.y - center.y;
  return {
    x: center.x + dx * cos - dy * sin,
    y: center.y + dx * sin + dy * cos,
  };
}

/** 对线段数组应用旋转 */
function rotateSegments(segments: Segment[], angle: number, center: CommonPoint = { x: 0, y: 0 }) {
  if (angle === 0) return segments;
  return segments.map((seg) => ({
    p1: rotatePoint(seg.p1, center, angle),
    p2: rotatePoint(seg.p2, center, angle),
  }));
}
// 点列表转为线段列表
function points2segments(points: CommonPoint[]): {
  segments: Segment[];
  bounds: [number, number];
} {
  const len = points.length;
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;
  const segments: Segment[] = [];
  for (let i = 0; i < len; i++) {
    const p1 = points[i % len];
    const p2 = points[(i + 1) % len];
    if (minX > p1.x) minX = p1.x;
    if (maxX < p1.x) maxX = p1.x;
    if (minY > p1.y) minY = p1.y;
    if (maxY < p1.y) maxY = p1.y;
    segments.push({ p1, p2 });
  }
  return { segments, bounds: [maxX - minX, maxY - minY] };
}
/**
 * 求两个数的最大公约数（辗转相除法）
 */
function gcd(a: number, b: number) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

/**
 * 传入数字数组，返回每个元素除以它们的最大公约数后的结果
 * @param {number[]} nums
 * @returns {number[]}
 */
function divideByGCD(nums: number[]) {
  // 边界处理
  if (!Array.isArray(nums) || nums.length === 0) return [];

  // 求整个数组的 GCD
  const g = nums.reduce((acc, n) => gcd(acc, n));

  // GCD 为 0 说明全是 0，直接返回原数组
  if (g === 0) return nums.slice();

  // 每个元素除以 GCD
  return nums.map((n) => n / g);
}
function offsetPolygon(points: CommonPoint[], spacing: number) {
  const n = points.length;
  if (n < 3) return points.map((p) => ({ x: p.x, y: p.y }));

  // 1. 有符号面积判定方向
  let signedArea = 0;
  for (let i = 0; i < n; i++) {
    const a = points[i];
    const b = points[(i + 1) % n];
    signedArea += a.x * b.y - b.x * a.y;
  }
  const sign = signedArea >= 0 ? 1 : -1;

  // 2. 逐顶点计算新位置
  const newPoints = [];
  for (let i = 0; i < n; i++) {
    const prev = points[(i - 1 + n) % n];
    const curr = points[i];
    const next = points[(i + 1) % n];

    const d1 = normalize(curr.x - prev.x, curr.y - prev.y);
    const d2 = normalize(next.x - curr.x, next.y - curr.y);

    // 向外单位法线
    const n1 = { x: sign * d1.y, y: -sign * d1.x };
    const n2 = { x: sign * d2.y, y: -sign * d2.x };

    const dot = n1.x * n2.x + n1.y * n2.y;
    const denom = 1 + dot;

    if (Math.abs(denom) < 1e-6) {
      // 退化：180° 折返，直接沿 n1 平移
      newPoints.push({
        x: curr.x + spacing * n1.x,
        y: curr.y + spacing * n1.y,
      });
    } else {
      newPoints.push({
        x: curr.x + (spacing * (n1.x + n2.x)) / denom,
        y: curr.y + (spacing * (n1.y + n2.y)) / denom,
      });
    }
  }

  return newPoints;
}

function normalize(x: number, y: number) {
  const len = Math.hypot(x, y);
  return len > 1e-12 ? { x: x / len, y: y / len } : { x: 0, y: 0 };
}
function getQuadraticControlPoint(
  source: CommonPoint,
  target: CommonPoint,
  d: number,
  rotation: number = 0,
  t: number = 0.5,
): CommonPoint {
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const len = Math.hypot(dx, dy);
  const cos = Math.cos(rotation),
    sin = Math.sin(rotation);
  let nx = dy / len;
  let ny = -dx / len;
  if (len < 1e-8) {
    return {
      x: cos * d + source.x,
      y: sin * d + source.y,
    };
  }
  nx = nx * cos - ny * sin;
  ny = nx * sin + ny * cos;
  const x0 = source.x + dx * t;
  const y0 = source.y + dy * t;
  return {
    x: x0 + nx * d,
    y: y0 + ny * d,
  };
}
function getCubicControlPoints(
  source: CommonPoint,
  target: CommonPoint,
  d: [number, number],
  rotation: [number, number],
  t: [number, number],
) {
  const cp1 = getQuadraticControlPoint(source, target, d[0], rotation[0], t[0]);
  const cp2 = getQuadraticControlPoint(source, target, d[1], rotation[1], t[1]);
  return {
    cp1,
    cp2,
  };
}
export {
  getPolygonPoints,
  getStartPoints,
  getLineSegmentIntersection,
  getCircleSegments,
  getRoundRectSegments,
  getEllipseSegments,
  getLineBezierIntersections,
  rotateSegments,
  points2segments,
  divideByGCD,
  offsetPolygon,
  getQuadraticControlPoint,
  getCubicControlPoints,
};

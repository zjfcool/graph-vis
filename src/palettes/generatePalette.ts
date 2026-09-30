import { hcl, rgb } from "d3-color";

type PaletteType = "sequential" | "diverging" | "categorical";

/** 统一输出为 rgb(...) 字符串，与内置色板格式一致 */
function toRgbString(color: any): string {
  const { r, g, b } = rgb(color);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

/**
 * 生成色板
 * @param primaryColor 主色（任意 CSS 颜色）
 * @param type 色板类型
 * @param count 颜色数量，默认 9
 * @returns rgb 字符串数组
 */
export function generatePalette(
  primaryColor: string,
  type: PaletteType = "sequential",
  count: number = 9,
): string[] {
  if (count <= 0) return [];
  const p = hcl(primaryColor);

  switch (type) {
    case "sequential":
      return generateSequential(p, count);
    case "diverging":
      return generateDiverging(p, count);
    case "categorical":
      return generateCategorical(p, count);
  }
}

/* ---------- 1. 序数型：同色相，浅 → 深 ---------- */
function generateSequential(p: any, count: number): string[] {
  const h = p.h;
  const startL = 97; // 极浅，接近白
  const endL = 22; // 极深
  const startC = clamp(p.c * 0.3, 5, 20); // 浅端低饱和
  const midC = clamp(p.c, 35, 70); // 中间高饱和
  const endC = clamp(p.c * 0.8, 30, 60); // 深端略降

  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const l = startL + (endL - startL) * t;
    const c = t < 0.5 ? startC + (midC - startC) * (t * 2) : midC + (endC - midC) * ((t - 0.5) * 2);
    result.push(toRgbString(hcl(h, c, l)));
  }
  return result;
}

/* ---------- 2. 发散型：暖 → 浅中性 → 冷 ---------- */
function generateDiverging(p: any, count: number): string[] {
  const coolH = p.h; // 冷端用主色色相
  const warmH = (p.h + 180) % 360; // 暖端用互补色相
  const midL = 95; // 中间极浅
  const endL = 40; // 两端较深
  const endC = 70;

  const result: string[] = [];
  const mid = (count - 1) / 2;

  for (let i = 0; i < count; i++) {
    const t = mid === 0 ? 0 : (i - mid) / mid; // -1 ~ 1
    const l = midL - Math.abs(t) * (midL - endL);
    const c = Math.abs(t) * endC;
    const h = t < 0 ? warmH : coolH;
    result.push(toRgbString(hcl(h, c, l)));
  }
  return result;
}

/* ---------- 3. 分类型：不同色相，亮度相近 ---------- */
function generateCategorical(p: any, count: number): string[] {
  const baseL = 60;
  const baseC = clamp(p.c, 40, 65);
  const result: string[] = [];

  for (let i = 0; i < count; i++) {
    const h = (p.h + (360 / count) * i) % 360;
    // 轻微亮度波动，避免过于机械
    const l = baseL + (i % 2 === 0 ? -6 : 6);
    const c = baseC + (i % 3 === 0 ? 5 : 0);
    result.push(toRgbString(hcl(h, clamp(c, 30, 70), l)));
  }
  return result;
}

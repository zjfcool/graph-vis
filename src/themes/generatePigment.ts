import { hcl, rgb } from "d3-color";
import { PigmentItem } from "../types";
// 相对亮度（WCAG 标准）

function relLum(colorStr: string) {
  const { r, g, b } = rgb(colorStr);
  const lin = (v: number) => {
    v /= 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

// 对比度（WCAG 标准）
function contrast(c1: string, c2: string) {
  const l1 = relLum(c1);
  const l2 = relLum(c2);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

// 按目标对比度调整 HCL 亮度 L
function tuneL(
  h: number,
  c: number,
  bgColor: string,
  targetMin: number,
  targetMax: number,
  startL: number,
) {
  const bgIsLight = relLum(bgColor) > 0.5;
  let L = startL;
  let colorStr = hcl(h, c, L).formatHex();

  for (let i = 0; i < 120; i++) {
    const cr = contrast(colorStr, bgColor);
    if (cr >= targetMin && cr <= targetMax) break;

    if (cr < targetMin) {
      // 对比度不足 → 远离背景
      L += bgIsLight ? -1.5 : 1.5;
    } else {
      // 对比度过高 → 靠近背景
      L += bgIsLight ? 1.5 : -1.5;
    }
    L = clamp(L, 0, 100);
    colorStr = hcl(h, c, L).formatHex();
  }
  return colorStr;
}

/**
 * 根据主色生成图主题（三元素）
 * @param {string} primary 主色（任意 CSS 颜色）
 * @param {'light'|'dark'} mode 模式
 * @returns {{nodeColor, edgeColor, backgroundColor}}
 */
export function generatePigment(primary: string, mode = "light"): PigmentItem {
  const isLight = mode === "light";
  const p = hcl(primary);

  // (1) 背景：保留主色色相，极低饱和
  const bgH = p.h;
  const bgC = isLight ? 3 : 6;
  const bgL = isLight ? 97 : 8;
  const backgroundColor = hcl(bgH, bgC, bgL).formatHex();

  // (2) 节点：主色色相，中等饱和，对比度 ≥ 4.5
  const nodeC = clamp(p.c, 20, 55);
  const nodeStartL = isLight ? 45 : 65;
  const nodeColor = tuneL(p.h, nodeC, backgroundColor, 4.5, 9, nodeStartL);

  // (3) 边：主色色相，低饱和，对比度 3 ~ 4
  const edgeC = clamp(p.c * 0.25, 5, 15);
  const edgeStartL = isLight ? 65 : 45;
  const edgeColor = tuneL(p.h, edgeC, backgroundColor, 3, 4, edgeStartL);

  return { nodeColor, edgeColor, backgroundColor };
}

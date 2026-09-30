import { color, lab } from "d3-color";
import { PigmentItem, Theme } from "../types";
import { generatePigment } from "./generatePigment";

function generateThemeByPigment(pigment: PigmentItem): Theme {
  const { nodeColor, edgeColor, backgroundColor } = pigment;
  const l = lab(backgroundColor).l;
  const isLighter = l > 50; // 判断是否为亮色
  const labelColor = isLighter ? color(edgeColor)?.darker(1.8) : color(edgeColor)?.brighter(1.8);
  return {
    background: backgroundColor,
    node: {
      state: {
        active: {
          haloFill: color(nodeColor)?.copy({ opacity: 0.55 }).toString(),
        },
        selected: {
          haloFill: color(nodeColor)?.copy({ opacity: 0.55 }).toString(),
          haloStroke: color(nodeColor)?.darker(0.2).toString(),
        },
        inactive: {
          fill: color(nodeColor)?.brighter(0.95).toString(),
        },
      },
      style: {
        fill: nodeColor,
        haloFill: color(nodeColor)?.copy({ opacity: 0.55 }).toString(),
        tint: nodeColor,
        haloTint: nodeColor,
      },
      labelConfig: {
        style: {
          fill: labelColor,
          haloFill: color(nodeColor)?.copy({ opacity: 0.55 }).toString(),
          haloTint: nodeColor,
        },
      },
    },
    edge: {
      state: {
        active: {
          haloStroke: color(edgeColor)?.copy({ opacity: 0.55 }).toString(),
          haloTint: edgeColor,
        },
        selected: {
          stroke: {
            color: color(edgeColor)?.darker(0.5),
          },
          haloStroke: color(edgeColor)?.copy({ opacity: 0.55 }).toString(),
          tint: color(edgeColor)?.darker(0.5),
          haloTint: edgeColor,
        },
        inactive: {
          stroke: color(edgeColor)?.brighter(0.5),
        },
      },
      style: {
        haloStroke: color(edgeColor)?.copy({ opacity: 0.55 }).toString(),
        tint: edgeColor,
        stroke: {
          color: edgeColor,
        },
      },
      arrowConfig: {
        style: {
          fill: edgeColor,
        },
      },
      labelConfig: {
        style: {
          fill: labelColor,
          haloFill: color(edgeColor)?.copy({ opacity: 0.55 }).toString(),
          haloTint: edgeColor,
        },
      },
    },
  };
}
function generateThemeByPrimaryColor(
  primaryColor: string,
  mode: "light" | "dark" = "light",
): Theme {
  const pigment = generatePigment(primaryColor, mode);
  return generateThemeByPigment(pigment);
}

export { generateThemeByPigment, generateThemeByPrimaryColor };

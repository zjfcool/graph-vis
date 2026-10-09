import { GraphVis, generateThemeByPrimaryColor, register } from "@zjfcool/graph-vis";
import { GUI } from "dat.gui";
register("theme", "natrue", generateThemeByPrimaryColor("#4CAF50", "dark"));
register("theme", "natrueLight", generateThemeByPrimaryColor("#4CAF50", "light"));
register("theme", "purple", generateThemeByPrimaryColor("#7C3AED", "dark"));
register("theme", "purpleLight", generateThemeByPrimaryColor("#7C3AED", "light"));
async function init() {
  const container = document.querySelector("#app")!;
  const res = await fetch("/graph-vis/examples/nodes.json");
  const data = await res.json();
  const graph = new GraphVis({
    container: container as HTMLElement,
    width: container.clientWidth,
    height: container.clientHeight,
    data: data,
    layout: {
      type: "d3-force",
    },
    node: {
      type: "circle",
      labelConfig: {
        labelText: (d) => d.id,
        style: {
          visible: true,
        },
      },
    },
    edge: {
      labelConfig: {
        labelText: (d) => {
          const { __original } = d;
          return `${__original.source}->${__original.target}`;
        },
      },
    },
    theme: "light",
  });
  await graph.init();
  const gui = new GUI();
  const themeOptions = {
    theme: "light",
  };
  gui
    .add(themeOptions, "theme", ["light", "dark", "natrue", "natrueLight", "purple", "purpleLight"])
    .onChange((v) => {
      graph.setThemeOptions(v);
    });
}
init();

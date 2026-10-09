import { GraphVis } from "@zjfcool/graph-vis";
import { GUI } from "dat.gui";
async function init() {
  const container = document.querySelector("#app") as HTMLElement;
  const res = await fetch("/graph-vis/examples/tina.json");
  const data = await res.json();
  const graph = new GraphVis({
    container,
    width: container.clientWidth,
    height: container.clientHeight,
    data,
    layout: {
      type: "d3-force",
    },
  });
  await graph.init();
  const gui = new GUI();
  const layout = {
    layout: "d3-force",
  };
  gui.add(layout, "layout", ["d3-force", "random"]).onChange((v) => {
    graph.setLayoutOptions({ type: v });
  });
}
init();

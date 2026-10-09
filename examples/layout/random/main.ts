import { GraphVis } from "@zjfcool/graph-vis";
import { GUI } from "dat.gui";
async function init() {
  const container = document.querySelector("#app") as HTMLElement;
  const res = await fetch("/examples/nodes.json");
  const data = await res.json();
  const graph = new GraphVis({
    container,
    width: container.clientWidth,
    height: container.clientHeight,
    data,
    layout: {
      type: "random",
    },
  });
  await graph.init();
  const gui = new GUI();
  const layout = {
    width: 500,
    height: 500,
    center: [0, 0] as [number, number],
  };
  gui
    .add(layout, "width", 100, 1000)
    .step(100)
    .onChange((v) => {
      graph.setLayoutOptions({ width: v });
    });
  gui
    .add(layout, "height", 100, 1000)
    .step(100)
    .onChange((v) => {
      graph.setLayoutOptions({ height: v });
    });
  gui
    .add(layout.center, 0, -500, 500)
    .step(10)
    .name("centerX")
    .onChange(() => {
      graph.setLayoutOptions({ center: layout.center });
    });
  gui
    .add(layout.center, 1, -500, 500)
    .step(10)
    .name("centerY")
    .onChange(() => {
      graph.setLayoutOptions({ center: layout.center });
    });
}
init();

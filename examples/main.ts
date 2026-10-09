import { GraphVis } from "@zjfcool/graph-vis";
const container = document.querySelector("#app") as HTMLDivElement;
async function init() {
  const res = await fetch("/examples/block.json");
  const data = await res.json();
  const graph = new GraphVis({
    container,
    data: data,
    // interactable: false,
    width: container.clientWidth,
    height: container.clientHeight,
    resizeTo: container,
    layout: {
      type: "d3-force",
      warmTicks: 70,
      cooldownTicks: 0,
      cooldownTime: 0,
    },
    node: {
      labelConfig: {
        type: "bitmap-text",
        labelText: (d) => {
          return d.user ?? "";
        },
        style: {
          visible: true,
        },
      },
    },
    // resizeDebounceTime: 1000,
    theme: "dark",
  });
  graph.on("layout:end", () => {
    graph.zoomToFit(0.9, "back-in", 1000);
  });
  await graph.init();
}

init();

import { GraphVis } from "@zjfcool/graph-vis";
const container = document.querySelector("#app") as HTMLDivElement;
async function init() {
  const res = await fetch("https://assets.antv.antgroup.com/g6/5000.json");
  const data = await res.json();
  const graph = new GraphVis({
    container,
    data: data,
    // interactable: false,
    width: container.clientWidth,
    height: container.clientHeight,
    resizeTo: container,
    // resizeDebounceTime: 1000,
    theme: "dark",
    node: {
      style: {
        size: 8,
        x: (d) => d.style.x,
        y: (d) => d.style.y,
      },
    },
  });
  await graph.init();
  graph.zoomToFit(0.9);
  document.querySelector(".node-count")!.innerHTML = `${graph.order}`;
  document.querySelector(".edge-count")!.innerHTML = `${graph.size}`;
}

init();

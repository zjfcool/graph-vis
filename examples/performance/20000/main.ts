import { GraphVis } from "@zjfcool/graph-vis";
const container = document.querySelector("#app") as HTMLDivElement;
async function init() {
  const res = await fetch("https://assets.antv.antgroup.com/g6/20000.json");
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
        size: 2,
        x: (d) => d.style.x,
        y: (d) => d.style.y,
      },
    },
    edge: {
      style: {
        stroke: {
          width: 0.2,
        },
      },
      arrowConfig: {
        style: {
          size: [2, 1],
        },
      },
    },
  });
  graph.on("afterdraw", () => {
    graph.zoomToFit(0.9);
  });
  await graph.init();
  document.querySelector(".node-count")!.innerHTML = `${graph.order}`;
  document.querySelector(".edge-count")!.innerHTML = `${graph.size}`;
}

init();

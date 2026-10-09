import { GraphVis } from "@zjfcool/graph-vis";
import { GUI } from "dat.gui";
const data = {
  nodes: [{ id: "0" }],
  edges: [],
};
async function init() {
  const container = document.querySelector("#app")!;
  const graph = new GraphVis({
    container: container as HTMLElement,
    width: container.clientWidth,
    height: container.clientHeight,
    data: data,
    node: {
      type: "circle",
      labelConfig: {
        labelText: (d: any) => d.id,
        style: {
          visible: true,
        },
      },
    },
  });
  await graph.init();
  const gui = new GUI();
  const nodeOptions = {
    size: 20,
  };
  gui
    .add(nodeOptions, "size", 0, 200)
    .step(1)
    .onChange((v) => {
      graph.setNodeOptions({
        style: {
          size: v,
        },
      });
    });
}
init();

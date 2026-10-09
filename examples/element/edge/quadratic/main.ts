import { GraphVis } from "@zjfcool/graph-vis";
import { GUI } from "dat.gui";
const data = {
  nodes: [
    { id: "0", x: -100, y: 0 },
    { id: "1", x: 100, y: 0 },
  ],
  edges: [{ source: "0", target: "1" }],
};
async function init() {
  const container = document.querySelector("#app")!;
  const graph = new GraphVis({
    container: container as HTMLElement,
    width: container.clientWidth,
    height: container.clientHeight,
    data: data,
    node: {
      labelConfig: {
        labelText: (d) => d.id,
        style: {
          visible: true,
          placement: "center",
        },
      },
    },
    edge: {
      type: "quadratic",
    },
  });
  await graph.init();
  const edgeOptions = {
    quadraticAlongT: 0.5,
    quadraticRotation: 0,
    quadraticSpacing: 40,
  };
  const gui = new GUI();
  gui
    .add(edgeOptions, "quadraticAlongT", -1, 2)
    .step(0.1)
    .onChange((v) => {
      graph.setEdgeOptions({
        style: {
          quadraticAlongT: v,
        },
      });
    });
  gui
    .add(edgeOptions, "quadraticRotation", -Math.PI, Math.PI)
    .step(0.01)
    .onChange((v) => {
      graph.setEdgeOptions({
        style: {
          quadraticRotation: v,
        },
      });
    });
  gui
    .add(edgeOptions, "quadraticSpacing", 0, 300)
    .step(1)
    .onChange((v) => {
      graph.setEdgeOptions({
        style: {
          quadraticSpacing: v,
        },
      });
    });
}
init();

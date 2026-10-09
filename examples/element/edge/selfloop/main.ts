import { GraphVis } from "@zjfcool/graph-vis";
import { GUI } from "dat.gui";
const data = {
  nodes: [
    { id: "0", x: -100, y: 0 },
    { id: "1", x: 100, y: 0 },
  ],
  edges: [
    { source: "0", target: "0" },
    { source: "1", target: "1" },
  ],
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
      type: "cubic",
    },
  });
  await graph.init();
  const edgeOptions = {
    cubicRotation: [-Math.PI / 2, 0] as [number, number],
    cubicSpacing: [40, 40] as [number, number],
  };
  const gui = new GUI();
  const rotationFolder = gui.addFolder("cubicRotation");
  const spacingFolder = gui.addFolder("cubicSpacing");
  rotationFolder
    .add(edgeOptions.cubicRotation, 0, -Math.PI, Math.PI)
    .name("[0]")
    .step(0.01)
    .onChange(() => {
      graph.setEdgeOptions({
        style: {
          cubicRotation: edgeOptions.cubicRotation,
        },
      });
    });
  rotationFolder
    .add(edgeOptions.cubicRotation, 1, -Math.PI, Math.PI)
    .name("[1]")
    .step(0.01)
    .onChange(() => {
      graph.setEdgeOptions({
        style: {
          cubicRotation: edgeOptions.cubicRotation,
        },
      });
    });
  spacingFolder
    .add(edgeOptions.cubicSpacing, 0, -300, 300)
    .name("[0]")
    .step(1)
    .onChange(() => {
      graph.setEdgeOptions({
        style: {
          cubicSpacing: edgeOptions.cubicSpacing,
        },
      });
    });
  spacingFolder
    .add(edgeOptions.cubicSpacing, 1, -300, 300)
    .name("[1]")
    .step(1)
    .onChange(() => {
      graph.setEdgeOptions({
        style: {
          cubicSpacing: edgeOptions.cubicSpacing,
        },
      });
    });
}
init();

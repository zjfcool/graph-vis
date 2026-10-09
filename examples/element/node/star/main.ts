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
      type: "star",
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
    pointNum: 5,
    size: [20, 10],
  };
  gui
    .add(nodeOptions, "pointNum", 3, 20, 1)
    .name("点数")
    .onChange((newCount) => {
      graph.setNodeOptions({
        style: {
          pointNum: newCount,
        },
      });
    });
  const sizeFolder = gui.addFolder("size");
  sizeFolder
    .add(nodeOptions.size, 0, 10, 100, 1)
    .name("[0]")
    .onChange(() => {
      graph.setNodeOptions({
        style: {
          size: nodeOptions.size,
        },
      });
    });
  sizeFolder
    .add(nodeOptions.size, 1, 10, 100, 1)
    .name("[1]")
    .onChange(() => {
      graph.setNodeOptions({
        style: {
          size: nodeOptions.size,
        },
      });
    });
}
init();

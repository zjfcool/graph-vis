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
      type: "image",
      style: {
        imgUrl: "/examples/favicon.png",
      },
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
    size: [20, 20],
  };
  const sizeFolder = gui.addFolder("size");
  sizeFolder
    .add(nodeOptions.size, 0, 0, 200, 1)
    .name("[0]")
    .onChange(() => {
      graph.setNodeOptions({
        style: {
          size: nodeOptions.size,
        },
      });
    });
  sizeFolder
    .add(nodeOptions.size, 1, 0, 200, 1)
    .name("[1]")
    .onChange(() => {
      graph.setNodeOptions({
        style: {
          size: nodeOptions.size,
        },
      });
    });
  sizeFolder.open();
}
init();

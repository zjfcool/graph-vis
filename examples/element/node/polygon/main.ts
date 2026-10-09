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
      type: "polygon",
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
    size: [20, 20, 20, 20, 20],
  };
  gui
    .add(nodeOptions, "pointNum", 3, 20, 1)
    .name("点数")
    .onChange((newCount) => {
      resizeArray(nodeOptions.size, newCount, 20);
      rebuildSizeFolder();
      graph.setNodeOptions({
        style: {
          pointNum: newCount,
        },
      });
    });

  let sizeFolder: GUI | null = null;

  function rebuildSizeFolder() {
    if (sizeFolder) {
      gui.removeFolder(sizeFolder);
      sizeFolder = null;
    }

    // 创建新文件夹
    sizeFolder = gui.addFolder("size");
    nodeOptions.size.forEach((_, i) => {
      sizeFolder
        ?.add(nodeOptions.size, i, -100, 100, 1)
        .name(`[${i}]`)
        .onChange(() => {
          graph.setNodeOptions({
            style: {
              size: nodeOptions.size,
            },
          });
        });
    });
    sizeFolder.open();
  }

  function resizeArray(arr: number[], newLength: number, defaultValue = 20) {
    if (newLength < arr.length) {
      arr.length = newLength; // 截断
    } else {
      while (arr.length < newLength) {
        arr.push(defaultValue); // 补默认值
      }
    }
  }

  // 5. 首次创建
  rebuildSizeFolder();
}
init();

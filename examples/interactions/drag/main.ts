import { GraphVis } from "@zjfcool/graph-vis";
import { generateData } from "../../util";
import { GUI } from "dat.gui";
const container = document.querySelector("#app") as HTMLDivElement;
const { width, height } = container.getBoundingClientRect();
async function init() {
  const testData = generateData(100);
  const graph = new GraphVis({
    container,
    data: testData,
    width: width,
    height: height,
    resizeTo: container,
    // resizeDebounceTime: 1000,
    layout: {
      type: "d3-force",
    },
  });
  await graph.init();
  const gui = new GUI();
  const dragOptions = {
    enable: true,
    clickDistance: 0,
  };
  gui.add(dragOptions, "enable").onChange((v) => {
    graph.setDragOptions({
      enable: v,
    });
  });
  gui.add(dragOptions, "clickDistance", 0, 20, 1).onChange((v) => {
    graph.setDragOptions({
      clickDistance: v,
    });
  });
}

init();

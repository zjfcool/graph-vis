import { GraphVis } from "@zjfcool/graph-vis";
import { BitmapFont } from "pixi.js";
const data = {
  nodes: [{ id: "0" }],
  edges: [],
};
// 先注册
BitmapFont.install({
  name: "myFont",
  style: {
    fontFamily: "Arial",
    fill: "green",
    stroke: "blue",
  },
});
async function init() {
  const container = document.querySelector("#app")!;
  const graph = new GraphVis({
    container: container as HTMLElement,
    width: container.clientWidth,
    height: container.clientHeight,
    data: data,
    node: {
      type: "bitmap-text",
      textValue: "Bitmap Text Hello World",
      style: {
        fontFamily: "myFont",
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
}
init();

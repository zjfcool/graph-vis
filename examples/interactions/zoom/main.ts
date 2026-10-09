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
  const zoomOptions = {
    enable: true,
    extent: [
      [0, 0],
      [width, height],
    ] as [[number, number], [number, number]],
    scaleExtent: [0, Infinity] as [number, number],
    translateExtent: [
      [-Infinity, -Infinity],
      [Infinity, Infinity],
    ] as [[number, number], [number, number]],
    clickDistance: 0,
    tapDistance: 10,
    enableDblclickZoom: false,
    enableWheelZoom: true,
  };
  gui.add(zoomOptions, "enable").onChange((v) => {
    graph.setZoomOptions({
      enable: v,
    });
  });
  const extentFolder = gui.addFolder("extent");
  extentFolder
    .add(zoomOptions.extent[0], 0, -1000, 2000)
    .name("x0")
    .onChange(() => {
      graph.setZoomOptions({
        extent: zoomOptions.extent,
      });
    });
  extentFolder
    .add(zoomOptions.extent[0], 1, -1000, 2000)
    .name("y0")
    .onChange(() => {
      graph.setZoomOptions({
        extent: zoomOptions.extent,
      });
    });
  extentFolder
    .add(zoomOptions.extent[1], 0, -1000, 2000)
    .name("x1")
    .onChange(() => {
      graph.setZoomOptions({
        extent: zoomOptions.extent,
      });
    });
  extentFolder
    .add(zoomOptions.extent[1], 1, -1000, 2000)
    .name("y1")
    .onChange(() => {
      graph.setZoomOptions({
        extent: zoomOptions.extent,
      });
    });
  const scaleExtentFolder = gui.addFolder("scaleExtent");
  scaleExtentFolder
    .add(zoomOptions.scaleExtent, 0, 0, 1, 0.1)
    .name("min")
    .onChange(() => {
      graph.setZoomOptions({
        scaleExtent: zoomOptions.scaleExtent,
      });
    });
  scaleExtentFolder
    .add(zoomOptions.scaleExtent, 1, 0, 2, 0.1)
    .name("max")
    .onChange(() => {
      graph.setZoomOptions({
        scaleExtent: zoomOptions.scaleExtent,
      });
    });
  const translateExtentFolder = gui.addFolder("translateExtent");
  translateExtentFolder
    .add(zoomOptions.translateExtent[0], 0, -2000, 0, 1)
    .name("x0")
    .onChange(() => {
      graph.setZoomOptions({
        translateExtent: zoomOptions.translateExtent,
      });
    });
  translateExtentFolder
    .add(zoomOptions.translateExtent[0], 1, -2000, 0, 1)
    .name("y0")
    .onChange(() => {
      graph.setZoomOptions({
        translateExtent: zoomOptions.translateExtent,
      });
    });
  translateExtentFolder
    .add(zoomOptions.translateExtent[1], 0, 0, 2000, 1)
    .name("x1")
    .onChange(() => {
      graph.setZoomOptions({
        translateExtent: zoomOptions.translateExtent,
      });
    });
  translateExtentFolder
    .add(zoomOptions.translateExtent[1], 1, 0, 2000, 1)
    .name("y1")
    .onChange(() => {
      graph.setZoomOptions({
        translateExtent: zoomOptions.translateExtent,
      });
    });
  gui.add(zoomOptions, "clickDistance", 0, 20, 1).onChange((v) => {
    graph.setZoomOptions({
      clickDistance: v,
    });
  });
  gui.add(zoomOptions, "tapDistance", 0, 20, 1).onChange((v) => {
    graph.setZoomOptions({
      tapDistance: v,
    });
  });
  gui.add(zoomOptions, "enableDblclickZoom").onChange((v) => {
    graph.setZoomOptions({
      enableDblclickZoom: v,
    });
  });
  gui.add(zoomOptions, "enableWheelZoom").onChange((v) => {
    graph.setZoomOptions({
      enableWheelZoom: v,
    });
  });
}

init();

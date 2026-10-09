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
      type: "text",
      textValue: "Text Hello World",
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
    fontSize: 12,
    fontWeight: "normal",
    fill: "#000",
    stroke: {
      color: "#4a1850",
      width: 1,
    },
    dropShadow: {
      color: "#000000",
      blur: 4,
      distance: 6,
      angle: Math.PI / 6,
    },
    wordWrap: false,
    wordWrapWidth: 440,
    lineHeight: 40,
    align: "center",
  };
  gui.add(nodeOptions, "fontSize", 10, 36, 1).onChange((v) => {
    graph.setNodeOptions({
      style: {
        fontSize: v,
      },
    });
  });
  gui
    .add(nodeOptions, "fontWeight", [
      "normal",
      "bold",
      "bolder",
      "lighter",
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
    ])
    .onChange((v) => {
      graph.setNodeOptions({
        style: {
          fontWeight: v,
        },
      });
    });
  gui.addColor(nodeOptions, "fill").onChange((v) => {
    graph.setNodeOptions({
      style: {
        fill: v,
      },
    });
  });
  const strokeFolder = gui.addFolder("stroke");
  strokeFolder.addColor(nodeOptions.stroke, "color").onChange((v) => {
    graph.setNodeOptions({
      style: {
        stroke: {
          color: v,
        },
      },
    });
  });
  strokeFolder.add(nodeOptions.stroke, "width", 1, 10, 1).onChange((v) => {
    graph.setNodeOptions({
      style: {
        stroke: {
          width: v,
        },
      },
    });
  });
  const dropShadowFolder = gui.addFolder("dropShadow");
  dropShadowFolder.addColor(nodeOptions.dropShadow, "color").onChange((v) => {
    graph.setNodeOptions({
      style: {
        dropShadow: {
          color: v,
        },
      },
    });
  });
  dropShadowFolder.add(nodeOptions.dropShadow, "blur", 0, 20).onChange((v) => {
    graph.setNodeOptions({
      style: {
        dropShadow: {
          blur: v,
        },
      },
    });
  });
  dropShadowFolder.add(nodeOptions.dropShadow, "distance", 0, 20).onChange((v) => {
    graph.setNodeOptions({
      style: {
        dropShadow: {
          distance: v,
        },
      },
    });
  });
  dropShadowFolder.add(nodeOptions.dropShadow, "angle", -Math.PI, Math.PI, 0.01).onChange((v) => {
    graph.setNodeOptions({
      style: {
        dropShadow: {
          angle: v,
        },
      },
    });
  });
  gui.add(nodeOptions, "wordWrap").onChange((v) => {
    graph.setNodeOptions({
      style: {
        wordWrap: v,
      },
    });
  });
  gui.add(nodeOptions, "wordWrapWidth", 0, 500, 1).onChange((v) => {
    graph.setNodeOptions({
      style: {
        wordWrapWidth: v,
      },
    });
  });
}
init();

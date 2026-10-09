import { GraphVis } from "@zjfcool/graph-vis";
import { FillGradient, FillPattern, Assets } from "pixi.js";
import { GUI } from "dat.gui";
async function init() {
  const container = document.querySelector("#app")!;
  const res = await fetch("/graph-vis/examples/nodes.json");
  const data = await res.json();
  const graph = new GraphVis({
    container: container as HTMLElement,
    width: container.clientWidth,
    height: container.clientHeight,
    data: data,
    layout: {
      type: "d3-force",
      collide: {
        radius: 35,
      },
    },
    node: {
      state: {
        custom: {
          fill: "red",
          stroke: "black",
          labelStyle: {
            placement: "center",
          },
        },
      },
      type: (d) => d.type ?? "circle",
      textValue: (d) => d.id,
      style: {
        imgUrl: "/graph-vis/examples/favicon.png",
        size: (d) => d.size,
      },
      labelConfig: {
        labelText: (d) => d.id,
        style: {
          visible: (d) => !(d.type == "text" || d.type == "bitmap-text"),
        },
      },
    },
    edge: {
      labelConfig: {
        style: {
          visible: false,
        },
      },
    },
  });
  await graph.init();
  const gui = new GUI();
  const nodeOptions = {
    state: "default",
    visible: true,
    halo: false,
    haloFill: "#000",
    haloStroke: "#000",
    haloSpacing: 3,
    fill: {
      color: "#000",
      fill: "gradient",
      alpha: 1,
    },
    stroke: {
      width: 1,
      color: "#000",
      fill: "gradient",
      alignment: 0.5,
      alpha: 1,
    },
    label: {
      visible: true,
      fill: "#000",
      fontSize: 14,
      stroke: "#000",
      offsetX: 0,
      offsetY: 0,
      placement: "right",
      halo: false,
      haloFill: "#000",
      haloStroke: "#000",
      haloSpacing: 0,
      haloRadius: 0,
    },
  };
  gui.add(nodeOptions, "visible").onChange((v: any) => {
    graph.setNodeOptions({
      style: {
        visible: v,
      },
    });
  });
  gui.add(nodeOptions, "state", ["active", "inactive", "custom", "default"]).onChange((v: any) => {
    graph.forEachNode((node) => {
      node.state = v;
    });
  });
  const fillFolder = gui.addFolder("fill");
  const strokeFolder = gui.addFolder("stroke");
  const labelFolder = gui.addFolder("label");
  gui.add(nodeOptions, "halo").onChange((v: any) => {
    graph.setNodeOptions({
      style: { halo: v },
    });
  });
  gui.addColor(nodeOptions, "haloFill").onChange((v: any) => {
    graph.setNodeOptions({
      style: { haloFill: v },
    });
  });
  gui.addColor(nodeOptions, "haloStroke").onChange((v: any) => {
    graph.setNodeOptions({
      style: { haloStroke: v },
    });
  });
  gui
    .add(nodeOptions, "haloSpacing", 0, 10)
    .step(1)
    .onChange((v: any) => {
      graph.setNodeOptions({
        style: {
          haloSpacing: v,
        },
      });
    });

  fillFolder.addColor(nodeOptions.fill, "color").onChange((v: any) => {
    graph.setNodeOptions({
      style: {
        fill: {
          color: v,
        },
      },
    });
  });
  fillFolder
    .add(nodeOptions.fill, "alpha", 0, 1)
    .step(0.1)
    .onChange((v: any) => {
      graph.setNodeOptions({
        style: {
          fill: {
            alpha: v,
          },
        },
      });
    });
  const texture = await Assets.load("/graph-vis/examples/green.png"); //https://pixijs.com/assets/bunny.png
  const pattern = new FillPattern({ texture: texture, repetition: "no-repeat" });
  const gradient = new FillGradient({
    type: "linear",
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
    colorStops: [
      { offset: 0, color: 0xff0000 }, // 红色在 0%
      { offset: 1, color: 0x0000ff }, // 蓝色在 100%
    ],
  });
  const textureMap = {
    pattern,
    gradient,
  };
  fillFolder.add(nodeOptions.fill, "fill", ["gradient", "pattern", "null"]).onChange((v: any) => {
    graph.setNodeOptions({
      style: {
        fill: {
          fill: textureMap[v as "gradient" | "pattern"],
        },
      },
    });
  });
  strokeFolder.addColor(nodeOptions.stroke, "color").onChange((v: any) => {
    graph.setNodeOptions({
      style: {
        stroke: {
          color: v,
        },
      },
    });
  });
  strokeFolder
    .add(nodeOptions.stroke, "alpha", 0, 1)
    .step(0.1)
    .onChange((v: any) => {
      graph.setNodeOptions({
        style: {
          stroke: {
            alpha: v,
          },
        },
      });
    });
  strokeFolder
    .add(nodeOptions.stroke, "width", 0, 6)
    .step(1)
    .onChange((v: any) => {
      graph.setNodeOptions({
        style: {
          stroke: {
            width: v,
          },
        },
      });
    });
  strokeFolder
    .add(nodeOptions.stroke, "alignment", 0, 1)
    .step(0.1)
    .onChange((v: any) => {
      graph.setNodeOptions({
        style: {
          stroke: {
            alignment: v,
          },
        },
      });
    });
  strokeFolder
    .add(nodeOptions.stroke, "fill", ["gradient", "pattern", "null"])
    .onChange((v: any) => {
      graph.setNodeOptions({
        style: {
          stroke: {
            fill: textureMap[v as "gradient" | "pattern"],
          },
        },
      });
    });
  labelFolder.add(nodeOptions.label, "visible").onChange((v: any) => {
    graph.setNodeOptions({
      labelConfig: {
        style: {
          visible: v,
        },
      },
    });
  });
  labelFolder
    .add(nodeOptions.label, "placement", ["right", "left", "center", "top", "bottom"])
    .onChange((v: any) => {
      graph.setNodeOptions({
        labelConfig: {
          style: {
            placement: v,
          },
        },
      });
    });
  labelFolder
    .add(nodeOptions.label, "offsetX", -20, 20)
    .step(1)
    .onChange((v: any) => {
      graph.setNodeOptions({
        labelConfig: {
          style: {
            offsetX: v,
          },
        },
      });
    });
  labelFolder
    .add(nodeOptions.label, "offsetY", -20, 20)
    .step(1)
    .onChange((v: any) => {
      graph.setNodeOptions({
        labelConfig: {
          style: {
            offsetY: v,
          },
        },
      });
    });
  labelFolder
    .add(nodeOptions.label, "fontSize", 12, 34)
    .step(1)
    .onChange((v: any) => {
      graph.setNodeOptions({
        labelConfig: {
          style: {
            fontSize: v,
          },
        },
      });
    });
  labelFolder.addColor(nodeOptions.label, "fill").onChange((v: any) => {
    graph.setNodeOptions({
      labelConfig: {
        style: {
          fill: v,
        },
      },
    });
  });
  labelFolder.addColor(nodeOptions.label, "stroke").onChange((v: any) => {
    graph.setNodeOptions({
      labelConfig: {
        style: {
          stroke: v,
        },
      },
    });
  });
  labelFolder.add(nodeOptions.label, "halo").onChange((v: any) => {
    graph.setNodeOptions({
      labelConfig: {
        style: {
          halo: v,
        },
      },
    });
  });
  labelFolder.addColor(nodeOptions.label, "haloFill").onChange((v: any) => {
    graph.setNodeOptions({
      labelConfig: {
        style: {
          haloFill: v,
        },
      },
    });
  });
  labelFolder.addColor(nodeOptions.label, "haloStroke").onChange((v: any) => {
    graph.setNodeOptions({
      labelConfig: {
        style: {
          haloStroke: v,
        },
      },
    });
  });
  labelFolder
    .add(nodeOptions.label, "haloSpacing", 0, 6)
    .step(1)
    .onChange((v: any) => {
      graph.setNodeOptions({
        labelConfig: {
          style: {
            haloSpacing: v,
          },
        },
      });
    });
  labelFolder
    .add(nodeOptions.label, "haloRadius", 0, 6)
    .step(1)
    .onChange((v: any) => {
      graph.setNodeOptions({
        labelConfig: {
          style: {
            haloRadius: v,
          },
        },
      });
    });
}
init();

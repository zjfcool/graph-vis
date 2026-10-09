import { GraphVis } from "@zjfcool/graph-vis";
import { FillGradient, FillPattern, Assets } from "pixi.js";
import { GUI } from "dat.gui";
async function init() {
  const container = document.querySelector("#app")!;
  const res = await fetch("/graph-vis/examples/edges.json");
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
      labelConfig: {
        labelText: (d) => d.id,
        style: {
          visible: true,
          placement: "center",
        },
      },
    },
    edge: {
      state: {
        custom: {
          stroke: "red",
          arrowStyle: {
            fill: "red",
          },
          labelStyle: {
            fill: "red",
          },
        },
      },
      labelConfig: {
        labelText: (d) => {
          const { __original } = d;
          return `${__original.source}->${__original.target}`;
        },
        style: {
          visible: true,
        },
      },
    },
  });
  await graph.init();
  const gui = new GUI();
  const edgeOptions = {
    state: "default",
    visible: true,
    smoothness: 0.75,
    halo: false,
    haloStroke: "#000",
    haloSpacing: 3,
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
      alongTPositionMode: "local",
      offsetPositionMode: "local",
      alongT: 0.5,
      offsetX: 0,
      offsetY: 0,
      halo: false,
      haloFill: "#000",
      haloStroke: "#000",
      haloSpacing: 0,
      haloRadius: 0,
    },
    arrow: {
      visible: true,
      tailMidpointRatio: 0.2,
      size: [6, 4],
      alongT: 1,
      fill: "#000",
      stroke: "#000",
    },
  };
  gui.add(edgeOptions, "visible").onChange((v: any) => {
    graph.setEdgeOptions({
      style: {
        visible: v,
      },
    });
  });
  gui
    .add(edgeOptions, "state", ["active", "inactive", "custom", "selected", "default"])
    .onChange((v: any) => {
      graph.forEachEdge((edge) => {
        edge.state = v;
      });
    });
  gui
    .add(edgeOptions, "smoothness", 0, 2)
    .step(0.1)
    .onChange((v: any) => {
      graph.setEdgeOptions({
        style: {
          smoothness: v,
        },
      });
    });
  const strokeFolder = gui.addFolder("stroke");
  const labelFolder = gui.addFolder("label");
  const arrowFolder = gui.addFolder("arrow");
  gui.add(edgeOptions, "halo").onChange((v: any) => {
    graph.setEdgeOptions({
      style: { halo: v },
    });
  });
  gui.addColor(edgeOptions, "haloStroke").onChange((v: any) => {
    graph.setEdgeOptions({
      style: { haloStroke: v },
    });
  });
  gui
    .add(edgeOptions, "haloSpacing", 0, 10)
    .step(1)
    .onChange((v: any) => {
      graph.setEdgeOptions({
        style: {
          haloSpacing: v,
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
  strokeFolder.addColor(edgeOptions.stroke, "color").onChange((v: any) => {
    graph.setEdgeOptions({
      style: {
        stroke: {
          color: v,
        },
      },
    });
  });
  strokeFolder
    .add(edgeOptions.stroke, "alpha", 0, 1)
    .step(0.1)
    .onChange((v: any) => {
      graph.setEdgeOptions({
        style: {
          stroke: {
            alpha: v,
          },
        },
      });
    });
  strokeFolder
    .add(edgeOptions.stroke, "width", 0, 6)
    .step(1)
    .onChange((v: any) => {
      graph.setEdgeOptions({
        style: {
          stroke: {
            width: v,
          },
        },
      });
    });
  strokeFolder
    .add(edgeOptions.stroke, "alignment", 0, 1)
    .step(0.1)
    .onChange((v: any) => {
      graph.setEdgeOptions({
        style: {
          stroke: {
            alignment: v,
          },
        },
      });
    });
  strokeFolder
    .add(edgeOptions.stroke, "fill", ["gradient", "pattern", "null"])
    .onChange((v: any) => {
      graph.setEdgeOptions({
        style: {
          stroke: {
            fill: textureMap[v as "gradient" | "pattern"],
          },
        },
      });
    });
  labelFolder.add(edgeOptions.label, "visible").onChange((v: any) => {
    graph.setEdgeOptions({
      labelConfig: {
        style: {
          visible: v,
        },
      },
    });
  });
  labelFolder
    .add(edgeOptions.label, "alongTPositionMode", ["local", "global"])
    .onChange((v: any) => {
      graph.setEdgeOptions({
        labelConfig: {
          style: {
            alongTPositionMode: v,
          },
        },
      });
    });
  labelFolder
    .add(edgeOptions.label, "alongT", 0, 1)
    .step(0.1)
    .onChange((v: any) => {
      graph.setEdgeOptions({
        labelConfig: {
          style: {
            alongT: v,
          },
        },
      });
    });
  labelFolder
    .add(edgeOptions.label, "offsetPositionMode", ["local", "global"])
    .onChange((v: any) => {
      graph.setEdgeOptions({
        labelConfig: {
          style: {
            offsetPositionMode: v,
          },
        },
      });
    });
  labelFolder
    .add(edgeOptions.label, "offsetX", -20, 20)
    .step(1)
    .onChange((v: any) => {
      graph.setEdgeOptions({
        labelConfig: {
          style: {
            offsetX: v,
          },
        },
      });
    });
  labelFolder
    .add(edgeOptions.label, "offsetY", -20, 20)
    .step(1)
    .onChange((v: any) => {
      graph.setEdgeOptions({
        labelConfig: {
          style: {
            offsetY: v,
          },
        },
      });
    });
  labelFolder
    .add(edgeOptions.label, "fontSize", 12, 34)
    .step(1)
    .onChange((v: any) => {
      graph.setEdgeOptions({
        labelConfig: {
          style: {
            fontSize: v,
          },
        },
      });
    });
  labelFolder.addColor(edgeOptions.label, "fill").onChange((v: any) => {
    graph.setEdgeOptions({
      labelConfig: {
        style: {
          fill: v,
        },
      },
    });
  });
  labelFolder.addColor(edgeOptions.label, "stroke").onChange((v: any) => {
    graph.setEdgeOptions({
      labelConfig: {
        style: {
          stroke: v,
        },
      },
    });
  });
  labelFolder.add(edgeOptions.label, "halo").onChange((v: any) => {
    graph.setEdgeOptions({
      labelConfig: {
        style: {
          halo: v,
        },
      },
    });
  });
  labelFolder.addColor(edgeOptions.label, "haloFill").onChange((v: any) => {
    graph.setEdgeOptions({
      labelConfig: {
        style: {
          haloFill: v,
        },
      },
    });
  });
  labelFolder.addColor(edgeOptions.label, "haloStroke").onChange((v: any) => {
    graph.setEdgeOptions({
      labelConfig: {
        style: {
          haloStroke: v,
        },
      },
    });
  });
  labelFolder
    .add(edgeOptions.label, "haloSpacing", 0, 6)
    .step(1)
    .onChange((v: any) => {
      graph.setEdgeOptions({
        labelConfig: {
          style: {
            haloSpacing: v,
          },
        },
      });
    });
  labelFolder
    .add(edgeOptions.label, "haloRadius", 0, 6)
    .step(1)
    .onChange((v: any) => {
      graph.setEdgeOptions({
        labelConfig: {
          style: {
            haloRadius: v,
          },
        },
      });
    });
  arrowFolder.add(edgeOptions.arrow, "visible").onChange((v: any) => {
    graph.setEdgeOptions({
      arrowConfig: {
        style: {
          visible: v,
        },
      },
    });
  });
  arrowFolder
    .add(edgeOptions.arrow, "tailMidpointRatio", 0, 1)
    .step(0.1)
    .onChange((v: any) => {
      graph.setEdgeOptions({
        arrowConfig: {
          style: {
            tailMidpointRatio: v,
          },
        },
      });
    });
  arrowFolder
    .add(edgeOptions.arrow.size, 0, 0, 12)
    .name("width")
    .step(1)
    .onChange(() => {
      graph.setEdgeOptions({
        arrowConfig: {
          style: {
            size: edgeOptions.arrow.size,
          },
        },
      });
    });
  arrowFolder
    .add(edgeOptions.arrow.size, 1, 0, 12)
    .name("height")
    .step(1)
    .onChange(() => {
      graph.setEdgeOptions({
        arrowConfig: {
          style: {
            size: edgeOptions.arrow.size,
          },
        },
      });
    });
  arrowFolder
    .add(edgeOptions.arrow, "alongT", 0, 1)
    .step(0.1)
    .onChange((v: any) => {
      graph.setEdgeOptions({
        arrowConfig: {
          style: {
            alongT: v,
          },
        },
      });
    });
  arrowFolder.addColor(edgeOptions.arrow, "fill").onChange((v: any) => {
    graph.setEdgeOptions({
      arrowConfig: {
        style: {
          fill: v,
        },
      },
    });
  });
  arrowFolder.addColor(edgeOptions.arrow, "stroke").onChange((v: any) => {
    graph.setEdgeOptions({
      arrowConfig: {
        style: {
          stroke: v,
        },
      },
    });
  });
}
init();

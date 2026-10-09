import { GraphVis } from "@zjfcool/graph-vis";
import { FillGradient, FillPattern, Assets } from "pixi.js";
import { GUI } from "dat.gui";
async function init() {
  const container = document.querySelector("#app")!;
  const res = await fetch("/examples/edges.json");
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
    link: {
      labelConfig: {
        labelText: (d) => {
          return d.targetType === "node" ? `${d.source.id}->${d.target.id}` : "linking...";
        },
        style: {
          visible: true,
        },
      },
    },
  });
  await graph.init();
  graph.on("node:pointerdown", (d) => {
    const { target, event } = d;
    event.stopPropagation();
    if (event.shiftKey) {
      graph.startLinkNode(target);
    } else {
      graph.endLinkNode();
    }
  });
  const gui = new GUI();
  const linkOptions = {
    type: "auto",
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
  gui.add(linkOptions, "type", ["auto", "line", "cubic", "quadratic"]).onChange((v) => {
    graph.setLinkOptions({ type: v });
  });
  gui.add(linkOptions, "visible").onChange((v: any) => {
    graph.setLinkOptions({
      style: {
        visible: v,
      },
    });
  });
  gui
    .add(linkOptions, "state", ["active", "inactive", "custom", "selected", "default"])
    .onChange((v: any) => {
      graph.getLink()!.state = v;
    });
  gui
    .add(linkOptions, "smoothness", 0, 2)
    .step(0.1)
    .onChange((v: any) => {
      graph.setLinkOptions({
        style: {
          smoothness: v,
        },
      });
    });
  const strokeFolder = gui.addFolder("stroke");
  const arrowFolder = gui.addFolder("arrow");
  gui.add(linkOptions, "halo").onChange((v: any) => {
    graph.setLinkOptions({
      style: { halo: v },
    });
  });
  gui.addColor(linkOptions, "haloStroke").onChange((v: any) => {
    graph.setLinkOptions({
      style: { haloStroke: v },
    });
  });
  gui
    .add(linkOptions, "haloSpacing", 0, 10)
    .step(1)
    .onChange((v: any) => {
      graph.setLinkOptions({
        style: {
          haloSpacing: v,
        },
      });
    });
  const texture = await Assets.load("/examples/green.png"); //https://pixijs.com/assets/bunny.png
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
  strokeFolder.addColor(linkOptions.stroke, "color").onChange((v: any) => {
    graph.setLinkOptions({
      style: {
        stroke: {
          color: v,
        },
      },
    });
  });
  strokeFolder
    .add(linkOptions.stroke, "alpha", 0, 1)
    .step(0.1)
    .onChange((v: any) => {
      graph.setLinkOptions({
        style: {
          stroke: {
            alpha: v,
          },
        },
      });
    });
  strokeFolder
    .add(linkOptions.stroke, "width", 0, 6)
    .step(1)
    .onChange((v: any) => {
      graph.setLinkOptions({
        style: {
          stroke: {
            width: v,
          },
        },
      });
    });
  strokeFolder
    .add(linkOptions.stroke, "alignment", 0, 1)
    .step(0.1)
    .onChange((v: any) => {
      graph.setLinkOptions({
        style: {
          stroke: {
            alignment: v,
          },
        },
      });
    });
  strokeFolder
    .add(linkOptions.stroke, "fill", ["gradient", "pattern", "null"])
    .onChange((v: any) => {
      graph.setLinkOptions({
        style: {
          stroke: {
            fill: textureMap[v as "gradient" | "pattern"],
          },
        },
      });
    });
  arrowFolder.add(linkOptions.arrow, "visible").onChange((v: any) => {
    graph.setLinkOptions({
      arrowConfig: {
        style: {
          visible: v,
        },
      },
    });
  });
  arrowFolder
    .add(linkOptions.arrow, "tailMidpointRatio", 0, 1)
    .step(0.1)
    .onChange((v: any) => {
      graph.setLinkOptions({
        arrowConfig: {
          style: {
            tailMidpointRatio: v,
          },
        },
      });
    });
  arrowFolder
    .add(linkOptions.arrow.size, 0, 0, 12)
    .name("width")
    .step(1)
    .onChange(() => {
      graph.setLinkOptions({
        arrowConfig: {
          style: {
            size: linkOptions.arrow.size,
          },
        },
      });
    });
  arrowFolder
    .add(linkOptions.arrow.size, 1, 0, 12)
    .name("height")
    .step(1)
    .onChange(() => {
      graph.setLinkOptions({
        arrowConfig: {
          style: {
            size: linkOptions.arrow.size,
          },
        },
      });
    });
  arrowFolder
    .add(linkOptions.arrow, "alongT", 0, 1)
    .step(0.1)
    .onChange((v: any) => {
      graph.setLinkOptions({
        arrowConfig: {
          style: {
            alongT: v,
          },
        },
      });
    });
  arrowFolder.addColor(linkOptions.arrow, "fill").onChange((v: any) => {
    graph.setLinkOptions({
      arrowConfig: {
        style: {
          fill: v,
        },
      },
    });
  });
  arrowFolder.addColor(linkOptions.arrow, "stroke").onChange((v: any) => {
    graph.setLinkOptions({
      arrowConfig: {
        style: {
          stroke: v,
        },
      },
    });
  });
}
init();

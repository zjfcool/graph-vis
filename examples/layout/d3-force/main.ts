import { GraphVis } from "@zjfcool/graph-vis";
import { GUI } from "dat.gui";
async function init() {
  const container = document.querySelector("#app") as HTMLElement;
  const res = await fetch("/graph-vis/examples/tina.json");
  const data = await res.json();
  const graph = new GraphVis({
    container,
    width: container.clientWidth,
    height: container.clientHeight,
    data,
    layout: {
      type: "d3-force",
    },
  });
  await graph.init();
  const gui = new GUI();
  const layout = {
    warmTicks: 0,
    cooldownTicks: Infinity,
    cooldownTime: 1500,
    alpha: 1,
    alphaMin: 0.001,
    alphaDecay: 0.01,
    alphaTarget: 0,
    velocityDecay: 0.4,
    link: {
      distance: 90,
      strength: 0.2,
    },
    center: {
      x: 0,
      y: 0,
      strength: 1,
    },
    collide: {
      radius: 20,
      strength: 0.1,
    },
    manyBody: {
      strength: -20,
      theta: 0.9,
      distanceMin: 1,
      distanceMax: Infinity,
    },
    x: {
      x: 0,
      strength: 0.1,
    },
    y: {
      y: 0,
      strength: 0.1,
    },
    radial: {
      strength: 0.1,
      radius: 100,
      x: 0,
      y: 0,
    },
  };
  (document.querySelector("#restart") as HTMLButtonElement).addEventListener("click", () => {
    graph.restartLayout();
  });
  gui
    .add(layout, "warmTicks", 0, 300)
    .step(1)
    .onChange((v) => {
      graph.setLayoutOptions({ warmTicks: v });
    });
  gui
    .add(layout, "cooldownTicks", 0, 500)
    .step(1)
    .onChange((v) => {
      graph.setLayoutOptions({ cooldownTicks: v });
    });
  gui
    .add(layout, "cooldownTime", 1000, 3000)
    .step(1)
    .onChange((v) => {
      graph.setLayoutOptions({ cooldownTicks: v });
    });
  gui
    .add(layout, "alpha", 0, 1)
    .step(0.1)
    .onChange((v) => {
      graph.setLayoutOptions({ alpha: v });
    });
  gui
    .add(layout, "alphaMin", 0, 1)
    .step(0.001)
    .onChange((v) => {
      graph.setLayoutOptions({ alphaMin: v });
    });
  gui
    .add(layout, "alphaDecay", 0, 1)
    .step(0.01)
    .onChange((v) => {
      graph.setLayoutOptions({ alphaDecay: v });
    });
  gui
    .add(layout, "alphaTarget", 0, 1)
    .step(0.01)
    .onChange((v) => {
      graph.setLayoutOptions({ alphaTarget: v });
    });
  gui
    .add(layout, "velocityDecay", 0, 1)
    .step(0.01)
    .onChange((v) => {
      graph.setLayoutOptions({ velocityDecay: v });
    });
  const linkFolder = gui.addFolder("link");
  linkFolder
    .add(layout.link, "distance", 0, 200)
    .step(1)
    .onChange((v) => {
      graph.setLayoutOptions({
        link: { distance: v },
      });
    });
  linkFolder
    .add(layout.link, "strength", 0, 1)
    .step(0.01)
    .onChange((v) => {
      graph.setLayoutOptions({
        link: { strength: v },
      });
    });
  const centerFolder = gui.addFolder("center");
  centerFolder.add(layout.center, "x", -500, 500).onChange((v) => {
    graph.setLayoutOptions({
      center: {
        x: v,
      },
    });
  });
  centerFolder.add(layout.center, "y", -500, 500).onChange((v) => {
    graph.setLayoutOptions({
      center: {
        y: v,
      },
    });
  });
  centerFolder.add(layout.center, "strength", 0, 2).onChange((v) => {
    graph.setLayoutOptions({
      center: {
        strength: v,
      },
    });
  });
  const collideFolder = gui.addFolder("collide");
  collideFolder
    .add(layout.collide, "radius", 0, 100)
    .step(1)
    .onChange((v) => {
      graph.setLayoutOptions({
        collide: {
          radius: v,
        },
      });
    });
  collideFolder
    .add(layout.collide, "strength", 0, 1)
    .step(0.01)
    .onChange((v) => {
      graph.setLayoutOptions({
        collide: {
          strength: v,
        },
      });
    });
  const manyBodyFolder = gui.addFolder("manBody");
  manyBodyFolder
    .add(layout.manyBody, "strength", -100, 100)
    .step(1)
    .onChange((v) => {
      graph.setLayoutOptions({
        manyBody: {
          strength: v,
        },
      });
    });
  manyBodyFolder
    .add(layout.manyBody, "theta", 0, 1)
    .step(0.01)
    .onChange((v) => {
      graph.setLayoutOptions({
        manyBody: {
          theta: v,
        },
      });
    });
  manyBodyFolder
    .add(layout.manyBody, "distanceMin", 0, 100)
    .step(1)
    .onChange((v) => {
      graph.setLayoutOptions({
        manyBody: {
          distanceMin: v,
        },
      });
    });
  manyBodyFolder
    .add(layout.manyBody, "distanceMax", 0, 1000)
    .step(1)
    .onChange((v) => {
      graph.setLayoutOptions({
        manyBody: {
          distanceMax: v,
        },
      });
    });
  const xFolder = gui.addFolder("x");
  xFolder
    .add(layout.x, "strength", 0, 1)
    .step(0.1)
    .onChange((v) => {
      graph.setLayoutOptions({
        x: {
          strength: v,
        },
      });
    });
  xFolder
    .add(layout.x, "x", -100, 100)
    .step(1)
    .onChange((v) => {
      graph.setLayoutOptions({
        x: {
          x: v,
        },
      });
    });
  const yFolder = gui.addFolder("y");
  yFolder
    .add(layout.y, "strength", 0, 1)
    .step(0.1)
    .onChange((v) => {
      graph.setLayoutOptions({
        y: {
          strength: v,
        },
      });
    });
  yFolder
    .add(layout.y, "y", -100, 100)
    .step(1)
    .onChange((v) => {
      graph.setLayoutOptions({
        y: {
          y: v,
        },
      });
    });
  const radialFolder = gui.addFolder("radial");
  radialFolder
    .add(layout.radial, "strength", 0, 1)
    .step(0.1)
    .onChange((v) => {
      graph.setLayoutOptions({
        radial: {
          strength: v,
        },
      });
    });
  radialFolder
    .add(layout.radial, "radius", 0, 500)
    .step(1)
    .onChange((v) => {
      graph.setLayoutOptions({
        radial: {
          radius: v,
        },
      });
    });
  radialFolder
    .add(layout.radial, "x", -500, 500)
    .step(1)
    .onChange((v) => {
      graph.setLayoutOptions({
        radial: {
          x: v,
        },
      });
    });
  radialFolder
    .add(layout.radial, "y", -500, 500)
    .step(1)
    .onChange((v) => {
      graph.setLayoutOptions({
        radial: {
          y: v,
        },
      });
    });
}
init();

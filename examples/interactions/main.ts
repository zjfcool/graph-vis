import { GraphVis } from "@zjfcool/graph-vis";
import { generateData } from "../util";
const container = document.querySelector("#app") as HTMLDivElement;
async function init() {
  const testData = generateData(100);
  const graph = new GraphVis({
    container,
    data: testData,
    width: container.clientWidth,
    height: container.clientHeight,
    resizeTo: container,
    // resizeDebounceTime: 1000,
    layout: {
      type: "d3-force",
    },
  });
  // graph
  //   .on("node:drag", (e) => {
  //     console.log("drag", e);
  //   })
  //   .on("node:dragstart", (e) => {
  //     e.subject.locked = true;
  //     console.log("dragstart", e);
  //   })
  //   .on("node:dragend", (e) => {});
  graph.on("node:pointerdown", (d) => {
    const node = d.target;
    const event = d.event;
    if (event.shiftKey) {
      graph.startLinkNode(node);
    } else {
      graph.endLinkNode();
    }
    if (event.altKey) {
      graph.dropNode(node.id);
    }
  });
  graph.on("node:pointerenter", (d) => {
    const node = d.target;
    node.state = "active";
    node.zIndex = 9;
    graph.neighbors(node.id).forEach((n) => {
      n.state = "active";
      n.zIndex = 9;
    });
    graph.relatedEdges(node.id).forEach((e) => {
      e.state = "active";
      e.zIndex = 9;
    });
  });
  graph.on("node:pointerleave", (d) => {
    const node = d.target;
    node.state = "default";
    node.zIndex = 0;
    graph.neighbors(node.id).forEach((n) => {
      n.state = "default";
      n.zIndex = 0;
    });
    graph.relatedEdges(node.id).forEach((e) => {
      e.state = "default";
      e.zIndex = 0;
    });
  });
  graph.on("edge:pointerenter", (d) => {
    const edge = d.target;
    edge.state = "active";
    edge.source!.state = "active";
    edge.target!.state = "active";
  });
  graph.on("edge:pointerleave", (d) => {
    const edge = d.target;
    edge.state = "default";
    edge.source!.state = "default";
    edge.target!.state = "default";
  });
  graph.on("edge:pointerdown", (d) => {
    const edge = d.target;
    const event = d.event;
    event.stopPropagation();
    if (event.altKey) {
      graph.dropEdge(edge.id);
    }
  });
  graph.on("edge:click", () => {
    console.log("edge:click");
  });
  graph.on("node:pointerdown", (d) => {
    d.event.stopPropagation();
  });
  graph.on("stage:click", ({ event }) => {
    event.preventDefault();
    // 双击stage
    if (event.detail === 2) {
      const { x, y } = graph.global2LocalPoint(event.x, event.y);
      graph.addNode({ id: `node-${Date.now()}`, x, y });
    }
  });
  graph.on("node:beforeadd", (data) => {
    console.log("node:beforeadd", data);
  });
  graph.on("node:afteradd", (node) => {
    console.log("node:afteradd", node);
  });
  graph.on("node:beforedrop", (id) => {
    console.log("node:beforedrop", id);
  });
  graph.on("node:afterdrop", (node) => {
    console.log("node:afterdrop", node);
  });
  graph.on("edge:beforeadd", (data) => {
    console.log("edge:beforeadd", data);
  });
  graph.on("edge:afteradd", (d) => {
    console.log("edge:afteradd", d);
  });
  graph.on("edge:beforedrop", (d) => {
    console.log("edge:beforedrop", d);
  });
  graph.on("edge:afterdrop", (node) => {
    console.log("edge:afterdrop", node);
  });
  // graph.on("link:start", (link) => {
  //   console.log("link:start", link);
  // });
  // graph.on("link:move", (d) => {
  //   console.log("link:move", d);
  // });
  // graph.on("link:end", (link) => {
  //   console.log("link:end", link);
  // });
  graph.on("beforecreate", () => {
    console.log("beforecreate");
  });
  graph.on("aftercreate", () => {
    console.log("aftercreate");
  });

  graph.on("beforedraw", () => {
    console.log("beforedraw");
  });
  graph.on("afterdraw", () => {
    console.log("afterdraw");
  });
  graph.on("layout:start", () => {
    console.log("layout:start");
  });
  graph.on("layout:end", () => {
    console.log("layout:end");
  });
  graph.on("beforeupdate", () => {
    console.log("beforeupdate");
  });
  graph.on("afterupdate", () => {
    console.log("afterupdate");
  });
  await graph.init();
  document.querySelector(".btn-group")?.addEventListener("click", (e) => {
    switch ((e.target as HTMLButtonElement).className) {
      case "up":
        graph.translateBy(0, -10);
        break;
      case "down":
        graph.translateBy(0, 10);
        break;
      case "left":
        graph.translateBy(-10, 0);
        break;
      case "right":
        graph.translateBy(10, 0);
        break;
      case "zoom-in":
        graph.zoom(graph.transform.k + 0.2, "sinusoidal-in", 500);
        break;
      case "zoom-out":
        graph.zoom(graph.transform.k - 0.2, "sinusoidal-out", 500);
        break;
    }
  });
}

init();

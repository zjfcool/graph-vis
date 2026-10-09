import { GraphVis, CircleNode, register } from "@zjfcool/graph-vis";
import { Graphics } from "pixi.js";
class CustomNode extends CircleNode {
  // 在圆的下面，先绘画
  beforeDrawNode(): void {
    let before = this.node?.getChildByLabel("before") as Graphics;
    if (!before) {
      before = new Graphics();
      before.label = "before";
      this.node.addChild(before);
    }
    before.clear();
    before.rect(0, 0, 40, 40).fill("red");
  }
  // 在圆的上面，后绘画
  afterDrawNode(): void {
    let after = this.node?.getChildByLabel("after") as Graphics;
    if (!after) {
      after = new Graphics();
      after.label = "after";
      this.node.addChild(after);
    }
    after.clear();
    after.circle(-10, -10, 20).fill("green");
  }
}
register("node", "custom", CustomNode);

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
    },
    node: {
      type: "custom",
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

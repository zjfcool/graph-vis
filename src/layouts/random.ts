import { Ticker } from "pixi.js";
import { BaseLayoutOptions, RandomLayoutOptions } from "../types";
import { BaseLayout } from "./base-layout";

export class RandomLayout<T extends BaseLayoutOptions = RandomLayoutOptions> extends BaseLayout<T> {
  id: string = "random";
  isStop: boolean = false;
  layout(): void {
    const { width = 500, height = 500, center = [0, 0] } = this.options;
    this.graphology.forEachNode((_, attr) => {
      attr.x = randomPosition(width) + center[0];
      attr.y = randomPosition(height) + center[1];
    });
    this.isStop = false;
  }
  ticker(_: Ticker): void {
    if (this.isStop) return;
    this.options.onTick?.();
    this.isStop = true;
  }
}
function randomPosition(size: number) {
  return (Math.random() - 0.5) * size;
}

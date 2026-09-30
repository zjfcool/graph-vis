import Graph from "graphology";
import { BaseLayoutOptions } from "../types";
import { deepAssign } from "../utils";
import { Ticker } from "pixi.js";

export abstract class BaseLayout<T extends BaseLayoutOptions = BaseLayoutOptions> {
  abstract id: string;
  abstract isStop?: boolean;
  initialOptions: T;
  runtimeOptions?: T;
  graphology: Graph;
  constructor(graphology: Graph, options: T) {
    this.initialOptions = options;
    this.graphology = graphology;
  }
  get options() {
    return this.runtimeOptions || this.initialOptions;
  }
  abstract layout(): void;
  execute(options?: T) {
    this.runtimeOptions = deepAssign({ ...this.initialOptions }, options);
    this.layout();
    return this;
  }
  abstract ticker(ticker: Ticker): void;
}
export abstract class BaseLayoutWithInterations<
  T extends BaseLayoutOptions = BaseLayoutOptions,
> extends BaseLayout<T> {
  abstract stop(): void;
  abstract tick(interations?: number): void;
  abstract restart(): void;
}
export function isInterationLayout(
  layoutInstance: any,
): layoutInstance is BaseLayoutWithInterations {
  return layoutInstance?.stop && layoutInstance?.tick;
}

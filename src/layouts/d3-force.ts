import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  forceCenter,
  forceRadial,
  type Simulation,
  type Force,
  type ForceLink,
} from "d3-force";
import type {
  D3ForceCenterOptions,
  D3ForceCollideOptions,
  D3ForceLinkOptions,
  D3ForceManyBodyOptions,
  D3ForceRadialOptions,
  D3ForceXOptions,
  D3ForceYOptions,
  D3ForceLayoutOptions,
  NodeAttributes,
  EdgeAttributes,
  BaseLayoutOptions,
} from "../types";
import { deepAssign } from "../utils";
import Graph from "graphology";
import { BaseLayoutWithInterations } from "./base-layout";
import { Ticker } from "pixi.js";
const DEFAULT_OPTIONS: D3ForceLayoutOptions = {
  warmTicks: 0,
  cooldownTicks: Infinity,
  cooldownTime: 1500,
  collide: {
    radius: 20,
    strength: 0.1,
  },
  link: {
    id: (d) => d.id,
    distance: 90,
    strength: 0.2,
  },
  manyBody: {
    strength: -20,
  },
  alphaDecay: 0.01,
};
class D3ForceLayout<
  T extends BaseLayoutOptions = D3ForceLayoutOptions,
> extends BaseLayoutWithInterations<T> {
  id: string = "d3-force";
  simulation: Simulation<any, any>;
  d3Nodes: NodeAttributes[] = [];
  d3Edges: EdgeAttributes[] = [];
  isStop: boolean = true;
  tickCount: number = 0; //迭代次数
  tickTime: number = 0; //迭代时间
  constructor(graphology: Graph, options: D3ForceLayoutOptions) {
    super(graphology, deepAssign(DEFAULT_OPTIONS, options));
    this.simulation = forceSimulation().stop();
    this.initEvents();
  }
  initEvents() {
    const nodeAddedHandle = ({ key }: { key: string }) => {
      const attr = this.graphology.getNodeAttributes(key);
      this.d3Nodes.push(attr);
      this.nodes();
    };
    const nodeDroppedHandle = ({ key }: { key: string }) => {
      const i = this.d3Nodes.findIndex((n) => n.id === key);
      if (i >= 0) {
        this.d3Nodes.splice(i, 1);
        this.nodes();
      }
    };
    const edgeAddedHandle = ({ key }: { key: string }) => {
      const attr = this.graphology.getEdgeAttributes(key);
      this.d3Edges.push({ ...attr, id: key });
      this.links();
    };
    const edgeDroppedHandle = ({ key }: { key: string }) => {
      const i = this.d3Edges.findIndex((e) => e.id === key);
      if (i >= 0) {
        this.d3Edges.splice(i, 1);
        this.links();
      }
    };
    this.graphology
      .on("nodeAdded", nodeAddedHandle)
      .on("nodeDropped", nodeDroppedHandle)
      .on("edgeAdded", edgeAddedHandle)
      .on("edgeDropped", edgeDroppedHandle);
  }
  initData() {
    this.initNodeData().initEdgeData();
    return this;
  }
  initNodeData() {
    this.d3Nodes = [];
    this.graphology.forEachNode((_, attr) => {
      this.d3Nodes.push(attr);
    });
    return this;
  }
  initEdgeData() {
    this.d3Edges = [];
    this.graphology.forEachEdge((_, attr) => {
      this.d3Edges.push(attr);
    });
    return this;
  }
  initForces() {
    const { alpha, alphaDecay, alphaMin, alphaTarget, randomSource } = this.options;
    if (alpha !== undefined) {
      this.simulation.alpha(alpha);
    }
    if (alphaDecay !== undefined) {
      this.simulation.alphaDecay(alphaDecay);
    }
    if (alphaMin !== undefined) {
      this.simulation.alphaMin(alphaMin);
    }
    if (alphaTarget !== undefined) {
      this.simulation.alphaTarget(alphaTarget);
    }
    if (randomSource !== undefined) {
      this.simulation.randomSource(randomSource);
    }
    this.generateForces();
  }
  generateForces() {
    const forces: { name: string; force: Force<any, any> }[] = [];
    const { link, center, manyBody, collide, radial, x, y } = this.options;
    function addForce(name: string, config: any, callback: (cfg: any) => Force<any, any>) {
      if (config) {
        forces.push({ name, force: callback(config) });
      }
    }
    addForce("link", link, (cfg: D3ForceLinkOptions) => {
      const f = forceLink();
      if (cfg) {
        const { id, strength, distance, iterations } = cfg;
        if (id !== undefined) f.id(id);
        if (strength !== undefined) f.strength(strength);
        if (distance !== undefined) f.distance(distance);
        if (iterations !== undefined) f.iterations(iterations);
      }
      return f;
    });
    addForce("center", center, (cfg: D3ForceCenterOptions) => {
      const f = forceCenter();
      if (cfg) {
        const { x, y, strength } = cfg;
        if (x !== undefined) f.x(x);
        if (y !== undefined) f.y(y);
        if (strength !== undefined) f.strength(strength);
      }
      return f;
    });
    addForce("manyBody", manyBody, (cfg: D3ForceManyBodyOptions) => {
      const f = forceManyBody();
      if (cfg) {
        const { strength, theta, distanceMax, distanceMin } = cfg;
        if (strength !== undefined) f.strength(strength);
        if (theta !== undefined) f.theta(theta);
        if (distanceMax !== undefined) f.distanceMax(distanceMax);
        if (distanceMin !== undefined) f.distanceMin(distanceMin);
      }
      return f;
    });
    addForce("charge", collide, (cfg: D3ForceCollideOptions) => {
      const f = forceCollide();
      if (cfg) {
        const { radius, strength, iterations } = cfg;
        if (radius !== undefined) f.radius(radius);
        if (strength !== undefined) f.strength(strength);
        if (iterations !== undefined) f.iterations(iterations);
      }
      return f;
    });
    addForce("radial", radial, (cfg: D3ForceRadialOptions) => {
      const f = forceRadial(cfg?.radius ?? 0);
      if (cfg) {
        const { strength, x, y } = cfg;
        if (strength !== undefined) f.strength(strength);
        if (x !== undefined) f.x(x);
        if (y !== undefined) f.y(y);
      }
      return f;
    });
    addForce("x", x, (cfg: D3ForceXOptions) => {
      const f = forceX();
      if (cfg) {
        const { strength, x } = cfg;
        if (x !== undefined) f.x(x);
        if (strength !== undefined) f.strength(strength);
      }
      return f;
    });
    addForce("y", y, (cfg: D3ForceYOptions) => {
      const f = forceY();
      if (cfg) {
        const { strength, y } = cfg;
        if (y !== undefined) f.y(y);
        if (strength !== undefined) f.strength(strength);
      }
      return f;
    });
    forces.forEach(({ name, force }) => {
      this.simulation.force(name, force);
    });
  }
  layout() {
    this.initData();
    this.initForces();
    this.nodes()
      .links()
      .reheat()
      .on("tick", () => {
        this.options.onTick?.();
      })
      .on("end", () => {
        this.isStop = true;
      });
  }
  nodes() {
    this.simulation.nodes(this.d3Nodes);
    return this;
  }
  links() {
    if (this.d3Edges) {
      (this.simulation.force("link") as ForceLink<any, any>)?.links(this.d3Edges);
    }
    return this;
  }
  stop() {
    this.simulation.stop();
    this.isStop = true;
    return this;
  }
  reheat() {
    this.restart(1);
    return this;
  }
  restart(alpha?: number) {
    if (alpha !== undefined) {
      this.simulation.alpha(alpha).restart();
    } else {
      this.simulation.restart();
    }
    this.isStop = false;
    return this;
  }
  tick(iterations: number = 1) {
    if (this.isStop === true) return;
    for (let i = 0; i < iterations; i++) {
      this.simulation.tick();
    }
    this.options.onTick?.();
    return this;
  }
  ticker(ticker: Ticker) {
    if (this.isStop === true) return;
    const { warmTicks, cooldownTicks, cooldownTime } = this.options;
    this.tickTime += ticker.deltaTime;
    this.tickCount += 1;
    if (warmTicks > 0) this.tick(warmTicks);
    if (this.tickCount > cooldownTicks || this.tickTime > cooldownTime) {
      this.stop();
      return;
    }
    this.tick();
  }
  on(name: "tick" | "end" | string, callback: () => void) {
    this.simulation.on(name, callback.bind(this));
    return this;
  }
}
export { D3ForceLayout };

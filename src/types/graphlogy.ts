// graphology options
export type GraphologyType = "mixed" | "directed" | "undirected";
export interface GraphologyOptions {
  allowSelfLoops?: boolean;
  multi?: boolean;
  type?: GraphologyType;
}

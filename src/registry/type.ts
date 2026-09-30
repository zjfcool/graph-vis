import { BaseEdge } from "../elements/edges";
import { BaseNode } from "../elements/nodes";
import { Layout, RegistryTheme } from "../types";

export type RegistryExtension = {
  theme: RegistryTheme;
  node: Record<string, { new (...args: any[]): BaseNode }>;
  edge: Record<string, { new (...args: any[]): BaseEdge }>;
  layout: Record<string, { new (...args: any[]): Layout }>;
  // palette:
};
export type Category = keyof RegistryExtension;

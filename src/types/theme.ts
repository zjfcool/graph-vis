import { ColorSource } from "pixi.js";
import { EdgeOptions } from "./edge";
import { LinkOptions } from "./link";
import { NodeOptions } from "./node";

export type ThemeOptions = "light" | "dark" | (string & {});
export interface PigmentItem {
  nodeColor: string;
  edgeColor: string;
  backgroundColor: string;
}
export interface Theme {
  node?: NodeOptions;
  edge?: EdgeOptions;
  link?: LinkOptions;
  background?: ColorSource;
}
export type RegistryTheme = Record<string, Theme>;

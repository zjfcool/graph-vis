import { EdgeOptions } from "./edge";

export type LinkOptions<D = any> = Omit<EdgeOptions<D>, "source" | "target" | "drawBy" | "id">;

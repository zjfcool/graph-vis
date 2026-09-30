import { darkTheme, lightTheme } from "../themes";
import {
  CircleNode,
  RectNode,
  EllipseNode,
  StarNode,
  PolygonNode,
  TextNode,
  BitmapTextNode,
  ImageNode,
} from "../elements/nodes";
import { AutoEdge, CubicEdge, LineEdge, QuadraticEdge } from "../elements/edges";
import { register } from "./register";
import { Category, RegistryExtension } from "./type";
import { D3ForceLayout, RandomLayout } from "../layouts";

const BUILT_IN_EXTENSIONS: RegistryExtension = {
  theme: {
    light: lightTheme,
    dark: darkTheme,
  },
  node: {
    circle: CircleNode,
    rect: RectNode,
    ellipse: EllipseNode,
    star: StarNode,
    polygon: PolygonNode,
    text: TextNode,
    "bitmap-text": BitmapTextNode,
    image: ImageNode,
  },
  edge: {
    auto: AutoEdge,
    line: LineEdge,
    cubic: CubicEdge,
    quadratic: QuadraticEdge,
  },
  layout: {
    "d3-force": D3ForceLayout,
    random: RandomLayout,
  },
};
export function registerBuiltInExtensions() {
  Object.entries(BUILT_IN_EXTENSIONS).forEach(([category, exts]) => {
    Object.entries(exts).forEach(([type, ext]) => {
      register(category as Category, type, ext);
    });
  });
}

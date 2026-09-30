export type Palette = string;

export type CategoryPalette = string[];

// export type BuildInPaletteNames = ""

export type PaletteType = "group";

export interface StructPalette {
  type?: PaletteType;
  name?: string;
  colors?: CategoryPalette;
  field?: string;
}

import { type Graphics, type Renderer, type RenderTexture } from "pixi.js";

export class TextureGenerator {
  renderer: Renderer;
  private textures: Map<string, RenderTexture>;
  constructor(renderer: Renderer) {
    this.renderer = renderer;
    this.textures = new Map();
  }
  get(name: string, callback?: () => Graphics): RenderTexture | undefined {
    let texture = this.textures.get(name);
    if (!texture) {
      const c = callback?.();
      if (c) {
        // const region = c.getLocalBounds(undefined,true);
        // const roundedRegion = new Rectangle(Math.floor(region.x), Math.floor(region.y), Math.ceil(region.width), Math.ceil(region.height));
        texture = this.renderer.textureGenerator.generateTexture({
          target: c,
          resolution: 2,
          antialias: true,
          textureSourceOptions: {
            scaleMode: "linear",
          },
        });
        this.textures.set(name, texture);
      }
    }
    return texture;
  }
  delete(name: string) {
    const texture = this.textures.get(name);
    if (!texture) return;
    texture.destroy();
    this.textures.delete(name);
  }
  clear() {
    Array.from(this.textures.keys()).forEach((k) => {
      this.delete(k);
    });
  }
  destroy() {
    this.clear();
  }
}

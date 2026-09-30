import { RegistryTheme, Theme } from "../types";
import { generateThemeByPigment } from "./generateTheme";
import { defaultDarkPigment, defaultLightPigment } from "./pigments";

const REGISTRY_THEME: RegistryTheme = {
  light: generateThemeByPigment(defaultLightPigment),
  dark: generateThemeByPigment(defaultDarkPigment),
};
function registerTheme(type: string, options: Theme) {
  const ops = REGISTRY_THEME[type];
  if (ops) {
    console.warn(`theme ${type} has been registered before, and will be overridden.`);
  }
  Object.assign(REGISTRY_THEME, { [type]: options });
}
export { registerTheme, REGISTRY_THEME };
